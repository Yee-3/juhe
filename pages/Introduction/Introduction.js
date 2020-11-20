const baseUrl = getApp().globalData.baseUrl
// pages/Introduction/Introduction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: 0,
    route: '',
    list: [],
    phone: wx.getStorageSync('phone'),
    adver: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: wx.getStorageSync('phone'),
      adver: wx.getStorageSync('adver'),
      route: this.route
    })
    var that = this
    wx.request({
      url: baseUrl + '/api/Article/GetArticleListByArticleTypeId',
      data: {
        ArticleTypeId: '151939bb-74e2-4385-a9b9-ac6900bdb508',
        offset: 0,
        count: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        res.data.data.map(function(val,i){
         val.contents= val.contents.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
        })
        that.setData({
          list: res.data.data
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
  toggle(e) {
    this.setData({
      indexs: e.currentTarget.dataset.index
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
    this.navSilce()
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