const trialSearch=document.getElementById('trialSearch');
const statusFilter=document.getElementById('statusFilter');
const roleFilter=document.getElementById('roleFilter');
const trialCards=[...document.querySelectorAll('.trial-card')];
const resultCount=document.getElementById('resultCount');
const noResults=document.getElementById('noResults');

function filterTrials(){
  const query=trialSearch.value.trim().toLowerCase();
  const status=statusFilter.value;
  const role=roleFilter.value;
  let visible=0;
  trialCards.forEach(card=>{
    const matchesQuery=!query||card.dataset.city.includes(query);
    const matchesStatus=status==='all'||card.dataset.status===status;
    const matchesRole=role==='all'||card.dataset.roles.includes(role);
    const show=matchesQuery&&matchesStatus&&matchesRole;
    card.hidden=!show;
    if(show) visible++;
  });
  resultCount.textContent=visible;
  noResults.hidden=visible!==0;
}

[trialSearch,statusFilter,roleFilter].forEach(control=>control.addEventListener('input',filterTrials));

document.getElementById('locationButton').addEventListener('click',()=>{
  const button=document.getElementById('locationButton');
  if(!navigator.geolocation){button.firstChild.textContent='Location unavailable';return;}
  button.disabled=true;
  button.innerHTML='<span class="location-loader" aria-hidden="true"></span> Locating…';
  navigator.geolocation.getCurrentPosition(()=>{
    button.innerHTML='<i data-lucide="map-pin-check" class="icon" aria-hidden="true"></i> Location detected';
    button.disabled=false;
    lucide.createIcons();
  },()=>{
    button.innerHTML='<i data-lucide="map-pin-off" class="icon" aria-hidden="true"></i> Location unavailable';
    button.disabled=false;
    lucide.createIcons();
  },{timeout:5000});
});

document.querySelectorAll('[data-city-choice]').forEach(button=>button.addEventListener('click',()=>{
  const option=[...document.getElementById('city').options].find(item=>item.text===button.dataset.cityChoice);
  if(option) document.getElementById('city').value=option.value;
}));

const cityModal=document.getElementById('cityModal');
function closeCityModal(){cityModal.classList.remove('open');document.body.style.overflow=''}
document.querySelectorAll('.open-city-alert').forEach(button=>button.addEventListener('click',()=>{cityModal.classList.add('open');document.body.style.overflow='hidden'}));
cityModal.querySelector('.city-close').addEventListener('click',closeCityModal);
cityModal.addEventListener('click',event=>{if(event.target===cityModal) closeCityModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape') closeCityModal()});
document.getElementById('cityForm').addEventListener('submit',event=>{
  event.preventDefault();
  cityModal.querySelector('.modal-panel').innerHTML='<p class="eyebrow">Location saved</p><h2 class="display display-md">We\'ll keep watch.</h2><p class="lead">You will be notified when an official SAATAACK 50 trial is announced near your city.</p><button class="btn btn-dark city-done">Done</button>';
  cityModal.querySelector('.city-done').addEventListener('click',closeCityModal);
});

document.getElementById('statusForm').addEventListener('submit',event=>{
  event.preventDefault();
  const value=document.getElementById('applicationId').value.trim();
  document.getElementById('statusResponse').textContent=value?`No live record is connected in this prototype. Status lookup is ready for integration for “${value}”.`:'Enter your mobile number or application ID.';
});
