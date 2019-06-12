import {HTTP} from './../utils/http'
import {host} from './../config'

class IndexData extends HTTP {
  constructor() {
    super();
  }

  // 获取首页店铺列表
  getShopList() {
    return super.request({
      url: `${host}/shop/ShopList`
    })
  }

  // 存storeid
  getStoreid(storeid, sessionid) {
    return super.request({
      url: `${host}/user/MagStore`,
      data: {
        storeid: storeid,
        sessionid: sessionid
      }
    })
  }
}

export {
  IndexData
}
