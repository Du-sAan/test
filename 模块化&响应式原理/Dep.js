let uid = 0
export default class Dep {
  constructor() {
    this.id = uid++
    // 用数组存储自己的订阅者,Watcher的实例
    this.subs = []
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub);
  }
  // 添加依赖
  depend() {
    // 使用全局变量Dep.target，收集依赖数组的Watcher
    if(Dep.target){
      this.addSub(Dep.target)
    }
  }
  // 通知更新
  notify() {
    // 浅克隆一份subs
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      // 循环调用Watcher实例中的update方法，更新数据
      // 即通知订阅者，新的数据
      subs[i].update()
    }
  }

}