// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /* 表单提交数据 */
  formSubmit(e) {
    const { detail: { value: { content: value } } } = e;
    if (value) {
      wx.showToast({
        title: '提交成功'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1500);
    }
  },
  onPhone() {
    wx.makePhoneCall({
      phoneNumber: '400-10086' //仅为示例，并非真实的电话号码
    })
  }
})
