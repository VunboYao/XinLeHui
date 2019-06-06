// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea: '如实填写需要帮助人的信息，住再哪里，哪里人，患了什么病，家庭遇到的困难，已经花了多少钱，还需要多少等（不少于100个汉字）',
    imagesFiles: [],
    videoFiles: [],
    chooesVideo: ''
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        that.setData({
          imagesFiles: that.data.imagesFiles.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    const _this = this;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: _this.data.imagesFiles // 需要预览的图片http链接列表
    })
  },
  chooseVideo (e) {
    const _this = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success (res) {
        // console.log(res.tempFilePath)
        _this.setData({
          videoFiles: _this.data.videoFiles.concat(res.tempFilePath)
        })
      }
    })
  },
  previewVideo: function(e) {
    // const _this = this
    // const videoContext = wx.createVideoContext('previewV')
    // console.log(e)
    // this.setData({
    //   chooesVideo: e.currentTarget.id
    // })
    // videoContext.seek(0)
    // videoContext.play()
    // videoContext.requestFullScreen()
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const name = e.detail.value.name
    const money = e.detail.value.money
    const title = e.detail.value.title
    const intro = e.detail.value.intro
    if (!name) {
      wx.showToast({
        title: '请填写需要帮助人的姓名',
        icon: 'none'
      })
      return
    }
    if (!money) {
      wx.showToast({
        title: '请填写希望筹到金额',
        icon: 'none'
      })
      return
    }
    if (!title) {
      wx.showToast({
        title: '请为您的发起填写标题',
        icon: 'none'
      })
      return
    }
    if (!intro) {
      wx.showToast({
        title: '请填写详细信息',
        icon: 'none'
      })
      return
    }
    // 上传
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})