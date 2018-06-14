var config = require('./config.js');
var promise = require('./bluebird.core.min.js');
var md5s = require('./MD5.js');
var util = require('./util.js');

var app = getApp();

//从后台服务器获取openid，此openid不一定与微信的openid一致，可能进行过加密处理
var getOpenidAsy = function (loginCode) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.serverUrl + '/iot-sv/wxlogin/getOpenid?code=' + loginCode.code,
      success: function (res) {
        console.log("res:" + res.data.data);
        var rest = JSON.parse(res.data.data);
        console.log("opendid:" + rest.openid);
        app.globalData.openid = rest.openid;
        resolve();
      },
      fail: function (res) {
        console.log(res);
        reject();
      }
    })
  });
}


//登录操作,返回promise
var loginAsy = function () {

  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (loginCode) {
        resolve(loginCode);
      }
    })
  })

}

//通过openid获取 凭证
var getIotAsy = function () {
  return new Promise(function (resolve, reject) {
    var pass = md5s.MD5('admin' + "#" + 'admin');
    wx.request({
      url: config.serverUrl + '/iot-sv/wxlogin/login?username=' + 'admin' + '&pswd=' + pass,
      // data: 'username=' + that.data.account + '&pswd=' + that.data.pwd ,
      header: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      success: function (res) {
        app.globalData.cookie = res.header['Set-Cookie'];
        resolve();
      }
    })
  })
}




//修改请求头信息
var setHeard = function (obj) {
  //增加头信息
  var header = obj.header;
  if (util.isNull(header)) {
    obj.header = {
      'X-Requested-With': 'XMLHttpRequest',
      'Cookie': app.globalData.cookie
    }
  } else {
    header["X-Requested-With"] = 'XMLHttpRequest';
    header['Cookie'] = app.globalData.cookie;
  }
  obj.url = config.serverUrl + obj.url;
  return obj;
}

//判断是否关联微信与业务账号
var isAssocated = function () {
  return false;
}

//关联操作
var associate = function () {

}

//封装wx  request
var request = function (obj) {
  var loginProcessing = true;
  var promise = new Promise(function (resolve, reject) {
    resolve();
  });
  //判断是否登录
  if (util.isNull(app.globalData.openid)) {
    //未登录：自动登录或者跳转登录页面
    promise = promise.then(function () {
      return loginAsy();
    }).then(function (data) {
      return getOpenidAsy(data);
    });
  }

  //判断是否已经关联
  if (!isAssocated()) {
    //进行关联
    promise.then(associate());
  }
  //判断是否已经登陆业务服务器

  promise = promise.then(function () {
    return getIotAsy();
  });

  promise.then(function () {
    console.log(app.globalData.openid);
    obj = setHeard(obj);
    console.log('开始请求：' + obj.url);
    wx.request(obj);
  });





}

module.exports = {
  request: request
}