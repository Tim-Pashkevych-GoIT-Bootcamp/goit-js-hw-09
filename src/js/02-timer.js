import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Timer from './timer.js';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  btns: {
    start: document.querySelector('button[data-start]'),
  },
  fields: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

// Create our Timer object
const timer = new Timer();

// Show error message and set DISABLED attribute
const showErrorMessage = message => {
  Notify.failure(message);
  refs.btns.start.setAttribute('disabled', 'disabled');
};

// Update Template
const updateTemplate = time => {
  refs.fields.days.textContent = time.days;
  refs.fields.hours.textContent = time.hours;
  refs.fields.minutes.textContent = time.minutes;
  refs.fields.seconds.textContent = time.seconds;
};

// Defalut settings for a template
const defaultTime = { days: '00', hours: '00', minutes: '00', seconds: '00' };

// Settings object for Flatpicker
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    try {
      // Set selected timestamp and remove disabled attribute
      timer.timestamp = selectedDates[0];
      refs.btns.start.removeAttribute('disabled');
    } catch (error) {
      showErrorMessage(error);
      updateTemplate(defaultTime);
    }
  },
};

// Flatpicker initialization
flatpickr(refs.datetimePicker, options);

// Add Event listener
const btnStartClick = () => {
  try {
    timer.start(timeInterval => {
      updateTemplate(timeInterval);
    });
  } catch (error) {
    // Display error message
    showErrorMessage(error);
    updateTemplate(defaultTime);
  }
};
refs.btns.start.addEventListener('click', btnStartClick);
