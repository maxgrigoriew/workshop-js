
toggleCheckbox = function () {
		const checkbox = document.querySelectorAll('.filter-check_checkbox');
		// const filter = document.querySelector('.filter');
		
		//  используем цикл форейч если несколько чекбоксов:
		checkbox.forEach((elem) => {
			elem.addEventListener('change', function () {
				if (this.checked) {
					this.nextElementSibling.classList.add('checked');
				} else {
					this.nextElementSibling.classList.remove('checked');
				}
			});
		});
		
		//  используем цикл  если несколько чекбоксов:
	// for (let i = 0; i < checkbox.length; i++){
	//     checkbox[i].addEventListener('change', function () {
	//         if (this.checked) {
	//             this.nextElementSibling.classList.add('checked');
	//         } else {
	//             this.nextElementSibling.classList.remove('checked');
	//         }
	//     });
	// };
		//  используем цикл форейч если один чекбокс:

	// filter.addEventListener('click', function(e){
	//     target = e.target;
	//     const label = target.closest('.filter-check_label');

	//     if (target.closest('.filter-check_checkbox')) {
	//     checkbox.checked
	//     } 
		
	// });
};

// загрузка данных с сервера (папка db)
getData = function () {
	const goodsWrapper = document.querySelector('.goods');
	return fetch('../db/db.json',).then((response) => {
		if (response.ok) {
			// console.log('response: ', response);
			// возвращаем массив данных
			return response.json();
		} else {										//сымитировали ошибку (например неправильный путь указать )
			throw new Error('данные не были получены ' + response.status)
		}
		// console.log('response: ', response);
	}).then(data => data)
		.catch((error) => {
		console.log('error: ', error);
		goodsWrapper.innerHTML = '<div style="margin: auto !important; color: red">Что то пошло не так</div>'
		});
	// console.log(fetch('../db/db.json'));
};

renderCetalog = function () {
	const cards = document.querySelectorAll('.goods .card');
	const catalogList = document.querySelector('.catalog-list');
	const catalogBtn = document.querySelector('.catalog-button');
	const catalog = document.querySelector('.catalog');
	const filterTitle = document.querySelector('.filter-title');
	const categoryes = new Set();
	
	cards.forEach((card) => {
		categoryes.add(card.dataset.category);
		
	});
	console.log('catalog: ', categoryes);
	
	categoryes.forEach((item) => {
		const li = document.createElement('li');
		li.textContent = item;
		catalogList.appendChild(li);
	});
	
	const allLi = catalog.querySelectorAll('li');
	
	catalogBtn.addEventListener('click', (event) => {
		if (catalog.style.display) {
			catalog.style.display = '';
		} else {
			catalog.style.display = 'block';
		}
		
		if (event.target.tagName === 'LI') {
			cards.forEach((card => {
				if (card.dataset.category === event.target.textContent) {
					card.parentNode.style.display = '';
				} else {
					card.parentNode.style.display = 'none';
				}
			}));
			
			allLi.forEach(elem => {
				if (elem === event.target) {
					elem.classList.add('active');
				} else {
					elem.classList.remove('active');
				}
			});
			
			filter();
		}
	});
	
};

toggleCards = function ()   {
	
	const cards = document.querySelectorAll('.goods .card');
	const cardWrapper = document.querySelector('.cart-wrapper');
	const cardsEmpty = document.querySelector('#cart-empty');

	// почсчет суммы
	const showData = () => {
		const cardsCart = cardWrapper.querySelectorAll('.card');
		const cardsPrice = cardWrapper.querySelectorAll('.card-price');
		const cardsTotal = document.querySelector('.cart-total span');
		const counter = document.querySelector('.counter');
		let sum = 0;
		
		// суммируем цены карточек
		cardsPrice.forEach(elem => {
			let prise = parseFloat(elem.textContent);
			sum += prise;
		});
		
		// вывожим сумму товаром в корзину
		cardsTotal.textContent = sum;
		
		// посчет числа заказов
		counter.innerHTML = cardsCart.length;
		
		if (cardsCart.length !== 0) {
			// удаляем текст Корзина пуста(можно дисплей none ипользовать)
			cardsEmpty.remove();
		} else {
			// вставляем текст Корзина пуста
			cardWrapper.appendChild(cardsEmpty);
		}
	};
	
	// перебираем все карточки и для каждой карточки создается функция события click(что очень и плохо и лучше использовать делегирование)
	cards.forEach((card) => {
		
		const btn = card.querySelector('button');
		
		btn.addEventListener('click', () => {
			// при клике на кнопку карточка клонируется в корзину
			const cardClone = card.cloneNode(true);
			cardWrapper.appendChild(cardClone);
			showData();
			
			const removeBtn = cardClone.querySelector('.btn');
			removeBtn.textContent = 'Удалить из корзины';
			
			removeBtn.addEventListener('click', () => {
				
				cardClone.remove();
				showData();
			});
		});
		
	});
};

