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

  // 获取首页轮播图
  getBannerList() {
    return super.request({
      url: `${host}/shop/BannerList`
    })
  }

  // 获取首页新闻列表
  getNewList() {
    return super.request({
      url: `${host}/shop/NewsList?page=&take=`
    })
  }
}

export {
  IndexData
}
