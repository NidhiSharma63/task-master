const useDebounce = () => {
  const debounceFunc = (fun: () => void, delay: number): (() => void) => {
    let timer: NodeJS.Timeout;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun();
      }, delay);
    };
  };
  return debounceFunc;
};

export default useDebounce;
