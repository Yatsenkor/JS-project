  //tabs
  function tabs (tabsSelector, tabsContentSelector, tabsParantSelector, activeClass){
      const tabs = document.querySelectorAll(tabsSelector);

  const tabsParant = document.querySelector(tabsContentSelector);
 

  const tabsContent = document.querySelectorAll (tabsParantSelector);

  function hideTabContent () {
      tabsContent.forEach(item => {
          item.style.display = 'none';
      });

      tabs.forEach (item => {
          item.classList.remove(activeClass);
      });
  }

  function showTabsContent (i = 0) {
      tabsContent[i].style.display = 'block';
      tabs[i].classList.add(activeClass);
  }
  
  hideTabContent ();
  showTabsContent ();


  tabsParant.addEventListener( 'click', (event) =>{
      const target = event.target;

      if (target && event.target.classList.contains(tabsSelector.slice(1))){
          console.log('click')
          tabs.forEach((item, i) => {
              if (target == item){
                  hideTabContent();
                  showTabsContent(i);
              }
          });
      }
  });
  };

  export default tabs;
