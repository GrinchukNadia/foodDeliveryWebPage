import {getResource} from '../services/services';
import {MenuItem} from '../modules/cards';

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

export default calc;