// pages/contact/contact.js
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
  onPageScroll(e) {
    console.log('滚起来')
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
    wx.redirectTo({
      url: '../product/product',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
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
    wx.navigateTo({
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
    this.navSilce()
  },
  indexIn(){
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