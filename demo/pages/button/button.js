// pages/button/button.js
const config = require('../../utils/config.js')

var app = getApp();
Page({


 

  /**
   * 页面的初始数据
   */
  data: {
    message: 'Hello MINA!'
   
  },

  clickMe: function (event) {
    this.setData({ message: "Hello World" });
     console.log(event);
    
  },

  toVideo :function(){
    wx.navigateTo({
      url: '/pages/terminal/video/video'
    })
  },
  toAudio :function(){
    wx.navigateTo({
      url: '/pages/terminal/audio/audio'
    })
  },

  toTerminalInfo :function(){
    wx.navigateTo({
      url: '/pages/terminal/terminals/terminal'
    })
  },
  toIot :function(){
    wx.navigateTo({
      url: '/pages/terminal/iot/iot'
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
    console.log('分享');
  }
})