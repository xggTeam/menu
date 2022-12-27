// pages/comment/commentIndex.js
wx.cloud.init({
  evn: "cloud1-0gmoyy4g42aefbe5"
})
const DB = wx.cloud.database().collection('menu_home')
let menuInfo
let openInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuName: '',
    menuImg: '',
    inputContent: '',
    inputScore: 0,
    flag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    menuInfo = options
    this.setData({
      menuName: options.menuName,
      menuImg: options.menuImg,
    })
    wx.cloud.callFunction({ name: 'getOpenId' }).then(res => { openInfo = res.result })
  },
  // 发布评论
  commentBtn() {
    DB.doc(menuInfo.menuId).get().then(res => {
      const whereData = res.data.comment
      let nowData = {
        desc: this.data.inputContent,
        rate: this.selectComponent('#rateScore').data.rate,
        score: this.data.inputScore
      }
      let flag = false
      let indexVal = 0
      whereData.map((item, index) => {
        if (item.openId && item.openId === openInfo.openid) {
          flag = true
          indexVal = index
        }
      })
      if (flag) {
        whereData[indexVal].childComment.unshift(nowData)
      } else {
        const newNowData = {
          openId: openInfo.openid,
          childComment: [{
            desc: this.data.inputContent,
            rate: this.selectComponent('#rateScore').data.rate,
            score: parseInt(this.data.inputScore)
          }]
        }
        whereData.push(newNowData)
      }
      wx.showLoading({
        title: '发送中...',
      })
      wx.cloud.callFunction({
        name: "updateData",
        data: {
          comment: whereData,
          menuId: menuInfo.menuId
        }
      }).then(res => {
        wx.showLoading({
          title: '发布成功',
        })
        setTimeout(() => {
          wx.hideLoading()
          // wx.switchTab({
          //   url: '/pages/home/homeIndex',
          // })
          //获取页面栈  
          // var pages = getCurrentPages();
          // if (pages.length > 1) {
          //   //上一个页面实例对象  
          //   var prePage = pages[pages.length - 2];
          //   //关键在这里,这里面是触发上个界面的方法 
          //   setTimeout(() => {
          //     prePage.getDataList(0) // 123
          //   }, 2000)
          // }

        }, 2000)
      }).catch(err => {
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  submit(e) {
    if (e.detail.value.comment == '') {
      wx.showToast({
        title: '请输入回复内容',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '发送中...',
      })
      const Time = utils.formatTime(new Date())
      const sendtime = Time.split(' ')
      const hs = sendtime[1].split(':')
      const HS = hs[0] + ':' + hs[1]
      const commentTime = sendtime[0] + ' ' + HS
      const openid = wx.getStorageSync('openId')
      const userInfo = wx.getStorageSync('userInfo')
      if (openid) {
        if (openid == this.data.dynamicOpenid && this.data.placeholder == '我来说两句~') {        //判断是否为楼主
          wx.cloud.callFunction({
            name: "addComment",
            data: {
              avatarUrl: userInfo.avatarUrl,       //回复者头像
              nickName: userInfo.nickName,      //回复者名称
              _id: this.pagesData,   //动态ID,随机数
              commentText: e.detail.value.comment,   //回复内容
              commentTime: commentTime,            //回复时间
              openid: openid,                    //回复者openid
              replyName: '',         //被回复者名称
              isbuilding: true,          //是否为楼主
              childComment: [],        //子评论
              id: Math.floor(Math.random() * 100000000)                  //通过该条记录在父评论数组中的索引来添加子评论
            },
            success: res => {
              wx.showToast({
                title: '评论成功！',
                icon: 'success'
              })
              this.setData({
                value: ''
              })
              wx.hideLoading({
                success: (res) => { },
              })
              this.getDynamic()
            }
          })
        } else if (openid != this.data.dynamicOpenid && this.data.placeholder == '我来说两句~') {
          wx.cloud.callFunction({
            name: "addComment",
            data: {
              avatarUrl: userInfo.avatarUrl,       //回复者头像
              nickName: userInfo.nickName,      //回复者名称
              _id: this.pagesData,  //动态ID
              commentText: e.detail.value.comment,   //回复内容
              commentTime: commentTime,            //回复时间
              openid: openid,                    //回复者openid
              replyName: '',         //被回复者名称
              isbuilding: false,          //是否为楼主
              childComment: [],        //子评论
              id: Math.floor(Math.random() * 100000000)                     //通过该条记录在父评论数组中的索引来添加子评论
            },
            success: res => {
              wx.showToast({
                title: '评论成功！',
                icon: 'success'
              })
              this.setData({
                value: ''
              })
              this.getDynamic()
              wx.hideLoading({
                success: (res) => { },
              })
            }
          })
        } else if (openid == this.data.dynamicOpenid && this.data.placeholder != '我来说两句~') {
          wx.cloud.callFunction({
            name: "addChildComment",
            data: {
              avatarUrl: userInfo.avatarUrl,       //回复者头像
              nickName: userInfo.nickName,      //回复者名称
              _id: this.pagesData,   //动态ID,随机数
              commentText: e.detail.value.comment,   //回复内容
              commentTime: commentTime,            //回复时间
              openid: openid,                   //回复者openid
              replyName: this.data.name,         //被回复者名称
              isbuilding: true,          //是否为楼主
              index: this.data.index,        //对象数组索引
              id: Math.floor(Math.random() * 100000000)                 //通过该条记录在父评论数组中的索引来添加子评论
            },
            success: res => {
              wx.showToast({
                title: '评论成功！',
                icon: 'success'
              })
              this.setData({
                value: ''
              })
              wx.hideLoading({
                success: (res) => { },
              })
              this.getDynamic()
            }
          })
        } else if (openid != this.data.dynamicOpenid && this.data.placeholder != '我来说两句~') {
          wx.cloud.callFunction({
            name: "addChildComment",
            data: {
              avatarUrl: userInfo.avatarUrl,       //回复者头像
              nickName: userInfo.nickName,      //回复者名称
              _id: this.pagesData,   //动态ID,随机数
              commentText: e.detail.value.comment,   //回复内容
              commentTime: commentTime,            //回复时间
              openid: openid,                    //回复者openid
              replyName: this.data.name,         //被回复者名称
              isbuilding: false,          //是否为楼主
              index: this.data.index,        //对象数组索引
              id: Math.floor(Math.random() * 100000000)                 //通过该条记录在父评论数组中的索引来添加子评论
            },
            success: res => {
              wx.showToast({
                title: '评论成功！',
                icon: 'success'
              })
              this.setData({
                value: ''
              })
              wx.hideLoading({
                success: (res) => { },
              })
              this.getDynamic()
            }
          })
        }
      } else {
        wx.showToast({
          title: '请登录',
          icon: 'none'
        })
      }
    }
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

  },
  // 评分
  select(e) {
    this.setData({
      inputRate: e.detail.value
    })
  },
  // 打分输入框
  bindInput(e) {
    this.setData({
      inputScore: e.detail.value
    })
  },
  // 文本输入框
  bindTextAreaBlur(e) {
    this.setData({
      inputContent: e.detail.value
    })
  },
})