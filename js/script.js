window.addEventListener('DOMContentLoaded', () => {
  const   tabs = requier ('./modules/tabs');
  const  modal = requier ('./modules/modal');
  const  cards = requier ('./modules/cards');
  const   calc = requier ('./modules/calc');
  const slider = requier ('./modules/slider');
  const  forms = requier ('./modules/forms');
  const  timer = requier ('./modules/timer'); 
  
  tabs();
  modal();
  cards();
  calc();
  slider();
  forms();
  timer();   
});