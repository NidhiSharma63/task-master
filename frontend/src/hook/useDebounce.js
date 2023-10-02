const useDebounce = () => {
  const debounceFunc = (fn, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('i run');
        fn();
      }, delay);
    };
  };
  return debounceFunc;
};

export default useDebounce;
