// 获取参数
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split('&');
  searchArr.forEach((v) => {
    const index = v.indexOf('=');
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}
//  扁平化数组
export function flatArray(arr, key = 'children') {
  const result = [];
  arr.forEach((item) => {
    result.push(item);
    if (item[key] && item[key].length > 0) {
      result.push(...flatArray(item[key]));
    }
  });
  return result;
}
/**
 * 格式化日期
 * @param {Date} timestamp
 * @param {String} format
 */
// 获取年月日时分秒 周 时间
export function timestampChange(timestamp, format) {
  let dateStr = format || 'yyyy-MM-dd HH:mm:ss';
  // 获取完整年份(4位)
  const year = timestamp.getFullYear();
  // 获取当前年份(2位)
  const yearTwo = timestamp.getYear();
  // 获取当前月份(0-11,0代表1月)
  const month = timestamp.getMonth() + 1;
  // 获取当前日(1-31)
  const day = timestamp.getDate();
  // 获取当前星期X(0-6,0代表星期天)
  let week = timestamp.getDay();
  // 获取当前小时数(0-23)
  const hours = timestamp.getHours();
  // 获取当前分钟数(0-59)
  const minutes = timestamp.getMinutes();
  // 获取当前秒数(0-59)
  const seconds = timestamp.getSeconds();
  // 获取当前毫秒数(0-999)
  const milliseconds = timestamp.getMilliseconds();
  /* eslint-disable */
  switch (week) {
    case 0:
      week = '星期天';
      break;
    case 1:
      week = '星期一';
      break;
    case 2:
      week = '星期二';
      break;
    case 3:
      week = '星期三';
      break;
    case 4:
      week = '星期四';
      break;
    case 5:
      week = '星期五';
      break;
    case 6:
      week = '星期六';
  }
  /* eslint-enable */
  // 年
  dateStr = dateStr.replace(/yyyy|YYYY/, year);
  dateStr = dateStr.replace(/yy{2}|YY{2}/, yearTwo);
  // 月
  dateStr = dateStr.replace(/MM/, month < 10 ? `0${month}` : month);
  dateStr = dateStr.replace(/M{1}/, month);
  // 日
  dateStr = dateStr.replace(/DD|dd/, day < 10 ? `0${day}` : day);
  dateStr = dateStr.replace(/D{1}|d{1}/, day);
  // 时
  dateStr = dateStr.replace(/HH|hh/, hours < 10 ? `0${hours}` : hours);
  dateStr = dateStr.replace(/H{1}|h{1}/, hours);
  // 分
  dateStr = dateStr.replace(/mm/, minutes < 10 ? `0${minutes}` : minutes);
  dateStr = dateStr.replace(/m{1}/, minutes);
  // 秒
  dateStr = dateStr.replace(/SS|ss/, seconds < 10 ? `0${seconds}` : seconds);
  dateStr = dateStr.replace(/S{1}|s{1}/, seconds);
  // 毫秒
  dateStr = dateStr.replace(/MS|ms/, milliseconds);
  // 周
  dateStr = dateStr.replace(/W|w|week/, week);
  return dateStr;
}
