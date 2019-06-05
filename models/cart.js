import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class Cart extends HTTP{
  constructor() {
    super()
  }

  // 获取购物车数据
  getShopList(id) {
    return super.request({
      url: `${host}/shop/CartList`,
      method: 'GET',
      data: {
        sessionid: id // 用户id
      }
    })
  }

  // 删除购物车数据
  deleteShopData(id) {
    return super.request({
      url: `${host}/shop/DeleteShopCart`,
      method: 'POST',
      data: {
        cart_id: id // 商品id
      }
    })
  }

  // 修改购物车商品数量
  updateShopCart(id, count) {
    return super.request({
      url: `${host}/shop/updateShopCart`,
      method: 'POST',
      data: {
        cart_id: id,        // 商品id
        quantity: count     // 商品数量
      }
    })
  }

  // 校验订单
  checkOrder(data,userId) {
    return super.request({
      url: `${host}/shop/CheckOrder`,
      data: data,
      sessionid: userId
    })
  }
}

export {
  Cart
}
