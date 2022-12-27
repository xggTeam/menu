// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const $ = cloud.database()
const _ = $.command
// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database().collection(event.database)
    .skip(event.pageNo)
    .limit(event.pageSize)
    .where({ _id: event.menuId })
    .get()
}