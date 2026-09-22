(function(){
  const filters=[...document.querySelectorAll('.team-filters button')];
  const cards=[...document.querySelectorAll('.identity-card')];
  filters.forEach(button=>button.addEventListener('click',()=>{
    filters.forEach(item=>item.classList.toggle('active',item===button));
    const filter=button.dataset.filter;
    cards.forEach(card=>card.hidden=filter!=='all'&&card.dataset.status!==filter);
  }));

  const form=document.getElementById('teamFollowForm');
  const teamPreference=document.getElementById('teamPreference');
  document.querySelectorAll('.follow-team').forEach(button=>button.addEventListener('click',()=>{
    const team=button.closest('.identity-card').dataset.team;
    const future=team.startsWith('Future Team');
    teamPreference.value=future?'Future team reveals':team;
    document.getElementById('follow').scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>document.getElementById('followName').focus({preventScroll:true}),450);
  }));

  if(form){form.addEventListener('submit',event=>{
    event.preventDefault();
    const response=document.getElementById('followResponse');
    response.textContent=`You are now following ${teamPreference.value}. Official updates will be sent after confirmation.`;
    form.querySelector('button[type="submit"]').textContent='Team followed';
  });}

  document.querySelectorAll('[data-media]').forEach(button=>button.addEventListener('click',()=>{
    const response=document.getElementById('mediaResponse');
    response.textContent=`${button.dataset.media} will appear here after its official release.`;
  }));
})();
