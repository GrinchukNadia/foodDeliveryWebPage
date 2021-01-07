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