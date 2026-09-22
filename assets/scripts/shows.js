(function () {
  const modal = document.getElementById('showModal');
  const preview = document.getElementById('showPreview');
  const title = document.getElementById('showModalTitle');
  const category = document.getElementById('showModalCategory');
  const status = document.getElementById('showModalStatus');
  const closeButton = modal ? modal.querySelector('.show-close') : null;
  const backdrop = modal ? modal.querySelector('.show-backdrop') : null;
  const notifyLink = document.getElementById('showNotifyLink');
  let lastTrigger = null;

  function openShow(trigger) {
    if (!modal) return;
    lastTrigger = trigger;
    title.textContent = trigger.dataset.title || 'SAATAACK 50 Original';
    category.textContent = trigger.dataset.category || 'Original show';
    status.textContent = trigger.dataset.status || 'Coming soon';
    const poster = trigger.dataset.poster || 'assets/images/saataack-hero.webp';
    preview.style.backgroundImage = `url("${poster}")`;
    modal.hidden = false;
    document.body.classList.add('show-open');
    closeButton.focus();
  }

  function closeShow(restoreFocus) {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('show-open');
    if (restoreFocus !== false && lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('[data-show]').forEach((trigger) => {
    trigger.addEventListener('click', () => openShow(trigger));
  });
  if (closeButton) closeButton.addEventListener('click', () => closeShow(true));
  if (backdrop) backdrop.addEventListener('click', () => closeShow(true));
  if (notifyLink) notifyLink.addEventListener('click', () => closeShow(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeShow(true);
  });

  const filterButtons = [...document.querySelectorAll('.show-filters button')];
  const cards = [...document.querySelectorAll('.show-card')];
  const emptyState = document.getElementById('showEmpty');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visible = 0;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      cards.forEach((card) => {
        const types = (card.dataset.type || '').split(' ');
        card.hidden = filter !== 'all' && !types.includes(filter);
        if (!card.hidden) visible += 1;
      });
      if (emptyState) emptyState.hidden = visible !== 0;
    });
  });

  const notifyForm = document.getElementById('showsNotifyForm');
  if (notifyForm) {
    notifyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('notifyName').value.trim();
      const response = document.getElementById('showsNotifyResponse');
      response.textContent = `${name || 'You'} will receive official SAATAACK 50 show alerts.`;
      notifyForm.querySelector('button[type="submit"]').textContent = 'Notifications enabled';
    });
  }
})();
