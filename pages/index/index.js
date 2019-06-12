import {
  IndexData
} from './../../models/index'

const app = getApp()

// 生成数据获取函数
const api = new IndexData()

Page({
  data: {
    storeid: null,
    shop_name: '',
    shopList: [],
    unAuth: false, // 未授权
  },

  // 
  onSwitchTab (e) {
    let storeid = e.currentTarget.dataset.id
    app.globalData.storeid = storeid
    // console.log(app.globalData.storeid)

    api.getStoreid(storeid, wx.getStorageSync('loginFlag')).then(res => {
      console.log(res)
    })

    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  onLoad: function (options) {
    if (options.shop_name){
      this.setData({
        shop_name: options.shop_name
      })
    }
    // 设置storeid
    this.setData({
      storeid: app.globalData.storeid, 
    })

    
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    // 1. 首页店铺
    const req1 = api.getShopList();
    
    // 请求数据
    req1.then(res => {
      // 更新数据
      this.setData({
        shopList: res.datas,
      })
      wx.hideLoading();
    })
  },
  
})
