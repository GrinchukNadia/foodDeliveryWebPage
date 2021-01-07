/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/cards */ "./js/modules/cards.js");



function calc() {
    //Calculator
    const resultCalorie = document.querySelector('.calc_result-calorie span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'male';
        localStorage.setItem('sex', 'male');
    }
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.2;
        localStorage.setItem('ratio', 1.2);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
                appendActivitieInfo();
            }
        });
    }
    initLocalSettings('.calc_activitie-option div', 'activitie-active');
    initLocalSettings('.calc_sex-inner div', 'calc_active');

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            resultCalorie.textContent = '0';
            return;
        }

        if(sex === 'female') {
            resultCalorie.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            resultCalorie.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if(event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
    
                appendActivitieInfo();
    
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);
            });
        });
    }
    getStaticInformation('.calc_sex-inner', 'calc_active');
    getStaticInformation('.calc_activitie-option', 'activitie-active');

    function appendActivitieInfo() {
        const description = document.querySelector('.calc_activitie-description');
        ratio = +localStorage.getItem('ratio');
        if(ratio === 1.725) {
            description.innerHTML = `
                <div><b>Высокая: </b>регулярная и проффесиональная физическая активность не менее 5-6 раз в неделю по несколько часов. Интенсивные занятия, которые значительно повышают сердечный ритм.</div>
            `;
        }
        
        if(ratio === 1.375) {
            description.innerHTML = `
            <div><b>Умеренная: </b>нерегулярная физическая активность которая несколько повышает частоту сердечных сокращений. Например, быстрая ходьба, плавание, езда на велосипеде по ровной поверхности, танцы.</div>
            `;
        } 
        if(ratio === 1.55) {
            description.innerHTML = `
            <div><b>Средняя: </b>частая физическая активность несколько дней в неделю, занятие спортом в спортзале или дома, легкие пробежки, активный вид отдыха.</div>
            `;
        } 
        if(ratio === 1.2) {
            description.innerHTML = `
                <div><b>Низкая: </b>физическая активность соответствует состоянию покоя, например, когда человек спит, или лежа читает, или смотрит телепередачи.</div>
            `;
        }
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
        }

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'age':
                    age = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'height':
                    height = +input.value;
                    break;
            }
            blockNotDigit(input);
        });
    }
    function blockNotDigit(input) {
        input.value = input.value.replace(/[^\d]/g, '');
    }
    
    
    const buttonResult = document.querySelector('#calorie_result');

    buttonResult.addEventListener('click', calcTotal);
    buttonResult.addEventListener('click', () => {
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
            .then( () => {
                let innerDiv = document.querySelector('.card_propose-inner');
                if(resultCalorie.textContent < 2600) {
                    innerDiv.innerHTML = '';
                    new _modules_cards__WEBPACK_IMPORTED_MODULE_1__.MenuItem("menu3.jpg", "Меню набора веса", "Набор веса", "Как ни странно, но некоторых людей мучает проблема низкого веса. Решение есть: нужно правильно подобрать меню для набора веса. Ведь человек с недостаточным весом никогда не будет хорошо выглядеть, и на здоровье это тоже плохо сказывается.", 19, '.card_propose-inner').appendPurpose();
                } else if (resultCalorie.textContent > 2601 && resultCalorie.textContent < 3000){
                    innerDiv.innerHTML = '';
                    new _modules_cards__WEBPACK_IMPORTED_MODULE_1__.MenuItem("menu2.jpg", "Меню поддержки веса", "Поддержка веса", "В организации здорового питания главное — постепенность и правильный психологический настрой. Не стоит нацеливаться на жесткие ограничения и отказ от любимых продуктов.", 12, '.card_propose-inner').appendPurpose();
                } else {
                    innerDiv.innerHTML = '';
                    new _modules_cards__WEBPACK_IMPORTED_MODULE_1__.MenuItem("menu1.jpg", "Меню снижение веса", "Снижение веса", "Диета сбалансирована и эффективна, главный ее результат – изменений пищевых привычек человека и нормализация метаболизма. Меню на неделю поможет разобраться в данной системе питания.",  8, '.card_propose-inner').appendPurpose();
                }
            });
    });

    getDynamicInformation('#age');
    getDynamicInformation('#weight');
    getDynamicInformation('#height');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuItem": () => /* binding */ MenuItem,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


