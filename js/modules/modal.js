 //modal
function modal (){
    const openTrigger = document.querySelectorAll('[data-modal]');
    
 const windowModal = document.querySelector('.modal');

 function openModal() {
     windowModal.style.display = 'block';
         document.body.style.overflow = 'hidden';
         clearInterval(modaltimerId);
 }
 openTrigger.forEach( btn => {
     btn.addEventListener('click', openModal);
 });

 function closeModal (){
     windowModal.style.display = 'none';
     document.body.style.overflow = '';
 }



 windowModal.addEventListener('click', (event) =>{
     if(event.target === windowModal || event.target.getAttribute('data-close') == ""){
         closeModal ();
     }
 });
 
 document.addEventListener('keydown', (event) =>{
     if(event.code === "Escape"){
         closeModal();
     }
 });

 const modaltimerId = setInterval(openModal, 5000);


 function showModalByScroll (){
     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
     openModal();
     window.removeEventListener('scroll',showModalByScroll) ;
    }
 }
 window.addEventListener('scroll',showModalByScroll) ;
}
module.exports  = modal;