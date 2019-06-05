import { News } from "./../../models/news";

const api = new News()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const newsId = options.newsid;
    api.getNewsInfo(newsId).then(res => {
      this.setData({
        news: res.datas.news_info
      })
    })
  },
})
