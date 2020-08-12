window.addEventListener('DOMContentLoaded', () => {
    //tabs
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

    //timer

    const deadline = '2020-09-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t /(1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / (1000 * 60 ) % 60)),
              seconds =Math.floor((t/1000 % 60));

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero (num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);


            updateClock();

            function updateClock () {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0){
                    clearInterval(timeInterval);
                }

            }
    }

    setClock('.timer', deadline);

    //modal

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



// Используем классы для карточек

    class MenuItem {
        constructor (src, alt, title, descr, price, parent, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parse = price;
            this.parentSelector = document.querySelector(parent);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.parse = this.parse * this.transfer;
        }

        rendet(){
            const element = document.createElement('div');

            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
               this.classes.forEach(className => element.classList.add(className));  
            }
            element.innerHTML = 
                `<img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.parse}</span> грн/день</div>
                </div>`;

            this.parentSelector.append(element);


        }
    } 
    
   

    getResource('http://localhost:3000/menu')
    .then(data =>{
        data.forEach(({ img, altimg, title, descr, price}) =>{
            new MenuItem(img, altimg, title, descr, price, ".menu .container").rendet();
        });
    });
    
  


        // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: "./img/form/spinner.svg",
        sucsses:"Спасибо! Скоро с вами  свяжутся",
        failure:"Что-то пошло не так"
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async(URL, data) => {
        const res =  await fetch( URL, {
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body: data
        });

        return await res.json();
    };

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

                openModal();

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
                    closeModal();
                }, 4000);
            } 
        });
        
    }

    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          sliderField = document.querySelector('.offer__slider-inner'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    
        if( slides.length < 10){
            total.textContent =`0${slides.length}`;
            current.textContent =`0${slideIndex}`;
        } else{
            total.textContent =slides.length;
            current.textContent =slideIndex;
        }

        sliderField.style.width = 100 *slides.length +'%';
        sliderField.style.display = "flex";
        sliderField.style.transition = '0.5s all';

        sliderWrapper.style.overflow = 'hidden';

        slides.forEach( slide => {
            slide.style.width = width;
        });

        slider.style.position ='relative';

        const indicator = document.createElement('ol');
        let dots = [];
        indicator.classList.add('carousel-indicators');
        indicator.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(indicator);

        for( let i = 0; i < slides.length; i++){
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i+1);
            dot.classList.add('dot');
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;

            if(i == 0){
                dot.style.opacity = 1;
            }

            indicator.append(dot);
            dots.push(dot);
        }

        next.addEventListener('click', () =>{
            if(offset == (+width.slice(0, width.length-2)*(slides.length-1))){
                offset = 0;
            }else{
                offset += +width.slice(0, width.length-2);
            }

            sliderField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == slides.length){
                slideIndex = 1;
            } else{
                slideIndex++;
            }

            if( slides.length < 10){
                current.textContent =`0${slideIndex}`;
            } else{
                current.textContent = slideIndex;
            }

            dots.forEach( dot => dot.style.opacity = '.5');
            dots[slideIndex -1].style.opacity = 1;
        });

        prev.addEventListener('click', () =>{
            if(offset == 0){
                offset = +width.slice(0, width.length-2)*(slides.length-1);
            }else{
                offset -= +width.slice(0, width.length-2);
            }

            sliderField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex == 1){
                slideIndex = slides.length;
            } else{
                slideIndex--;
            }

            if( slides.length < 10){
                current.textContent =`0${slideIndex}`;
            } else{
                current.textContent =slideIndex;
            }

            dots.forEach( dot => dot.style.opacity = '.5');
            dots[slideIndex -1].style.opacity = 1;
        });

        dots.forEach( dot =>{
                dot.addEventListener('click', (e) => {
                    const slideTo = e.target.getAttribute('data-slide-to');
        
                    slideIndex = slideTo;
                    offset = +width.slice(0, width.length - 2) * (slideTo - 1);
        
                    sliderField.style.transform = `translateX(-${offset}px)`;
        
                    if (slides.length < 10) {
                        current.textContent =  `0${slideIndex}`;
                    } else {
                        current.textContent =  slideIndex;
                    }
        
                    dots.forEach(dot => dot.style.opacity = ".5");
                    dots[slideIndex-1].style.opacity = 1;
                });
        });

        // Ease slider
    // showSlide(slideIndex);

    // if( slides.length < 10){
    //     total.textContent =`0${slides.length}`;
    // } else{
    //     total.textContent =slides.length;
    // }
    
    // function showSlide(n) {
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }

    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');
        
    //     slides[slideIndex - 1].style.display = 'block';

    //     if( slides.length < 10){
    //         current.textContent =`0${slideIndex}`;
    //     } else{
    //         current.textContent =slideIndex;
    //     }
    // }

    // function plusSlide(n){
    //     showSlide(slideIndex += n);
    // }

    // prev.addEventListener('click', () =>{
    //     plusSlide(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlide(1);
    // });
});