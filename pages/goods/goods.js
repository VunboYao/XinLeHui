// goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    specClass: true,
    specSelected: ['X', '白色'],
    imgList: [{
      src: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'
    }, {
      src: 'https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
    }, {
      src: 'https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg'
    }],
    desc: [{
      src: "https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg"
    }, {
      src: "https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg"
    }, {
      src: "https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg"
    }, {
      src: "https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg"
    }],
    specList: [{
      id: 1,
      name: '尺寸',
    }, {
      id: 2,
      name: '颜色',
    }, ],
    specChildList: [{
      id: 1,
      pid: 1,
      name: 'XS',
    }, {
      id: 2,
      pid: 1,
      name: 'S',
    }, {
      id: 3,
      pid: 1,
      name: 'M',
    }, {
      id: 4,
      pid: 1,
      name: 'L',
    }, {
      id: 5,
      pid: 1,
      name: 'XL',
    }, {
      id: 6,
      pid: 1,
      name: 'XXL',
    }, {
      id: 7,
      pid: 2,
      name: '白色',
    }, {
      id: 8,
      pid: 2,
      name: '珊瑚粉',
    }, {
      id: 9,
      pid: 2,
      name: '草木绿',
    }]
  },
  //规格弹窗开关
  toggleSpec() {
    if (this.data.specClass === true) {
      this.setData({
        specClass: false
      })
      return
    } else if (this.data.specClass === false) {
      this.setData({
        specClass: true
      })
      return
    }
  },
  //选择规格
  selectSpec(index, pid) {
    let list = this.specChildList;
    list.forEach(item => {
      if (item.pid === pid) {
        this.$set(item, 'selected', false);
      }
    })

    this.$set(list[index], 'selected', true);
    //存储已选择
    this.specSelected.forEach(item => {
      if (item.pid === pid) {
        item = list[index];
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this
    //规格 默认选中第一条
    // this.data.specList.forEach(item => {
    //   for (let cItem of _this.data.specChildList) {
    //     if (cItem.pid === item.id) {
    //       this.$set(cItem, 'selected', true);
    //       _this.data.specSelected.push(cItem);
    //       break; //forEach不能使用break
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})