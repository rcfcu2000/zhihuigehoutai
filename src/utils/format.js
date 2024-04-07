/*
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-01-22 15:52:53
 * @LastEditors: dtl 603388675@.com
 * @LastEditTime: 2024-04-07 09:58:29
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
      num = (num.toLocaleString() / 10000).toFixed(2) + "亿";
    } else {
      num = num.toLocaleString() + "万";
    }
  } else if (num < 0) {
    if (num < -9999) {
      num = (num / 10000).toFixed(2); //保留小数点后两位
      if (num < -9999) {
        num = (num.toLocaleString() / 10000).toFixed(2) + "亿";
      } else {
        num = num.toLocaleString() + "万";
      }
    } else {
      num = num.toFixed(2)
    }
  } else {
    num = num.toFixed(2)
  }
  return num;
}
export function lueNum1(num) {
  num = Number(num)
  // 格式化为千分位输出 num.toLocaleString()
  if (num > 9999) {
    num = (num / 10000).toFixed(2); //保留小数点后两位
    if (num > 9999) {
      num = (num.toLocaleString() / 10000).toFixed(2) + "亿";
    } else {
      num = num.toLocaleString() + "万";
    }
  } else if (num < 0) {
    if (num < -9999) {
      num = (num / 10000).toFixed(2); //保留小数点后两位
      if (num < -9999) {
        num = (num.toLocaleString() / 10000).toFixed(2) + "亿";
      } else {
        num = num.toLocaleString() + "万";
      }
    } else {
      num = num.toFixed(2)
    }
  } else {
    num = num.toFixed(0)
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

// 数组对象分组
// array原数组
// key指定属性分组
export function groupBy(array, key) {
  return array.reduce((result, currentItem) => {
    // 获取当前项的关键属性用于分组
    const groupKey = currentItem[key];

    // 如果输出结果中还没有这个组的属性，则创建一个数组
    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    // 将当前项添加到对应组的数组中
    result[groupKey].push(currentItem);

    // 返回累积的结果对象
    return result;
  }, {}); // 初始化结果为一个空对象
}

// 异步更新大数组，要更新的数组 array，分段大小 chunkSize，以及要赋给数组元素的新值 updateValue，delay更新时间间隔
export function updateArrayInChunksAsync(array, chunkSize, updateValue, delay) {
  let i = 0;

  function updateChunk() {
    const end = Math.min(i + chunkSize, array.length);
    for (; i < end; i++) {
      array[i] = updateValue;
    }
    if (i < array.length) {
      setTimeout(updateChunk, delay); // 延迟后再次更新下一分段
    }
  }

  updateChunk(); // 开始更新第一个分段
}

/**
 * @description: 
 * @param {*} array
 * @param {*} chunkSize
 * @param {*} delay
 * @param {*} callback
 * @return {*}
 * 
let originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let chunkSize = 3; // 每段大小
let delay = 1000; // 间隔1秒

chunkArray(originalArray, chunkSize, delay, () => {
  console.log('所有分段处理完毕');
});
 */
export function chunkArray(array, chunkSize, delay, callback) {
  // 创建一个副本防止修改原始数组
  let arrayCopy = [...array];
  let index = 0;

  function process() {
    // 获取当前分段
    let chunk = arrayCopy.slice(index, index + chunkSize);
    if (chunk.length === 0) {
      // 如果分段长度为0，说明处理完毕
      callback && callback();
      return;
    } else {
      // 否则，处理当前分段
      console.log(chunk);
      // TODO: 在此处处理分段逻辑，例如进一步处理或存储分段数据

      // 准备处理下一个分段
      index += chunkSize;
      // 设置延迟以后继续处理
      setTimeout(process, delay);
    }
  }

  // 开始处理
  process();
}

