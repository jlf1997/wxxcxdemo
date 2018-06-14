//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasAssocation : true,
    appInfo :{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else{
      if (this.data.canIUse) {
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
    } 
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    // let pages = getCurrentPages();
    // let currPage = pages[pages.length - 1];
    // console.log(currPage.data);
    // if (currPage.data.selAddress == "") {
    //   // that.getUserAddress(that.data.userId);
    // } else {
    //   this.setData({//将携带的参数赋值
    //     hasAssocation: currPage.data.item
    //   });
    // }
   
  },
  associateToApp: function(){
    wx.navigateTo({
      url: 'login/login',
    })
  },
  getUserInfo1: function(e) {
    var that = this;
    console.log("e:" + e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    wx.login({
      success: function (loginCode) {
        var appid = 'wx8822ecc55df1a39a'; //填写微信小程序appid  
        var secret = 'e79a5d8f8c65fa087c552ff5c92837e5'; //填写微信小程序secret  

        //调用request请求api转换登录凭证  
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret
          + '&grant_type=authorization_code&js_code=' + loginCode.code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('openid:' + res.data.openid) //获取openid 
            // console.log("====" + that.globalData.openidInfo);
            if (res.data.openid) {
              app.globalData.openidInfo = res.data.openid;
            }
            that.getInfo();

          }
        })
      }
    })
  },
  getInfo : function(){
    var that = this;
    wx.request({
      url: 'https://jlf1997.ngrok.xiaomiqiu.cn/weixin/userInfo/normal',
      header: {
        'content-type': 'application/json'
      },
      type:'json',
      method: 'GET',
      data: {          //参数为json格式数据
        openid: app.globalData.openidInfo
         
      },
      success: function (res) {
        if (!res.data || ''==res.data){        
          that.saveInfo();
        }else{
          var exp = res.data.appUserInfo;
           
          if (typeof (exp) != "undefined" && "" != res.data.appUserInfo){
            util.writeObj(res.data.appUserInfo);
            that.setData({
              appInfo: exp,
              hasAssocation :true
            });
          }else{
            that.setData({              
              hasAssocation: false
            });
          }
         
          // util.writeObj(res.data.appUserInfo);
        }


      }
    })
  },
  saveInfo:function(){
    // util.writeObj(app.globalData.userInfo);
    // console.info(JSON.parse(app.globalData.userInfo));
    wx.request({
      url: 'https://jlf1997.ngrok.xiaomiqiu.cn/weixin/userInfo/normal',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data:  {          //参数为json格式数据
        openid: app.globalData.openidInfo,
        nickName: app.globalData.userInfo.nickName,
        gender: app.globalData.userInfo.gender,
        city: app.globalData.userInfo.city,
        province: app.globalData.userInfo.province,
        country: app.globalData.userInfo.country,
        avatarUrl: app.globalData.userInfo.avatarUrl,
      },
      success: function (res) {
        util.writeObj(res) //获取openid 
        // console.log("====" + that.globalData.openidInfo);
       


      }
    })
  }
})
