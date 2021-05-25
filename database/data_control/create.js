const fs = require("fs")
let create = function ( user) {
  // 先让文件读取出来，新增数据后，然后再写入
  fs.readFile("./virtul_data/user.json", (err, data) => {
    if(err) console.log("erros ---",err);
    // 将文件内容全部读取出来，解析为json对象
    let json = JSON.parse(data);
    // 将新增的内容添加到对象中
    json[user.phone] = user.info;
    // 写入
    let str = JSON.stringify(json)
    fs.writeFile("./virtul_data/user.json", str, (err) => {
      if(err) console.log("写入文件失败")
      console.log("写入文件成功")
    })
  })
  return "注册成功"
}
module.exports = create