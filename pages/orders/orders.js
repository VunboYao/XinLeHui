import order from '../../json.js'
import {
  OrderModel
} from './../../models/orders.js'
const api = new OrderModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userKey: '',
    index: 0,
    orderList: [],
    noPay: [],
    noCatch: []
  },
  // 切换tab
  changeIndex(e) {
    const currentIndex = Number(e.currentTarget.dataset.index)
    if (currentIndex === this.data.index) {
      return
    }
    wx.showLoading({
      'title': '加载中'
    })
    // 根据 index 读取数据
    this._getData(currentIndex)
  },

  // 确认收货
  confirmGoods(e) {
    // 根据订单id, 支付, 重新加载
    let orderId = e.detail.orderId
    console.log(orderId);

    // post 改变状态
    let index = this.data.noCatch.findIndex(element => {
      return element.orderId === orderId
    });
    console.log(index);
    this.data.noCatch.splice(index, 1);
    this.setData({
      noCatch: this.data.noCatch
    })

  },
  // 取消订单
  onCancelOrder(e) {
    let orderId = e.detail.orderId
    console.log(orderId);

    api.getCancelOrder(orderId, this.data.userKey).then(res => {
      console.log(res)
      if(res.result == 1){
        api.getOrderList('', this.data.userKey).then(res => {
          console.log(res)
          this.setData({
            orderList: res.datas.order_list
          })
        })
      }
    })
  },

  // tab切换请求数据
  _getData(index) {
    // 全部
    if (index === 0) {
      this.setData({
        index: 0
      })
    }
    // 待付款
    if (index === 1) {
      api.getOrderList('ordertoPay', this.data.userKey).then(res => {
        console.log(res)
        this.setData({
          noPay: res.datas.order_list,
          index: 1
        })
      })
    }

    // 待收货
    if (index === 2) {
      api.getOrderList('ordertoReceive', this.data.userKey).then(res => {
        console.log(res)
        this.setData({
          noCatch: res.datas.order_list,
          index: 2
        })
      })
    }
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userKey: wx.getStorageSync('loginFlag')
    })
    // 请求
    api.getOrderList('', this.data.userKey).then(res => {
      console.log(res)
      this.setData({
        orderList: res.datas.order_list
      })
    })
  },

})