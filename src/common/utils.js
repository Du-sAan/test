// 防抖和节流函数
export function debounce(func, dalay) {
  let timer = null;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, dalay);
  };
}
export function throttle(func, dalay) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, dalay);
    }
  };
}