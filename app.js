App({
  onLaunch: function () {
    // 验证登录态
    this.checkLoginStatus();
   /*  wx.login({
      success: res => {
        console.log(res);
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
    }) */
   /*  wx.getSetting({
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
    }) */
  },
  globalData: {
    userInfo: null
  },
  // 检查本地 storage 中是否有登录态标识
  checkLoginStatus: function (){
    let that = this;
    let loginFlag = wx.getStorageSync('loginFlag');
    if (loginFlag) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 未过期
        success() {
          // 直接从 Storage 中获取用户信息
          let userStorageInfo = wx.getStorageSync('userInfo');
          if (userStorageInfo) {
            that.globalData.userInfo = userStorageInfo;
          } else {
            that.showInfo('缓存信息丢失');
            console.error('登录成功后将用户信息存在Storage的userInfo字段中， 该字段丢失')
          }
        },
        // session_key 过期
        fail() {
          // 无登录态
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      })
    } else {
      // 无登录态
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
  },

  showInfo(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  }
  /* // 登录
  doLogin() {
    let that = this;
    wx.login({
      success(login) {
        if (login.code) {
          wx.getUserInfo({
            success(res) {
              console.log(res);
            }
          })
        }
      }
    })
  } */
})
