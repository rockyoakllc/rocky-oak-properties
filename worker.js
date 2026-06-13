const GA_MEASUREMENT_ID = "G-QSDR0257ZG";

const googleAnalyticsSnippet = `
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  </script>
`;

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const shouldInjectAnalytics = (request, response) => {
  if (request.method !== "GET") return false;
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("text/html");
};

async function addGoogleAnalytics(request, response) {
  if (!shouldInjectAnalytics(request, response)) return response;

  const html = await response.text();
  const updatedHtml = html.includes(GA_MEASUREMENT_ID)
    ? html
    : html.replace("</head>", `${googleAnalyticsSnippet}\n</head>`);

  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(updatedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function handleContactRequest(request, env) {
  if (request.method !== "POST") {
    return jsonResponse({ message: "Method not allowed." }, 405);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ message: "Invalid form submission." }, 400);
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const services = Array.isArray(data.services)
    ? data.services.map((service) => String(service).trim()).filter(Boolean)
    : [];
  const message = String(data.message || "").trim();

  if (!name || !email || !services.length || !message) {
    return jsonResponse({ message: "Please complete all required fields." }, 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ message: "Please enter a valid email address." }, 400);
  }

  if (name.length > 120 || email.length > 160 || message.length > 5000 || services.join(", ").length > 800) {
    return jsonResponse({ message: "Your message is too long. Please shorten it and try again." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    return jsonResponse({ message: "Contact form is not configured yet." }, 500);
  }

  const serviceListText = services.map((service) => `- ${service}`).join("\n");
  const serviceListHtml = services.map((service) => `<li>${escapeHtml(service)}</li>`).join("");

  const emailBodyText = `New Rocky Oak Website Inquiry\n\nName: ${name}\nEmail: ${email}\n\nProject Type:\n${serviceListText}\n\nProject Details:\n${message}`;

  const emailBodyHtml = `
    <h2>New Rocky Oak Website Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Project Type:</strong></p>
    <ul>${serviceListHtml}</ul>
    <p><strong>Project Details:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Rocky Oak Website <onboarding@resend.dev>",
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `New Rocky Oak Website Inquiry from ${name}`,
      text: emailBodyText,
      html: emailBodyHtml,
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend error", await resendResponse.text());
    return jsonResponse({ message: "Message could not be sent." }, 502);
  }

  return jsonResponse({ message: "Message sent successfully." });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContactRequest(request, env);
    }

    const response = await env.ASSETS.fetch(request);
    return addGoogleAnalytics(request, response);
  },
};
