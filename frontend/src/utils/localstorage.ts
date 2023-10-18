// get value from local storage
export const getValueFromLS = (key: string) => {
  const item = localStorage.getItem(key) === 'string';
  if (typeof item === 'string') {
    return JSON.parse(item);
  }
};

// set value to ls
export const setValueToLs = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};
