// index.js
// 获取应用实例
const app = getApp()
let openInfo
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    newList: []
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    /**
     * 动态修改标题
     */
    wx.setNavigationBarTitle({
      title: '我的'
    })
    wx.cloud.callFunction({ name: 'getOpenId' }).then(res => { openInfo = res.result })
  },
  getMyself() {
    wx.showLoading({
      title: '加载中。。。',
    })
    wx.cloud.callFunction({
      name: "getMyselfList",
      data: {
        database: 'menu_home'
      }
    }).then(res => {
      wx.hideLoading()
      const newMySelfList = []
      res.result.data.map(itemResult => {
        itemResult.comment.map(itemComment => {
          if (itemComment.openId === openInfo.openid) {
            let commentList = []
            commentList.push(...itemComment.childComment)
            const params = {
              menuImg: itemResult.menuImg,
              menuName: itemResult.menuName,
              comment: commentList
            }
            newMySelfList.push(params)
          }
        })
      })
      this.setData({
        newList: newMySelfList
      })
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow(){
    this.getMyself()
  }
})
