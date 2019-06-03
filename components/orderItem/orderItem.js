// components/order-item/orderItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirmGoods(e) {
      const orderId = e.currentTarget.dataset.orderid
      this.triggerEvent('confirm', {
        orderId: orderId
      })
    }
  }
})
