import {OrderDetails} from './../../models/orderDetails';

const api = new OrderDetails();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    totalId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const totalId = options.totalid;
    this.data.totalId = totalId;
    
    // 加载数据
    const orderId = options.order_id;
    api.getOrderDetails(orderId).then(res => {
      this.setData({
        order: res.datas
      })
    })
  },

  // 取消订单
  onCancelOrder() {
    const totalOrderId = this.data.totalId;
    const sessionId = wx.getStorageSync('loginFlag');
    api.cancelOrder(totalOrderId, sessionId).then(res => {
      console.log(res);
    })
  }

})
