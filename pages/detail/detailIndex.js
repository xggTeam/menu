// pages/detail/detailIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuName: '菜品名称及描述',
    commentList: [
      { dec: 'sssadsadsad', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
      { dec: 'ffffffff', rate: 3 },
    ],
    loadTip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      menuName: options.menuName
    })
    /**
     * 动态修改标题
     */
    wx.setNavigationBarTitle({
      title: options.menuName + "详情",
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
    console.log('ddddddddddd上拉加载')
    this.setData({
      loadTip: true
    })
    setTimeout(() => {
      this.setData({
        loadTip: false
      })

    }, 2000)
  },
  scrollToLower() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})