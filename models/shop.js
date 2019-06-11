import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'


class ShopData extends HTTP{
  constructor() {
    super()
  }

  // 获取店铺详情
  getShopDetails(id) {
    return super.request({
      url: `${host}/shop/ShopDeatils?`,
      data: {
        id // 店铺id
      }
    })
  }

  // 获取店铺商品列表
  getShopGoodsList(id) {
    return super.request({
      url: `${host}/shop/GoodsListData?`,
      data: {
        shopid: id
      }
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

export {ShopData}
