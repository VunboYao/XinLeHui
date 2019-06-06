import {
  CreatePayOrder
} from "./../../models/settlement";

const api = new CreatePayOrder();
const userKey = wx.getStorageSync('loginFlag');

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


  onGetAddress() {
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
  },
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

  /* 生成订单 */
  onPay() {
    if (this.data.userAddress) {
      // 商品id与数量
      const tempDataArray = [];
      this.data.orderList.forEach(element => {
        tempDataArray.push({
          "goodsid": element.goods_id,
          "num": element.goods_num
        })
      });

      /* 地址及商品数据 */
      let orderData = {
        "address": this.data.userAddress,
        "array": tempDataArray,
      }

      // 提交订单
      api.submitOrder(orderData, userKey).then(res => {
        console.log(res);

        /* 库存判断 */
        if (res.result == 0) {
          wx.showToast({
            "title": res.message,
            "image": './../../images/notice.png',
            "duration": 3000,
            "mask": true
          })
          /* 返回购物车界面 */
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/cart/cart'
            })
          }, 3000);
          return false;
        }

        /* 缓存返回订单数据 */
        wx.setStorageSync('callbackOrderData', res.datas);

        /* 跳转支付界面 */
        wx.navigateTo({
          url: '/pages/pay/pay'
        })
      })
    }
  }
})
