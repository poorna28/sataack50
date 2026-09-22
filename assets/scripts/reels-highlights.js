(function () {
  const modal = document.getElementById('videoModal');
  const preview = document.getElementById('videoPreview');
  const title = document.getElementById('videoModalTitle');
  const category = document.getElementById('videoModalCategory');
  const closeButton = modal ? modal.querySelector('.video-close') : null;
  const backdrop = modal ? modal.querySelector('.video-backdrop') : null;
  let lastTrigger = null;

  function openVideo(trigger) {
    if (!modal) return;
    lastTrigger = trigger;
    title.textContent = trigger.dataset.title || 'SAATAACK 50 Explainer';
    category.textContent = trigger.dataset.category || 'Official explainer';
    const poster = trigger.dataset.poster || 'assets/images/saataack-hero.webp';
    preview.style.backgroundImage = `url("${poster}")`;
    modal.hidden = false;
    document.body.classList.add('video-open');
    closeButton.focus();
  }

  function closeVideo() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('video-open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('[data-video]').forEach((trigger) => {
    trigger.addEventListener('click', () => openVideo(trigger));
  });
  if (closeButton) closeButton.addEventListener('click', closeVideo);
  if (backdrop) backdrop.addEventListener('click', closeVideo);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeVideo();
  });

  const filterButtons = [...document.querySelectorAll('.video-filters button')];
  const cards = [...document.querySelectorAll('.video-card')];
  const search = document.getElementById('videoSearch');
  const empty = document.getElementById('videoEmpty');
  let activeFilter = 'all';

  function filterVideos() {
    const query = search ? search.value.trim().toLowerCase() : '';
    let visible = 0;
    cards.forEach((card) => {
      const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchMatch = !query || (card.dataset.search || '').includes(query);
      card.hidden = !(categoryMatch && searchMatch);
      if (!card.hidden) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      filterVideos();
    });
  });
  if (search) search.addEventListener('input', filterVideos);

  const playPlaylist = document.getElementById('playPlaylist');
  if (playPlaylist) {
    playPlaylist.addEventListener('click', () => {
      const firstVideo = document.querySelector('#playerPlaylist [data-video]');
      if (firstVideo) openVideo(firstVideo);
    });
  }
})();
