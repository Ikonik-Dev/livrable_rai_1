// ═══════════════════════════════════════════
//  AUXILIA — Programme IA 2026
//  app.js — Interactions & animations
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── TAB NAVIGATION ──────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${target}`).classList.add('active');

      // Re-trigger reveals & KPI bars in newly shown tab
      setTimeout(() => {
        revealElements();
        animateKPIBars();
      }, 50);
    });
  });

  // ── COUNTER ANIMATION ────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  // Observe stat numbers
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(n => counterObserver.observe(n));

  // ── REVEAL ON SCROLL ─────────────────────
  function revealElements() {
    const reveals = document.querySelectorAll('.reveal:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
  }

  revealElements();

  // ── KPI BAR ANIMATION ────────────────────
  function animateKPIBars() {
    const bars = document.querySelectorAll('.kpi-fill');
    bars.forEach(bar => {
      const fill = getComputedStyle(bar).getPropertyValue('--fill').trim();
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = fill;
      }, 200);
    });
  }

  // ── GLASSMORPHISM TILT (cards) ────────────
  document.querySelectorAll('.card, .stat-card, .kpi-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── TIMELINE HOVER GLOW ───────────────────
  document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 0 40px rgba(99,102,241,0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });

  // ── ACTIVE TAB INIT ──────────────────────
  // Trigger KPI bars on first load if indicateurs tab is active
  animateKPIBars();

  // ── KEYBOARD NAV (accessibilité) ─────────
  tabBtns.forEach((btn, i) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        tabBtns[(i + 1) % tabBtns.length].focus();
        tabBtns[(i + 1) % tabBtns.length].click();
      }
      if (e.key === 'ArrowLeft') {
        tabBtns[(i - 1 + tabBtns.length) % tabBtns.length].focus();
        tabBtns[(i - 1 + tabBtns.length) % tabBtns.length].click();
      }
    });
  });

  // ── SMOOTH SCROLL TO TOP ON TAB CHANGE ───
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  console.log('%c🤖 AUXILIA — Programme IA 2026 chargé', 'background:#6366f1;color:#fff;padding:6px 12px;border-radius:8px;font-weight:bold;');
});
