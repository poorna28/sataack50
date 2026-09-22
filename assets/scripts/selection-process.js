(function(){
  const roleContent={
    batter:[
      ['Contact quality','Timing, control and the ability to access scoring areas.'],
      ['Scoring intent','Boundary options, rotation and productive use of limited balls.'],
      ['Situation response','Shot selection, adaptability and decision-making under pressure.'],
      ['Repeatability','Consistency across multiple deliveries and changing conditions.']
    ],
    bowler:[
      ['Control','Line, length and the ability to execute an intended plan.'],
      ['Variation','Useful changes of pace, length, angle and release.'],
      ['Wicket threat','The ability to create dismissals rather than contain alone.'],
      ['Pressure execution','Accuracy and decision-making when the batter must attack.']
    ],
    allrounder:[
      ['Primary strength','A clearly demonstrated batting or bowling advantage.'],
      ['Second discipline','Credible value in the player’s supporting cricket role.'],
      ['Game influence','The ability to change the contest in more than one phase.'],
      ['Role clarity','Understanding when and how each skill should be used.']
    ],
    keeper:[
      ['Glovework','Clean collection, secure hands and control around the wicket.'],
      ['Movement','Footwork, balance and efficient positioning for each delivery.'],
      ['Reactions','Response time for edges, deflections and close chances.'],
      ['Communication','Awareness, clarity and contribution to field organisation.']
    ]
  };

  const tabs=document.querySelectorAll('.role-tab');
  const panel=document.getElementById('rolePanel');
  if(tabs.length&&panel){
    tabs.forEach(tab=>tab.addEventListener('click',()=>{
      tabs.forEach(item=>{item.classList.remove('active');item.setAttribute('aria-selected','false')});
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      panel.innerHTML=roleContent[tab.dataset.role].map((item,index)=>`<div><span>0${index+1}</span><strong>${item[0]}</strong><p>${item[1]}</p></div>`).join('');
    }));
  }
})();
