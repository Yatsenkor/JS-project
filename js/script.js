
import   tabs from './modules/tabs';
import  modal from './modules/modal';
import  cards from './modules/cards';
import   calc from './modules/calc';
import slider from './modules/slider';
import  forms from './modules/forms';
import  timer from './modules/timer'; 
import { openModal } from "./modules/modal";

window.addEventListener('DOMContentLoaded', () => {
  const modaltimerId = setInterval(() => openModal('.modal', modaltimerId ), 300000);
  
  tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
  modal('[data-modal]','.modal', modaltimerId);
  cards();
  calc();
  slider();
  forms(modaltimerId);
  timer();   
});