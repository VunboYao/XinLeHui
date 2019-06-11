// pages/search/search.js
import {
  SearchModel
} from './../../models/search.js'
const api = new SearchModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    searchData: []
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    const inputVal = e.detail.value
    this.setData({
      inputVal: inputVal
    });
    api.postSearch(inputVal).then(res => {
      console.log(res)
    })
  },
  onHotSearch (e) {
    const link = e.currentTarget.dataset.link
    const id = e.currentTarget.dataset.id
    if (link === 'shop') {
      wx.navigateTo({
        url: `/pages/${link}/${link}?id=${id}`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/${link}/${link}?${link}id=${id}`,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})