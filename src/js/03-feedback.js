import localStorageManager from './storage.js';

const formElement = document.querySelector('.feedback-form');
const storedData = localStorageManager.get('feedback-form-state');

/**
  |============================
  | Set default values
  |============================
*/
const setDefaultValues = defaultValues => {
  if (defaultValues && defaultValues.email) {
    formElement.elements.email.value = defaultValues.email;
  }
  if (defaultValues && defaultValues.message) {
    formElement.elements.message.value = defaultValues.message;
  }
};
setDefaultValues(storedData);

/**
  |============================
  | Add OnInput Event Listeners
  |============================
*/
const onInput = event => {
  const email = event.currentTarget.elements.email.value;
  const message = event.currentTarget.elements.message.value;

  localStorageManager.set('feedback-form-state', {
    email,
    message,
  });
};
formElement.addEventListener('input', onInput);

/**
  |============================
  | Add OnSubmit Event Listeners
  |============================
*/
const onSubmit = event => {
  event.preventDefault();
  // Cleanup form elements
  event.currentTarget.reset();

  // Check the Local Storage
  const storedData = localStorageManager.get('feedback-form-state');
  if (storedData) {
    // Output Local Storage data
    console.log(storedData);
    // Cleanup Local Storage
    localStorageManager.remove('feedback-form-state');
  }
};
formElement.addEventListener('submit', onSubmit);
