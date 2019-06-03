
class HTTP {
  request({ url, method = 'GET', data = {} }) {
    return new Promise((resolve, reject) => {
      this._request({ url, method, data, resolve, reject })
    })
  }
  _request({ url, method = 'GET', data = {}, resolve, reject }) {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': "application/json"
      },
      method: method,
      dataType: 'json',
      success: function (res) {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          // this._show_error()
        }
      },
      fail: function (res) {
        reject()
        // this._show_error()
      }
    })
  }
  _show_error() {
    wx.showToast({
      title: '抱歉，出现了一个错误',
      icon: 'none',
      duration: 2000
    })
  }
}


export {
  HTTP
}
