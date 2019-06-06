import {
  Goods
} from "./../../models/goods";

const api = new Goods()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    specClass: true,
    imgList: [{
      src: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'
    }, {
      src: 'https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
    }, {
      src: 'https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg'
    }],
    desc: [{
      src: "https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg"
    }, {
      src: "https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg"
    }, {
      src: "https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg"
    }, {
      src: "https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg"
    }],
    specList: [{
      id: 1,
      name: '尺寸',
    }, {
      id: 2,
      name: '颜色',
    }, ],
    specChildList: [{
      id: 1,
      pid: 1,
      name: 'XS',
    }, {
      id: 2,
      pid: 1,
      name: 'S',
    }, {
      id: 3,
      pid: 1,
      name: 'M',
    }, {
      id: 4,
      pid: 1,
      name: 'L',
    }, {
      id: 5,
      pid: 1,
      name: 'XL',
    }, {
      id: 6,
      pid: 1,
      name: 'XXL',
    }, {
      id: 7,
      pid: 2,
      name: '白色',
    }, {
      id: 8,
      pid: 2,
      name: '珊瑚粉',
    }, {
      id: 9,
      pid: 2,
      name: '草木绿',
    }]
  },
  //规格弹窗开关
  toggleSpec() {
    if (this.data.specClass === true) {
      this.setData({
        specClass: false
      })
      return
    } else if (this.data.specClass === false) {
      this.setData({
        specClass: true
      })
      return
    }
  },
  //选择规格
  selectSpec(index, pid) {
    let list = this.specChildList;
    list.forEach(item => {
      if (item.pid === pid) {
        this.$set(item, 'selected', false);
      }
    })

    this.$set(list[index], 'selected', true);
    //存储已选择
    this.specSelected.forEach(item => {
      if (item.pid === pid) {
        item = list[index];
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 商品id 获取数据
    const goodsId = options.goodsid;

    // 获取商品详情
    api.getGoodsDetails(goodsId).then(res => {
      this.setData({
        goodsInfo: res.datas.goods_info
      })
    })
  },

  /* 添加购物车 */
  onAddCart() {
    const goodsId = this.data.goodsInfo.goods_id;
    const userKey = wx.getStorageSync('loginFlag');
    if (goodsId) {
      api.addGoodsCart(goodsId, userKey).then(res => {
        if (res.code === 1) {
          wx.showToast({
            title: '加入成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: 'error',
            icon: 'none'
          })
        }
      })
    }
  },

  /* 立即购买 */
  onNowBuy() {
    const orderList = [{
      goods_id: this.data.goodsInfo.goods_id,
      goods_name: this.data.goodsInfo.goods_name,
      goods_image: this.data.goodsInfo.goods_image[0],
      goods_num: 1,
      goods_price: this.data.goodsInfo.goods_price,
    }]
    wx.setStorageSync("orderList", orderList);
    wx.navigateTo({
      url: '/pages/settlement/settlement?totalMoney=' + this.data.goodsInfo.goods_price
    })
  }
})
