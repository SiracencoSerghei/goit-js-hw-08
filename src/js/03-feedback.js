const _ = require('lodash');

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Объект с текущим состоянием формы
let feedbackState = {
  email: '',
  message: '',
};

// Функция для записи текущего состояния формы в локальное хранилище
const saveFeedbackStateToLocalStorage = _.throttle(function () {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(feedbackState));
}, 500);

// Загрузка сохраненного состояния формы при запуске страницы
const savedFeedbackState = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedFeedbackState) {
  feedbackState = JSON.parse(savedFeedbackState);
  emailInput.value = feedbackState.email;
  messageInput.value = feedbackState.message;
}

// Обработка события input на полях формы
emailInput.addEventListener('input', event => {
  feedbackState.email = event.target.value;
  saveFeedbackStateToLocalStorage();
});

messageInput.addEventListener('input', event => {
  feedbackState.message = event.target.value;
  saveFeedbackStateToLocalStorage();
});

// Обработка события submit на форме
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  console.log('Отправленное сообщение:', feedbackState);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
  feedbackState = {
    email: '',
    message: '',
  };
});