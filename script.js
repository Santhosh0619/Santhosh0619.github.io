(function () {
  "use strict";

  /* ==========================================================================
     Theme Toggle
     ========================================================================== */

  const THEME_KEY = "portfolio-theme";
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    if (theme === "light") {
      htmlEl.setAttribute("data-theme", "light");
    } else {
      htmlEl.removeAttribute("data-theme");
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === "light" ? "light" : "dark");

  themeToggleBtn.addEventListener("click", function () {
    const isLight = htmlEl.getAttribute("data-theme") === "light";
    const nextTheme = isLight ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });

  /* ==========================================================================
     Hero Typing Effect
     ========================================================================== */

  const typingTextEl = document.getElementById("typing-text");
  const cursorEl = document.getElementById("cursor");
  const TAGLINE = "I Build Backends. I Automate with AI.";
  const TYPE_SPEED_MS = 60;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typeTagline() {
    if (prefersReducedMotion) {
      typingTextEl.textContent = TAGLINE;
      return;
    }
    let index = 0;
    function typeChar() {
      if (index <= TAGLINE.length) {
        typingTextEl.textContent = TAGLINE.slice(0, index);
        index++;
        setTimeout(typeChar, TYPE_SPEED_MS);
      }
    }
    typeChar();
  }

  typeTagline();

  /* ==========================================================================
     Scroll Reveal
     ========================================================================== */

  const revealEls = document.querySelectorAll(".reveal, .reveal-item, .section-heading, .profile-image-wrapper");

  if (prefersReducedMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("revealed");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ==========================================================================
     Skill Badge Stagger
     ========================================================================== */

  const skillsSection = document.getElementById("skills");
  const skillBadges = document.querySelectorAll(".skill-badge");

  if (prefersReducedMotion) {
    skillBadges.forEach(function (badge) {
      badge.classList.add("revealed");
    });
  } else {
    const skillsObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            skillBadges.forEach(function (badge, index) {
              setTimeout(function () {
                badge.classList.add("revealed");
              }, index * 50);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    skillsObserver.observe(skillsSection);
  }

  /* ==========================================================================
     Timeline Draw
     ========================================================================== */

  const timelineEl = document.getElementById("timeline");
  const timelineLineEl = document.getElementById("timeline-line");

  if (prefersReducedMotion) {
    timelineLineEl.classList.add("draw");
  } else {
    const timelineObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            timelineLineEl.classList.add("draw");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    timelineObserver.observe(timelineEl);
  }

  /* ==========================================================================
     Cursor Dot Trail
     ========================================================================== */

  if (window.matchMedia("(pointer: fine)").matches) {
    const cursorDot = document.getElementById("cursor-dot");
    const cursorTrail = document.getElementById("cursor-trail");
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
      cursorDot.classList.add("active");
      cursorTrail.classList.add("active");
    });

    document.addEventListener("mouseleave", function () {
      cursorDot.classList.remove("active");
      cursorTrail.classList.remove("active");
    });

    function animateTrail() {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      cursorTrail.style.left = trailX + "px";
      cursorTrail.style.top = trailY + "px";
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    const hoverTargets = document.querySelectorAll("a, button, .project-card, .cert-card, .skill-badge, .contact-card, input, textarea");
    hoverTargets.forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursorDot.classList.add("hovering"); });
      el.addEventListener("mouseleave", function () { cursorDot.classList.remove("hovering"); });
    });
  }

  /* ==========================================================================
     Nav Active Section Tracking
     ========================================================================== */

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ==========================================================================
     Mobile Hamburger Menu
     ========================================================================== */

  const hamburgerBtn = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function closeMobileNav() {
    mobileNav.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Open menu");
  }

  function openMobileNav() {
    mobileNav.classList.add("open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "Close menu");
  }

  hamburgerBtn.addEventListener("click", function () {
    if (mobileNav.classList.contains("open")) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileNavLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  /* ==========================================================================
     Certifications Expand/Collapse
     ========================================================================== */

  const viewAllBtn = document.getElementById("view-all-certs");
  const allCertsEl = document.getElementById("all-certs");

  viewAllBtn.addEventListener("click", function () {
    const isExpanded = allCertsEl.classList.toggle("expanded");
    viewAllBtn.setAttribute("aria-expanded", String(isExpanded));
    viewAllBtn.textContent = isExpanded ? "Hide All Certifications" : "View All Certifications";
  });

  /* ==========================================================================
     Scroll To Top
     ========================================================================== */

  const scrollTopBtn = document.getElementById("scroll-top-btn");
  const heroEl = document.getElementById("hero");

  window.addEventListener("scroll", function () {
    const heroHeight = heroEl.offsetHeight;
    if (window.scrollY > heroHeight) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ==========================================================================
     Project Card Hover Tilt
     ========================================================================== */

  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        card.style.transition = "none";
        card.style.transform = "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transition = "transform 0.5s ease";
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  /* ==========================================================================
     FAQ Accordion
     ========================================================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) {
      return;
    }

    question.addEventListener("click", function () {
      const isOpen = question.getAttribute("aria-expanded") === "true";

      faqItems.forEach(function (otherItem) {
        const otherQuestion = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (otherQuestion && otherAnswer && otherItem !== item) {
          otherQuestion.setAttribute("aria-expanded", "false");
          otherAnswer.classList.remove("open");
        }
      });

      question.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("open", !isOpen);
    });
  });
})();
