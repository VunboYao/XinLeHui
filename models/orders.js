import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class OrderModel extends HTTP{
  getOrderList(state, userKey) {
    return this.request({
      url: `${host}/shop/OrderList`,
      data: {
        state: state,
        sessionid: userKey
      }
    })
  }
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