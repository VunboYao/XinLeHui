import {
  ShopData
} from "./../../models/shop";

const api = new ShopData()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 300,
    swiperList: [],
    shopInfo: {},
    goodsList: [],
    news: [],
    unAuth: false, // 未授权
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    /* 查看本地是否有用户信息,没有则重新授权 */
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      this.setData({
        unAuth: true
      })
    }

    // 店铺id
    const shopId = app.globalData.storeid;

    // 2. 首页轮播
    const swiper = api.getBannerList();
    // 3. 首页推荐新闻
    const news = api.getNewList()

    // 详情以及商品列表
    const detail = api.getShopDetails(shopId);
    const shopGoods = api.getShopGoodsList(shopId);
    const _this = this
    // 数据更新
    wx.showLoading({
      title: '正在加载...',
    })
    Promise.all([detail, shopGoods, swiper, news]).then(res => {
      this.setData({
        shopInfo: res[0].datas.shop_info,
        goodsList: res[1].datas.goods_list,
        swiperList: res[2].datas.banner_list,
        news: res[3].datas.news_list,
      })
      wx.hideLoading()
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