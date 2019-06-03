import order from './../../json.js'

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    windowHeight: 0,
    orderList: [],
    tabList: ['全部', '待付款', '待收货']
  },
  // 切换Swiper
  switchTab(e) {
    let currentIndex = e.detail.current
    this.setData({
      currentIndex: currentIndex
    })
  },
  // 选择 tab
  selectTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let windowHeight = res.windowHeight
        let drp = res.pixelRatio

        windowHeight = windowHeight - Number(80 / drp.toFixed(2))
        this.setData({
          windowHeight: windowHeight,
          orderList: order.orderList
        })
      }
    })
  },
})
