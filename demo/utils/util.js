

var app = getApp();
const formatTime = date => {
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const hour = date.getHours()
const minute = date.getMinutes()
const second = date.getSeconds()

return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var writeObj =  function writeObj(obj) {
  var description = "";
  for (var i in obj) {
    var property = obj[i];
    description += i + " = " + property + "\n";
  }
  console.info("obj:"+description);
}


/**
 * 判断exp 是否为null 或者 undefined
 */
var isNull = function(exp){
  if (exp && typeof (exp) !="undefined" ) 
  {
    return false;
  }　
  return true;
}



module.exports = {
  formatTime: formatTime,
  writeObj: writeObj,
  isNull: isNull
}

