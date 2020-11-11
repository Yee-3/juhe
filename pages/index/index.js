const baseUrl = getApp().globalData.baseUrl
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShow: false,
    route: '',
    phone: '',
    productList: [],
    producShow: [],
    newsList: [],
    newTitle: {},
    advers: [],
    adver:[],
    producChild:[],
    video:{},
    duration: 500, //滑块动画时长
    index: 0,
    currentIndex: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    this.setData({
      route: this.route
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 手机号
    wx.request({
      url: baseUrl + '/api/Config/GetYingXiaoPhone',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          phone: res.data.data
        })

      }
    })
    // 产品展示
    wx.request({
      url: baseUrl + '/api/Product/GetRecommendProductList',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          producShow: res.data.data
        })
        var list=[]
        var num=Math.ceil( res.data.data.length/2)
        for (var i = 0; i < num; i++) {
          var arr = []
          res.data.data.map(function(val, index) {
            if (index >= i * 2 && index < (i + 1) * 2) {
              arr.push(val)
            }
          })
          list.push(arr)
          that.setData({
            producChild:list
          })
        }
      }
    })
    // 产品分类  
    wx.request({
      url: baseUrl + '/api/Product/GetProductTypeList',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          productList: res.data.data,
          // id: res.data.data[0].id
        })
      }
    })
    //新闻资讯 
    wx.request({
      url: baseUrl + '/api/Article/GetRecommendNewsList',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.data.length > 0) {
          res.data.data.map(function (val, i) {
            val.valTime = val.createTime.substring(0, 10)
          })
          that.setData({
            newTitle: res.data.data[0]
          })
          res.data.data.shift()
        }
        that.setData({
          newsList: res.data.data,
        })
      }
    })
    // 广告位
    wx.request({
      url: baseUrl + '/api/Article/GetAdvertisementHomePage',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          advers: res.data.data,
        })
      }
    })
    // 广告位
    wx.request({
      url:'https://tuiguang.yunxiaoer88.com/api/Article/GetHomePageBannerList',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          adver:res.data.data
        })
      }
    })

    // 首页推荐视频
    wx.request({
      url: baseUrl + '/api/Article/GetRecommendVideoList',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        res.data.data[0].videoPath=res.data.data[0].videoPath.indexOf('http')=='-1'?baseUrl+res.data.data[0].videoPath:res.data.data[0].videoPath
        that.setData({
          video: res.data.data[0],
        })
      }
    })

  },
  changeIndex: function (e) {
    // 设置indexe=当前滑块的index
    this.setData({
      index: e.detail.current
    })
  },
  // 点击左侧按钮
  toLift: function (e) {
    var index = this.data.index;
    // index>0,点击一次index+1
    if (index > 0) {
      this.setData({
        currentIndex: index - 1
      })
    } else {
      // 如果index=0,在第一个位置,则滑到最后一个
      this.setData({
        currentIndex: this.data.producChild.length - 1
      })
    }
  },
  // 点击右侧按钮
  toRight: function (e) {
    var index = this.data.index
    if (index >= this.data.producChild.length-1) {
      this.setData({
        currentIndex: 0
      })
    } else {
      this.setData({
        currentIndex: index + 1
      })
    }

  },
  newsMore(){
    wx.navigateTo({
      url: '../news/news',
    })
  },
  	// 详情
	productDetail(e) {
		wx.navigateTo({
			url: '../product1/product1?id=' + e.currentTarget.dataset.id,
		})
	},
  // 视频
  videoMore(){
    wx.navigateTo({
      url: '../video/video',
    })
  },
  // 产品分类
  typeDetail(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '../product/product?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '../product/product',
      })
    }
  },
  // 打电话
  callBack() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  // 热门产品
  hotProducts() {
    wx.navigateTo({
      url: '../product/product',
    })
  },
  // 售后
  afterSale() {
    wx.navigateTo({
      url: '../video/video',
    })
  },
  // 荣誉资质
  honor() {
    wx.navigateTo({
      url: '../honor/honor',
    })
  },
  // 关于我们
  about() {
    wx.navigateTo({
      url: '../Introduction/Introduction',
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
    wx.navigateTo({
      url: '../Introduction/Introduction',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 产品中心
  product() {
    wx.navigateTo({
      url: '../product/product',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 案例中心
  case () {
    wx.navigateTo({
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
    wx.navigateTo({
      url: '../video/video',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 服务中心
  service() {
    wx.navigateTo({
      url: '../service/service',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },
  // 联系我们
  contact() {
    wx.navigateTo({
      url: '../contact/contact',
    })
    var that = this
    setTimeout(function () {
      that.navSilce()
    }, 500)
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})