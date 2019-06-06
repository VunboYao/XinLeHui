// pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    pay_amount: 0,
    // expressMoney: 0,
    userAddress: null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 读取缓存返回数据 */
    const cbData = wx.getStorageSync('callbackOrderData');
    console.log(cbData);

    this.setData({
      userAddress: cbData.address,
      orderList: cbData.goods_list,
      pay_amount: cbData.pay_amount
    })
  },

  /* 支付 */
  onPay() {
    /* 支付成功跳转订单列表 */

    wx.navigateTo({
      url:`/pages/orders/orders/`
    })
  }
})
