// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event', event, context)
  return cloud.database().collection('menu_home').skip(1).limit(10).get({
    success(res) {
      return res
    },
    fail(err) {
      return err
    }
  })
}