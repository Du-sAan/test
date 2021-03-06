import { def } from "./until.js"
import defineReactive from "./defineReactive.js"
import { ArrayMethods } from "./array.js"
import { observe } from "./observe.js"
import Dep from "./Dep.js"

export default class Observer {
  constructor(value) {
    // 给每个对象的__ob__属性都加上dep类的实例,用来收集依赖
    this.dep = new Dep();

    // 给传进来的对象添加__ob__不可枚举属性属性,且属性的值为Observer实例(this)
    def(value, "__ob__", this, false)
    // 将对象的每个属性都变成setter,getter
    // 判断传入对象的类型，如果为数组，则改写他们的7个方法
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, ArrayMethods)
      this.observeArray(value)
    } else {
      // 如果不是对象不是数组类型，则遍历其每个属性，并将其转化为set,get
      this.walk(value)
    }
  }

  // 定义遍历
  walk(value) {
    for (let key in value) {
      // 因为这里只穿了两个属性，所以defineReactive函数
      // 会自动将value[key] 赋值给第三个参数，也就是getter函数的返回值
      defineReactive(value, key)
    }
  }
  observeArray(arr) {
    for (let i = 0,l = arr.length; i < l; i++){
      observe(arr[i])
    }
  }
} 