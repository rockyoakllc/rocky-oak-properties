/* Rocky Oak Properties JavaScript */
document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
     Sitewide branding
  ----------------------------- */

  const brandStyles = document.createElement("style");
  brandStyles.textContent = `
    .header-logo-image{height:64px;width:auto;display:block}
    .footer-brand-logo{height:112px;width:auto;display:block;margin-bottom:14px}
    .footer-brand-text{max-width:330px;color:var(--muted);line-height:1.7}
    @media(max-width:640px){.header-logo-image{height:52px}.footer-brand-logo{height:92px}}
  `;
  document.head.appendChild(brandStyles);

  const headerLogo = document.querySelector(".site-header .logo");
  if (headerLogo) {
    headerLogo.innerHTML = `<img src="images/logo-2.png" alt="Rocky Oak Properties" class="header-logo-image" />`;
    headerLogo.setAttribute("aria-label", "Rocky Oak Properties home");
  }

  const footerBrandColumn = document.querySelector(".site-footer .footer-grid > div:first-child");
  if (footerBrandColumn) {
    footerBrandColumn.innerHTML = `
      <a class="footer-logo-link" href="index.html" aria-label="Rocky Oak Properties home">
        <img src="images/logo.png" alt="Rocky Oak Properties" class="footer-brand-logo" />
      </a>
      <p class="footer-brand-text">Helping houses become homes in Nashville and the surrounding areas.</p>
    `;
  }

  /* -----------------------------
     Mobile navigation menu
  ----------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* -----------------------------
     Automatic copyright year
  ----------------------------- */

  const yearElement = document.querySelector("#year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  /* -----------------------------
     Gallery page data + rendering
  ----------------------------- */

  const beforeAfterContainer = document.querySelector("#beforeAfterProjects");
  const flipBeforeContainer = document.querySelector("#flipBeforePhotos");
  const flipAfterContainer = document.querySelector("#flipAfterPhotos");
  const portfolioCardsContainer = document.querySelector("#portfolioCards");

  const beforeAfterProjects = [
    ["Bathroom Shower Remodel", "Installation & Room Design", "A dated bathroom shower was refreshed with cleaner finishes and a more polished, modern look.", "installation room-design", "bathroomshower-remodel", ["Bathroom", "Install", "Refresh"]],
    ["Custom Storage Solution", "Installation & Storage", "Unused or underperforming space was turned into more functional storage with a cleaner finished feel.", "installation sourcing", "custom-storage", ["Storage", "Cabinetry", "Function"]],
    ["Entry Redesign", "Interior Styling & Refresh", "A high-traffic entry area was made more intentional with styling, layout, and design-forward details.", "painting-wallpaper room-design styling", "entry-redesign", ["Entry", "Styling", "Design"]],
    ["Island Update", "Kitchen Refresh", "A plain kitchen island was upgraded into a stronger focal point with improved detail and finish.", "installation painting-wallpaper room-design", "island-update", ["Kitchen", "Island", "Trim"]],
    ["Kitchen Refresh", "Room Design & Refresh", "A kitchen was brightened and refined through thoughtful updates that made the space feel cleaner and more complete.", "room-design sourcing painting-wallpaper", "kitchen-refresh", ["Kitchen", "Refresh", "Design"]],
    ["Open Concept Remodel", "Larger Project", "A larger renovation-style project showing how layout, finish choices, and execution can transform the feel of a home.", "complete-home room-design installation", "open-concept-remodel", ["Remodel", "Layout", "Home"]],
    ["Wall Installation", "Painting, Wallpaper & Installation", "A wall treatment was added to create more texture, interest, and a finished design moment.", "painting-wallpaper installation room-design", "wall-installation", ["Wall Treatment", "Install", "Feature"]],
  ];

  const portfolioProjects = {
    "bedroom-remodel": {
      title: "Bedroom Remodel",
      type: "Bedroom Remodel",
      description: "A bedroom refresh focused on creating a warmer, more finished space with improved styling, layout, and design details.",
      preview: "images/portfolio/bedroom-redesign/photo-01.jpeg",
      images: ["images/portfolio/bedroom-redesign/photo-01.jpeg", "images/portfolio/bedroom-redesign/photo-02.jpeg", "images/portfolio/bedroom-redesign/photo-03.jpeg", "images/portfolio/bedroom-redesign/photo-04.jpeg"],
      tags: ["Bedroom", "Styling", "Refresh"],
    },
    "office-remodel": {
      title: "Office Remodel",
      type: "Office Remodel",
      description: "A work-from-home space updated for better function, cleaner design, and a more intentional finished feel.",
      preview: "images/portfolio/office-remodel/photo-01.jpeg",
      images: ["images/portfolio/office-remodel/photo-01.jpeg", "images/portfolio/office-remodel/photo-02.jpeg", "images/portfolio/office-remodel/photo-03.jpeg", "images/portfolio/office-remodel/photo-04.jpeg", "images/portfolio/office-remodel/photo-05.jpeg"],
      tags: ["Office", "Layout", "Design"],
    },
    "custom-cabinets-closet-remodel": {
      title: "Custom Cabinets Closet Remodel",
      type: "Custom Cabinets & Closet Remodel",
      description: "A storage-focused remodel with custom cabinet and closet details to make the space more organized, useful, and polished.",
      preview: "images/portfolio/custom-cabinet-closet-remodel/photo-01.jpeg",
      images: ["images/portfolio/custom-cabinet-closet-remodel/photo-01.jpeg", "images/portfolio/custom-cabinet-closet-remodel/photo-02.jpeg", "images/portfolio/custom-cabinet-closet-remodel/photo-03.jpeg", "images/portfolio/custom-cabinet-closet-remodel/photo-04.jpeg", "images/portfolio/custom-cabinet-closet-remodel/photo-05.jpeg", "images/portfolio/custom-cabinet-closet-remodel/photo-06.jpeg", "images/portfolio/custom-cabinet-closet-remodel/photo-07.jpeg"],
      tags: ["Cabinets", "Closet", "Storage"],
    },
    "kitchen-refresh-remodel": {
      title: "Kitchen Refresh and Remodel",
      type: "Kitchen Refresh & Remodel",
      description: "A kitchen-focused project showing how cabinet, finish, layout, and styling improvements can make the space feel brighter and more functional.",
      preview: "images/portfolio/Kicthen-refresh-remodel/photo-01.webp",
      images: ["images/portfolio/Kicthen-refresh-remodel/photo-01.webp", "images/portfolio/Kicthen-refresh-remodel/photo-02.webp", "images/portfolio/Kicthen-refresh-remodel/photo-03.webp"],
      tags: ["Kitchen", "Cabinets", "Refresh"],
    },
  };

  const createTagList = (tags) => tags.map((tag) => `<li>${tag}</li>`).join("");

  if (beforeAfterContainer) {
    beforeAfterContainer.innerHTML = beforeAfterProjects.map(([title, type, description, category, folder, tags]) => {
      const basePath = `images/before-after/${folder}`;
      return `
        <article class="project-card reveal" data-category="${category}">
          <div class="before-after-slider" data-slider>
            <img class="before-image" src="${basePath}/before-01.jpeg" alt="Before ${title}" />
            <div class="after-image-wrap"><img class="after-image" src="${basePath}/after-01.jpeg" alt="After ${title}" /></div>
            <span class="image-label before-label">Before</span><span class="image-label after-label">After</span>
            <input class="slider-range" type="range" min="0" max="100" value="50" aria-label="Compare ${title}" />
          </div>
          <div class="project-content"><p class="project-type">${type}</p><h3>${title}</h3><p>${description}</p><ul class="project-tags">${createTagList(tags)}</ul></div>
        </article>`;
    }).join("");
  }

  const createPhotoButton = (src, alt) => `<button class="lightbox-trigger reveal" type="button"><img src="${src}" alt="${alt}" /></button>`;

  if (flipBeforeContainer) {
    flipBeforeContainer.innerHTML = Array.from({ length: 17 }, (_, index) => {
      const number = String(index + 1).padStart(2, "0");
      return createPhotoButton(`images/flip-renovation/before/before-${number}.jpeg`, `Flip renovation before photo ${index + 1}`);
    }).join("");
  }

  if (flipAfterContainer) {
    flipAfterContainer.innerHTML = Array.from({ length: 20 }, (_, index) => {
      const number = String(index + 1).padStart(2, "0");
      return createPhotoButton(`images/flip-renovation/after/before-${number}.jpeg`, `Flip renovation after photo ${index + 1}`);
    }).join("");
  }

  if (portfolioCardsContainer) {
    portfolioCardsContainer.innerHTML = Object.entries(portfolioProjects).map(([projectKey, project]) => `
      <button class="portfolio-card reveal" type="button" data-project="${projectKey}">
        <img src="${project.preview}" alt="${project.title} preview" />
        <span class="portfolio-card-content"><h3>${project.title}</h3><p>${project.type}</p></span>
      </button>`).join("");
  }

  /* -----------------------------
     Reveal-on-scroll animation
  ----------------------------- */

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

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
        const cardCategories = card.dataset.category || "";
        const shouldShow = selectedFilter === "all" || cardCategories.split(" ").includes(selectedFilter);
        card.style.display = shouldShow ? "block" : "none";
      });
    });
  });

  /* -----------------------------
     Before/after comparison sliders
  ----------------------------- */

  const beforeAfterSliders = document.querySelectorAll("[data-slider]");

  beforeAfterSliders.forEach((slider) => {
    const rangeInput = slider.querySelector(".slider-range");
    const afterImageWrap = slider.querySelector(".after-image-wrap");
    const afterImage = slider.querySelector(".after-image");
    if (!rangeInput || !afterImageWrap || !afterImage) return;

    const updateSlider = () => {
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
  if (lightbox) lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });

  /* -----------------------------
     Portfolio carousel modal
  ----------------------------- */

  const portfolioModal = document.querySelector("#portfolioModal");
  const portfolioModalClose = document.querySelector(".portfolio-modal-close");
  const portfolioCarouselImage = document.querySelector("#portfolioCarouselImage");
  const portfolioModalType = document.querySelector("#portfolioModalType");
  const portfolioModalTitle = document.querySelector("#portfolioModalTitle");
  const portfolioModalDescription = document.querySelector("#portfolioModalDescription");
  const portfolioModalTags = document.querySelector("#portfolioModalTags");
  const portfolioCarouselCount = document.querySelector("#portfolioCarouselCount");
  const portfolioPrevButton = document.querySelector(".carousel-prev");
  const portfolioNextButton = document.querySelector(".carousel-next");
  let activePortfolioProject = null;
  let activePortfolioIndex = 0;

  const updatePortfolioCarousel = () => {
    if (!activePortfolioProject || !portfolioCarouselImage || !portfolioCarouselCount) return;
    const imagePath = activePortfolioProject.images[activePortfolioIndex];
    portfolioCarouselImage.src = imagePath;
    portfolioCarouselImage.alt = `${activePortfolioProject.title} photo ${activePortfolioIndex + 1}`;
    portfolioCarouselCount.textContent = `${activePortfolioIndex + 1} / ${activePortfolioProject.images.length}`;
  };

  const openPortfolioModal = (projectKey) => {
    const project = portfolioProjects[projectKey];
    if (!project || !portfolioModal) return;
    activePortfolioProject = project;
    activePortfolioIndex = 0;
    if (portfolioModalType) portfolioModalType.textContent = project.type;
    if (portfolioModalTitle) portfolioModalTitle.textContent = project.title;
    if (portfolioModalDescription) portfolioModalDescription.textContent = project.description;
    if (portfolioModalTags) portfolioModalTags.innerHTML = createTagList(project.tags);
    updatePortfolioCarousel();
    portfolioModal.classList.add("open");
    portfolioModal.setAttribute("aria-hidden", "false");
  };

  const closePortfolioModal = () => {
    if (!portfolioModal || !portfolioCarouselImage) return;
    portfolioModal.classList.remove("open");
    portfolioModal.setAttribute("aria-hidden", "true");
    portfolioCarouselImage.src = "";
    activePortfolioProject = null;
    activePortfolioIndex = 0;
  };

  document.querySelectorAll(".portfolio-card").forEach((card) => card.addEventListener("click", () => openPortfolioModal(card.dataset.project)));
  if (portfolioModalClose) portfolioModalClose.addEventListener("click", closePortfolioModal);
  if (portfolioModal) portfolioModal.addEventListener("click", (event) => { if (event.target === portfolioModal) closePortfolioModal(); });

  if (portfolioPrevButton) {
    portfolioPrevButton.addEventListener("click", () => {
      if (!activePortfolioProject) return;
      activePortfolioIndex = (activePortfolioIndex - 1 + activePortfolioProject.images.length) % activePortfolioProject.images.length;
      updatePortfolioCarousel();
    });
  }

  if (portfolioNextButton) {
    portfolioNextButton.addEventListener("click", () => {
      if (!activePortfolioProject) return;
      activePortfolioIndex = (activePortfolioIndex + 1) % activePortfolioProject.images.length;
      updatePortfolioCarousel();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closePortfolioModal();
    }
    if (!activePortfolioProject) return;
    if (event.key === "ArrowLeft") {
      activePortfolioIndex = (activePortfolioIndex - 1 + activePortfolioProject.images.length) % activePortfolioProject.images.length;
      updatePortfolioCarousel();
    }
    if (event.key === "ArrowRight") {
      activePortfolioIndex = (activePortfolioIndex + 1) % activePortfolioProject.images.length;
      updatePortfolioCarousel();
    }
  });

  /* -----------------------------
     Contact form project prefill
  ----------------------------- */

  const serviceSelect = document.querySelector("#service");
  const messageField = document.querySelector("#message");

  if (serviceSelect) {
    const projectTemplates = {
      "move-in": "Hi Rocky Oak,\n\nI'm interested in learning more about your Move-In & Home Setup service.\n\nProject Details:",
      "styling": "Hi Rocky Oak,\n\nI'm interested in learning more about your Interior Styling & Refresh service.\n\nProject Details:",
      "room-design": "Hi Rocky Oak,\n\nI'm interested in learning more about your Room Design service.\n\nProject Details:",
      "sourcing": "Hi Rocky Oak,\n\nI'm interested in learning more about your Furniture & Decor Selection service.\n\nProject Details:",
      "installation": "Hi Rocky Oak,\n\nI'm interested in learning more about your Installation & Handyman Services.\n\nProject Details:",
      "painting-wallpaper": "Hi Rocky Oak,\n\nI'm interested in learning more about your Painting & Wallpaper service.\n\nProject Details:",
      "complete-home": "Hi Rocky Oak,\n\nI'm interested in learning more about the Rocky Oak Complete Home Package.\n\nProject Details:",
    };

    const selectedProject = new URLSearchParams(window.location.search).get("project");
    if (selectedProject && projectTemplates[selectedProject]) {
      serviceSelect.value = selectedProject;
      if (messageField && !messageField.value.trim()) messageField.value = projectTemplates[selectedProject];
    }
  }

  /* -----------------------------
     Contact form validation
  ----------------------------- */

  const contactForm = document.querySelector("#contactForm");
  const formMessage = document.querySelector("#formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
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
