/* ============================================================
   notes.js — powers the Notes & Resources page
   Reads data/notes.json, renders cards, supports live search
   and category/semester/subject filters. No backend required.
   ============================================================ */

(function () {
  let allNotes = [];

  function isPlaceholderLink(url) {
    return !url || url.startsWith('YOUR_');
  }

  function noteCard(note) {
    const disabled = isPlaceholderLink(note.url);
    return `
      <div class="card resource-card reveal">
        <div class="thumb">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
        </div>
        <div class="tag-row" style="margin-bottom:10px;">
          <span class="tag tag-accent">${escapeHTML(note.category)}</span>
          ${note.semester ? `<span class="tag">${escapeHTML(note.semester)}</span>` : ''}
        </div>
        <h3>${escapeHTML(note.title)}</h3>
        <p class="meta">${escapeHTML(note.subject)} &middot; ${escapeHTML(note.type)}</p>
        <p style="font-size:0.9rem;">${escapeHTML(note.description)}</p>
        <div class="actions">
          <a class="btn btn-primary btn-sm" ${disabled ? 'aria-disabled="true" tabindex="-1"' : `href="${escapeHTML(note.url)}" target="_blank" rel="noopener"`} ${disabled ? 'style="opacity:.45;pointer-events:none;"' : ''}>Open Resource</a>
        </div>
      </div>`;
  }

  function render(list) {
    const grid = document.getElementById('notes-grid');
    if (!grid) return;
    if (!list.length) {
      renderEmpty(grid, 'No notes match your search yet. Try a different keyword or filter.');
      return;
    }
    grid.innerHTML = list.map(noteCard).join('');
  }

  function applyFilters() {
    const q = (document.getElementById('note-search').value || '').toLowerCase();
    const cat = document.getElementById('filter-category').value;
    const sem = document.getElementById('filter-semester').value;

    const filtered = allNotes.filter((n) => {
      if (!n.published) return false;
      const matchesQuery =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.subject.toLowerCase().includes(q) ||
        (n.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesCat = cat === 'all' || n.category === cat;
      const matchesSem = sem === 'all' || n.semester === sem;
      return matchesQuery && matchesCat && matchesSem;
    });
    render(filtered);
  }

  function populateFilters() {
    const cats = ['all', ...new Set(allNotes.map((n) => n.category))];
    const sems = ['all', ...new Set(allNotes.map((n) => n.semester).filter(Boolean))];
    const catSel = document.getElementById('filter-category');
    const semSel = document.getElementById('filter-semester');
    catSel.innerHTML = cats.map((c) => `<option value="${c}">${c === 'all' ? 'All Categories' : c}</option>`).join('');
    semSel.innerHTML = sems.map((s) => `<option value="${s}">${s === 'all' ? 'All Semesters' : s}</option>`).join('');
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('notes-grid');
    if (!grid) return;
    const data = await loadJSON('data/notes.json');
    if (data === null) {
      renderError(grid);
      return;
    }
    allNotes = data;
    populateFilters();
    applyFilters();

    document.getElementById('note-search').addEventListener('input', applyFilters);
    document.getElementById('filter-category').addEventListener('change', applyFilters);
    document.getElementById('filter-semester').addEventListener('change', applyFilters);
  });
})();
