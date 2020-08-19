     import {closeModal, openModal} from "./modal";
     import { postData } from "../services/services";
     // Forms
function forms (modaltimerId){
     const forms = document.querySelectorAll('form');
     const message = {
         loading: "./img/form/spinner.svg",
         sucsses:"Спасибо! Скоро с вами  свяжутся",
         failure:"Что-то пошло не так"
     };
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
     
 
     async function getResource(URL){
             let res =  await fetch( URL);
 
             if(!res.ok){
                 throw new Error(`Could not fetch ${URL}, status: ${res.status}`);
             }
 
             return await res.json();
     };
 
     function bindPostData (form) {
         
         form.addEventListener('submit', (event) =>{
            event.preventDefault(); 
 
            let statusMessage = document.createElement('img');
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
             form.insertAdjacentElement('afterend', statusMessage);
             
           
            
             const formData = new FormData(form);
             
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
        
             
         postData(' http://localhost:3000/requests', json)
         .then( data => {
             console.log(data);
             showThanksModal(message.sucsses); 
             statusMessage.remove();
         }).catch(() =>{
         showThanksModal (message.failure); 
         }).finally(() =>{
             form.reset();
         });
 
             function showThanksModal(message){
                 const prevModalDialog = document.querySelector('.modal__dialog');
 
                 prevModalDialog.classList.add('hide');
 
                 openModal('.modal', modaltimerId);
 
                 const thankModal = document.createElement('div');
                 thankModal.classList.add('modal__dialog');
 
                 thankModal.innerHTML =`
                 <div class="modal__content">
                 <div data-close class="modal__close">&times;</div>
                 <div class="modal__title">${message}</div>
                 </div>
                 `;
 
                 document.querySelector('.modal').append(thankModal);
 
                 setTimeout(() =>{
                     thankModal.remove();
                     prevModalDialog.classList.add('show');
                      prevModalDialog.classList.remove('hide');
                     closeModal('.modal');
                 }, 4000);
             } 
         });
         
     }
};

export default forms;