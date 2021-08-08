'use strict';

const API_URL = 'http://localhost:9999/api';

const showLoader = (perentEl) => {
    perentEl.innerHTML = `
        <div class="loading-indicator"></div>
    `;
};
const loadAccount = async (el) => {
    try {
        showLoader(el);
        const response = await fetch(`${API_URL}/hw16`);
        if (!response.ok) {
            throw new Error((response.statusText));
        }
        const data = await response.json();
        showAccount(accountAndCardsEl, data.account);
    } catch (e) {
        showAccount(accountAndCardsEl, null, e);
    }
};
const showAccount = (parentEl, data, err) => {
    if (err) {
        parentEl.innerHTML = `
        <div class="info">
             Произошла ошибка
             <button class="retry">Повторить запрос</button>
        </div>
        `;
        const retryEl = parentEl.querySelector('.info .retry');
        retryEl.onclick = () => {
            loadAccount(accountAndCardsEl);
        };
        return;
    }
    parentEl.innerHTML = `
    <div class="info">
            <div class="name">${data.name}</div>
            <div class="number">${data.number}</div>
            <div class="balance">
                <span class="amount">${data.amount.toString().replace('.', ',')}</span> ₽
            </div>
        </div>
    `;
};

const accountAndCardsEl = document.getElementById('accounts-and-cards');
loadAccount(accountAndCardsEl);

const change = 'I have a change';
