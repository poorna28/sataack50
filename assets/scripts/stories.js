(() => {
  'use strict';

  const form = document.querySelector('#storySubmissionForm');
  const response = document.querySelector('#storySubmissionResponse');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#storyAuthor')?.value.trim();
    if (response) response.textContent = `Thank you${name ? `, ${name}` : ''}. Your story has been recorded for editorial review.`;
    form.reset();
  });

  const progress = document.querySelector('#readingProgress');
  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0;
    progress.style.width = `${percent}%`;
  };
  if (progress) {
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  const copyButton = document.querySelector('#copyStoryLink');
  copyButton?.addEventListener('click', async () => {
    const label = copyButton.querySelector('span');
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (label) label.textContent = 'Story link copied';
    } catch {
      if (label) label.textContent = 'Copy unavailable';
    }
    window.setTimeout(() => { if (label) label.textContent = 'Copy story link'; }, 2200);
  });
})();
