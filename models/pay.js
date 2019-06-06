import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class Pay extends HTTP {
  constructor(){
    super()
  }

  cancelOrder(orderId, userId) {
    return super.request({
      url: `${host}/shop/CancelPay`,
      method: 'POST',
      data: {
        TotalOrderId: orderId,
        sessionId: userId
      }
    })
  }
}


export {
  Pay
}
