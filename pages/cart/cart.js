import { Cart } from "./../../models/cart";

// 实例购物车类
const api = new Cart()
// 获取登录态
const userKey = wx.getStorageSync('loginFlag');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    selectedColor: '#09BB07',
    color: '#b2b2b2',
    userAddress: {},
    toggleAll: false,
    totalMoney: 0,
    totalAmount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userKey = wx.getStorageSync('loginFlag');
    // 获取购物车数据
    api.getShopList(userKey).then(res => {
      // 更新数据
      if (res.code === 1) {
        this.setData({
          carList: res.datas.cart_list[0].goods
        })
      } else {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })
  },

  /* 单个选中 */
  onSelected(e) {
    // 获取商品id
    let goodsId = e.currentTarget.dataset.id

    // 根据id 获取对应 index 设置 数据
    let index = this._getGoodsIndex(goodsId)
    this.data.carList[index].check = !this.data.carList[index].check

    /* 全部为 true 则全选 */
    let bCallback = this.data.carList.every(item => item.check === true)
    if (bCallback) {
      this.data.toggleAll = true
    } else {
      this.data.toggleAll = false
    }

    /* 金额/总数 */
    this._getMoneyTotal()

    /* 更新数据 */
    this.setData({
      carList: this.data.carList,
      toggleAll: this.data.toggleAll,
      totalMoney: this.data.totalMoney,
      totalAmount: this.data.totalAmount
    })
  },

  /* onDown */
  onDown(e) {
    let number = e.currentTarget.dataset.number
    if (number > 1) {
      let goodsId = e.currentTarget.dataset.id
      let index = this._getGoodsIndex(goodsId)
      this.data.carList[index].number = --number

      /* 金额/总数 */
      this._getMoneyTotal()

      /* 更新数据 */
      this.setData({
        carList: this.data.carList,
        totalAmount: this.data.totalAmount,
        totalMoney: this.data.totalMoney
      })
    }
  },

  /* onBlur */
  onBlur(e) {
    let number = parseInt(e.detail.value)
    let stock = e.currentTarget.dataset.stock
    let goodsId = e.currentTarget.dataset.id
    let index = this._getGoodsIndex(goodsId)
    number = number < 1 ? 1 : number
    number = number > stock ? stock : number
    this.data.carList[index].number = number

    /* 金额/总数 */
    this._getMoneyTotal()

    /* 更新数据 */
    this.setData({
      carList: this.data.carList,
      totalAmount: this.data.totalAmount,
      totalMoney: this.data.totalMoney
    })
  },

  /* onAdd */
  onAdd(e) {
    let stock = e.currentTarget.dataset.stock
    let number = e.currentTarget.dataset.number
    if (number < stock) {
      let goodsId = e.currentTarget.dataset.id
      let index = this._getGoodsIndex(goodsId)
      this.data.carList[index].number = ++number

      /* 金额/总数 */
      this._getMoneyTotal()

      /* 更新数据 */
      this.setData({
        carList: this.data.carList,
        totalAmount: this.data.totalAmount,
        totalMoney: this.data.totalMoney
      })
    }
  },


  /* onDelete */
  onDelete(e) {
    let goodsId = e.currentTarget.dataset.id
    let index = this._getGoodsIndex(goodsId)
    this.data.carList.splice(index, 1)

    /* 全部为 true 则全选 */
    let bCallback = this.data.carList.every(item => item.check === true)
    if (bCallback) {
      this.data.toggleAll = true
    } else {
      this.data.toggleAll = false
    }

    /* 计算金额/数量 */
    this._getMoneyTotal()

    /* 更新数据 */
    this.setData({
      carList: this.data.carList,
      toggleAll: this.data.toggleAll,
      totalAmount: this.data.totalAmount,
      totalMoney: this.data.totalMoney
    })
  },

  /* onSelectAll */
  onSelectAll() {
    this.data.toggleAll = !this.data.toggleAll
    this.data.carList.forEach(element => {
      element.check = this.data.toggleAll
    });

    /* 计算金额/数量 */
    this._getMoneyTotal()

    /* 更新数据 */
    this.setData({
      carList: this.data.carList,
      toggleAll: this.data.toggleAll,
      totalAmount: this.data.totalAmount,
      totalMoney: this.data.totalMoney
    })
  },

  /* onSettlement */
  onSettlement() {
    if (this.data.totalAmount) {
      wx.showLoading({
        title: '请等待'
      })

      // 选中数组
      let selectArray = []
      this.data.carList.forEach(item => {
        if (item.check) {
          tempArr.push({"goodsid": item,"num": item})
        }
      })
      // 存入缓存
      // wx.setStorageSync('orderList', tempArr)
     /*  wx.navigateTo({
        url: '/pages/settlement/settlement?totalMoney=' + this.data.totalMoney
      }) */
    }
  },

  /* 私有方法 */

  /* 获取总数/金额 */
  _getMoneyTotal() {
    let totalAmount = 0
    let totalMoney = 0
    this.data.carList.forEach(item => {
      if (item.check) {
        totalMoney += item.number * item.price
        totalAmount += item.number
      }
    })
    totalMoney = Number(totalMoney.toFixed(2))
    this.data.totalAmount = totalAmount
    this.data.totalMoney = totalMoney
  },
  /* 根据 id 获取商品 index */
  _getGoodsIndex(goodsId) {
    return this.data.carList.findIndex(item => {
      return item.goods_id == goodsId
    })
  },

  onHide() {
    wx.hideLoading();
  }
})
