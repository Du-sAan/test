
function defineReactive(data, key, value) {
  if (arguments.length === 2) {
    value = data[key]
  }
  // 收集依赖
  const dep = new Dep()
  // 通过walk函数将第一层转换为get,set后,继续使用observe函数转换
  let childValue = observe(value)
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      // do sth
      console.log(`你访问了${key}`, value)
      if (Dep.target) {
        dep.depend();
        // 若新元素存在
        if (childValue) {
          console.log(childValue)
          childValue.dep.depend()
        }
      }
      return value
    },
    set(newValue) {
      console.log(`你试图设置${key}`, value)
      if (newValue === value) return
      value = newValue
      // 当设置了新值newValue，也加入响应式系统中
      childValue = observe(newValue);
      // 触发依赖
      dep.notify()
    }
  })
}
function def(data, key, value) {
  Object.defineProperty(data, key, {
    value,
    configurable: true,
    enumerable: false,
    writable: true
  })
}
// 数组的响应式处理
const arrayMethods = Object.create(Array.prototype)
// 被改写的七个方法
const nativeMethods = [
  "pop",
  "push",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
]
nativeMethods.forEach(methodName => {
  // 保存原来的方法
  let oldMethod = Array.prototype[methodName]
  // 给arrayMethods对象加上这7个方法,不用箭头，防止上下文this && arguments出现问题
  def(arrayMethods, methodName, function () {


    // 取得this(数组): 谁调用方法(7个方法),this就指向谁,所以说this为数组，这时，this已经被observe函数
    // 函数处理过，添加上了__ob__属性,所以可以去除this中的Observer的实例__ob__
    const ob = this.__ob__;

    // 因为push,unshift,splice方法可以插入新项，所以需要新项也转化为set,get
    // 保存插入的项
    const inserted = []
    switch (methodName) {
      // 若调用的方法为push || unshift 则直接将function ()的参数赋值给inserted
      case "push":
      case "unshift":
        inserted = [...arguments];
        break;
      case "splice":
        // 因为arguments不是数组，且splice方法是(下标，数量，新项)
        // 所以使用[...arguments].slice(2)方法取出新插入的项
        inserted = [...arguments].slice(2);
    }
    // 判断有没有新插入的项，调用ob(Observer实例)的arrayObserve将其变为set,get
    if (inserted) {
      ob.arrayObserve(inserted)
    }

    // 恢复原来7个方法的功能
    const result = oldMethod.apply(this, arguments)

    // 数组同样需要触发依赖
    ob.dep.notify();
    // pop等方法会有返回值，，
    return result
  })

})
function observe(value) {
  // 若传入的值不是对象，则什么都不做
  if (value instanceof Object === false) return;

  let ob = null;
  // 若对象中有__ob__属性
  if (typeof value.__ob__ !== "undefined") {
    ob = value.__ob__
  } else {
    // 若对象中没有__ob__属性，则给他添加上
    ob = new Observer(value)
  }
}
class Dep {
  constructor() {
    this.id = Dep.id++
    // 订阅者
    this.subs = []
  }
  static id = 0
  // 通知更新
  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
  // 增加订阅者 
  addSub(watcher) {
    this.subs.push(watcher)
  }

  //添加依赖 
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
}
class Watcher {
  constructor(target, expression, callback) {
    this.id = Watcher.id++;

    this.target = target
    this.callback = callback
    this.getter = Watcher.parsePath(expression)
    this.value = this.get()
  }
  // 解析.语法的函数
  static parsePath(expression) {
    let segments = expression.split(".");
    return obj => {
      for (let i = 0, l = segments.length; i < l; i++) {
        // 若obj不存在,则返回
        if (!obj) return
        obj = obj[segments[i]]

      }
      return obj
    }
  }
  static id = 0
  update() {
    this.run()
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  get() {
    // 开始订阅
    Dep.target = this
    const obj = this.target

    let value;
    try {
      // 拿到.语法取到的值
      value = this.getter(obj)
    } finally {
      // 订阅完毕，将全局的Dep.target置为null
      Dep.target = null
    }
    return value
  }
  getAndInvoke(cb) {
    const value = this.get()
    if (value !== this.value || typeof value == "object") {
      // 若原来的值发生改变，则触发回调函数,并改变自己订阅的值
      const oldValue = this.value;
      this.value = value
      // 回调函数的值为obj,两个参数分别为新值和旧值
      cb.call(this.target, this.value, oldValue)
    }
  }

}
class Observer {
  constructor(value) {
    // 给每个Observer的实例，加上Dep的实例，用来触发依赖
    this.dep = new Dep()
    // 给传入的对象添加__ob__属性
    def(value, "__ob__", this)
    // 若传入的是数组，则将arrayMethods作为数组类型原型链的前一个原型
    // 这样,数组调用7个方法，就会先用arrayMethods上的方法
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods)
      this.arrayObserve(value)
    } else {
      // 如果不是数组，则直接调用walk函数将其属性转换为get,set
      this.walk(value)
    }
  }

  // 将属性定义为set,get的函数
  walk(value) {
    for (let key in value) {
      defineReactive(value, key)
    }
  }
  // 将数组的每一项元素定义为set,get
  arrayObserve(arr) {
    // 将l赋值，防止数组的长度发生变化
    for (let i = 0, l = arr.length; i < l; i++) {
      // 将数组的每一项转化为set,get
      observe(arr[i])
    }
  }
}

let obj = {
  name: "hm",
  message: {
    width: 32,
    height: 174
  },
  int: ["起飞", "芜湖"]
}
observe(obj)
new Watcher(obj, "message.width", (newValue, oldValue) => {
  console.log("Watcher",newValue, oldValue)
})


obj.message.width = 0