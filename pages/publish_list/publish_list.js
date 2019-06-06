// pages/publish_list/publish_list.js
import {
  PublishModel
} from './../../models/publish.js'
const api = new PublishModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userKey = wx.getStorageSync('loginFlag');
    const list = api.getPublishList(userKey)
    list.then(res => {
      console.log(res)
    })
  },
})
