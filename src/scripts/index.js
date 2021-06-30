import Timer from "./Timer";

const MINUTES_DEFAULT = 20;
const timeElement = document.getElementById('time');
timeElement.value = MINUTES_DEFAULT;

const minutesElement = document.getElementById('mins');
const secondsElement = document.getElementById('secs');
const timer = new Timer(MINUTES_DEFAULT, minutesElement, secondsElement);

document.body.addEventListener('click', event => {
    const target = event.target;
    const id = target.id;
    switch (id) {
        case 'btn-plus':
            timer.set(++timeElement.value);
            break;
        case 'btn-minus':
            timer.set(--timeElement.value);
            break;
        case 'btn-start':
            timer.start();
            break;
        case 'btn-pause':
            timer.pause();
            break;
        case 'btn-reset':
            timer.reset();
            break;
        case 'btn-continue':
            timer.continue();
            break;
    }
})

document.getElementById('time').addEventListener('change', event => {
    const timeElement = document.getElementById('time');
    timer.set(timeElement.value);
})