const participantForm=document.getElementById('participantFilters');
const emptyState=document.getElementById('directoryEmpty');

participantForm.addEventListener('submit',event=>event.preventDefault());
participantForm.addEventListener('reset',()=>{
  window.setTimeout(()=>{
    emptyState.querySelector('h3').innerHTML='The first participants<br>are getting ready.';
    emptyState.querySelector('p:not(.eyebrow)').textContent='Verified profiles will appear here as trial registrations are confirmed. Until then, explore the official trials and take your own shot.';
  },0);
});

participantForm.addEventListener('input',()=>{
  const search=document.getElementById('participantSearch').value.trim();
  const city=document.getElementById('participantCity').selectedOptions[0].text;
  const role=document.getElementById('participantRole').selectedOptions[0].text;
  const status=document.getElementById('participantStatus').selectedOptions[0].text;
  const active=[search,city==='All cities'?'':city,role==='All roles'?'':role,status==='All statuses'?'':status].filter(Boolean);
  if(active.length){
    emptyState.querySelector('h3').innerHTML='No verified profiles<br>match yet.';
    emptyState.querySelector('p:not(.eyebrow)').textContent=`No public participant profiles currently match ${active.join(' · ')}. Profiles will appear as official registrations are verified.`;
  }else{
    emptyState.querySelector('h3').innerHTML='The first participants<br>are getting ready.';
    emptyState.querySelector('p:not(.eyebrow)').textContent='Verified profiles will appear here as trial registrations are confirmed. Until then, explore the official trials and take your own shot.';
  }
});

document.querySelectorAll('[data-role-link]').forEach(link=>link.addEventListener('click',()=>{
  document.getElementById('participantRole').value=link.dataset.roleLink;
  participantForm.dispatchEvent(new Event('input'));
}));

document.getElementById('profileLookup').addEventListener('submit',event=>{
  event.preventDefault();
  const value=document.getElementById('profileId').value.trim();
  const response=document.getElementById('profileResponse');
  response.textContent=value?`No live participant record is connected in this prototype. Profile lookup is ready for integration for “${value}”.`:'Enter your registered mobile number or Participant ID.';
});
