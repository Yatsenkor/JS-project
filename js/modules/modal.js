 function openModal(modalSelector, modaltimerId) {
    const windowModal = document.querySelector(modalSelector);
    windowModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log(modaltimerId);
    if(modaltimerId){
    clearInterval(modaltimerId);    
    }
        
 }
 

 function closeModal (modalSelector){
    const windowModal = document.querySelector(modalSelector);
     windowModal.style.display = 'none';
     document.body.style.overflow = '';
 }
 //modal
function modal (triggerSelector, modalSelector, modaltimerId){
    const openTrigger = document.querySelectorAll(triggerSelector);
    
 const windowModal = document.querySelector(modalSelector);

 
    openTrigger.forEach( btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modaltimerId));
    });


 windowModal.addEventListener('click', (event) =>{
     if(event.target === windowModal || event.target.getAttribute('data-close') == ""){
         closeModal (modalSelector);
     }
 });
 
 document.addEventListener('keydown', (event) =>{
     if(event.code === "Escape"){
         closeModal(modalSelector);
     }
 });




 function showModalByScroll (){
     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
     openModal(modalSelector,modaltimerId);
     window.removeEventListener('scroll',showModalByScroll) ;
    }
 }
 window.addEventListener('scroll',showModalByScroll) ;
};

export default modal;
export {closeModal};
export {openModal};