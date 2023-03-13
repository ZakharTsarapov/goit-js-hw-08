import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {}
const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

onSavedSymbols();

function onFormSubmit(event) {
  event.preventDefault();
  const formRefs = event.currentTarget.elements;
  const email = formRefs.email.value;
  const textarea = formRefs.message.value;

  if (email.trim() === '' || textarea === '') {
    return alert(
      'Внимание, Внимание !!! Все поля должны быть заполнены чертов Мазафака!!!'
    );
  }
    formData = {};
    
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSavedSymbols() {
  const savedSymbols = localStorage.getItem(STORAGE_KEY);
    if (savedSymbols) {
        formData = JSON.parse(savedSymbols);
    };
    const entries = Object.entries(formData);

    entries.forEach(function (el) {
      const [key, value] = el;
      refs.form[key].value = value;
    });
}
