document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  const search = document.getElementById('searchInput');
  const category = document.getElementById('categoryFilter');
  const rows = [...document.querySelectorAll('.event-row')];
  const resultCount = document.getElementById('resultCount');
  const noResults = document.getElementById('noResults');
  function filterEvents() {
    if (!rows.length) return;
    const term = (search?.value || '').trim().toLowerCase();
    const selected = category?.value || 'all';
    let visible = 0;
    rows.forEach(row => {
      const matchesText = (row.dataset.search || '').includes(term);
      const matchesCategory = selected === 'all' || row.dataset.category === selected;
      const show = matchesText && matchesCategory;
      row.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    if (resultCount) resultCount.textContent = `${visible} event${visible === 1 ? '' : 's'} found`;
    if (noResults) noResults.classList.toggle('hidden', visible !== 0);
  }
  search?.addEventListener('input', filterEvents);
  category?.addEventListener('change', filterEvents);
  filterEvents();

  const toast = document.getElementById('toast');
  document.querySelectorAll('.register-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (toast) {
        toast.textContent = `Interest noted for “${button.dataset.event}” (demo only; no registration was submitted).`;
        toast.classList.add('show');
        window.clearTimeout(window.__campusToastTimer);
        window.__campusToastTimer = window.setTimeout(() => toast.classList.remove('show'), 4200);
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('fullName')?.value.trim() || 'there';
    const status = document.getElementById('formStatus');
    if (status) status.textContent = `Thanks, ${name}! Your demo message was validated in this browser; nothing was sent to a server.`;
    contactForm.reset();
  });
});