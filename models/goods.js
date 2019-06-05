import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class Goods extends HTTP {
  constructor() {
    super()
  }

  // 获取商品详情
  getGoodsDetails(id) {
    return super.request({
      url: `${host}/shop/GoodsDetails`,
      data: {
        goods_id: id // 商品id
      }
    })
  }

  // 添加购物车商品
  addGoodsCart(goods_id, user_id, count = 1) {
    return super.request({
      url: `${host}/shop/AddCart`,
      method: 'POST',
      data: {
        goods_id,         // 用户id
        quantity: count,  // 数量
        sessionid: user_id, // 用户id
      }
    })

  }

}

export {
  Goods
}
