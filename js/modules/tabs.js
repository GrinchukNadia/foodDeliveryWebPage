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

export default tabs;