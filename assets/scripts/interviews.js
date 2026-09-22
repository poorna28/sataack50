(function () {
  const modal = document.getElementById('interviewModal');
  const preview = document.getElementById('interviewPreview');
  const title = document.getElementById('interviewModalTitle');
  const category = document.getElementById('interviewModalCategory');
  const status = document.getElementById('interviewModalStatus');
  const closeButton = modal ? modal.querySelector('.interview-close') : null;
  const backdrop = modal ? modal.querySelector('.interview-backdrop') : null;
  let lastTrigger = null;

  function openInterview(trigger) {
    if (!modal) return;
    lastTrigger = trigger;
    title.textContent = trigger.dataset.title || 'SAATAACK 50 Interview';
    category.textContent = trigger.dataset.category || 'Official conversation';
    status.textContent = trigger.dataset.status || 'Coming soon';
    const poster = trigger.dataset.poster || 'assets/images/saataack-hero.webp';
    preview.style.backgroundImage = `url("${poster}")`;
    modal.hidden = false;
    document.body.classList.add('interview-open');
    closeButton.focus();
  }

  function closeInterview() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('interview-open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('[data-interview]').forEach((trigger) => {
    trigger.addEventListener('click', () => openInterview(trigger));
  });
  if (closeButton) closeButton.addEventListener('click', closeInterview);
  if (backdrop) backdrop.addEventListener('click', closeInterview);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeInterview();
  });

  const filters = [...document.querySelectorAll('.interview-filters button')];
  const cards = [...document.querySelectorAll('.interview-card')];
  const search = document.getElementById('interviewSearch');
  const empty = document.getElementById('interviewEmpty');
  let activeFilter = 'all';

  function applyFilters() {
    const query = search ? search.value.trim().toLowerCase() : '';
    let visible = 0;
    cards.forEach((card) => {
      const filterMatch = activeFilter === 'all' || card.dataset.type === activeFilter;
      const searchMatch = !query || (card.dataset.search || '').includes(query);
      card.hidden = !(filterMatch && searchMatch);
      if (!card.hidden) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filters.forEach((item) => item.classList.toggle('active', item === button));
      applyFilters();
    });
  });
  if (search) search.addEventListener('input', applyFilters);

  const nominationForm = document.getElementById('nominationForm');
  if (nominationForm) {
    nominationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('nominatorName').value.trim();
      const response = document.getElementById('nominationResponse');
      response.textContent = `Thank you${name ? `, ${name}` : ''}. The nomination has been recorded for editorial review.`;
      nominationForm.querySelector('button[type="submit"]').textContent = 'Nomination submitted';
    });
  }
})();
