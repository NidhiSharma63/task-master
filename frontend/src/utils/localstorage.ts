import { KEY_FOR_STORING_TOKEN } from 'src/constant/Misc';

// get value from local storage
export const getValueFromLS = (key: string) => {
  const item = localStorage.getItem(key);
  if (key === KEY_FOR_STORING_TOKEN) return item;
  if (typeof item === 'string') {
    return JSON.parse(item);
  }
};

// set value to ls
export const setValueToLs = (key: string, value: string | null) => {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    // Handle the error here
    console.error('Error setting value to localStorage: ', error);
  }
};
