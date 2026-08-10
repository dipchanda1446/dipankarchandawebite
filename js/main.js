/* ============================================================
   main.js — shared helpers used across pages:
   - loadJSON(): fetch a data/*.json file with friendly errors
   - escapeHTML(): keep JSON text safe when injected into markup
   - renderEmpty()/renderError(): consistent empty/error states
   ============================================================ */

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Could not load ' + path, err);
    return null;
  }
}

function escapeHTML(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderEmpty(container, message) {
  container.innerHTML = `
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/></svg>
      <p style="margin:0;">${message || 'Resources are currently being updated. Please check back soon.'}</p>
    </div>`;
}

function renderError(container, message) {
  container.innerHTML = `
    <div class="error-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
      <p style="margin:0;">${message || 'Unable to load this content right now. Please refresh the page or try again later.'}</p>
    </div>`;
}

// Note: this file intentionally holds only generic helpers.
// Page-specific rendering lives in notes.js / projects.js / journey.js / blog.js
