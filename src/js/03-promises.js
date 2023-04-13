import { Notify } from 'notiflix/build/notiflix-notify-aio';

let POSITION = 0;

const refs = {
  form: document.querySelector('.form'),
  inpDelay: document.querySelector('input[name="delay"]'),
  inpStep: document.querySelector('input[name="step"]'),
  inpAmount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  let delay = Number(refs.inpDelay.value);
  const step = Number(refs.inpStep.value);
  const amount = Number(refs.inpAmount.value);

  if (delay || step || amount) {
    console.log('hello');
    Notify.failure(`Fields must be entered.`);
    return;
  }

  for (let i = 0; i < amount; i++) {
    POSITION++;
    createPromise(POSITION, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  refs.form.reset();
  POSITION = 0;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
