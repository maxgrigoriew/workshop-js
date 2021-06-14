document.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const customer = document.querySelector('#customer')
	const freelancer = document.querySelector('#freelancer')
	const blockCustomer = document.querySelector('#block-customer')
	const blockFreelancer = document.querySelector('#block-freelancer')
	const btnExit = document.querySelector('#btn-exit')
	const blockChoice = document.querySelector('#block-choice')
	const formCustomer = document.querySelector('#form-customer')
	const ordersTable = document.querySelector('#orders')
	const modalOrder = document.querySelector('#order_read')
	const modalOrderActive = document.querySelector('#order_active')

	const orders = JSON.parse(localStorage.getItem('threeOrders')) || [];
	// localStorage
	const toStorage = () => {
		localStorage.setItem('threeOrders', JSON.stringify(orders));

	}
	// дедлайн функция
	const calcDeadline = (data) => {
		const deadline = new Date(data);
		const toDay = Date.now();
		console.log('toDay: ', toDay);
		const remaining = (deadline - today);
		console.log('remaining: ', remaining);
		
		
		// const deadLine = new Data(deadline)
		console.log('deadline: ', data);
	}
	// добавляем новую строку в таблице
	const renderOrders = function () {
		ordersTable.innerHTML = '';
		orders.forEach((order, i) => {

			// с помощью дата атрибута получаем номер заказа
			ordersTable.innerHTML += `
			<tr class = 'order ${order.active ? 'taken' : ''}'
				 data-number-order='${i}'>
				<td> ${i + 1} </td>
				<td> ${order.title} </td>
				<td class='${order.currency}'></td>
				<td> ${calcDeadline(order.deadline)} </td>
			</tr>`
		});
	};



	const handlerModal = (e) => {
		const target = e.target;
		const modal = target.closest('.order-modal');
		const order = orders[modal.id];

		const baseAction = () => {
			modal.style.display = 'none';
			toStorage();
			renderOrders();
		};

		if (target.closest('.close') || target === modal) {
			modal.style.display = 'none';
			baseAction();
		}
		// если жмем кнопку Взять заказ то модалка сменяется на активную
		if (target.classList.contains('get-order')) {
			order.active = true;
		}

		// отмена заказа
		if (target.id === 'capitulation') {
			order.active = false;
			baseAction();
		}

		// удаление заказа из массива если он готов
		if (target.id === 'ready') {
			baseAction();
			orders.splice(orders.indexOf(order), 1);
		}

		renderOrders();
	};

	const openModal = (numberOrder) => {

		const order = orders[numberOrder];

		//  применяяем деструкторизацию с одноименными переменными (так жек можно деструкторизовать и массив) элементу можно задать значение по умолчанию
		const {
			title,
			firstName,
			email,
			phone,
			description,
			amount,
			currency,
			deadline,
			active = true
		} = order;

		console.log('order: ', order);

		const modal = order.active ? modalOrderActive : modalOrder;
		// альтернатива с тернарным оператором

		// let modal = 0;
		// if (order.active) {
		// 	modal = modalOrderActive;
		// }
		// else{
		// 	modal = modalOrder;
		// }

		const firstNameBlock = modal.querySelector('.firstName');
		const modalTitleBlock = modal.querySelector('.modal-title');
		const emailBlock = modal.querySelector('.email');
		const descriptionBlock = modal.querySelector('.description');
		const deadlineBlock = modal.querySelector('.deadline');
		const currencyBlock = modal.querySelector('.currency_img');
		const countBlock = document.querySelector('.count');
		const phoneBlock = document.querySelector('.phone');

		modalTitleBlock.textContent = order.firstName;
		modal.id = numberOrder;
		firstNameBlock.textContent = firstName;
		emailBlock.textContent = order.email;
		emailBlock.href = 'mailto:' + order.email;
		descriptionBlock.textContent = order.description;
		deadlineBlock.textContent = calcDeadline(deadline);
		currencyBlock.className = 'currency_img';
		currencyBlock.classList.add(order.currency);
		countBlock.textContent = amount;
		countBlock.textContent = order.amount;

		// присваиваем значение по умолчанию
		phoneBlock ? phoneBlock.href = 'tel:' + order.phone : '';

		// if (phoneBlock) {
		// 	phoneBlock.href = 'tel:' + order.phone;
		// }

		modal.style.display = 'flex';

		modal.addEventListener('click', handlerModal);
	};

	// делаем деллегирование
	ordersTable.addEventListener('click', (e) => {
		const target = e.target;

		// делаем кликабельной всю строчку в таблице
		const targetOrder = target.closest('.order');

		if (targetOrder) {
			// перредаем в функцию номер даказа, который мы получили через дата атрибут:
			openModal(targetOrder.dataset.numberOrder);
		}
		console.log(orders[targetOrder.dataset.numberOrder]);
	});

	customer.addEventListener('click', () => {
		blockCustomer.style.display = 'block'
		blockFreelancer.style.display = 'none'
		btnExit.style.display = 'block'
		blockChoice.style.display = 'none'
	})

	freelancer.addEventListener('click', () => {
		blockCustomer.style.display = 'none'
		renderOrders();
		blockFreelancer.style.display = 'block'
		btnExit.style.display = 'block'
		blockChoice.style.display = 'none'
	})

	btnExit.addEventListener('click', () => {
		blockFreelancer.style.display = 'none'
		blockCustomer.style.display = 'none'
		btnExit.style.display = 'none'
		blockChoice.style.display = 'block'
	})

	// отключение стандартного поведения сабмит
	formCustomer.addEventListener('submit', (event) => {
		event.preventDefault()
		// псевдомассив
		// console.log(formCustomer.elements)

		const obj = {};
		// создали пустой объект в который будет записаны из цикла ниже отфильтрованные значения псевдомассива:

		//   1)
		/*
				перебираем форму и оставляем только инпуты, которые запишем в пустой объект выше
				for (const elem of formCustomer.elements) {
					if (elem.tagName === 'INPUT' && elem.type !== 'radio' || elem.type === 'radio' &&elem.checked){
						obj[elem.name] = elem.value

					}
					 if (elem.type !== 'radio') {
						elem.value = ''
					}
				};
				
				перебираем коллекцию инпутов с помощью forEach.  Для этого делаем из коллекуии массив чтобы можно было применить forEach: 2 пример:
				*/

		//   2)

		/*
					[...formCustomer.elements].forEach((elem) => {

						if (elem.tagName === 'INPUT' && elem.type !== 'radio' || elem.type === 'radio' && elem.checked) {
							obj[elem.name] = elem.value

							if (elem.type !== 'radio') {
								elem.value = ''
							}
						}
					});
		*/

		// метод filter: сначала ффильтруем а потом перебираем  с fjreach и кидаем в обьект
		// 3) 

		const elements = [...formCustomer.elements].filter((elem) => {
			return elem.tagName === 'INPUT' && elem.type !== 'radio' || elem.type === 'radio' && elem.checked || elem.tagName === 'TEXTAREA'
		});

		elements.forEach((elem) => {
			obj[elem.name] = elem.value

			if (elem.type !== 'radio') {
				elem.value = ''
			}
		});

		formCustomer.reset();
		orders.push(obj);
		toStorage();

		// console.log(orders)

	})

	// отключение стандартного поведения кнопки
	// let a = document.querySelector('.link')
	// console.log(a)
	// a.addEventListener('click', (e) => {
	// 	e.preventDefault()
	// })

})