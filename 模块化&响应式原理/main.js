import { observe } from "./observe.js"
import Watcher from "./Watcher.js"

let obj = {
  a: {
    b: {
      c: {
        d: 5
      }
    }
  },
  num: ["1", "2"],
  aa: 1
}


// let btn = document.querySelector("button");
// btn.addEventListener("click", () => {
//   // import函数返回一个promise实例
//   let p = import("./import.js")
//   setTimeout( console.log, 2000 , p)
//   p.then( (module) => {
//     console.log(module);
//     console.log(module.default)
//     console.log(module.name)
//   })
// },false)
observe(obj);
new Watcher(obj, "a.b.c.d", value => {
  console.log("※******",value)
})
obj.a.b.c.d = 88
console.log(obj.a.b.c.d)
