// pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    totalMoney: 0,
    // expressMoney: 0,
    userAddress: null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 读取缓存返回数据 */
    const cbData = wx.getStorageSync('callbackOrderData');
    console.log(cbData);
    
  },

  onPay() {

  }
})
