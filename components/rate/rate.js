// js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate1: Number,
    rate: {
      type: Number,
      value: 0
    },
    rateIsSelect: {
      type: Boolean,
      value: false
    }
  },
  data: {
    starImgs: [
      { id: 1, level: '非常不推荐', },
      { id: 2, level: '不推荐', },
      { id: 3, level: '一般', },
      { id: 4, level: '推荐', },
      { id: 5, level: '非常推荐', }
    ],
    rate: 3.5,
    star_full: '/image/full_g.png',//星星图标 满星
    star_empty: '/image/full.png',//星星图标 空星
    rateIsSelect: false
  },
  /**
   * 监听
   */
  observers: {
    "rate": (e) => {
      console.log('监听 rate', e)
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
    * 星级评分点击事件
    */
    select(e) {
      this.data.rate = e.currentTarget.dataset.index;
      if (this.data.rateIsSelect) {
        this.setData({
          rate: this.data.rate,
        })
      }
    },
  }
})