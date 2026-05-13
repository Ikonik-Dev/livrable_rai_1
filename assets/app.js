// ═══════════════════════════════════════════
//  AUXILIA — Portail Formation IA 2026
//  app.js — SPA Hash Router
// ═══════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".view");
  const navLinks = document.querySelectorAll(".nav-link[href]");
  const VALID_VIEWS = ["portal", "livrable-1", "livrable-2", "livrable-3"];

  function navigate(hash) {
    const viewId = hash.replace("#", "") || "portal";
    const targetId = VALID_VIEWS.includes(viewId) ? viewId : "portal";

    // Masquer toutes les vues
    views.forEach((v) => v.classList.remove("view-active"));

    // Mettre à jour l'état actif de la nav
    navLinks.forEach((link) => {
      const linkId = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", linkId === targetId);
    });

    // Afficher la vue cible
    const target = document.getElementById("view-" + targetId);
    if (target) target.classList.add("view-active");

    // Initialiser les modules de la vue
    if (targetId === "livrable-1" && window.Livrable1) {
      window.Livrable1.init();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Navigation initiale
  navigate(window.location.hash || "#portal");

  // Écouter les changements de hash (liens <a href="#..."> natifs)
  window.addEventListener("hashchange", () => navigate(window.location.hash));

  console.log(
    "%c🤖 AUXILIA — Portail Formation IA 2026 chargé",
    "background:#6366f1;color:#fff;padding:6px 12px;border-radius:8px;font-weight:bold;",
  );
});
