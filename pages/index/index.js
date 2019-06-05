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
    const req3 = api.getNewList()

    // 请求数据
    let indexData = Promise.all([req1, req2, req3]);
    indexData.then(res => {
      let shopList = res[0]
      let swiperList = res[1]
      let news = res[2]
      // 更新数据
      this.setData({
        shopList: shopList.datas,
        swiperList: swiperList.datas.banner_list,
        news: news.datas.news_list,
      })
    })
  },
})
