

class Timer {
    constructor(minutes, minutesElement, secondsElement) {
        this.minutesSet = minutes;
        this.minutesElement = minutesElement;
        this.secondsElement = secondsElement;
        this.secondsToGo = Math.floor(this.minutesSet * 60);
        this.isUp = false;
        this.isPaused = true;
        this.inject();
        this.audio = new Audio('./src/audio/alarm_beep.wav');
        this.audio.loop = false;
        this.timer = setInterval(() => {
            if (this.secondsToGo === 0) {
                this.isUp = true;
                this.audio.play();
                setTimeout(() => this.audio.pause(), 2000)
            }
            if (!this.isPaused && !this.isUp) {
                this.secondsToGo--;
                this.inject();
            }
        }, 1000);

    }

    set(minutes) {
        this.minutesSet = minutes;
        this.inject();
    }

    getMinutes() {
        return String(Math.floor(this.secondsToGo / 60)).padStart(2,'0');
    }

    getSeconds() {
        return String(Math.floor(this.secondsToGo % 60)).padStart(2,'0');
    }

    start() {
        this.reset();
        this.isUp = false;
        this.isPaused = false;
    }

    pause() {
        this.isPaused = true;
    }

    continue() {
        this.isPaused = false;
    }

    reset() {
        this.secondsToGo = Math.floor(this.minutesSet * 60);
        this.isUp = false;
        this.isPaused = true;
        this.inject();
    }

    inject() {
        this.minutesElement.innerHTML = this.getMinutes();
        this.secondsElement.innerHTML = this.getSeconds();
    }
}

const minutesSet = 20;
const timeElement = document.getElementById('time');
timeElement.value = minutesSet;
const minutesElement = document.getElementById('mins');
const secondsElement = document.getElementById('secs');
const timer = new Timer(minutesSet, minutesElement, secondsElement);

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

