// get value from local storage
export const getValueFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// set value to ls
export const setValueToLs = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
