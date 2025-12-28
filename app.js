/* Phase 1: keep existing behavior, just move it to a separate file */
(function () {
  "use strict";

  // Particles background
  if (typeof particlesJS === "function") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }

  // Toggle bio
  window.toggleBio = function toggleBio() {
    const bio = document.getElementById("bio");
    const arrow = document.getElementById("bio-arrow");
    if (!bio || !arrow) return;
    bio.classList.toggle("show");
    arrow.classList.toggle("rotate");

    // Accessibility: keep aria state in sync
    const btn = document.getElementById("bio-toggle-btn");
    if (btn) {
      const expanded = bio.classList.contains("show");
      btn.setAttribute("aria-expanded", String(expanded));
    }
  };

  // Service worker (optional)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => { /* ignore */ });
    });
  }
})();


/* Header & Footer loader */
async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url);
    el.innerHTML = await res.text();
  } catch (e) {
    console.warn("No se pudo cargar:", url);
  }
}

/* Marcar nav activo */
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll("[data-nav]").forEach(link => {
    if (path.includes(link.getAttribute("data-nav"))) {
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("#site-header", "/partials/header.html");
  await loadPartial("#site-footer", "/partials/footer.html");

  setActiveNav();

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
