/*
  Rocky Oak Properties JavaScript
  --------------------------------
  This file adds simple interactive behavior to the website.

  Beginner note:
  JavaScript is used here for:
  1. Opening/closing the mobile navigation menu.
  2. Updating the copyright year automatically.
  3. Animating sections when they scroll into view.
  4. Filtering the gallery page by project category.
  5. Showing basic front-end validation feedback on the contact form.
*/

// Wait for the HTML document to fully load before running code.
document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
     Mobile navigation menu
  ----------------------------- */

  // querySelector finds the first matching element on the page.
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Some pages may not have these elements, so we check before using them.
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      // classList.toggle adds the class if missing, removes it if present.
      navLinks.classList.toggle("open");

      // This improves accessibility by telling screen readers the menu state.
      const isOpen = navLinks.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* -----------------------------
     Automatic copyright year
  ----------------------------- */

  const yearElement = document.querySelector("#year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* -----------------------------
     Reveal-on-scroll animation
  ----------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  // IntersectionObserver watches when elements enter the browser viewport.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  /* -----------------------------
     Gallery filtering
  ----------------------------- */

  const filterButtons = document.querySelectorAll(".filter-button");
  const galleryCards = document.querySelectorAll(".gallery-card, .project-card, .placeholder-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      galleryCards.forEach((card) => {
        // Some cards have one category, while portfolio cards can have multiple
        // categories separated by spaces, such as "full-home kitchen bath".
        const cardCategories = card.dataset.category || "";
        const shouldShow = selectedFilter === "all" || cardCategories.split(" ").includes(selectedFilter);

        card.style.display = shouldShow ? "block" : "none";
      });
    });
  });



  /* -----------------------------
     Before/after comparison sliders
  ----------------------------- */

  // Each before/after component uses a range input. When the visitor drags it,
  // we change the width of the .after-image-wrap element. That reveals more or
  // less of the finished "after" photo on top of the "before" photo.
  const beforeAfterSliders = document.querySelectorAll("[data-slider]");

  beforeAfterSliders.forEach((slider) => {
    const rangeInput = slider.querySelector(".slider-range");
    const afterImageWrap = slider.querySelector(".after-image-wrap");
    const afterImage = slider.querySelector(".after-image");

    if (!rangeInput || !afterImageWrap || !afterImage) return;

    const updateSlider = () => {
      // The wrapper changes width, but the image inside stays the full
      // slider width. That creates a true reveal effect instead of squeezing
      // the after image.
      afterImageWrap.style.width = `${rangeInput.value}%`;
      afterImage.style.width = `${slider.offsetWidth}px`;
    };

    rangeInput.addEventListener("input", updateSlider);
    window.addEventListener("resize", updateSlider);
    updateSlider();
  });

  /* -----------------------------
     Simple project image lightbox
  ----------------------------- */

  // The lightbox makes supporting gallery images larger when clicked. This is a
  // front-end-only interaction, so no extra service or database is needed.
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightboxImage");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
  };

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const image = trigger.querySelector("img");
      if (!image || !lightbox || !lightboxImage) return;

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      // Only close when the dark backdrop itself is clicked, not the image.
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

    /* -----------------------------
     Contact form validation
  ----------------------------- */

  const contactForm = document.querySelector("#contactForm");
  const formMessage = document.querySelector("#formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      // preventDefault stops the browser from refreshing/submitting the form.
      event.preventDefault();

      // checkValidity uses the required/type rules in the HTML form fields.
      if (!contactForm.checkValidity()) {
        formMessage.textContent = "Please complete all required fields before submitting.";
        formMessage.style.color = "#9f5b3f";
        contactForm.reportValidity();
        return;
      }

      formMessage.textContent = "Thanks! This sample form is ready to connect to a real form service.";
      formMessage.style.color = "#68735a";
      contactForm.reset();
    });
  }
});
