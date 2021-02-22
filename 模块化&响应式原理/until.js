// 工具函数，用来给对象添加__ob__属性
export const def =  function (data, key, value, enumerable) {
  Object.defineProperty( data, key ,{
    value,
    enumerable,
    writable : true,
    configurable : true
  })
}