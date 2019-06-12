import {
  CreatePayOrder
} from "./../../models/settlement";

const api = new CreatePayOrder();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    totalMoney: 0,
    expressMoney: 0,
    userAddress: null,
    Authorization: false,
  },


  onGetAddress() {
    // 获取用户地址,更新缓存
    wx.chooseAddress({
      success: (res) => {
        // 缓存地址
        wx.setStorageSync('userAddress', res)
        this.setData({
          userAddress: res,
          Authorization: false,
        })
      },
      fail: res =>{
        if (res.errMsg == 'chooseAddress:fail auth deny') {
         this.setData({
           Authorization: true
         })
        }
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

  // 查询用户是否授权地址获取
  onShow() {
    wx.getSetting({
      success:(res) => {
        if (res.authSetting["scope.address"]) {
          console.log(res.authSetting["scope.address"]);

          this.setData({
             Authorization: false
          })
        }
      }
    })
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
      const userKey = wx.getStorageSync('loginFlag');
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
    } else {
      wx.showToast({
        title: '地址不能为空',
        image: './../../images/notice.png',
        duration: 1000
      })
    }
  }
})
