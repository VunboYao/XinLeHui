import { HTTP } from './utils/http'
import {
  host
} from './config'
const api = new HTTP();

App({
  onLaunch: function () {
    wx.login({
       success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        api.request({
          url: `${host}/user/login?`,
          data: {
            code: res.code
          },
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      } 
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              })
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
