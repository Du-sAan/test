import Dep from "./Dep.js"
let uid = 0
function parsePath(expression) {
  // 用.将传入的访问对象属性的语法分割开来
  let segments = expression.split(".")
  return (obj) => {
    for (let i = 0 , l = segments.length; i < l; i++) {
      // 若向上取值时，某个值不存在
      if (!obj) return ;
      obj = obj[segments[i]]
    }
    return obj
  }
}
export default class Watcher {
  // target 所要监听的对象
  // expression 对象的表达式( obj.a)
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target

    // 解析访问对象属性.语法的函数,getter为函数
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
    
  }
  update() {
    this.run()
  }
  // 依赖收集
  get() {
    
    // 让全局的Dep.target等于Watcher实例本身,进入收集依赖
    Dep.target = this
    // 拿到需要监听的对象,传入的参数obj
    const obj = this.target
    let  value
    try {
      // 解析.语法，拿到a.b.c.d的值
      value = this.getter(obj)
    } finally {
      Dep.target = null
    }
    
    return value
  }

  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke( cb) {
    const value = this.get();
    if(value !== this.value || typeof value == "object"){
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }

  }
}