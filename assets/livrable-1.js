// ═══════════════════════════════════════════
//  AUXILIA — Livrable 1
//  livrable-1.js — Animations & interactions (scopées à #view-livrable-1)
// ═══════════════════════════════════════════

window.Livrable1 = (() => {
  let initialized = false;

  function init() {
    const root = document.getElementById("view-livrable-1");
    if (!root) return;

    if (!initialized) {
      setupTabs(root);
      setupTilt(root);
      setupTimeline(root);
      setupKeyboard(root);
      setupSession1Modal();
      initialized = true;
    }

    // Réinitialisations visuelles à chaque activation de la vue
    resetTabToFirst(root);
    animateCounters(root);
    revealElements(root);
    animateKPIBars(root);
  }

  // ── NAVIGATION PAR ONGLETS ──────────────
  function setupTabs(root) {
    const tabBtns = root.querySelectorAll(".tab-btn");
    const tabContents = root.querySelectorAll(".tab-content");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        root.querySelector(`#tab-${target}`).classList.add("active");
        setTimeout(() => {
          revealElements(root);
          animateKPIBars(root);
        }, 50);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  // ── ACCESSIBILITÉ CLAVIER ───────────────
  function setupKeyboard(root) {
    const tabBtns = Array.from(root.querySelectorAll(".tab-btn"));
    tabBtns.forEach((btn, i) => {
      btn.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          const next = tabBtns[(i + 1) % tabBtns.length];
          next.focus();
          next.click();
        }
        if (e.key === "ArrowLeft") {
          const prev = tabBtns[(i - 1 + tabBtns.length) % tabBtns.length];
          prev.focus();
          prev.click();
        }
      });
    });
  }

  // ── RESET ONGLET INITIAL ────────────────
  function resetTabToFirst(root) {
    const tabBtns = root.querySelectorAll(".tab-btn");
    const tabContents = root.querySelectorAll(".tab-content");
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    if (tabBtns[0]) tabBtns[0].classList.add("active");
    if (tabContents[0]) tabContents[0].classList.add("active");
  }

  // ── ANIMATION COMPTEURS ─────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const step = target / (1500 / 16);
    let current = 0;
    el.textContent = "0";
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  function animateCounters(root) {
    root.querySelectorAll(".stat-num[data-target]").forEach(animateCounter);
  }

  // ── RÉVÉLATION AU SCROLL ────────────────
  function revealElements(root) {
    const reveals = root.querySelectorAll(".reveal:not(.visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((el) => observer.observe(el));
  }

  // ── BARRES KPI ──────────────────────────
  function animateKPIBars(root) {
    root.querySelectorAll(".kpi-fill").forEach((bar) => {
      const fill = getComputedStyle(bar).getPropertyValue("--fill").trim();
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = fill;
      }, 200);
    });
  }

  // ── EFFET TILT GLASSMORPHISM ────────────
  function setupTilt(root) {
    root.querySelectorAll(".card, .stat-card, .kpi-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const rotateX =
          ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
        const rotateY =
          ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ── GLOW TIMELINE ───────────────────────
  function setupTimeline(root) {
    root.querySelectorAll(".timeline-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 0 40px rgba(99,102,241,0.2)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "";
      });
    });
  }

  // ── MODALE SESSION 1 ────────────────────
  function setupSession1Modal() {
    const openBtn = document.getElementById("s1-open-btn");
    const modal = document.getElementById("session1-modal");
    const closeBtn = document.getElementById("s1-modal-close");
    const overlay = document.getElementById("s1-modal-overlay");
    if (!openBtn || !modal) return;

    function openModal() {
      modal.hidden = false;
      document.body.classList.add("s1-modal-open");
      closeBtn && closeBtn.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("s1-modal-open");
      openBtn.focus();
    }

    openBtn.addEventListener("click", openModal);
    closeBtn && closeBtn.addEventListener("click", closeModal);
    overlay && overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  return { init };
})();
