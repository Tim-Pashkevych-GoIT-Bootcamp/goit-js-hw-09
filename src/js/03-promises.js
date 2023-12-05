import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btns: {
    submit: document.querySelector('button[type="submit"]'),
  },
  fields: {
    delay: document.querySelector('input[name="delay"]'),
    step: document.querySelector('input[name="step"]'),
    amount: document.querySelector('input[name="amount"]'),
  },
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const returnMessage = { position, delay };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(returnMessage);
      } else {
        reject(returnMessage);
      }
    }, delay);
  });
}

const onBtnClick = event => {
  const delayValue = Number.parseInt(refs.fields.delay.value);
  const stepValue = Number.parseInt(refs.fields.step.value);
  const amountValue = Number.parseInt(refs.fields.amount.value);

  event.preventDefault();

  for (let i = 0; i < amountValue; i++) {
    const position = i + 1;
    const delay = delayValue + i * stepValue;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};
refs.btns.submit.addEventListener('click', onBtnClick);
