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
    duration: 1000,
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    shopInfo: {},
    goodsList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 店铺id
    const shopId = options.id;
    console.log(shopId)

    // 详情以及商品列表
    const detail = api.getShopDetails(shopId);
    const shopGoods = api.getShopGoodsList(shopId);

    // 数据更新
    Promise.all([detail, shopGoods]).then(res => {
      this.setData({
        shopInfo: res[0].datas.shop_info,
        goodsList: res[1].datas.goods_list,
      })
    })
  },

})
