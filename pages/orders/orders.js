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
    index: 0,
    orderList: [],
    noPay: [],
    noCatch: []
  },

  changeIndex(e) {
    const currentIndex = Number(e.currentTarget.dataset.index)
    if (currentIndex === this.data.index) {
      return
    }
     wx.showLoading({
       'title': '加载中'
     })
    // 根据 index 读取缓存数据
    this._getStorage(currentIndex)
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

  // 读取缓存
  _getStorage(index) {
    const data = wx.getStorageSync('orderData')
    let tempArr = []

    // 全部
    if (index === 0) {
      this.setData({
        index: index,
        orderList: data
      })
    }
    // 待付款
    if (index === 1) {
      data.forEach(element => {
        if (element.state === 0) {
          tempArr.push(element)
        }
      });
      this.setData({
        index: index,
        noPay: tempArr
      })
    }

    // 待收货
    if (index === 2) {
      data.forEach(element => {
        if (element.state === 1) {
          tempArr.push(element)
        }
      });
      this.setData({
        index: index,
        noCatch: tempArr
      })
    }
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    order.orderList.map(item => {
      return item.orderId = 3
    })
    this.setData({
      orderList: order.orderList
    })
    wx.setStorageSync('orderData', order.orderList)

    const userKey = wx.getStorageSync('loginFlag');
    const state = ''
    // 请求
    const orderlist = api.getOrderList(state, userKey)
    orderlist.then(res => {
      console.log(res)
      this.setData({
        orderList: res.datas.order_list
      })
    })
  },

})
