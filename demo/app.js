//app.js
App({
 
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    // wx.login({
    //   success: function (loginCode) {
    //     var appid = 'wx8822ecc55df1a39a'; //填写微信小程序appid  
    //     var secret = 'e79a5d8f8c65fa087c552ff5c92837e5'; //填写微信小程序secret  
        
    //     //调用request请求api转换登录凭证  
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret
    //       +'&grant_type=authorization_code&js_code=' + loginCode.code,
    //       header: {
    //         'content-type': 'application/json'
    //       },
    //       success: function (res) {
    //         console.log('openid:' + res.data.openid) //获取openid 
    //         // console.log("====" + that.globalData.openidInfo);
    //         if (res.data.openid){
    //           that.globalData.openidInfo = res.data.openid
    //         }
          
          
    //       }
    //     })
    //   }
    // }) 
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo;
    //           console.info(res.userInfo);

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    openidInfo:'',
    cookie : null,
    openid:null
  }
})