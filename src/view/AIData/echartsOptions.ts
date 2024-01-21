import { it } from "element-plus/es/locale";

function getRecentDates(monthsOffset: number): string[] {
    // 创建当前时间的 Date 对象
    let currentDate = new Date();

    // 设置起始日期为当前日期的上一个月第一天
    currentDate.setMonth(currentDate.getMonth() - monthsOffset);
    currentDate.setDate(1);

    // 存放结果数组
    let resultArray: string[] = [];

    // 遍历30次（最多30天），直到达到目标日期或者超过了一个月
    for (let i = 0; i < 30 && currentDate <= new Date(); i++) {
        // let dateString = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
        let dateString = `${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
        // 添加到结果数组中
        resultArray.push(dateString);

        // 更新日期为下一天
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return resultArray;
}


const gmvPrductList = {
    recoreds: [
        {
            current_inventory: "S",
            store_gmv: [1231231, 123, 123, 123, 123, 123]
        },
        {
            current_inventory: "A",
            store_gmv: [1231231, 123, 123, 123, 123, 123]
        }, {
            current_inventory: "B",
            store_gmv: [1231231, 123, 123, 123, 123, 123]
        }
    ],
    // date:['12-1','12-2'...]
}


export const lineOptions1 = (arr: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            data: arr.map((i: { name: any; }) => i.name),
            textStyle: {
                color: '#FFF'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: arr[0]?.date,
            axisLine: {
                show: false,

                lineStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                show: true,
                color: '#fff'
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#e0e6f126"
                }
            },
            axisLabel: {
                show: false,
                color: '#fff'
            },
            axisTick: {
                show: false,
            },
        },
        series: arr.map((i: { name: any; data: any; }, index: number) => {
            return {
                name: i.name,
                symbolSize: 1, // 设置数据点的大小为8像素
                type: 'line',
                data: i.data,
                itemStyle: {
                    color: backColor[index],
                }
            }
        }),
    }
}



export const lineOptions = (arr: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            data: arr.map((i: { name: any; }) => i.name),
            textStyle: {
                color: '#FFF'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: getRecentDates(1),
            axisLine: {
                show: false,

                lineStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                show: true,
                color: '#fff'
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#e0e6f126"
                }
            },
            axisLabel: {
                show: false,
                color: '#fff'
            },
            axisTick: {
                show: false,
            },
        },
        series: arr.map((i: { name: any; data: any; }, index: number) => {
            return {
                name: i.name,
                stack: 'Total',
                symbolSize: 1, // 设置数据点的大小为8像素
                type: 'line',
                data: i.data,
                itemStyle: {
                    color: backColor[index],
                }
            }
        }),
    }
}



export const barOptions = (arr: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#03FF91', '#FECD04', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: arr.map((i: { name: any; }) => i.name),
            textStyle: {
                color: '#FFF'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: arr[0]?.date,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                show: true,
                color: '#fff'
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#e0e6f126"
                }
            },
            axisLabel: {
                show: false,
                color: '#fff'
            },
            axisTick: {
                show: false,
            },
        },
        series: arr.map((i: { name: any; data: any; }, index: number) => {
            return {
                type: 'bar',
                name: i.name,
                stack: 'Total',
                data: i.data,
                itemStyle: {
                    color: backColor[index],
                }
            }
        }),
    }
}