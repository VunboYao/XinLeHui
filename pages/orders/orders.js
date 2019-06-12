import order from '../../json.js'
import {
  OrderModel
} from './../../models/orders.js'
const api = new OrderModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userKey: '',
    index: 0,
    orderList: [],
    noPay: [],
    noCatch: [],
    page: 1,
    take: 10,
    reqLock: false,
    requestTabIndex: [
      { 0: ""},
      {1: "ordertoPay"},
      {
        2: "ordertoReceive"
      }
    ]
  },
  // 切换tab
  changeIndex(e) {
    const currentIndex = Number(e.currentTarget.dataset.index)
    if (currentIndex === this.data.index) {
      return
    }
    wx.showLoading({
      'title': '加载中'
    })
    // 根据 index 读取数据
    this._getData(currentIndex)
  },

  // 确认收货
  confirmGoods(e) {
    // 根据订单id, 支付, 重新加载
    let orderId = e.detail.orderId
    console.log(orderId);

    // post 改变状态
    let index = this.data.noCatch.findIndex(element => {
      return element.orderId === orderId
    });
    console.log(index);
    this.data.noCatch.splice(index, 1);
    this.setData({
      noCatch: this.data.noCatch
    })

  },
  // 取消订单
  onCancelOrder(e) {
    wx.showModal({
      title: '提示',
      content: '您是否取消当前订单？',
      success: (res) => {
        if (res.confirm) {
          let orderId = e.detail.orderId
          api.getCancelOrder(orderId, this.data.userKey).then(res => {
            if (res.result == 1) {
              api.getOrderList('', this.data.userKey).then(res => {
                console.log(res)
                this.setData({
                  orderList: res.datas.order_list
                });
                // 刷新
                wx.startPullDownRefresh();
              })
            }
          })
        }
      }
    })
  },

  // tab切换请求数据
  _getData(index) {
    // 全部
    if (index === 0) {
      this.setData({
        index: 0
      })
    }
    // 待付款
    if (index === 1) {
      api.getOrderList('ordertoPay', this.data.userKey).then(res => {
        this.setData({
          noPay: res.datas.order_list,
          index: 1
        })
      })
    }

    // 待收货
    if (index === 2) {
      api.getOrderList('ordertoReceive', this.data.userKey).then(res => {
        console.log(res)
        this.setData({
          noCatch: res.datas.order_list,
          index: 2
        })
      })
    }
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userKey: wx.getStorageSync('loginFlag')
    });
  },

  onShow: function () {
    // 自动触发下拉加载
    wx.startPullDownRefresh()
  },

  // 下拉刷新事件
  onPullDownRefresh() {
    const currentIndex = this.data.index;
    if (currentIndex == 0) {
      // 请求全部
      api.getOrderList('', this.data.userKey).then(res => {
        this.setData({
          orderList: res.datas.order_list
        });
      })
      // 待付款
    } else if (currentIndex === 1) {
      api.getOrderList('ordertoPay', this.data.userKey).then(res => {
        this.setData({
          noPay: res.datas.order_list,
          index: 1
        })
      })
      // 待收货
    } else {
      api.getOrderList('ordertoReceive', this.data.userKey).then(res => {
        this.setData({
          noCatch: res.datas.order_list,
          index: 2
        })
      })
    }
    // 关闭拉下刷新
    wx.stopPullDownRefresh();
  },

  // 上拉加载
  onReachBottom() {
    // 如果请求中，中断
    if (this.data.reqLock) {
      return
    }
    // 加锁，请求中...
    this.data.reqLock = true;
    const index = this.data.index;
    const currentState = this.data.requestTabIndex[index];
    const page = ++this.data.page;
    // 数据请求
    api.getOrderList(currentState, this.data.userKey, page).then(res => {
      // 更新数据
      this.setData({
        orderList: [...this.data.orderList, ...res.datas.order_list]
      })
      // 解锁
      this.data.reqLock = false;
      if (res.datas.order_list.length < this.data.take) {
        console.log('没有更多了');
        // 锁死
        this.data.reqLock = true;
      }
    })
  },

  // onGoTop
  onGoTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})
