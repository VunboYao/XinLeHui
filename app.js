import {
  HTTP
} from './utils/http'
import {
  host
} from './config'

// HTTP 请求
const api = new HTTP()

App({
  // 程序启动时
  onLaunch: function () {
    // 登录loading
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    wx.login({
      success: res => {
        // 登录
        api.request({
          url: `${host}/user/login?`,
          data: {
            code: res.code
          }
          // 成功后存储sessionKey
        }).then(res => {
          wx.setStorageSync('loginFlag', res.sessionid);
          // 隐藏loading
          wx.hideLoading();
        })
      }
    })
  },
  globalData: {
    userInfo: null
  },
})
