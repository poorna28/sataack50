lucide.createIcons();

const modal = document.getElementById('registerModal');
document.querySelectorAll('.open-register').forEach(b => b.addEventListener('click', e => { e.preventDefault(); modal.classList.add('open'); document.body.style.overflow = 'hidden' }));
function closeModal() { 
    modal.classList.remove('open');
    document.body.style.overflow = ''
}
modal.querySelector('.close').addEventListener('click', closeModal);
 modal.addEventListener('click', e => { if (e.target === modal) closeModal() }); 
 document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() });
const drawer = document.getElementById('mobileDrawer'); 
document.querySelector('.menu').addEventListener('click', () => { drawer.classList.add('open');
     document.body.style.overflow = 'hidden' }); 
     drawer.querySelector('.drawer-close').addEventListener('click', () => { drawer.classList.remove('open'); 
        document.body.style.overflow = '' });
         drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { drawer.classList.remove('open'); 
            document.body.style.overflow = '' }));
document.getElementById('trialForm').addEventListener('submit', e => { e.preventDefault(); 
    const panel = modal.querySelector('.modal-panel'); 
    panel.innerHTML = '<p class="eyebrow">Interest registered</p><h2 class="display display-md">You\'re on the list.</h2><p class="lead">We will notify you when trial registration opens for your selected city.</p><button class="btn btn-dark" onclick="location.reload()">Done</button>' });
const revealItems = document.querySelectorAll('.section .wrap>*:not(.path-grid):not(.impact-grid):not(.team-rail):not(.media-rail):not(.news-grid),.path-step,.impact,.team-card,.media-card,.news-card,.stage-copy>*');
revealItems.forEach((item, index) => { item.dataset.reveal = ''; item.style.transitionDelay = `${Math.min(index % 5, 4) * 55}ms` });
if ('IntersectionObserver' in window) { const revealObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target) } }) }, { threshold: .12, rootMargin: '0px 0px -35px' }); revealItems.forEach(item => revealObserver.observe(item)) } else { revealItems.forEach(item => item.classList.add('is-visible')) }
const trialUpdates = { all: [['MUMBAI TRIAL REGISTRATION IS OPEN', 'Official player entries are now being accepted.', 'OPEN'], ['JAMMU EARLY-ACCESS LIST IS LIVE', 'Registered players will receive the city announcement first.', 'JOIN'], ['AHMEDABAD TRIAL DATE ANNOUNCEMENT', 'Venue and registration window will be published soon.', 'SOON'], ['DELHI TRIAL UPDATE', 'Trial details and registration information will be shared soon.', 'SOON']], registration: [['MUMBAI TRIAL REGISTRATION IS OPEN', 'Official player entries are now being accepted.', 'OPEN'], ['JAMMU EARLY-ACCESS LIST IS LIVE', 'Registered players will receive the city announcement first.', 'JOIN'], ['AHMEDABAD TRIAL DATE ANNOUNCEMENT', 'Venue and registration window will be published soon.', 'SOON']], selection: [['WHAT TRIALS WILL EVALUATE', 'Batting, bowling, fielding, awareness and role fit.', 'WATCH'], ['HOW TRIAL RANKINGS WILL WORK', 'See how evaluation moves players towards the qualified pool.', 'READ'], ['FROM PLAYER POOL TO TEAM SELECTION', 'Understand the final pathway before season one.', 'WATCH']] };
document.querySelectorAll('[data-update]').forEach(t => t.addEventListener('click', () => { document.querySelectorAll('[data-update]').forEach(x => x.classList.remove('active')); t.classList.add('active'); document.getElementById('trialUpdates').innerHTML = trialUpdates[t.dataset.update].map((x, i) => `<div class="leader"><span class="rank">0${i + 1}</span><div><strong>${x[0]}</strong><small>${x[1]}</small></div><span class="value">${x[2]}</span></div>`).join('') }));
document.querySelectorAll('.slider-control').forEach(button => {
    const rail = document.getElementById(button.dataset.sliderTarget);
    if (!rail) return;
    const controls = document.querySelectorAll(`[data-slider-target="${button.dataset.sliderTarget}"]`);
    const updateControls = () => {
        const maxScroll = rail.scrollWidth - rail.clientWidth - 1;
        controls.forEach(control => { control.disabled = control.dataset.sliderDirection === 'prev' ? rail.scrollLeft <= 1 : rail.scrollLeft >= maxScroll });
    };
    button.addEventListener('click', () => {
        const card = rail.firstElementChild;
        const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
        const distance = card ? card.getBoundingClientRect().width + gap : rail.clientWidth;
        rail.scrollBy({ left: button.dataset.sliderDirection === 'prev' ? -distance : distance, behavior: 'smooth' });
    });
    rail.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    updateControls();
});
