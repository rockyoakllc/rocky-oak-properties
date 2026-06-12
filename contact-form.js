document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contactForm");
  const formMessage = document.querySelector("#formMessage");
  const submitButton = contactForm?.querySelector("button[type='submit']");

  if (!contactForm || !formMessage || !submitButton) return;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!contactForm.checkValidity()) {
      formMessage.textContent = "Please complete all required fields before submitting.";
      formMessage.style.color = "#9f5b3f";
      contactForm.reportValidity();
      return;
    }

    const selectedServices = Array.from(contactForm.querySelectorAll("#service option:checked"))
      .map((option) => option.textContent.trim());

    const payload = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      services: selectedServices,
      message: contactForm.message.value.trim(),
    };

    formMessage.textContent = "Sending your message...";
    formMessage.style.color = "#68735a";
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "The message could not be sent.");
      }

      formMessage.textContent = "Thanks! Your message has been sent. We’ll get back to you soon.";
      formMessage.style.color = "#68735a";
      contactForm.reset();
    } catch (error) {
      formMessage.textContent = "Sorry, something went wrong. Please email us directly at rockyoakllc@gmail.com.";
      formMessage.style.color = "#9f5b3f";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Message";
    }
  }, { capture: true });
});