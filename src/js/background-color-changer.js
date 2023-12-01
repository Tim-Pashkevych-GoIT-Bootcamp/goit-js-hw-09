class BackgroundColorChanger {
  #isRunning;
  #timerId;
  #delay;
  #startBtn;
  #stopBtn;
  #btn;

  constructor({ delay, startBtn, stopBtn, btn }) {
    this.#delay = delay;
    this.#startBtn = startBtn;
    this.#stopBtn = stopBtn;
    this.#btn = btn;

    this.#isRunning = false;
    this.#timerId = null;

    // Set Button Text
    this.#btn.textContent = 'Start';
  }

  process() {
    // Click on Stop Button
    if (this.#isRunning) {
      this.stop();
    }
    // Click on Start Button
    else {
      this.start();
    }
  }

  start() {
    if (this.#isRunning) {
      return;
    }

    this.#isRunning = true;
    this.#btn.textContent = 'Stop';

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
    this.#btn.textContent = 'Start';

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
