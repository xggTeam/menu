// pages/detail/detailIndex.js
let pageNo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuName: '菜品名称及描述',
    menuImg: '菜品图片',
    menuId: "菜品id",
    commentList: [],
    loadTip: false,
    imgFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('options detail', options)
    this.setData({
      menuName: options.menuName,
      menuImg: options.menuImg,
      menuRate: options.menuRate,
      menuId: options.menuId
    })
    /**
     * 动态修改标题
     */
    wx.setNavigationBarTitle({
      title: options.menuName + "详情",
    })
    pageNo = 0
    this.getDetail(pageNo)
  },
  // 获取详情及评价
  getDetail(pageNo) {
    wx.showLoading({
      title: '加载中。。。',
    })
    wx.cloud.callFunction({
      name: 'getDetail',
      data: {
        pageNo: 10 * pageNo, //第几条开始
        pageSize: 10, //每页加载多少条
        database: 'menu_home', //动态配置需要的数据库名称
        menuId: this.data.menuId
      }
    }).then(res => {
      if (res.result.data[0].comment.length <= 0) {
        wx.showToast({
          icon: 'none',
          title: '没有更多数据了！！',
        })
      }
      wx.hideLoading()
      this.setData({
        imgFlag: true
      })
      const newCommentList = []
      res.result.data[0].comment.map(item => {
        newCommentList.push(...item.childComment)
      })
      console.log('newCommentList', newCommentList)
      this.setData({
        commentList: newCommentList
      })
    }).catch(err => {

    })
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
    this.getDetail(pageNo)
  },
  scrollToLower() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})