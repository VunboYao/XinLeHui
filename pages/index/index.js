import {
  IndexData
} from './../../models/index'

const app = getApp()


// 生成数据获取函数
const api = new IndexData()

Page({
  data: {
    shopList: [],
    unAuth: false, // 未授权
  },
  onLoad: function () {

    /* 查看本地是否有用户信息,没有则重新授权 */
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      this.setData({
        unAuth: true
      })
    }

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
  // 用户授权
  onUserInfo(e) {
    // 获取用户信息
    const userInfo = e.detail.userInfo;
    // 存入本地
    wx.setStorageSync('userInfo', userInfo);
    // 存入用户详细信息
    wx.setStorageSync('userInfoDetail', e.detail);

    // 存入全局
    app.globalData.userInfo = userInfo;
    this.setData({
      unAuth: false
    })
  },
  // 显示时授权窗口判断
  onShow() {
    // 显示时，如果用户授权了。则隐藏授权窗口
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        unAuth: false
      })
    }
  },
  // 取消
  onCancel(e) {
    this.setData({
      unAuth: false
    })
  },
})
