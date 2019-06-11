import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class SearchModel extends HTTP {
  postSearch(val) {
    return this.request({
      url: `${host}/search`,
      method: 'POST',
      data: {
        key: val
      }
    })
  }
}

export { SearchModel}