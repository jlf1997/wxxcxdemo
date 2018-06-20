const serverUrl =  'https://jlf1997.yxtest.club/sv-center';
const getOpenidUrl = serverUrl +'/iot-sv/wxlogin/getOpenid?code=';
const getLoginTokenUrl = serverUrl +'/iot-sv/wxlogin/loginwithOpenid?openid=';
const checkIsAssocatedUrl = serverUrl +'/iot-sv/wxlogin/checkIsAssocated?openid=';
const assocatedUseOpenid = serverUrl +'/iot-sv/';


module.exports = {
  serverUrl: serverUrl,
  getOpenidUrl: getOpenidUrl,
  checkIsAssocatedUrl, checkIsAssocatedUrl,
  getLoginTokenUrl: getLoginTokenUrl
}