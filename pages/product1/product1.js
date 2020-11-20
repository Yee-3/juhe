const baseUrl = getApp().globalData.baseUrl
// pages/product1/product1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cont: {},
    isShow: false,
    currentIndex: 0,
    pics: [],
    phone: '',
    adver: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      phone: wx.getStorageSync('phone'),
      adver: wx.getStorageSync('adver'),
    })
    wx.request({
      url: baseUrl + '/api/Product/GetProductDetailByProductId',
      data: {
        productId: options.id
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var arr = res.data.data.systemProductBannerImageList
        if (arr.length > 0) {
          arr.map(function (val, i) {
            val.imgUrl = val.imgUrl.indexOf('http') == '-1' ? baseUrl + val.imgUrl : val.imgUrl
          })
        }
        res.data.data.systemProduct.detail=res.data.data.systemProduct.detail.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
        that.setData({
          cont: res.data.data.systemProduct,
          pics: res.data.data.systemProductBannerImageList
        })
      }
    })
  },
  swiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  // 点击左侧按钮
  toLift: function (e) {
    var index = this.data.currentIndex;
    // index>0,点击一次index+1
    if (index > 0) {
      this.setData({
        currentIndex: index - 1
      })
    } else {
      // 如果index=0,在第一个位置,则滑到最后一个
      this.setData({
        currentIndex: this.data.pics.length - 1
      })
    }
  },
  // 点击右侧按钮
  toRight: function (e) {
    console.log
    var index = this.data.currentIndex
    if (index >= this.data.pics.length - 1) {
      this.setData({
        currentIndex: 0
      })
    } else {
      this.setData({
        currentIndex: index + 1
      })
    }

  },
  // 滚动隐藏
  onPageScroll(e) {
    this.setData({
      isShow: false
    })
  },
  navSilce() {
    var show = this.data.isShow
    this.setData({
      isShow: !show
    })
  },
  // 关于我们
  aboutUs() {
    wx.redirectTo({
      url: '../Introduction/Introduction',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 产品中心
  product() {
    wx.navigateBack({
      delta: 1,
    })
  },
  // 案例中心
  case () {
    wx.redirectTo({
      url: '../case/case',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 新闻中心
  news() {
    wx.redirectTo({
      url: '../news/news',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 视频中心
  video() {
    wx.redirectTo({
      url: '../video/video',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 服务中心
  service() {
    wx.redirectTo({
      url: '../service/service',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 联系我们
  contact() {
    wx.redirectTo({
      url: '../contact/contact',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  indexIn() {
    wx.reLaunch({
      url: '/pages/index/index'
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