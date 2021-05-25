const fs = require("fs")

let query = async function (params) {
  let result = null;
  try {
    let data = await fs.readFileSync("./virtul_data/user.json", 'utf8')
    // 根据传入用户信息的手机号作为查询依据
    result = JSON.parse(data)[params.phone]
    console.log("查询结果,promise", result)
  } catch (err) {
    console.log("err", err)
  }
  return result
}

module.exports = query
