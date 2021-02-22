import {def} from "./until.js"
export const ArrayMethods = Object.create(Array.prototype);

// 被改写的七个方法
let NativeMethods = [
  "pop",
  "push",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
]
NativeMethods.forEach( method => {
  // 备份原来的方法,并将7个方法改写进ArrayMethods中
  // 调用工具函数，默认防止修改
  const oldMethods = Array.prototype[method]
  def( ArrayMethods, method, function(){

    // 调用原生数组的方法,恢复7个方法原来的作用
    const result = oldMethods.call(this, ...arguments)
    
    const ob = this.__ob__;

    // 三种方法能够插入新项
    let inserted = [];

    switch (method) {
      case "push" : 
      case "unshift" : 
        // arguments不是数组，所以将arguments转换为数组
        inserted = [...arguments];
        break;
      case "splice" :
        inserted = [...arguments].slice(2);
        break;
    }

    // 判断有没有要插入的新项,让插入的新项也被转换为访问器
    if(inserted){
      ob.observeArray(inserted)
    }
    // 在数组中同样触发依赖
    ob.dep.notify()
    return result
  },false)
})
