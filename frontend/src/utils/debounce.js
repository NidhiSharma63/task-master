/**
 * debouncing
 */
const debounceFunc = (fn, delay) => {
  return function () {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};
export default debounceFunc;
