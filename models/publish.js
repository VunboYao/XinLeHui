import {
  HTTP
} from './../utils/http'
import {
  host
} from './../config'

class PublishModel extends HTTP {
  getPublishList(userKey) {
    return this.request({
      url: `${host}/User/`,
      data: {
        sessionid: userKey // 用户id
      }
    })
  }
  getPublishDetails(userKey, publishId) {
    return this.request({
      url: `${host}/User/`,
      data: {
        sessionid: userKey 
      }
    })
  }
  postPublish(upload, userKey) {
    return this.request({
      url: `${host}/User/PushHelp`,
      method: 'POST',
      data: {
        upload: upload,
        sessionid: userKey 
      } 
    })
  }
}
export {
  PublishModel
}