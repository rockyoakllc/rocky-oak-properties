document.addEventListener("DOMContentLoaded", () => {
  const footerBrandColumn = document.querySelector(".site-footer .footer-grid > div:first-child");
  if (!footerBrandColumn || footerBrandColumn.querySelector(".footer-instagram-link")) return;

  const instagramLink = document.createElement("a");
  instagramLink.className = "footer-instagram-link";
  instagramLink.href = "https://www.instagram.com/rockyoakproperties/";
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
  instagramLink.setAttribute("aria-label", "Rocky Oak Properties on Instagram");
  instagramLink.innerHTML = `
    <svg class="footer-instagram-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Zm0 2C5.7 4 4 5.7 4 7.8v8.4C4 18.3 5.7 20 7.8 20h8.4c2.1 0 3.8-1.7 3.8-3.8V7.8C20 5.7 18.3 4 16.2 4H7.8Zm4.2 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5-2.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  `;

  footerBrandColumn.appendChild(instagramLink);

  const style = document.createElement("style");
  style.textContent = `
    .footer-instagram-link{width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center;margin-top:16px;border:1px solid var(--line);border-radius:50%;color:var(--charcoal);background:rgba(255,250,242,.72);transition:transform .2s ease,background .2s ease,color .2s ease,border-color .2s ease}
    .footer-instagram-link:hover{transform:translateY(-2px);background:var(--terracotta);border-color:var(--terracotta);color:var(--warm-white)}
    .footer-instagram-icon{width:22px;height:22px;display:block;fill:currentColor}
  `;
  document.head.appendChild(style);
});