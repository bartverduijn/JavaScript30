let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear existing timer
  clearInterval(countDown);
  const now = Date.now(); //in ms
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds); //original number of seconds
  displayEndTime(then);

  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if it should stop
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    // otherwise, display
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${mins}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const endTime = new Date(timestamp);
  const hours = endTime.getHours();
  const mins = endTime.getMinutes();
  endTimeDisplay.textContent = `Be back at ${hours}:${mins < 10 ? '0' : ''}${mins}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  // clear out value in the input field
  this.reset();
});
