import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class createPayOrder extends HTTP{
  constructor() {
    super()
  }

  // 提交订单
  submitOrder(data, userId) {
    return super.request({
      data: data,
      sessionid: userId
    })
  }
}

export {
  createPayOrder
}
