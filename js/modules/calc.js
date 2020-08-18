 // Calc
function calc() {
        const result = document.querySelector('.calculating__result span');
    let sex,  
        height, weight, age, 
        retio;


        if (localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
        }else{
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }

        if (localStorage.getItem('retio')){
            retio = localStorage.getItem('retio');
        }else{
            retio = 1.375;
            localStorage.setItem('retio', 1.375);
        }

    function calcTotal (){
        if(!sex || !height || !weight || !age || !retio){
            result.textContent = '____';
            return;
        }    
        if(sex === "female"){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * retio);
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * retio);
        }    
    }

    calcTotal();

    function initLocalSetting(selector, classActive){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(classActive);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(classActive);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('retio')) {
                elem.classList.add(classActive);
            }
        });

    }

    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');


    function getStaticInformation( selector, classActive) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.addEventListener('click', (e) =>{
                if(e.target.getAttribute('data-ratio')){
                    retio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('retio', +e.target.getAttribute('data-ratio'));
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem =>{
                    elem.classList.remove(classActive);
                });
                e.target.classList.add(classActive);
                calcTotal();
            });
        }); 
        
        
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () =>{
            if (input.value.match(/\D/g)) {
                input.style.border = "2px solid red";
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')){
                case'height':
                height = +input.value;
                break;
                case'weight':
                weight = +input.value;
                break;
                case'age':
                age = +input.value;
                break;
            }
            calcTotal()
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

 
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