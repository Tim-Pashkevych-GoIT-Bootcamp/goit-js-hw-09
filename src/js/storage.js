const localStorageManager = {
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      if (serializedValue) {
        localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      console.log(
        `Could not save '${key}:${value}' to Local Sorage. Error:`,
        error
      );
    }
  },
  get(key) {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue === null ? undefined : JSON.parse(serializedValue);
    } catch (error) {
      console.log(
        `Could not retrieve '${key}' from Local Sorage. Error:`,
        error
      );
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(`Could not remove '${key}' from Local Sorage. Error:`, error);
    }
  },
};

export default localStorageManager;
