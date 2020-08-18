  //tabs
  function tabs (){
      const tabs = document.querySelectorAll('.tabheader__item');

  const tabsParant = document.querySelector('.tabheader__items');
 

  const tabsContent = document.querySelectorAll ('.tabcontent');

  function hideTabContent () {
      tabsContent.forEach(item => {
          item.style.display = 'none';
      });

      tabs.forEach (item => {
          item.classList.remove('tabheader__item_active');
      });
  }

  function showTabsContent (i = 0) {
      tabsContent[i].style.display = 'block';
      tabs[i].classList.add('tabheader__item_active');
  }
  
  hideTabContent ();
  showTabsContent ();


  tabsParant.addEventListener( 'click', (event) =>{
      const target = event.target;

      if (target && event.target.classList.contains('tabheader__item')){
          console.log('click')
          tabs.forEach((item, i) => {
              if (target == item){
                  hideTabContent();
                  showTabsContent(i);
              }
          });
      }
  });
  }
  module.exports  = tabs;
