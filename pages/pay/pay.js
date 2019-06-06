import {
  Pay
} from "./../../models/pay";

const api = new Pay();


const userKey = wx.getStorageSync('loginFlag');

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
    orderId: null,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 读取缓存返回数据 */
    const cbData = wx.getStorageSync('callbackOrderData');

    this.setData({
      userAddress: cbData.address,
      orderList: cbData.goods_list,
      pay_amount: cbData.pay_amount,
      orderId: cbData.total_order_id,
    })
  },

  /* 支付 */
  onPay() {
    /* 支付成功跳转订单列表 */
    wx.reLaunch({
      url: `/pages/orders/orders`
    })
  },


  /* 取消订单 */
  onCancel() {
    api.cancelOrder(this.data.orderId, userKey).then(res => {
      wx.showToast({
        title: '订单已取消',
        mask: true,
        duration: 2000
      })
    })
    setTimeout(() => {
      wx.reLaunch({
        url: `/pages/orders/orders`
      })
    }, 2000);
  }

})
