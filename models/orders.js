import {
  HTTP
} from './../..//utils/http.js'
import {
  host
} from './../config'

class OrderModel extends HTTP{
  getOrderList () {
    return this.request({
      url: `${host}/shop/OrderList`
    })
  }
}