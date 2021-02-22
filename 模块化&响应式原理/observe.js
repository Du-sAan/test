import Observer from "./Observer.js"

export const observe = function (value) {
  // 如果value不是对象,什么都不做
  if (value instanceof Object === false) return;

  // 若value是对象
  let ob = undefined;
  if (typeof value.__ob__ !== "undefined") {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob
  
  
}