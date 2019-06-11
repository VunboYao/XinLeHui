import {
  ShopData
} from "./../../models/shop";

const api = new ShopData()


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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 店铺id
    const shopId = options.id;
    console.log(shopId)

    // 2. 首页轮播
    const swiper = api.getBannerList();
    // 3. 首页推荐新闻
    const news = api.getNewList()

    // 详情以及商品列表
    const detail = api.getShopDetails(shopId);
    const shopGoods = api.getShopGoodsList(shopId);
    const _this = this
    // 数据更新
    Promise.all([detail, shopGoods, swiper, news]).then(res => {
      this.setData({
        shopInfo: res[0].datas.shop_info,
        goodsList: res[1].datas.goods_list,
        swiperList: res[2].datas.banner_list,
        news: res[3].datas.news_list,
      })
      wx.setNavigationBarTitle({
        title: _this.data.shopInfo.shop_name
      })
    })
  }
})