// shop/shop.js
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
    shop: {
      "shopName": "IronMan",
      "shopIntro": "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      "imgUrl": "/static/02.png"
    },
    goodsList: [{
      "goodsName": "商品名商品名商品名商品名",
      "goodsPrice": "¥15",
      "goodsImg": "https://gw.alicdn.com/imgextra/i1/1840730563/TB2KPDvXnAlyKJjSZPiXXXL2VXa_!!1840730563-0-beehive-scenes.jpg_360x10000Q75.jpg_.webp"
    }, {
      "goodsName": "儿童上下双床",
      "goodsPrice": "¥15",
      "goodsImg": "https://gw.alicdn.com/imgextra/i1/1840730563/TB2KPDvXnAlyKJjSZPiXXXL2VXa_!!1840730563-0-beehive-scenes.jpg_360x10000Q75.jpg_.webp"
    }, {
      "goodsName": "儿童上下双床",
      "goodsPrice": "¥15",
      "goodsImg": "https://gw.alicdn.com/imgextra/i1/1840730563/TB2KPDvXnAlyKJjSZPiXXXL2VXa_!!1840730563-0-beehive-scenes.jpg_360x10000Q75.jpg_.webp"
      }, {
        "goodsName": "儿童上下双床",
        "goodsPrice": "¥15",
        "goodsImg": "https://gw.alicdn.com/imgextra/i1/1840730563/TB2KPDvXnAlyKJjSZPiXXXL2VXa_!!1840730563-0-beehive-scenes.jpg_360x10000Q75.jpg_.webp"
      }, {
        "goodsName": "儿童上下双床",
        "goodsPrice": "¥15",
        "goodsImg": "https://gw.alicdn.com/imgextra/i1/1840730563/TB2KPDvXnAlyKJjSZPiXXXL2VXa_!!1840730563-0-beehive-scenes.jpg_360x10000Q75.jpg_.webp"
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
  },

})
