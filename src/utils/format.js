/*
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-01-22 15:52:53
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-02-19 09:45:49
 * @FilePath: \project\zhihuigehoutai\src\utils\format.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { formatTimeToStr } from '@/utils/date'
import { getDict } from '@/utils/dictionary'

export const formatBoolean = (bool) => {
  if (bool !== null) {
    return bool ? '是' : '否'
  } else {
    return ''
  }
}
export const formatDate = (time) => {
  if (time !== null && time !== '') {
    var date = new Date(time)
    return formatTimeToStr(date, 'yyyy-MM-dd hh:mm:ss')
  } else {
    return ''
  }
}

export const filterDict = (value, options) => {
  const rowLabel = options && options.filter(item => item.value === value)
  return rowLabel && rowLabel[0] && rowLabel[0].label
}

export const getDictFunc = async (type) => {
  const dicts = await getDict(type)
  return dicts
}


// 百分比数字换算
export const persentNum = (num) => {
  let n = Number(num) * 100
  return Number(n.toFixed(2))
}

// 小数后两位
export const floatNum = (num) => {
  num = Number(num)
  return num.toFixed(2)
}

// 小数四舍五入
export const roundNum = (num) => {
  num = Math.round(num)
  return num
}

// 数位换算
export function lueNum(num) {
  // 格式化为千分位输出 num.toLocaleString()
  if (num > 9999) {
      num = (num / 10000).toFixed(2); //保留小数点后两位
      if (num > 9999) {
          num = (num.toLocaleString() / 10000).toFixed(4) + "亿";
      } else {
          num = num.toLocaleString() + "万";
      }
  } else {
      num = num.toFixed(2)
  }
  return num;
}

export function mergeArr(array) { //数组去重
  var temp = []; //一个新的临时数组
  for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
          temp.push(array[i]);
      }
  }
  return temp
}