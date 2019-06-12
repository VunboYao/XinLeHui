import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class OrderModel extends HTTP{
  // 获取订单列表
  getOrderList(state, userKey, page, take) {
    return this.request({
      url: `${host}/shop/OrderList`,
      data: {
        state: state,
        sessionid: userKey,
        page,
        take,
      }
    })
  }

  // 取消订单
  getCancelOrder(id, userKey){
    return this.request({
      url: `${host}/shop/CancelPay`,
      data: {
        TotalOrderId: id,
        sessionid: userKey
      }
    })
  }
}

export { OrderModel}
