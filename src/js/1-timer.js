import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timerInput = document.querySelector('#datetime-picker');
const button = document.querySelector('.datetime-button');
button.disabled = true;

const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minuteSpan = document.querySelector('[data-minutes]');
const secondSpan = document.querySelector('[data-seconds]');

let timerId = null;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      button.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      button.disabled = false;
    }
  }
};

flatpickr(timerInput, options);

button.addEventListener('click', () => {
  button.disabled = true;
  timerInput.disabled = true;
  startTimer(userSelectedDate);
});

function setTimerDisplay ({days, hours, minutes, seconds}) {
  daySpan.textContent = String(days).padStart(2, '0');
  hourSpan.textContent = String(hours).padStart(2, '0');
  minuteSpan.textContent = String(minutes).padStart(2, '0');
  secondSpan.textContent = String(seconds).padStart(2, '0');
};

function startTimer (userSelectedDate){
  timerId = setInterval(() => {
    const currentDate = new Date();
    const dateDiff = userSelectedDate - currentDate;
    if (dateDiff < 1000) {
      setTimerDisplay({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      timerInput.disabled = false;
      button.disabled = true;
      clearInterval(timerId);
      return;
    }
    const timeleft = convertMs(dateDiff);
    setTimerDisplay (timeleft);
  }, 1000);
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
};




