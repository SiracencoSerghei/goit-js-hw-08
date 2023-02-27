const _ = require('lodash');

const feedbackForm = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// Объект с текущим состоянием формы
let feedbackState = {};

// Загрузка сохраненного состояния формы при запуске страницы при условии что не будет применена очистка локального хранилища

const savedFeedbackState = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedFeedbackState) {
  feedbackState = JSON.parse(savedFeedbackState);
}


// Функция для записи текущего состояния формы в локальное хранилище
const saveFeedbackStateToLocalStorage = _.throttle(function () {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(feedbackState));
}, 500);

// Oбработкa события input для локального хранилища....
feedbackForm.addEventListener('input', event => {
  if (event.target.matches('input, textarea')) {
    const name = event.target.getAttribute('name');
    feedbackState[name] = event.target.value.trim();
    saveFeedbackStateToLocalStorage();
  }
});


// Функция обработки события submit на форме

feedbackForm.addEventListener('submit', onFeedbackFormSubmit);

//  коллбек функция на сабмит
 function onFeedbackFormSubmit(event) {
   event.preventDefault();

   // Получение элементов формы по их атрибуту name
   const emailInput = feedbackForm.elements['email'];
   const messageInput = feedbackForm.elements['message'];

   // Проверка на заполнение всех полей формы
   if (!emailInput.value.trim() || !messageInput.value.trim()) {
     alert('Please fill all fields');
     return;
   }

   // Получение данных формы через объект FormData
   const formData = new FormData(event.target);

   // Обновление объекта feedbackState данными из формы
   for (const [key, value] of formData) {
     feedbackState[key] = value.trim();
   }

   // Вывод обьекта в консоль
   console.log('Отправленное сообщение:', feedbackState);

   // Очистка локального хранилища, сброс формы и объекта feedbackState
   localStorage.removeItem(LOCAL_STORAGE_KEY);
   feedbackForm.reset();
   feedbackState = {};
 }