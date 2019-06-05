import { HTTP } from "./../utils/http";
import { host } from "./../config";

class News extends HTTP{
  constructor() {
    super()
  }

  getNewsInfo(newsId) {
    return super.request({
      url: `${host}/shop/NewsInfo`,
      data: {
        id: newsId
      }
    })
  }

}

export {
  News
}
