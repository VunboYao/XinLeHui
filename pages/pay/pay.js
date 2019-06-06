// pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    totalMoney: 0,
    expressMoney: 0,
    userAddress: null
  },


 /*  onGetAddress() {
    // 获取用户地址,更新缓存
    wx.chooseAddress({
      success: (res) => {
        // 缓存地址
        wx.setStorageSync('userAddress', res)
        this.setData({
          userAddress: res
        })
      }
    })
  }, */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let totalMoney = options.totalMoney
    let orderList = wx.getStorageSync('orderList')
    let userAddress = wx.getStorageSync('userAddress')

    /* 地址缓存是否存在 */
    if (userAddress) {
      this.setData({
        orderList: orderList,
        totalMoney: totalMoney,
        userAddress: userAddress
      })
    } else {
      this.setData({
        orderList: orderList,
        totalMoney: totalMoney
      })
    }

  },

  onPay() {

  }
})
