const baseUrl = getApp().globalData.baseUrl
// pages/case/case.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: 0,
    loadingType: 0,
    list: [],
    phone: wx.getStorageSync('phone'),
    adver: [],
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
    var data = {
      ArticleTypeId: 'b3b3ee5b-6a3c-453d-9874-ac6a00ac89b0',
      offset: that.data.offset,
      count: 9
    }
    this.getList(data)
  },
  caseDetail(e){
    wx.navigateTo({
      url: '../video1/video1?id='+e.currentTarget.dataset.id,
    })
  },
  // 获取数据
  getList(data) {
    var that = this
    wx.showNavigationBarLoading()
    wx.request({
      url: baseUrl + '/api/Article/GetArticleListByArticleTypeId',
      data: data,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.data == null) {
          that.setData({
            list: res.data.data
          })
          wx.hideNavigationBarLoading();
          return
        } 
         if (res.data.data.length > 0) {
          res.data.data.map(function (val, i) {
            val.valTime = val.createTime.substring(0, 10)
          })
        }
        that.setData({
          list: res.data.data
        })
        if (res.data.data.length < 10) {
          that.setData({
            loadingType: 2
          })
        } else {
          that.setData({
            loadingType: 0
          })
        }
        wx.hideNavigationBarLoading();
      }
    })
  },
  // 上拉加载
  listMore(data) {
    var that = this
    this.setData({
      offset: that.data.offset + 9
    })
    if (this.data.loadingType != 0) {
      //loadingType!=0;直接返回
      return false;
    }
    this.setData({
      loadingType: 1
    })
    wx.showNavigationBarLoading()
    wx.request({
      url: baseUrl + '/api/Article/GetArticleListByArticleTypeId',
      data: data,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.data.length > 0) {
          res.data.data.map(function (val, i) {
            val.valTime = val.createTime.substring(0, 10)
          })
        }
        that.setData({
          list: that.data.list.concat(res.data.data)
        })
        if (res.data.data.length < 10) {
          that.setData({
            loadingType: 2
          })
          wx.hideNavigationBarLoading()
        } else {
          that.setData({
            loadingType: 0
          })
        }
        wx.hideNavigationBarLoading()
      }
    })
  },
  onPageScroll(e) {
    this.setData({
      isShow: false
    })
  },
  // 打电话
  callBack() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
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
    this.navSilce()
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
    var data = {
      ArticleTypeId: 'b3b3ee5b-6a3c-453d-9874-ac6a00ac89b0',
      offset: this.data.offset+9,
      count: 9
    }
    this.listMore(data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})