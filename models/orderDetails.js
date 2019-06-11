
import { HTTP } from "./../utils/http";
import { host } from "./../config";

class OrderDetails extends HTTP {
  constructor() {
    super()
  }

  // 获取订单详情
  getOrderDetails(orderId) {
    return super.request({
      url: `${host}/shop/OrderDetails`,
      data: {
        order_id: orderId
      }
    })
  }

  // 取消订单
  cancelOrder(totalOrderId, sessionId) {
    return super.request({
      url: `${host}/shop/CancelPay`,
      method: 'POST',
      data: {
        TotalOrderId: totalOrderId,
        sessionid: sessionId
      }
    })
  }
}


export {
  OrderDetails
}
