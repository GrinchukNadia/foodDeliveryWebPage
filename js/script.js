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
            item.classList.remove('slide_active')
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
    // '.salle__timer'
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('.days'),
              hours = timer.querySelector('.hours'),
              minutes = timer.querySelector('.minutes'),
              seconds = timer.querySelector('.seconds'),
              timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.salle__timer', deadline);


});