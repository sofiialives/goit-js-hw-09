import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
  return String(value).padStart(2, '0');
}
const startButton = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
const inputValue = document.getElementById('datetime-picker');
const timer = document.querySelector('.timer')
timer.style.display = 'flex'
timer.style.gap = '50px'
timer.style.paddingTop = '15px'

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};
flatpickr(inputValue, options);

startButton.addEventListener('click', onFunction);


function onFunction() {
  let counter = setInterval(() => {
    let futureDate = new Date(inputValue.value) - Date.now(); 
    if(futureDate >= 0){
        let toTheDate = convertMs(futureDate);
        spanDays.textContent = addLeadingZero(toTheDate.days);
        spanHours.textContent = addLeadingZero(toTheDate.hours);
        spanMinutes.textContent = addLeadingZero(toTheDate.minutes);
        spanSeconds.textContent = addLeadingZero(toTheDate.seconds);
    }else{
        clearInterval(counter)
    }
  }, 1000);
}
