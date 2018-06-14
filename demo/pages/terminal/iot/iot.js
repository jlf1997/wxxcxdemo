// pages/terminal/iot/iot.js
var iotJS = require('../../terminal/iot/iotJS.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      account : null,
      pwd:null,
      cookie : null
  },

  getIot :function(){
    iotJS.getIot(this);
  },

  inputPwd :function(e){
    this.setData({
      pwd: e.detail.value
    })
  },
  inputAccount:function(e){
    this.setData({
      account: e.detail.value
    })
  },
  test :function(){
    iotJS.test(this);
  },

  demo:function(){
    iotJS.demo(this);
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