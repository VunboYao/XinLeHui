// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea: '如实填写需要帮助人的信息，住再哪里，哪里人，患了什么病，家庭遇到的困难，已经花了多少钱，还需要多少等（不少于10个汉字）',
    imagesFiles: [],
    videoFiles: []
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
        console.log(res.tempFilePath)
        _this.setData({
          videoFiles: _this.data.videoFiles.concat(res.tempFilePath)
        })
      }
    })
  },
  // previewVideo: function(e) {
  //   const _this = this
  //   const videoContext = _this.videoContext
  //   _this.setData({

  //   })
  // },

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