/* ============================================================
   theme.js — dark/light mode with localStorage persistence.
   Respects system preference when the visitor hasn't chosen yet.
   Exposes window.DCTheme so components.js can wire up the
   toggle button after it injects the header.
   ============================================================ */

(function () {
  const STORAGE_KEY = 'dc-theme';

  const ICONS = {
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
  };

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function updateIcons(theme) {
    document.querySelectorAll('[data-theme-icon]').forEach((btn) => {
      btn.innerHTML = theme === 'light' ? ICONS.moon : ICONS.sun;
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateIcons(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Attach the click handler to every [data-theme-toggle] currently in the DOM.
  // Safe to call again after components.js injects the header (buttons are fresh, no duplicate binding).
  function attach() {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = 'true';
      btn.addEventListener('click', toggleTheme);
    });
    updateIcons(document.documentElement.getAttribute('data-theme') || getPreferredTheme());
  }

  // Apply immediately (before paint where possible) to avoid a flash of wrong theme.
  applyTheme(getPreferredTheme());

  window.DCTheme = { attach, applyTheme, getPreferredTheme };

  document.addEventListener('DOMContentLoaded', attach);
})();
