const config = require('../../../utils/config.js')

var test = function(){
  console.info('test called');
}


/**
 * 关联微信用户与系统用户
 */
var saveAssocation = function (data,app){
  console.info("phone:" + data.phone); 
  wx.request({
    url: config.serverUrl + "/weixin/userInfo/associate",
    data: 'phone=' + data.phone + '&openid=' + app.globalData.openidInfo,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method:"POST",
    success:function(res){
        console.log(res.data);
        wx.showToast({
          title: '成功',
          duration : 1000,
          success : function(){
            let pages = getCurrentPages();//当前页面 
            let prevPage = pages[pages.length - 2];//上一页面
            prevPage.setData({
              hasAssocation: true
             
            })  
            wx.navigateBack({
              // delta : 1
            })
          }
          
        })
        
    }
  })
}

var inputPhone = function(e,that){
  that.setData({
    phone: e.detail.value
  })
}
var hasAssocation=function(){
  wx.request({
    url: config.serverUrl,
    data:'',
    success:function(){

    }
  })
}


module.exports = {
  test: test,
  saveAssocation: saveAssocation,
  inputPhone: inputPhone
}