class MenuItem {
    constructor(img, alt, title, description, price, parentSelector, ...classes) {
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.classes = classes;
        this.parentSelector = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }
    changeToUAH() {
        this.price = this.price * this.transfer;
    }
    appendCards(){
        const element = document.createElement('div');
        if( this.classes.length === 0) {
            this.element = 'card_menu';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML += `
            <img src="img/${this.img}" alt="${this.alt}">
            <div class="card_option card_title">${this.title}</div>
            <div class="card_option card_description">${this.description}</div>
            <div class="card_option card_divider"></div>
            <div class="card_option card_price">
                <div class="inner_price">Цена:</div>
                <div class="inner_cost"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parentSelector.append(element);
    }
    appendPurpose() {
        const anotherElement = document.createElement('div');
        this.anotherElement = 'card_menu';
        anotherElement.classList.add(this.anotherElement);
        anotherElement.innerHTML += `
            <img src="img/${this.img}" alt="${this.alt}">
            <div class="card_description">
                <div class="card_option card_title">${this.title}</div>
                <div class="card_option card_description">${this.description}</div>
                <div class="card_option card_divider"></div>
                <div class="card_option card_price">
                    <div class="card_inner inner_price">Цена:</div>
                    <div class="card_inner inner_cost"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
        `;
        this.parentSelector.append(anotherElement);
    }
}

function cards() {
    //Cards
    
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then( data => {
        data.forEach( ({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, '.menu_items-inner').appendCards();
        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalInterval) {
    //Server Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так'
    };
        
    forms.forEach( item => {
        bindPostData(item);
    });

    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('beforeend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal_wrapper');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalInterval);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal_wrapper');
        thanksModal.innerHTML = `
            <div class="modal_content modal_content-msg">
                <div data-close class="modal_close">&times;</div>
                <div class="modal_title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }

    fetch('db.json')
    .then(data => data.json())
    .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });
function openModal(modalSelector, modalInterval){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalInterval){
        clearInterval(modalInterval);
    }
}

function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalInterval) {
    //Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach( btn => {
            btn.addEventListener('click', () => {
            openModal(modalSelector, modalInterval);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalInterval);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // slider
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          slideWidth = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if(slides.length < 10) {
        total.textContent = ` 0${slides.length} `;
        current.textContent = ` 0${slideIndex} `;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
            dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    slides.forEach( slide => {
        slide.style.width = slideWidth;
    });

    function currentDot() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex -1].style.opacity = 1;
    }
    function addZeroSlider() {
        if ( slides.length < 10) {
            current.textContent = ` 0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    function clearNotDigit(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == clearNotDigit(slideWidth) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += clearNotDigit(slideWidth);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        addZeroSlider();
        currentDot();
    });
    
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = clearNotDigit(slideWidth) * (slides.length - 1);
        } else {
            offset -= clearNotDigit(slideWidth);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZeroSlider();
        currentDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = clearNotDigit(slideWidth) * (slideTo- 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            addZeroSlider();
            currentDot();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
// Tabs Slider in header    
    const slide = document.querySelectorAll(tabsSelector),
          slideImg = document.querySelectorAll(tabsContentSelector),
          slideParent = document.querySelector(tabsParentSelector);

    function hideSlide(){
        slideImg.forEach(item => {
            item.style.display = 'none';
        });
        slide.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showSlide(i=0){
        slideImg[i].style.display = 'block';
        slide[i].classList.add(activeClass);
    }

    hideSlide();
    showSlide();

    slideParent.addEventListener('click', (event) => {
        const target = event.target;
        if ( target && target.classList.contains(tabsSelector.slice(1))) {
            slide.forEach( (item, i) => {
                if(target == item){
                    hideSlide();
                    showSlide(i);
                } 
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(id, deadline) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / 1000 / 60 / 60) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor( (t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('.days'),
              hours = timer.querySelector('.hours'),
              minutes = timer.querySelector('.minutes'),
              seconds = timer.querySelector('.seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalInterval = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalInterval), 600000);
    

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.slide_item', '.slider_img', '.menu_slide', 'slide_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalInterval);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.salle__timer', '2021-05-12');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalInterval);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
        container: '.promote-slider',
        nextArrow: '.next-arrow',
        prevArrow: '.prev-arrow',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.promote-slider-wrapper',
        field: '.promote-slider-inner',
        slide: ".promote-img"
    });
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });
const postData = async (url, data) => {
    const result = await fetch(url, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: data
    }); 
    return await result.json();
};

const getResource = async (url) => {
    const result = await fetch(url); 

    if( !result.ok) {
        throw new Error(`Не может получить данные от ${url}, статус: ${result.status}`);
    }

    return await result.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map