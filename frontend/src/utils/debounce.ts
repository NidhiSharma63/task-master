/**
 * debouncing
 */
const debounceFunc = (fn: () => void, delay: number): (() => void) => {
  return function () {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};
export default debounceFunc;
