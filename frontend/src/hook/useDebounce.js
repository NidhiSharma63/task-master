const useDebounce = () => {
  const debounceFunc = (fn, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  };
  return debounceFunc;
};

export default useDebounce;
