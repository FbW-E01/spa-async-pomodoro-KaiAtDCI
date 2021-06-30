export default class Timer {

    constructor(minutes, minutesElement, secondsElement) {
        this.minutes = minutes;
        this.minutesElement = minutesElement;
        this.secondsElement = secondsElement;
        this.reset();
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
        this.minutes = minutes;
        this.inject();
    }

    start() {
        this.reset();
        this.isPaused = false;
    }

    pause() {
        this.isPaused = true;
    }

    continue() {
        this.isPaused = false;
    }

    reset() {
        this.secondsToGo = Math.floor(this.minutes * 60);
        this.isUp = false;
        this.isPaused = true;
        this.inject();
    }

    inject() {
        const minutes = String(Math.floor(this.secondsToGo / 60)).padStart(2,'0');
        const seconds = String(Math.floor(this.secondsToGo % 60)).padStart(2,'0');
        this.minutesElement.innerHTML = minutes;
        this.secondsElement.innerHTML = seconds;
    }
}