addCarts = function () {
		const btnCart = document.querySelector('#cart');
		const modalCart = document.querySelector('.cart');

		// открытие модалки и блокировка скролла
		btnCart.addEventListener('click', () => {
			modalCart.style.display = 'flex';
			document.body.style.overflow = 'hidden';
		});


		modalCart.addEventListener('click', (e) => {
			target = e.target;
			
			if (!target.closest('.cart-body') || target.closest('.cart-close')) {
				modalCart.style.display = 'none';
			}
		});
	};

renderCard = function (data) {
	const goodsWrapper = document.querySelector('.goods')
	// console.log('data: ', data);
	data.goods.forEach((good => {
		const card = document.createElement('div');
		// переписали классы для нового div чтобы вернулись стили 
		card.classList = "col-12 col-md-6 col-lg-4 col-xl-3"
		card.innerHTML = `
			<div class="card" data-category = "${good.category}">
				${good.sale ? `<div class="card-sale">🔥Hot Sale🔥</div>` : ''}
				<div class="card-img-wrapper">
					<span class="card-img-top"
						style="background-image: url('${good.img}')"></span>
				</div>
				<div class="card-body justify-content-between">
					<div class="card-price" ${good.sale ? "style='color: red'": ""}>${good.price} P</div>
					<h5 class="card-title">${good.title}</h5>
					<button class="btn btn-primary">В корзину</button>
				</div>
			</div>`;
		
		goodsWrapper.appendChild(card);
	}));
};

filter = function () {
	const cards = document.querySelectorAll('.goods .card');
	const checkbox = document.querySelector('.filter-check_checkbox');
	const min = document.querySelector('#min');
	const max = document.querySelector('#max');
	const activeLi = document.querySelector('.catalog-list .active');
	
	cards.forEach((card) => {
		const cardsPrice = card.querySelector('.card-price');
		const prise = parseFloat(cardsPrice.textContent);
		const discont = card.querySelector('.card-sale');
		
		card.parentNode.style.display = '';
		
		if ((min.value && prise < min.value) || (max.value && prise > max.value)) {
			// card.parentNode.remove()
			card.parentNode.style.display = 'none';
		} else if (checkbox.checked && !discont) {
			card.parentNode.style.display = 'none';
			// card.parentNode.remove()
		} else if (activeLi) {
			if (card.dataset.category !== activeLi.textContent) {
				card.parentNode.style.display = 'none';
			} 				
		}
		
	});
};

actionPage = function () {
	// перебираем все карточки и для каждой карточки создается функция события click(что очень и плохо и лучше использовать делегирование);
		
	const cards = document.querySelectorAll('.goods .card');
	const goods = document.querySelector('.goods');
	const checkbox = document.querySelector('.filter-check_checkbox');
	const min = document.querySelector('#min');
	const max = document.querySelector('#max');
	const search = document.querySelector('.search-wrapper_input');
	const searchBtn = document.querySelector('.search-btn');

				
	// фильтруем карточки товаров
	checkbox.addEventListener('click', filter);
		
	// поиск через регулярное выражение
	searchBtn.addEventListener('click', () => {
			
		const searchText = new RegExp(search.value.trim(), 'i');  // trim удаляет пробелы  и разницу заглавных букв через ключ 'i'
			
		cards.forEach((card) => {
			const title = card.querySelector('.card-title');
			if (!searchText.test(title.textContent)) {
				card.parentNode.style.display = 'none';
			} else {
				card.parentNode.style.display = '';
			};
		});
		search.value = '';
			
	});
		
	min.addEventListener('change', filter)
	max.addEventListener('change', filter)
};




getData().then((data => {
	renderCard(data);
	renderCetalog();
	toggleCheckbox();
	addCarts();
	toggleCards();
	actionPage();
}));


	










