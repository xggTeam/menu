// pages/home/homeIndex.js
import util from "../../utils/util"
wx.cloud.init({
  evn: "cloud1-0gmoyy4g42aefbe5"
})
const DB = wx.cloud.database().collection('menu_home')
let pageNo
let menuType
let e = {
  detail: {
    value: 'morning'
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.format(new Date()),
    items: [
      { value: 'morning', name: '早' },
      { value: 'noon', name: '中' },
      { value: 'night', name: '晚' },
    ],
    list: [],
    rateIsSelect: false,
    homeList: false,
    listCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCount()
    const nowDate = (new Date()).getHours()
    if (0 < nowDate && nowDate < 11) {
      e.detail.value = 'morning'
    } else if (nowDate > 11 && nowDate < 17) {
      e.detail.value = 'noon'
    } else {
      e.detail.value = 'night'
    }
    this.radioChange(e)
    pageNo = 0
    this.getDataList(pageNo)

  },
  getDataList(pageNo) {
    wx.showLoading({
      title: '加载中。。。',
    })
    wx.cloud.callFunction({
      name: 'getList',
      data: {
        pageNo: 5 * pageNo, //第几页开始
        pageSize: 5, //每页加载多少条
        database: 'menu_home', //动态配置需要的数据库名称
        searchTime: this.data.date,
        searchType: menuType
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result.data.length <= 0) {
        wx.showToast({
          icon: 'none',
          title: '没有更多数据了！！',
        })
      }
      this.setData({
        list: this.data.list.concat(res.result.data)
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  getCount() {
    wx.cloud.callFunction({
      name: 'getCount', data: {
        database: 'menu_home'
      }
    }).then(res => {
      this.setData({
        listCount: res.result.total
      })
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.data.list = []
    this.getDataList(pageNo)
  },
  radioChange(e) {
    menuType = e.detail.value
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
    this.data.list = []
    this.getDataList(pageNo)
  },
  /**
   * 详情按钮
   */
  detailBtnClick() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    pageNo++
    this.getDataList(pageNo)
    this.setData({
      homeList: true
    })
    this.setData({
      homeList: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})