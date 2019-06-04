
import { Goods } from "./../../models/goods";

const api = new Goods()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    specClass: true,
    specSelected: ['X', '白色'],
    nodes: `<div style="text-align:center;">《静夜思》· 李白<br />床前明月光，<br />疑是地上霜。 <br />举头望明月， <br />低头思故乡。<br /><img src="http://www.xiexingcun.com/Poetry/6/images/53e.jpg" alt="" /><br /><img src="http://www.xiexingcun.com/Poetry/6/images/53.jpg" alt="" /><br /><br /><img src="http://www.xiexingcun.com/Poetry/6/images/53b.jpg" alt="" /><br /></div>`,
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
    // 获取数据
    api.getGoodsDetails('5cf4db325360f633f03c3461').then(res => {
      console.log(res);
    })
  },

})
