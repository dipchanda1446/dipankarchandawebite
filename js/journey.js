/* ============================================================
   journey.js — renders the D.El.Ed Journey timeline from
   data/journey.json, with category filtering.
   ============================================================ */

(function () {
  let allEntries = [];

  function formatDate(d) {
    try {
      return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return d;
    }
  }

  function entryItem(e) {
    const hasLink = e.link && !e.link.startsWith('YOUR_');
    return `
      <div class="timeline-item reveal">
        <span class="timeline-dot"></span>
        <div class="card">
          <div class="timeline-meta">${escapeHTML(e.category)} &middot; ${formatDate(e.date)}</div>
          <h3>${escapeHTML(e.title)}</h3>
          <p>${escapeHTML(e.description)}</p>
          ${hasLink ? `<a class="btn btn-ghost btn-sm" href="${escapeHTML(e.link)}" target="_blank" rel="noopener">View Resource</a>` : ''}
        </div>
      </div>`;
  }

  function render(list) {
    const wrap = document.getElementById('journey-timeline');
    if (!wrap) return;
    if (!list.length) {
      renderEmpty(wrap, 'No journey entries in this category yet.');
      return;
    }
    wrap.innerHTML = list.map(entryItem).join('');
  }

  function applyFilter() {
    const cat = document.getElementById('journey-filter').value;
    const filtered = allEntries.filter((e) => e.published && (cat === 'all' || e.category === cat));
    render(filtered);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const wrap = document.getElementById('journey-timeline');
    if (!wrap) return;
    const data = await loadJSON('data/journey.json');
    if (data === null) {
      renderError(wrap);
      return;
    }
    allEntries = data;
    const catSel = document.getElementById('journey-filter');
    const cats = ['all', ...new Set(allEntries.map((e) => e.category))];
    catSel.innerHTML = cats.map((c) => `<option value="${c}">${c === 'all' ? 'All Categories' : c}</option>`).join('');
    catSel.addEventListener('change', applyFilter);
    applyFilter();
  });
})();
