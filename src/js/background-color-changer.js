class BackgroundColorChanger {
  #isRunning;
  #timerId;
  #delay;
  #startBtn;
  #stopBtn;

  constructor({ delay, startBtn, stopBtn }) {
    this.#delay = delay;
    this.#startBtn = startBtn;
    this.#stopBtn = stopBtn;

    this.#isRunning = false;
    this.#timerId = null;
  }

  start() {
    if (this.#isRunning) {
      return;
    }

    this.#isRunning = true;
    this.#timerId = setInterval(() => {
      document.body.style.backgroundColor = this.#getRandomHexColor();
    }, this.#delay);

    // Add 'disabled' attribute to START button
    this.#startBtn.setAttribute('disabled', 'disabled');
  }

  stop() {
    if (!this.#isRunning) {
      return;
    }

    this.#isRunning = false;
    clearInterval(this.#timerId);

    // Remove 'disabled' attribute from START button
    this.#startBtn.removeAttribute('disabled');
  }

  #getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
}

export default BackgroundColorChanger;
