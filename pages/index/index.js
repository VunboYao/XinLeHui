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
    imgUrls: [
  'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
  'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
  'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    news: [
      '平安夜，百人祝福领取苹果~',
      '寒流来袭，你的秋裤准备好了吗？',
      '快收下，新鲜出炉冬季实用穿搭指南~'
    ],
    shopList: [
      {
        "shopName": "这是个店铺吧",
        "shopIntro": "充分的利用了房子的上下层空间，可同时满足休息与学习的双需求",
        "shopImg": "https://gw.alicdn.com/imgextra/i1/1840730563/TB2KPDvXnAlyKJjSZPiXXXL2VXa_!!1840730563-0-beehive-scenes.jpg_360x10000Q75.jpg_.webp"
      }, {
        "shopName": "这是个店铺吧",
        "shopIntro": "充分的利用了房子的上下层空间，可同时满足休息与学习的双需求",
        "shopImg": "https://gw.alicdn.com/imgextra/i1/3107144874/TB2i9NXbwkLL1JjSZFpXXa7nFXa_!!3107144874-0-beehive-scenes.jpg_360x10000Q75.jpg_.webp"
      }, {
        "shopName": "这是个店铺吧",
        "shopIntro": "充分的利用了房子的上下层空间，可同时满足休息与学习的双需求",
        "shopImg": "https://gw.alicdn.com/imgextra/i1/1840730563/TB2KPDvXnAlyKJjSZPiXXXL2VXa_!!1840730563-0-beehive-scenes.jpg_360x10000Q75.jpg_.webp"
      }
    ]
  },
  onLoad: function () {

    // 1. 首页店铺
    const req1 = api.getShopList();
    // 2. 首页轮播
    const req2 = api.getBannerList();
    // 3. 首页推荐新闻

    
    let indexData = Promise.all([req1, req2]);
    indexData.then(res => {
      console.log(res[0]);
      console.log(res[1]);
    })
  },
})
