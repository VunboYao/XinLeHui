import {
  Cart
} from "./../../models/cart";

const app = getApp();

// 实例购物车类
const api = new Cart()
// 获取登录态

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
    totalAmount: 0,
    tempModifyArr: [],
    unAuth: false, // 未授权
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    // 若本地无用户信息，请求授权
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      this.setData({
        unAuth: true
      })
    }
  },

  // 用户授权
  onUserInfo: function (e) {
    // 获取用户信息
    const userInfo = e.detail.userInfo;
    // 若用户授权时点击取消，则退出
    if (!userInfo) return;
    // 存入本地
    wx.setStorageSync('userInfo', userInfo);
    // 存入全局
    app.globalData.userInfo = userInfo;

    // 获取购物车数据
    this._updateCartData();

    this.setData({
      unAuth: false
    })
  },

  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo');
    // 授权过才可以获取信息
    if (userInfo) {
      this._updateCartData();
    }
    // 初始化
    this.setData({
      toggleAll: false,
      totalMoney: 0,
      totalAmount: 0,
    })
    wx.hideLoading()
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
      this.data.carList[index].goods_num = --number

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
    let index = this._getGoodsIndex(goodsId);

    // 商品最少为1, 不能超出最大库存
    number = number < 1 ? 1 : number
    number = number > stock ? stock : number
    this.data.carList[index].goods_num = number

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
      this.data.carList[index].goods_num = ++number

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
    // 删除的数据
    let deleteGoods = this.data.carList.splice(index, 1);

    // 删除数据库
    const userKey = wx.getStorageSync("loginFlag");
    api.deleteShopData(deleteGoods[0].cart_id, userKey).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1000
      })
    })


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

    // 必须有库存非0的物品时， 才可以全部选中
    let index = this.data.carList.findIndex(item => {
      return item.goods_storage > 0
    })
    if (index >= 0) {
      this.data.toggleAll = !this.data.toggleAll
    }

    // 库存大于0则选中该物品
    this.data.carList.forEach(element => {
      if (element.goods_storage > 0) {
        element.check = this.data.toggleAll
      }
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

      /*  // 选中数组
       this.data.carList.forEach(item => {
         if (item.check) {
           tempArr.push({"goodsid": item,"num": item})
         }
       }) */

      // 存入缓存
      let tempArr = []
      this.data.carList.forEach(item => {
        if (item.check) {
          tempArr.push(item);
        }
      })
      wx.setStorageSync('orderList', tempArr)
      wx.navigateTo({
        url: '/pages/settlement/settlement?totalMoney=' + this.data.totalMoney
      })
    }
  },

  /* 私有方法 */

  /* 获取总数/金额 */
  _getMoneyTotal() {
    let totalAmount = 0
    let totalMoney = 0
    this.data.carList.forEach(item => {
      if (item.check) {
        totalMoney += item.goods_num * item.goods_price
        totalAmount += item.goods_num
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

  /* 退出界面，更新购物车数据 */
  onHide() {
    /* 获取购物车id, 商品数量 */
    let tempArr = []
    this.data.carList.forEach(item => {
      tempArr.push({
        cart_id: item.cart_id,
        quantity: item.goods_num,
      })
    });
    // 更新修改后的数据
    const userKey = wx.getStorageSync('loginFlag');
    api.updateShopCart(tempArr, userKey).then(res => {})
    wx.hideLoading();
  },

  /* 更新数据 */
  _updateCartData() {
    // 获取购物车数据
    const userKey = wx.getStorageSync('loginFlag');
    api.getShopList(userKey).then(res => {
      /* 购物车为空则不更新数据 */
      if (!res.datas.cart_list) {
        return false;
      }
      // 遍历购物车店铺,取出商品
      const tempArr = []
      res.datas.cart_list.forEach(element => {
        tempArr.push(...element.goods_list);
      });

      // 更新数据
      if (res.code === 1) {
        this.setData({
          carList: tempArr
        })
      } else {
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }
})
