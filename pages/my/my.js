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
  // 显示时，如果用户授权了，本地信息中如果有则获取用户信息
  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
  },

  // 用户授权
  onUserInfo(e) {
    // 获取用户信息
    const userInfo = e.detail.userInfo;
    // 若用户授权时取消， 则退出
    if (!userInfo) return;
    // 更新数据
    this.setData({
      userInfo
    })
    // 存入本地
    wx.setStorageSync('userInfo', userInfo);
    // 存入用户详细信息
    wx.setStorageSync('userInfoDetail', e.detail);
    // 存入全局
    app.globalData.userInfo = userInfo;
  },

  // 电话
  onPhone() {
    wx.makePhoneCall({
      phoneNumber: '17664056605' //仅为示例，并非真实的电话号码
    })
  },

  // onOrder
  onOrder() {
    this._goPath('orders');
  },

  // onFeedback
  onFeedback() {
    this._goPath('feedback');
  },

  // onPublish_list
  onPublish_list() {
    this._goPath('publish_list');
  },

  // onPublish
  onPublish() {
    this._goPath('publish');
  },

  // 私有点击访问路径方法
  _goPath(path) {
    const userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      wx.navigateTo({
        url: `/pages/${path}/${path}`
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您还未登录，请登录后访问！',
        showCancel: false,
      })
    }
  }
})
