import { observe } from "./observe.js";
import Dep from "./Dep.js"
export default function defineReactive(data, key, value) {
  const dep = new Dep();
  // 如果没传第三个参数
  if (arguments.length === 2) {
    value = data[key]
  }
  // 调用observe函数,形成循环调用
  let childObj = observe(value);

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      // 若正处于收集依赖的阶段
      if(Dep.target){
        dep.depend();
        // 若新元素存在
        if(childObj){
          childObj.dep.depend()
        }
      }
      return value;
    },
    set(newValue) {
      console.log(`你试图设置${key}`,value)
      // 若新值与原来的值相同，则什么都不做
      if (newValue === value) return;
      value = newValue;
      // 当设置了新值，也加入响应式系统中
      childObj = observe(newValue);
      // 在set中触发依赖,通知订阅者改变自身的值
      dep.notify()
    }
  })
  
}