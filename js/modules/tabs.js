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