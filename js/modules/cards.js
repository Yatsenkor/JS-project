// Используем классы для карточек
import { getResource } from "../services/services";

function cards (){
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
}
export default cards;