export const countDown = (min) => {
    const timerEl = document.createElement('div');
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
        console.log(timer);
    }, 1000);
    return timerEl;
};

export const isDue = (due_date) => {
    const timerEl = document.createElement('div');
    const dueDate = new Date (due_date).getTime();
    console.log('DUE DATE: ', due_date);

    const checkTime = setInterval(() => {
        const now = new Date().getTime();

        const timeRemaining = dueDate - now;

        let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        if (days < 10) {
            days = `0${days}`;
        }

        let hours = Math.floor(timeRemaining % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        if (hours < 10) {
            hours = `0${hours}`;
        }

        let minutes = Math.floor(timeRemaining % (1000 * 60 * 60) / (1000 * 60));
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        let seconds = Math.floor(timeRemaining % (1000 * 60) / 1000);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        const remainingTime = `${days} : ${hours} : ${minutes} : ${seconds}`;
        timerEl.textContent = remainingTime;

        if (timeRemaining === 0) {
            clearInterval(checkTime);
            timerEl.textContent = 'OUTTA TIME';
        }


    }, 1000);
    return timerEl;
};