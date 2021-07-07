'use strict'

const headerCityButton = document.querySelector('.header__city-button')

// получаем хеш ссылки и обрезаем решетку
let hash = location.hash.substring(1)
const lincCategoryName = document.querySelectorAll('.navigation__link')
const navigationList = document.querySelector('.navigation__list')


lincCategoryName.forEach((link) => {
    link.addEventListener('click', () => {
        const goodsTitle = document.querySelector('.goods__title')
        goodsTitle.innerHTML = link.innerHTML;
    })
})

if (localStorage.getItem('lomoda-location')) {
    headerCityButton.textContent = localStorage.getItem('lomoda-location')
}

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
    if (document.disabledScroll) return;
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.disabledScroll = true;
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

// запрос базы данных

// async function getData() {
    // пример асинхронной функции через декларецшн
// }

const getData = async () => {
    // await запрещает присваивание п4ока не будут получены данные с серыера
    const data = await fetch('db.json');
    
    if (data.ok) {
        return data.json()
    } else {
        throw new Error(`данные не были получены`)
    }
};

const getGoods = (callback, value) => {
    getData()
        .then(data => {
            if (value) {
                callback(data.filter(item=> item.category === value))
            } else {
                callback(data);
            }
        })
        .catch(err => {
            console.log(err);
        });
};
    

try {
    const goodsList = document.querySelector('.goods__list');
    if (!goodsList) {
        throw 'this a not goods page'
    }
    
    const createCard = ({id, preview, cost, name, sizes, brand})=>{
        const li = document.createElement('li')

        li.classList.add('good__item')
        li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="">
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} ₽</p>
                    <h3 class="good__title">Eazyway <span class="good__title__grey">/ ${name}</span></h3>
                    
                    ${sizes ?
                        ` <p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` : ''
                    }
                    <a class="good__link" href="card-good.html#id56454">Подробнее</a>
                </div>
            </article>
        `;
        return li;
    }
        const renderGoodsList = data => {
            goodsList.textContent = ''

            data.forEach((item) => {
                const card = createCard(item)
                goodsList.append(card)
                
            })
            
    }
    
    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1)
        getGoods(renderGoodsList, hash)
    })
        getGoods(renderGoodsList, hash)
    
} catch (err) {
    console.log(err)
}

// getGoods((data) => {
//     console.log(data);
// })

subheaderCart.addEventListener('click', () => {
    cartOverlay.classList.add('cart-overlay-open')
    disabledScroll()
});

cartOverlay.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
    if (target.classList.contains('cart__btn-close') || !target.closest('.cart')) {
        cartOverlay.classList.remove('cart-overlay-open')
        enabledScroll()
    }
    
});