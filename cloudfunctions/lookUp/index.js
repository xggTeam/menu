// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// 初始化数据库
const db = cloud.database()
const _ = db.command
const $ = _.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('menu_home').aggregate().lookup({
    from: 'menu_home_img', //from: <要连接的集合名>,
    localField: 'menu_home_id',// localField: <输入记录的要进行相等匹配的字段>,
    foreignField: 'menu_home_id',// foreignField: <被连接集合的要进行相等匹配的字段>,
    as: 'home_img'// as: <输出的数组字段名>
  })
    // 数据合并及 解构 
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$home_img', 0]), '$$ROOT'])
    })
    // 数据合并及 解构
    .project({
      home_img: 0
    })
    // 查询条件
    // .match({
    //   menu_name: '红烧肉'
    // })
    .end()
    // .then(res => {
    //   console.log('ddddddd', res)
    // })
    // .catch(err => {
    //   console.log('sssss', err)
    // })
}