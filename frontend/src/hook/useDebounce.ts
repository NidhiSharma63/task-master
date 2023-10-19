const useDebounce = () => {
  const debounceFunc = (fn: () => void, delay: number): (() => void) => {
    let timer: NodeJS.Timeout;
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
