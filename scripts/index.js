'use strict'

const headerCityButton = document.querySelector('.header__city-button')
console.log('headerCityButton: ', headerCityButton);

// проверяем есть ли ключ с локалсторедж
// if (localStorage.getItem('lomoda-location')) {
//     headerCityButton.textContent = localStorage.getItem('lomoda-location')
// }

// алтернатива
headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город'


headerCityButton.addEventListener('click', () => {
    
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
    
});

// блокировка скролла(МОЖНО ИСПОЛЬЗОВАТЬ В ЛЮБОЙ ФУНКЦИИ)

const disabledScroll = () => {
    // вычитаем скролл
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
    position: fixed;
    width: 100%;
    height: 100vh;
    top: ${ -window.scrollY }px;
    overflow: hidden;
    padding-right: ${widthScroll}px
    `
}

const enabledScroll = () => {
    document.body.style.cssText = ``;
    window.scroll({
        top: document.body.dbScrollY
    })
    
}

// модальное окно

const subheaderCart = document.querySelector('.subheader__cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cart = document.querySelector('.cart')
console.log('cartOverlay: ', cartOverlay);

subheaderCart.addEventListener('click', ()=>{
    cartOverlay.classList.add('cart-overlay-open')
    disabledScroll()
})

cartOverlay.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
    if (target.classList.contains('cart__btn-close') || !target.closest('.cart')){
        cartOverlay.classList.remove('cart-overlay-open')
        enabledScroll()
    }
    
})

