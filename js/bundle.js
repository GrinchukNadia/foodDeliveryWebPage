/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

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
        getResource('http://localhost:3000/menu')
            .then( () => {
                let innerDiv = document.querySelector('.card_propose-inner');
                if(resultCalorie.textContent < 2600) {
                    innerDiv.innerHTML = '';
                    new MenuItem("menu3.jpg", "Меню набора веса", "Набор веса", "Как ни странно, но некоторых людей мучает проблема низкого веса. Решение есть: нужно правильно подобрать меню для набора веса. Ведь человек с недостаточным весом никогда не будет хорошо выглядеть, и на здоровье это тоже плохо сказывается.", 19, '.card_propose-inner').appendPurpose();
                } else if (resultCalorie.textContent > 2601 && resultCalorie.textContent < 3000){
                    innerDiv.innerHTML = '';
                    new MenuItem("menu2.jpg", "Меню поддержки веса", "Поддержка веса", "В организации здорового питания главное — постепенность и правильный психологический настрой. Не стоит нацеливаться на жесткие ограничения и отказ от любимых продуктов.", 12, '.card_propose-inner').appendPurpose();
                } else {
                    innerDiv.innerHTML = '';
                    new MenuItem("menu1.jpg", "Меню снижение веса", "Снижение веса", "Диета сбалансирована и эффективна, главный ее результат – изменений пищевых привычек человека и нормализация метаболизма. Меню на неделю поможет разобраться в данной системе питания.",  8, '.card_propose-inner').appendPurpose();
                }
            });
    });

    getDynamicInformation('#age');
    getDynamicInformation('#weight');
    getDynamicInformation('#height');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    //Cards
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

    const getResource = async (url) => {
        const result = await fetch(url); 

        if( !result.ok) {
            throw new Error(`Не может получить данные от ${url}, статус: ${result.status}`);
        }

        return await result.json();
    };

    getResource('http://localhost:3000/menu')
    .then( data => {
        data.forEach( ({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, '.menu_items-inner').appendCards();
        });
    });

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    //Server Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так'
    };
        
    forms.forEach( item => {
        bindPostData(item);
    });

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
            
            postData('http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
        }, 4000);
    }

    fetch('db.json')
    .then(data => data.json())
    .then(res => console.log(res));
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    modalTrigger.forEach( btn => {
            btn.addEventListener('click', () => {
            openModal();
        });
    });

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalInterval);
    }

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalInterval = setTimeout(openModal, 600000);
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    // slider
    const slides = document.querySelectorAll(".promote-img"),
            slider = document.querySelector('.promote-slider'),
            prev = document.querySelector('.prev-arrow'),
            next = document.querySelector('.next-arrow'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            slidesWrapper = document.querySelector('.promote-slider-wrapper'),
            slidesField = document.querySelector('.promote-slider-inner'),
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

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
// Tabs Slider in header    
    const slide = document.querySelectorAll('.slide_item'),
          slideImg = document.querySelectorAll('.slider_img'),
          slideParent = document.querySelector('.menu_slide');

    function hideSlide(){
        slideImg.forEach(item => {
            item.style.display = 'none';
        });
        slide.forEach(item => {
            item.classList.remove('slide_active');
        });
    }

    function showSlide(i=0){
        slideImg[i].style.display = 'block';
        slide[i].classList.add('slide_active');
    }

    hideSlide();
    showSlide();

    slideParent.addEventListener('click', (event) => {
        const target = event.target;
        if ( target && target.classList.contains('slide_item')) {
            slide.forEach( (item, i) => {
                if(target == item){
                    hideSlide();
                    showSlide(i);
                } 
            });
        }
    });

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    // Timer

    const deadline = '2021-05-12';

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
    setClock('.salle__timer', deadline);
}

module.exports = timer;

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
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map