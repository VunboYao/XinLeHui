// my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    grids: [0, 1, 2]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        _this.setData({
          userInfo: res.data
        })
      },
    })
  },
  // 用户授权
  onUserInfo(e) {
    // 获取用户信息
    const userInfo = e.detail.userInfo;
    // 更新数据
    this.setData({
      userInfo
    })
    // 存入本地
    wx.setStorageSync('userInfo', userInfo);
    // 存入全局
    app.globalData.userInfo = userInfo;
  },

  // 电话
  onPhone(){
    wx.makePhoneCall({
      phoneNumber: '17664056605' //仅为示例，并非真实的电话号码
    })
  }
})
