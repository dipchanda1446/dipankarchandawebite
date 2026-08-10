/* ============================================================
   blog.js — renders blog list from data/blog.json with search
   and category filtering, plus a simple in-page article view
   (no separate HTML file needed per post).
   ============================================================ */

(function () {
  let allPosts = [];

  function formatDate(d) {
    try {
      return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return d;
    }
  }

  function postCard(p) {
    return `
      <div class="card reveal">
        <span class="tag tag-accent" style="margin-bottom:12px; display:inline-flex;">${escapeHTML(p.category)}</span>
        <h3>${escapeHTML(p.title)}</h3>
        <p class="meta" style="color:var(--text-faint); font-size:0.82rem;">${formatDate(p.date)}</p>
        <p>${escapeHTML(p.excerpt)}</p>
        <div class="tag-row" style="margin-bottom:16px;">
          ${(p.tags || []).map((t) => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        <button class="btn btn-ghost btn-sm" data-open-post="${p.id}">Read Article</button>
      </div>`;
  }

  function render(list) {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    if (!list.length) {
      renderEmpty(grid, 'No articles match your search yet.');
      return;
    }
    grid.innerHTML = list.map(postCard).join('');
    grid.querySelectorAll('[data-open-post]').forEach((btn) => {
      btn.addEventListener('click', () => openArticle(Number(btn.dataset.openPost)));
    });
  }

  function openArticle(id) {
    const post = allPosts.find((p) => p.id === id);
    const modalRoot = document.getElementById('article-view');
    const listRoot = document.getElementById('blog-list-view');
    if (!post || !modalRoot) return;
    modalRoot.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="back-to-blog" style="margin-bottom:24px;">&larr; Back to all articles</button>
      <span class="tag tag-accent" style="margin-bottom:14px; display:inline-flex;">${escapeHTML(post.category)}</span>
      <h1 style="font-size:clamp(1.8rem,4vw,2.6rem);">${escapeHTML(post.title)}</h1>
      <p class="meta" style="color:var(--text-faint); margin-bottom:28px;">${formatDate(post.date)}</p>
      <div class="article-body" style="max-width:720px; font-size:1.02rem; line-height:1.8;">${post.content}</div>
      <div class="tag-row" style="margin-top:28px;">${(post.tags || []).map((t) => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>
    `;
    modalRoot.style.display = 'block';
    listRoot.style.display = 'none';
    document.getElementById('back-to-blog').addEventListener('click', closeArticle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeArticle() {
    document.getElementById('article-view').style.display = 'none';
    document.getElementById('blog-list-view').style.display = 'block';
  }

  function applyFilters() {
    const q = (document.getElementById('blog-search').value || '').toLowerCase();
    const cat = document.getElementById('blog-filter-category').value;
    const filtered = allPosts.filter((p) => {
      if (!p.published) return false;
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || (p.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesCat = cat === 'all' || p.category === cat;
      return matchesQuery && matchesCat;
    });
    render(filtered);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    const data = await loadJSON('data/blog.json');
    if (data === null) {
      renderError(grid);
      return;
    }
    allPosts = data;
    const catSel = document.getElementById('blog-filter-category');
    const cats = ['all', ...new Set(allPosts.map((p) => p.category))];
    catSel.innerHTML = cats.map((c) => `<option value="${c}">${c === 'all' ? 'All Categories' : c}</option>`).join('');
    catSel.addEventListener('change', applyFilters);
    document.getElementById('blog-search').addEventListener('input', applyFilters);
    applyFilters();
  });
})();
