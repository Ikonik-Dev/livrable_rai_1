// ═══════════════════════════════════════════
//  AUXILIA — Portail Formation IA 2026
//  app.js — SPA Hash Router
// ═══════════════════════════════════════════

(function () {
  const VALID_VIEWS = ["portal", "livrable-1", "livrable-2", "livrable-3"];

  function navigate(rawHash) {
    const viewId = (rawHash || "").replace(/^#/, "") || "portal";
    const targetId = VALID_VIEWS.includes(viewId) ? viewId : "portal";

    console.log("[Router] → navigate:", targetId);

    // Masquer toutes les vues (inline style = priorité absolue sur le CSS)
    VALID_VIEWS.forEach(function (id) {
      const el = document.getElementById("view-" + id);
      if (el) el.style.display = "none";
    });

    // Afficher la vue cible
    const target = document.getElementById("view-" + targetId);
    if (target) {
      target.style.display = "block";
    } else {
      console.error("[Router] ❌ Vue introuvable: view-" + targetId);
    }

    // Mettre à jour l'état actif de la nav
    document.querySelectorAll(".nav-link[href]").forEach(function (link) {
      const linkId = link.getAttribute("href").replace(/^#/, "");
      link.classList.toggle("active", linkId === targetId);
    });

    // Initialiser les modules de la vue
    if (targetId === "portal") {
      // Déclencher les animations reveal des cards du portail
      if (target) {
        target.querySelectorAll(".reveal:not(.visible)").forEach(function (el) {
          el.classList.add("visible");
        });
      }
    }

    if (targetId === "livrable-1") {
      if (window.Livrable1 && typeof window.Livrable1.init === "function") {
        window.Livrable1.init();
      } else {
        console.warn("[Router] window.Livrable1 introuvable");
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Écouter les changements de hash
  window.addEventListener("hashchange", function () {
    navigate(window.location.hash);
  });

  // Navigation initiale — scripts en bas de body : DOM déjà prêt
  navigate(window.location.hash || "#portal");

  console.log(
    "%c🤖 AUXILIA — Portail Formation IA 2026 chargé",
    "background:#6366f1;color:#fff;padding:6px 12px;border-radius:8px;font-weight:bold;",
  );
})();
