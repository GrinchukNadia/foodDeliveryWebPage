window.addEventListener('DOMContentLoaded', () => {
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

    const modalInterval = setTimeout(openModal, 6000);
    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

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
    

    // const low = new MenuItem(
    //     'menu1.jpg',
    //     'Меню снижение веса',
    //     'Снижение веса',
    //     'Диета сбалансирована и эффективна, главный ее результат – изменений пищевых привычек человека и нормализация метаболизма. Меню на неделю поможет разобраться в данной системе питания.',
    //     8,
    //     '.menu_items-inner'
    // );
    // const medium = new MenuItem(
    //     'menu2.jpg',
    //     'Меню поддержки веса',
    //     'Поддержка веса',
    //     'В организации здорового питания главное — постепенность и правильный психологический настрой. Не стоит нацеливаться на жесткие ограничения и отказ от любимых продуктов.',
    //     12,
    //     '.menu_items-inner'
    // );
    // const hight = new MenuItem(
    //     'menu3.jpg',
    //     'Меню набора веса',
    //     'Набор веса',
    //     'Как ни странно, но некоторых людей мучает проблема низкого веса. Решение есть: нужно правильно подобрать меню для набора веса. Ведь человек с недостаточным весом никогда не будет хорошо выглядеть, и на здоровье это тоже плохо сказывается. ',
    //     19,
    //     '.menu_items-inner'
    // );

    //     low.appendCards();
    //     medium.appendCards();
    //     hight.appendCards();

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

        next.addEventListener('click', () => {
            if (offset == +slideWidth.slice(0, slideWidth.length - 2) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +slideWidth.slice(0, slideWidth.length - 2);
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
                offset = +slideWidth.slice(0, slideWidth.length - 2) * (slides.length - 1);
            } else {
                offset -= +slideWidth.slice(0, slideWidth.length - 2);
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

                offset = +slideWidth.slice(0, slideWidth.length - 2) * (slideTo- 1);
                slidesField.style.transform = `translateX(-${offset}px)`;

                addZeroSlider();
                currentDot();
            });
        });
});