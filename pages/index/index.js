import {
  IndexData
} from './../../models/index'


// 生成数据获取函数
const api = new IndexData()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperList: [],
    news: [
      '平安夜，百人祝福领取苹果~',
      '寒流来袭，你的秋裤准备好了吗？',
      '快收下，新鲜出炉冬季实用穿搭指南~'
    ],
    shopList: []
  },
  onLoad: function () {

    // 1. 首页店铺
    const req1 = api.getShopList();
    // 2. 首页轮播
    const req2 = api.getBannerList();
    // 3. 首页推荐新闻

    // 请求数据
    let indexData = Promise.all([req1, req2]);
    indexData.then(res => {
      let req1 = res[0]
      let req2 = res[1]
      // 轮播
      if (req2.code == 1) {
        this.setData({
          swiperList: req2.datas.banner_list
        })
      }

      // 热门店铺
      this.setData({
        shopList: req1.datas
      })
    })
  },
})
