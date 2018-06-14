const serverUrl =  'https://jlf1997.yxtest.club';
const getOpenidUrl = serverUrl +'/iot-sv/wxlogin/getOpenid?code=';
const getLoginTokenUrl = serverUrl +'/iot-sv/wxlogin/loginwithOpenid?openid=';
const checkIsAssocatedUrl = serverUrl +'/iot-sv/wxlogin/checkIsAssocated?openid=';


module.exports = {
  serverUrl: serverUrl,
  getOpenidUrl: getOpenidUrl,
  checkIsAssocatedUrl, checkIsAssocatedUrl,
  getLoginTokenUrl: getLoginTokenUrl
}