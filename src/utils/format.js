/*
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-01-22 15:52:53
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-01 16:48:21
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
  // 将数字转换为字符串
  let numStr = n.toString();

  // 检查是否为整数
  if (Number.isInteger(n)) {
    return numStr + '.00'; // 直接在整数后面添加 '.00'
  }
  // 找到小数点后第一个非零数字的位置
  let index = numStr.indexOf('.') + 2; // 跳过小数点及其后的第一个数字（即0）

  // 寻找第一个非零数字
  while (numStr[index] === '0') {
    index++;
  }

  // 保留从第一个非零数字起的两位小数
  // 注意：这里假设一定存在两位以上的小数，如果不是这样，还需要更多的错误检查
  return numStr.substring(0, index + 2);
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
  num = Number(num)
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