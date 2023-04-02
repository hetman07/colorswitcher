import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let intervalId = null;

const refs = {
  date_picker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hour: document.querySelector('.value[data-hours]'),
  minute: document.querySelector('.value[data-minutes]'),
  second: document.querySelector('.value[data-seconds]'),
};

// refs.date_picker.addEventListener('click', () => {
//   console.log('Date.');
// });

refs.startBtn.addEventListener('click', handleStartTimer);

flatpickr(refs.date_picker, {
  clickOpens: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log('****', selectedDates[0].getTime());
    if (selectedDates[0].getTime() < Date.now()) {
      //   refs.start.setAttribute('disabled', 'disabled');
      refs.startBtn.disabled = false;
      Notify.failure('Обрана дата менша за поточну дату!');
    } else {
      if (refs.startBtn.hasAttribute('disabled')) {
        refs.startBtn.disabled = true;
        Notify.success('Натисніть старт.');
      }
    }
  },
});

function handleStartTimer() {
  //   refs.startBtn.setAttribute('disabled', 'disabled');
  //   refs.date_picker.setAttribute('disabled', 'disabled');
  refs.startBtn.disabled = true;
  refs.date_picker.disabled = true;

  const newPickDate = new Date(refs.date_picker.value);
  intervalId = setInterval(() => {
    ms = newPickDate - Date.now();

    const { days, hours, minutes, seconds } = convertMs(ms);

    refs.second.textContent = addLeadingZero(seconds);
    refs.minute.textContent = addLeadingZero(minutes);
    refs.hour.textContent = addLeadingZero(hours);
    refs.days.textContent = addLeadingZero(days);

    if (ms < 1000) {
      clearInterval(intervalId);
      refs.startBtn.disabled = false;
      refs.date_picker.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
