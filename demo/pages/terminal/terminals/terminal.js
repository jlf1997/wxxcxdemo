// pages/terminal/terminals/terminal.js

var appRequest = require('../../../utils/app.request.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    terid: '',
    terimals: []
  },


  getData: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 20000)
    appRequest.request({
      url: '/iot-sv/wx/dev/getList?page=1',
      method: 'GET',
      header: {
        //设置参数内容类型为json
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();

        that.setData({
          terimals: res.data.data.data
        });

      },
      fail: function (res) {
        wx.hideLoading();
        console.error("fail:" + res);
        wx.showToast({
          title: res
        })
      }
    })
  },

  inputTerid: function (e) {
    this.setData({
      terid: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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