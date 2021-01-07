import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalInterval = setTimeout(() => openModal('.modal', modalInterval), 600000);
    

    tabs('.slide_item', '.slider_img', '.menu_slide', 'slide_active');
    modal('[data-modal]', '.modal', modalInterval);
    timer('.salle__timer', '2021-05-12');
    cards();
    calc();
    forms('form', modalInterval);
    slider({
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