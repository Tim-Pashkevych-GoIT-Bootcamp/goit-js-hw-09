import BackgroundColorChanger from './background-color-changer.js';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  button: document.querySelector('button[data-button]'),
};

// Create our Object
const backgroundColorChanger = new BackgroundColorChanger({
  delay: 1000,
  startBtn: refs.startBtn,
  stopBtn: refs.stopBtn,
  btn: refs.button,
});

// Click Start Button
refs.startBtn.addEventListener(
  'click',
  backgroundColorChanger.start.bind(backgroundColorChanger)
);

// Click Stop button
refs.stopBtn.addEventListener(
  'click',
  backgroundColorChanger.stop.bind(backgroundColorChanger)
);

// Click on Button
refs.button.addEventListener(
  'click',
  backgroundColorChanger.process.bind(backgroundColorChanger)
);
