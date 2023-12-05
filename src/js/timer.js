class Timer {
  #timerId;
  #timestamp;

  constructor(timestamp = 0) {
    this.#timestamp = timestamp ?? Date.now();
  }

  set timestamp(timestamp) {
    if (this.#isValidTimestamp(timestamp)) {
      this.#timestamp = timestamp;
    }
  }

  // Function to validate selected date
  #isValidTimestamp(timestamp) {
    if (timestamp - Date.now() <= 0) {
      this.#stop();
      throw new Error('Invalid date');
    }

    return true;
  }

  start(callback) {
    // Reset our timer in case a new date is selected
    if (this.#timerId) {
      this.#stop();
    }

    // Checking if selected timestamp is valid
    if (this.#isValidTimestamp(this.#timestamp)) {
      this.#timerId = setInterval(this.#tick.bind(this), 1000, callback);
    }
  }

  #stop() {
    clearInterval(this.#timerId);
  }

  #tick(callback) {
    try {
      if (this.#isValidTimestamp(this.#timestamp)) {
        // Call a callback function and pass interval object with leading zero values
        callback(
          Object.entries(this.#convertMs()).reduce((result, value) => {
            result[value[0]] = this.#addLeadingZero(value[1]);
            return result;
          }, {})
        );
      }
    } catch (error) {
      this.#stop();
    }
  }

  #convertMs() {
    const interval = this.#timestamp - Date.now();

    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(interval / day);
    // Remaining hours
    const hours = Math.floor((interval % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((interval % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((interval % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  #addLeadingZero(value) {
    return value.toString().padStart(2, 0);
  }
}

export default Timer;
