// pages/home/homeIndex.js
import util from "../../utils/util"
// wx.cloud.init({
//   evn: "cloud1-0gmoyy4g42aefbe5"
// })
const DB = wx.cloud.database().collection('menu_home')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.format(new Date()),
    items: [
      { value: 'morning', name: '早' },
      { value: 'noon', name: '中', checked: 'true' },
      { value: 'night', name: '晚' },
    ],
    list: [
      {
        name: '红烧肉',
        img: '../../image/home_bg.png',
        rate: 3
      },
      {
        name: '溜肉段',
        img: '../../image/full_g.png',
        rate: 4
      },
      {
        name: '红烧肉',
        img: '../../image/full_g.png',
        rate: 2
      },
      {
        name: '红烧肉',
        img: '../../image/full.png',
        rate: 1
      },
    ],
    rateIsSelect: false,
    homeList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    DB.get().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    DB.get({
      success(res) {
        console.log('success', res)
      },
      fail(err) {
        console.log('fail', err)
      }
    })
    wx.cloud.callFunction({
      name: 'getOpenId',
      success(res) {
        console.log('回调 getOpenId', res)
      },
      fail(err) {
        console.log('回调 getOpenId', err)
      }
    })
    wx.cloud.callFunction({
      name: 'getList',
      success(res) {
        console.log('回调 getList', res)
      },
      fail(err) {
        console.log('回调 getList', err)
      }
    })
    wx.cloud.callFunction({
      name: 'lookUp',
      success(res) {
        console.log('回调 lookUp', res)
      },
      fail(err) {
        console.log('回调 lookUp', err)
      }
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
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
    this.setData({
      homeList: true
    })
    setTimeout(() => {
      this.setData({
        homeList: false
      })
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})