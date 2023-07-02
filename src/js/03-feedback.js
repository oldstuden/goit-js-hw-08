import throttle from 'lodash.throttle';
const elements = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const { form, input, textarea } = elements;
const STORAGE_KEY = 'feedback-form-state';
form.addEventListener('submit', handlerSubmit);
form.addEventListener('input', throttle(handlerInput, 500));
loadFromLocalStorage();
// ---------------follow the event 'submit'-----
function handlerSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  if (!email.value || !message.value) {
    const atention = 'Заповніть всі поля, будь ласка';
    alert(atention);
  }
  form.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}
// --------------follow the event 'input'-----
function handlerInput() {
  //   const { email, message } = evt.target.elements;
  const data = {
    email: input.value,
    message: textarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
// -----------loading from localStorage in form----
function loadFromLocalStorage() {
  const dataArea = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (dataArea) {
    textarea.value = dataArea.message;
    input.value = dataArea.email;
  }
}
