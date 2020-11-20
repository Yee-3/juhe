// pages/product/product.js
const baseUrl = getApp().globalData.baseUrl
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isShow: false,
		titleList: [],
		titleIndex: 0,
		offset: 0,
		loadingType: 0,
		list: [],
		id: '',
		phone: wx.getStorageSync('phone'),
		adver: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(wx.getStorageSync('adver'))
		this.setData({
			phone: wx.getStorageSync('phone'),
			adver: wx.getStorageSync('adver'),
		})
		var that = this
		wx.request({
			url: baseUrl + '/api/Product/GetProductTypeList',
			data: {},
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: function (res) {
				that.setData({
					titleList: res.data.data,
				})
				if (options.id) {
					that.setData({
						id: options.id
					})
				} else {
					that.setData({
						id: res.data.data[0].id
					})
				}
				var data = {
					productTypeId: options.id ? options.id : res.data.data[0].id,
					offset: that.data.offset,
					count: 10
				}
				that.getList(data)
			}
		})
	},

	// 打电话
	callBack() {
		wx.makePhoneCall({
			phoneNumber: this.data.phone,
		})
	},
	// 获取列表
	// 获取数据
	getList(data) {
		var that = this
		wx.showNavigationBarLoading()
		wx.request({
			url: baseUrl + '/api/Product/GetProductListByProductTypeId',
			data: data,
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: function (res) {
				that.setData({
					list: res.data.data
				})
				if (res.data.data == null) {
					wx.hideNavigationBarLoading();
					return
				}
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
			offset: that.data.offset +10
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
			url: baseUrl + '/api/Product/GetProductListByProductTypeId',
			data: data,
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: function (res) {
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
	// 标题切换
	toggleIndex(e) {
		this.setData({
			titleIndex: e.currentTarget.dataset.index,
			id: e.currentTarget.dataset.id,
			offset: 0
		})
		var data = {
			productTypeId: e.currentTarget.dataset.id,
			offset: this.data.offset,
			count: 10
		}
		this.getList(data)
	},
	// 详情
	productDetail(e) {
		wx.navigateTo({
			url: '../product1/product1?id=' + e.currentTarget.dataset.id,
		})
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
		this.navSilce()
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
		var data = {
			productTypeId: this.data.id,
			offset: this.data.offset + 10,
			count: 10
		}
		this.listMore(data)
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})