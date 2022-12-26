// pages/manager/managerIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  uploadImg() {
    wx.chooseImage({
      count: 5,//- this.data.img_arr.length, //上传图片的数量 当之前上传了部分图片时 ,总数 - 已上传数 = 剩余数   (限制上传的数量)
      sizeType: ['original', 'compressed'],  //可以指定原图或压缩图,默认二者都有
      sourceType: ['album', 'camera'],        //指定图片来源是相机还是相册,默认二者都有
      success: res => {
        const tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths[0])
        wx.uploadFile({
          url: 'example.png', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            const data = res.data
            console.log('sssssssssssss', data)
          },
          fail(err) {
            console.log('err', err)
          }
        })
      },
      fail(err) {
        console.log('上传失败', err)
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})