(() => {
  'use strict';

  const modal = document.querySelector('#articleModal');
  const title = document.querySelector('#articleModalTitle');
  const category = document.querySelector('#articleModalCategory');
  const status = document.querySelector('#articleModalStatus');
  const preview = document.querySelector('#articlePreview');
  const closeButton = modal?.querySelector('.article-close');
  let lastTrigger = null;

  const closeArticle = (restoreFocus = true) => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('news-modal-open');
    if (restoreFocus) lastTrigger?.focus();
  };

  const openArticle = (trigger) => {
    if (!modal) return;
    lastTrigger = trigger;
    title.textContent = trigger.dataset.title || 'Official SAATAACK 50 announcement';
    category.textContent = trigger.dataset.category || 'Official News';
    status.textContent = trigger.dataset.status || 'Publication pending';
    const poster = trigger.dataset.poster;
    preview.classList.toggle('has-image', Boolean(poster));
    preview.style.backgroundImage = poster ? `url("${poster}")` : '';
    modal.hidden = false;
    document.body.classList.add('news-modal-open');
    closeButton?.focus();
  };

  document.querySelectorAll('[data-article]').forEach((trigger) => {
    trigger.addEventListener('click', () => openArticle(trigger));
  });
  closeButton?.addEventListener('click', () => closeArticle());
  modal?.querySelector('.article-backdrop')?.addEventListener('click', () => closeArticle());
  document.querySelector('#articleAlertLink')?.addEventListener('click', () => closeArticle(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeArticle();
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const stories = [...document.querySelectorAll('.news-story')];
  const search = document.querySelector('#newsSearch');
  const empty = document.querySelector('#newsEmpty');
  let activeFilter = 'all';

  const filterStories = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    stories.forEach((story) => {
      const typeMatch = activeFilter === 'all' || story.dataset.type === activeFilter;
      const searchable = `${story.dataset.search || ''} ${story.textContent}`.toLowerCase();
      const searchMatch = !query || searchable.includes(query);
      story.hidden = !(typeMatch && searchMatch);
      if (!story.hidden) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filters.forEach((item) => item.classList.toggle('active', item === button));
      filterStories();
    });
  });
  search?.addEventListener('input', filterStories);

  const alertForm = document.querySelector('#newsAlertsForm');
  const response = document.querySelector('#newsAlertsResponse');
  alertForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#alertName')?.value.trim();
    if (response) response.textContent = `Thank you${name ? `, ${name}` : ''}. Your news-alert preferences have been recorded.`;
    alertForm.reset();
  });
})();
