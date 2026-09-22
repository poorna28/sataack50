const updateSearch=document.getElementById('updateSearch');
const typeFilter=document.getElementById('typeFilter');
const cityFilter=document.getElementById('cityFilter');
const updateStories=[...document.querySelectorAll('.update-story')];
const updateCount=document.getElementById('updateCount');
const feedEmpty=document.getElementById('feedEmpty');

function filterUpdates(){
  const query=updateSearch.value.trim().toLowerCase();
  const type=typeFilter.value;
  const city=cityFilter.value;
  let visible=0;
  updateStories.forEach(story=>{
    const queryMatch=!query||story.dataset.search.includes(query);
    const typeMatch=type==='all'||story.dataset.type===type;
    const cityMatch=city==='all'||story.dataset.city===city||story.dataset.city==='all';
    const show=queryMatch&&typeMatch&&cityMatch;
    story.hidden=!show;
    if(show) visible++;
  });
  updateCount.textContent=visible;
  feedEmpty.hidden=visible!==0;
}

[updateSearch,typeFilter,cityFilter].forEach(control=>control.addEventListener('input',filterUpdates));
document.getElementById('updateFilters').addEventListener('reset',()=>window.setTimeout(filterUpdates,0));

const chartSets={
  pipeline:[['Announced','100%','3'],['Registration open','34%','1'],['Early access','67%','2'],['Trials completed','0%','0'],['Evaluation complete','0%','0']],
  cities:[['Mumbai','100%','Open'],['Jammu','55%','Early'],['Ahmedabad','0%','Soon'],['Delhi','0%','Soon']]
};
document.getElementById('chartView').addEventListener('change',event=>{
  document.getElementById('chartBars').innerHTML=chartSets[event.target.value].map(row=>`<div><span>${row[0]}</span><i style="--value:${row[1]}"></i><strong>${row[2]}</strong></div>`).join('');
});

document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{
  document.getElementById('mediaMessage').textContent=`“${button.dataset.video}” is ready for connection to the final video source.`;
}));

document.getElementById('archiveMore').addEventListener('click',()=>{
  document.getElementById('archiveMessage').textContent='More official updates will enter the archive as the Season 1 trial programme develops.';
});

document.getElementById('followForm').addEventListener('submit',event=>{
  event.preventDefault();
  const name=document.getElementById('followName').value.trim();
  document.getElementById('followResponse').textContent=`Thanks${name?`, ${name}`:''}. Your trial-update preferences have been saved in this prototype.`;
});
