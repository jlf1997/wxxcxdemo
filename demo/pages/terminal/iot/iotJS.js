const config = require('../../../utils/config.js')
const util = require('../../../utils/util.js')
const appRequset = require('../../../utils/app.request.js')
var md5fun = require('../../terminal/iot/MD5.js');

var getIot = function(that){
  console.log(that.data.account);
  var pass = md5fun.MD5(that.data.account + "#" + that.data.pwd);
  wx.request({
    url: config.serverUrl + '/iot-sv/wx/login?username=' + that.data.account + '&pswd=' + pass,
    // data: 'username=' + that.data.account + '&pswd=' + that.data.pwd ,
    header:{
      'X-Requested-With': 'XMLHttpRequest'
    },
    success:function(res){
    
      console.log('header:' + res.header['Set-Cookie']);
      util.writeObj(res.header);
      that.setData({
        cookie: res.header['Set-Cookie']
      })
    }
  })
}

var test = function(that){

  appRequset.request({
      url: '/iot-sv/wx/dev/getList?page=10',
    // header: {
    //   'Cookie': that.data.cookie
    // },
    success:function(res){
        if(util.isNull(res.data)){
           
        }else{
          wx.showToast({
            title: '请求成功',
          });
        }
    }
  })

}

var demo = function (that) {
  console.info(that.data.cookie);
  wx.request({
    url: config.serverUrl + '/weixin/demo',
    header: {
      'Cookie': 'JSESSIONID=123'
    },
    method:"GET",
    success: function (res) {
      console.info(res);
    }
  })
}



module.exports = {
  getIot: getIot,
  test: test,
  demo:demo
}