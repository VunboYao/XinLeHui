import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class CreatePayOrder extends HTTP{
  constructor() {
    super()
  }

  // 提交订单
  submitOrder(cartData, userId) {
    return super.request({
      url: `${host}/shop/PayOrder`,
      method: 'POST',
      data: {
        data: cartData,
        sessionid: userId
      }
    })
  }
}

export {
  CreatePayOrder
}
