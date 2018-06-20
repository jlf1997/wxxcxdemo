var config = require('./config.js');
var promise = require('../libs/bluebird.core.min.js');
var md5s = require('./MD5.js');
var util = require('./util.js');

var app = getApp();

//从后台服务器获取openid，此openid不一定与微信的openid一致，可能进行过加密处理
var getOpenidAsy = function (loginCode) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.getOpenidUrl + loginCode.code,
      success: function (res) {
        var rest = JSON.parse(res.data.data);
        if (util.isNull(rest.openid)){
          reject('获取openid失败');
        }else{
          app.globalData.openid = rest.openid;
          resolve();
        }
       
      },
      fail: function (res) {
        console.log(res);
        reject('获取openid失败：' + res);
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
      },
      fail: function (res) {
        reject(res);
      }
    })
  })

}

//通过openid获取 凭证
var getIotAsy = function () {
  console.info('通过openid获取 凭证');
  return new Promise(function (resolve, reject) {

    wx.request({
      url: config.getLoginTokenUrl + app.globalData.openid,
      header: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      success: function (res) {
        if (res.data.success == true) {
          app.globalData.cookie = res.header['Set-Cookie'];
          resolve();
        } else {
          reject('登录失败，关联的账户已失效，重新关联或者联系管理员');
        }

      }
    })
  })
}




//修改请求头信息
var setHeard = function (obj) {

  return new Promise(function (resolve, reject) {
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
    var oldSuccess = obj.success;
    obj.success = function (res) {
      console.info('res===' + res.data);
   
      if (res.data == "reLogin" || util.isNull(res.data)) {
        //过期
        console.error('凭证过期，请重试');
        getIotAsy();
    
        // reject('凭证过期，请重试');
      } else {
        oldSuccess(res);
      }

    }
    resolve(obj);

  })

}

//判断是否关联微信与业务账号
var isAssocated = function () {
  return new Promise(function (resolve, reject) {
    if (app.globalData.isAssocted == false) {
      wx.request({
        url: config.checkIsAssocatedUrl + app.globalData.openid,
        success: function (res) {
          console.log(res.data);
          app.globalData.isAssocted = res.data;
          resolve();
        }
      })
    } else {
      resolve();
    }

  })

}



//关联操作
var associate = function () {
  return new Promise(function (resolve, reject) {
    resolve();
  })
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

  promise = promise.then(function () {
    return isAssocated()
  });
  if (app.globalData.isAssocted == true) {
    //进行关联
    promise = promise.then(associate());
  }
  //判断是否已经登陆业务服务器
  if (util.isNull(app.globalData.cookie)) {
    promise = promise.then(function () {
      console.log('开始请求服务器获取登录许可');
      return getIotAsy();
    });
  }

  //统一处理header
  promise = promise.then(function () {
    console.log('开始处理header');
    return setHeard(obj);

  });

  //开始请求

  promise.then(function (newObj) {
    console.log('开始请求：' + obj.url);
    wx.request(newObj);
  }).catch(function (error) {

      var failFun = obj.fail;
      if (!util.isNull(failFun)) {
        failFun(error);
      } else {
        console.error('error: ' + error);
      }

    });







}

module.exports = {
  request: request
}