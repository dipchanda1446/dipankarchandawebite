/* ============================================================
   components.js — injects the shared header/nav and footer
   into every page, so nav + footer only need editing once.
   All project pages live at the site root, so links below
   use plain relative filenames (no folder prefixes needed).
   ============================================================ */

(function () {
  const NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'education.html', label: 'Education' },
    { href: 'journey.html', label: 'D.El.Ed Journey' },
    { href: 'notes.html', label: 'Notes' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'teaching.html', label: 'Teaching' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'contact.html', label: 'Contact' }
  ];

  const SOCIAL_ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9h3V5h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V9a1 1 0 0 1 1-1z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M12 11c1.5-2 4-2 4 1v4"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M11 10l4 2-4 2z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 20l1-5.5A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.5 9.5c0 4 3 6 6 6"/></svg>'
  };

  function currentFile() {
    const path = window.location.pathname.split('/').pop();
    return path === '' ? 'index.html' : path;
  }

  function buildHeader() {
    const current = currentFile();
    const links = NAV_LINKS.map(
      (l) => `<a href="${l.href}"${l.href === current ? ' class="active" aria-current="page"' : ''}>${l.label}</a>`
    ).join('');

    return `
    <div class="nav-inner">
      <a href="index.html" class="logo" aria-label="Dipankar Chanda home">
        <span class="logo-mark">DC</span>
        <span class="logo-text">Dipankar Chanda<small>Learning &middot; Teaching &middot; Creating</small></span>
      </a>
      <nav class="nav-links" aria-label="Primary">${links}</nav>
      <div class="nav-actions">
        <button class="icon-btn" data-theme-toggle data-theme-icon aria-label="Toggle theme"></button>
        <button class="icon-btn hamburger" data-drawer-open aria-label="Open menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>`;
  }

  function buildDrawer() {
    const current = currentFile();
    const links = NAV_LINKS.map(
      (l) => `<a href="${l.href}"${l.href === current ? ' class="active" aria-current="page"' : ''}>${l.label}</a>`
    ).join('');
    return `<div class="drawer-close">
        <button class="icon-btn" data-drawer-close aria-label="Close menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>${links}`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    const socials = [
      ['instagram', 'YOUR_INSTAGRAM_URL'],
      ['facebook', 'YOUR_FACEBOOK_URL'],
      ['linkedin', 'YOUR_LINKEDIN_URL'],
      ['youtube', 'YOUR_YOUTUBE_URL'],
      ['github', 'YOUR_GITHUB_URL'],
      ['telegram', 'YOUR_TELEGRAM_URL'],
      ['whatsapp', 'YOUR_WHATSAPP_URL']
    ]
      .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${key}">${SOCIAL_ICONS[key]}</a>`)
      .join('');

    return `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo" style="margin-bottom:14px;">
            <span class="logo-mark">DC</span>
            <span class="logo-text" style="color:#fff;">Dipankar Chanda</span>
          </div>
          <p>D.El.Ed Trainee &middot; Computer Science Graduate. Documenting a journey from learning to teaching, and sharing resources along the way.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="notes.html">Notes</a>
          <a href="projects.html">Projects</a>
          <a href="blog.html">Blog</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <div class="footer-social">${socials}</div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${year} Dipankar Chanda. All rights reserved.</span>
        <span>Built with HTML, CSS &amp; JavaScript &middot; Hosted on GitHub Pages</span>
      </div>
    </div>`;
  }

  function mount() {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if (headerEl) headerEl.innerHTML = buildHeader();
    if (footerEl) footerEl.innerHTML = buildFooter();

    // Mobile drawer
    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.id = 'nav-drawer';
    drawer.innerHTML = buildDrawer();
    document.body.appendChild(drawer);

    const backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.id = 'drawer-backdrop';
    document.body.appendChild(backdrop);

    function openDrawer() { drawer.classList.add('open'); backdrop.classList.add('open'); }
    function closeDrawer() { drawer.classList.remove('open'); backdrop.classList.remove('open'); }

    document.querySelectorAll('[data-drawer-open]').forEach((b) => b.addEventListener('click', openDrawer));
    document.querySelectorAll('[data-drawer-close]').forEach((b) => b.addEventListener('click', closeDrawer));
    backdrop.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));

    // Wire up the theme toggle button that just got injected into the header
    if (window.DCTheme) window.DCTheme.attach();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
