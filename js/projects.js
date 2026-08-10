/* ============================================================
   projects.js — reads data/projects.json and renders project cards
   ============================================================ */

(function () {
  function linkBtn(url, label) {
    const disabled = !url;
    return `<a class="btn btn-ghost btn-sm" ${disabled ? 'aria-disabled="true" tabindex="-1" style="opacity:.4;pointer-events:none;"' : `href="${escapeHTML(url)}" target="_blank" rel="noopener"`}>${label}</a>`;
  }

  function projectCard(p) {
    return `
      <div class="card reveal" style="grid-column: span 1;">
        <div class="tag-row" style="margin-bottom:14px;">
          ${p.featured ? '<span class="tag tag-accent">Featured</span>' : ''}
        </div>
        <h3>${escapeHTML(p.title)}</h3>
        <p>${escapeHTML(p.description)}</p>
        <div class="tag-row" style="margin: 16px 0;">
          ${(p.technologies || []).map((t) => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        <div class="actions" style="display:flex; gap:10px; flex-wrap:wrap;">
          ${linkBtn(p.github, 'GitHub')}
          ${linkBtn(p.demo, 'Live Demo')}
          ${linkBtn(p.documentation, 'Documentation')}
        </div>
      </div>`;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const data = await loadJSON('data/projects.json');
    if (data === null) {
      renderError(grid);
      return;
    }
    if (!data.length) {
      renderEmpty(grid, 'Projects are on the way. Please check back soon.');
      return;
    }
    grid.innerHTML = data.map(projectCard).join('');
  });
})();
