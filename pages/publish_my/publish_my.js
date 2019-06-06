// pages/publish_my/publish_my.js
import {
  PublishModel
} from './../../models/publish.js'
const api = new PublishModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    myPublishData: {},
    showAll: false,
    publishId: '',
    intro: `  　　1978年，内战烽火刚刚平息，那撩人的战火似乎还在人们心中未被抹去。粮食也供不应求。到处是荒芜的土地，泥泞的道路，破烂的房屋。
    　　可是党在时刻关心人们的生活，于是开始了一系列轰轰烈烈的改革措施。开垦田地，增加人口，拓宽道路，修缮房屋，带领中国走上了富国强兵的道路。现在的中国已经成为一个经济大国了。中国也在科技上，军事上，外交上更加强大。
    　　中国科技更加发达，神五，神六，神七都相继发射并圆满完成航天任务。在不久的将来，中国还会发射一个小型空间站。中国在宇宙航天探索上，一步一个脚印，稳扎稳打，步步为营，在中国航天史上谱写了光辉的一页。看那北京奥运会主体育场“鸟巢”，结构鲜明独特；看那梦幻般的开幕式，宛如在仙境飞翔；再看那中国奥运健儿勇夺51金，象征着中国由“东亚病夫”变成了世界各国望而生畏的体育巨人。
    　　科技发达了，军事，外交也不甘落后。边境线上，军警林立，几步一哨。海防线上，航母，驱逐舰，远洋舰，战列舰严阵以待。使那些帝国主义国家“不敢越雷池一步”。
    　　中国官员在外交方面从容不迫，镇定自若，使那些外国官员相形见拙，在世界外交史上占了一席之地。
    　　虽然中国在经济方面现在还是一个发展中国家，但我相信在不久的将来，中国一定会成为一个经济强国，成为让帝国主义国家闻风丧胆的世界强国。
    　　在这改革开放40年里，中国参加了世界贸易组织，香港，澳门也重新回到了祖国母亲的怀抱里。东方雄狮的吼声响彻世界的每一个角落，中国人再也不会被被人称为东亚病夫，中国人站起来了！我相信，中国会越来越繁荣昌盛！`,
    intro_images:['https://img2.woyaogexing.com/2017/07/21/492e6146a4702923!400x400_big.jpg',
    'https://img2.woyaogexing.com/2017/07/21/31133d475a3b6243!400x400_big.jpg',
    'https://img2.woyaogexing.com/2017/07/21/ec970d998375fa0b!400x400_big.jpg',
    'https://img2.woyaogexing.com/2017/07/21/ed94bfdaa26b90b2!300x300_big.jpg',
    'https://img2.woyaogexing.com/2017/07/21/750229cd721d5253!400x400_big.jpg',
    'https://img2.woyaogexing.com/2017/07/21/027087e83ecdf903!400x400_big.jpg'
    ],
    proofList: [
      {
        id:0,
        show: false
      }, {
        id: 1,
        show: false
      }, {
        id: 2,
        show: false
      }
    ]
  },
  // 展开全部
  onShowAll() {
    this.setData({
      showAll: true
    })
  },
  // 资料展示
  onShowItem(e) {
    const _this = this
    const id = e.currentTarget.dataset.id
    let proofList = _this.data.proofList
    let show = proofList[id].show
    proofList[id].show =!show
    this.setData({
      proofList: proofList
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.intro_images // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userKey = wx.getStorageSync('loginFlag');
    // 获取用户
    const _this = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        _this.setData({
          userInfo: res.data
        })
      },
    })

    // 请求数据
    const myPublishData = api.getPublishDetails(userKey, this.data.publishId)
    myPublishData.then(res => {
      console.log(res)
    })

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