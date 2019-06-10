const app = getApp();

Page({
  data: {
    active: true, // 当前选中状态
    unAuth: false,
  },

  onLoad() {
    // 若本地无用户信息，请求授权
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      this.setData({
        unAuth: true
      })
    }
  },
  // 显示获取信息？？
  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    // 授权过才可以获取信息
    if (userInfo) {
      this.setData({
        unAuth: false
      })

      // 获取数据 ？？？
    }
  },
  // 用户授权 ??
  onUserInfo: function (e) {
    // 获取用户信息
    const userInfo = e.detail.userInfo;
    // 若用户授权时点击取消，则退出
    if (!userInfo) return;
    // 存入本地
    wx.setStorageSync('userInfo', userInfo);
    // 存入用户详细信息
    wx.setStorageSync('userInfoDetail', e.detail);
    // 存入全局
    app.globalData.userInfo = userInfo;

    // 获取数据
    // ?????

    this.setData({
      unAuth: false
    })
  },
  // 切换收入/支出
  onOption() {
    this.setData({
      active: !this.data.active
    })
  }
})
