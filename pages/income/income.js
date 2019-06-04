Page({
  data: {
    active: true, // 当前选中状态
  },

  onLoad() {

  },

  // 切换收入/支出
  onOption() {
    this.setData({
      active: !this.data.active
    })
  }
})
