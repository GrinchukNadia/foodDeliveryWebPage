import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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
        openModal('.modal', modalInterval);

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
            closeModal('.modal');
        }, 4000);
    }

    fetch('db.json')
    .then(data => data.json())
    .then(res => console.log(res));
}

export default forms;