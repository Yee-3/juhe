const baseUrl = getApp().globalData.baseUrl
// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: wx.getStorageSync('phone'),
    adver: [],
    cont: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
			phone: wx.getStorageSync('phone'),
			adver: wx.getStorageSync('adver'),
		})
    wx.request({
      url: baseUrl + '/api/Article/GetArticleDetailByArticleId',
      data: {
        ArticleId: '974c291c-5a89-4ee2-917e-ac6900c48bd6'
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        res.data.data.contents= res.data.data.contents.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
        that.setData({
          cont: res.data.data
        })
      }
    })
  },
  // 打电话
  callBack() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
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
   this.navSilce()
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