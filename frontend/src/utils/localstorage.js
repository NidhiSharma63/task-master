// get value from local storage
export const getValueFromLS = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};

// set value to ls
export const setValueToLs = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
