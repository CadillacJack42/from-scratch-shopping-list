const timerEl = document.getElementById('timer');


export const countDown = (min) => {
    let minutes = min;
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = 59;
    let remainingTime = `${minutes} : ${seconds}`;
    const timer = setInterval(() => {
        if (minutes > 0) {
            if (seconds > 0) {
                seconds--;
                remainingTime = `${minutes} : ${seconds}`;
            } else {
                seconds = 59;
                minutes--;
                remainingTime = `${minutes} : ${seconds}`;
            }
        } else {
            clearInterval(timer);
            seconds = '00';
            minutes = '00';
            remainingTime = `${minutes} : ${seconds}`;
        }
        timerEl.textContent = remainingTime;
        console.log(minutes);
    }, 1000);
};