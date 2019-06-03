// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },

  getUserInfo: function (e) {
    const that = this
    wx.getUserInfo({
      success(res) {
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo,
        })
        app.globalData.userInfo = res.userInfo,
        app.globalData.hasUserInfo = true,
        that.data.hasUserInfo = true
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      fail(err) {
        wx.showModal({
          title: '提示',
          content: '您点击了拒绝授权，将无法使用小程序全部功能，请确认授权',
          showCancel: false,
          confirmText: '返回授权'
        })
      }
    })
  },
})
