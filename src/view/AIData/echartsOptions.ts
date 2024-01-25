import { fa, it } from "element-plus/es/locale";

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

function fontSize(res) {
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize
}

// 线图
export const lineOptions1 = (arr: any, date: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            data: arr?.map((i: { name: any; }) => i.name),
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
            data: date,
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
        series: arr?.map((i: { name: any; data: any; }, index: number) => {
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
// 假数据线图
export const lineOptions = (arr: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            data: arr?.map((i: { name: any; }) => i.name),
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
        series: arr?.map((i: { name: any; data: any; }, index: number) => {
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
// 饼图
export const pieOptions = (arr: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'item'
        },
        title: {
            text: '本月货盘',
            right: 20,
            top: "32%",
            textStyle: {
                color: '#FFF'
            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 20,
            top: "40%",
            textStyle: {
                color: '#FFF'
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '60%'],
                // adjust the start angle
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bolder'
                    },
                    formatter(param) {
                        // correct the percentage
                        return param.name + ' (' + param.percent + '%)';
                    }
                },
                data: [
                    { value: 1048, name: 'S' },
                    { value: 735, name: 'A' },
                    { value: 580, name: 'B' },
                    { value: 484, name: 'C' },
                    { value: 300, name: 'D' },

                ]
            }
        ]
    }
}
//横轴柱状图
export const barOptionsX = (arr: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: false,
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                show: false,
            },
        },
        dataZoom: [
            {
                start: 0,//默认为0
                end: 100,//默认为100
                type: 'slider',
                maxValueSpan: 9,//显示数据的条数(默认显示10个)
                show: true,
                //    yAxisIndex: [0],
                handleSize: 0,//滑动条的 左右2个滑动条的大小
                height: '80%',//组件高度
                left: 600, //左边的距离
                right: 8,//右边的距离
                top: 50,//上边边的距离
                startValue: 5,
                endValue: 5,
                borderColor: "none",
                fillerColor: '#909399',//滑动块的颜色
                backgroundColor: 'rgba(13,33,117,0.5)',//两边未选中的滑动条区域的颜色
                showDataShadow: false,//是否显示数据阴影 默认auto
                showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
                realtime: false, //是否实时更新
                filterMode: 'filter',
                yAxisIndex: [0, 1],//控制的y轴
            },
            //滑块的属性
            {
                type: 'inside',
                show: true,
                yAxisIndex: [0, 1],
                start: 1,//默认为1
                end: 9,//默认为100
            },
        ],
        yAxis: {
            type: 'category',
            // show:false,
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
            axisLabel: {
                color: '#fff'
            },
            axisTick: {
                show: false // 不显示坐标轴刻度线
            },
            axisLine: {
                show: false, // 不显示坐标轴线
            },
            // axisLabel: {
            //     show: false, // 不显示坐标轴上的文字
            // },
            splitLine: {
                show: false // 不显示网格线
            },
        },
        series: [
            {
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230, 18203, 23489, 29034, 104970, 131744, 630230, 18203, 23489, 29034, 104970, 131744, 630230, 18203, 23489, 29034, 104970, 131744, 630230, 18203, 23489, 29034, 104970, 131744, 630230],
                barCategoryGap: "100%",
                barWidth: fontSize(0.1),
                itemStyle: {
                    color: '#01E5FF',
                }
            },
        ]
    }
}



// 默认堆积柱状图
export const barOptions = (arr: any, date: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#03FF91', '#FECD04', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: arr?.map((i: { name: any; }) => i.name),
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
            data: date,
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
        series: arr?.map((i: { name: any; data: any; }, index: number) => {
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

/**
 * @description: 
 * @param {Array} arr 一维数组[1,2,3]
 * @return {*}
 */
export const table_lineOptions = (arr: Array) => {
    const backColor = ['#046991', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        color: backColor,
        tooltip: {
            trigger: 'axis',
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = { top: 35 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            },
            formatter: '{c}'
        },
        grid: {
            left: '-25%',
            right: '5%',
            bottom: '-50%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            show: false
        },
        yAxis: {
            show: false,
        },
        series: [{
            data: arr,
            type: "line",
            symbolSize: 0,
            smooth: true
        }]
    }
}


export const wordsCloud = (arr: Array) => {
    return {
        tooltip: {
            trigger: 'axis',
            position: function (pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                var obj = { top: 35 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            },
            formatter: '{b}:{c}'
        },
        grid: {
            left: '-25%',
            right: '5%',
            bottom: '-50%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            show: false
        },
        yAxis: {
            show: false,
        },
        series: [{
            type: 'wordCloud',

            // The shape of the "cloud" to draw. Can be any polar equation represented as a
            // callback function, or a keyword present. Available presents are circle (default),
            // cardioid (apple or heart shape curve, the most known polar equation), diamond (
            // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

            shape: 'circle',

            // Keep aspect ratio of maskImage or 1:1 for shapes
            // This option is supported since echarts-wordcloud@2.1.0
            keepAspect: false,

            // A silhouette image which the white area will be excluded from drawing texts.
            // The shape option will continue to apply as the shape of the cloud to grow.

            // maskImage: maskImage,

            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.

            left: 'center',
            top: 'center',
            width: '70%',
            height: '80%',
            right: null,
            bottom: null,

            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.

            sizeRange: [12, 60],

            // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

            rotationRange: [-90, 90],
            rotationStep: 45,

            // size of the grid in pixels for marking the availability of the canvas
            // the larger the grid size, the bigger the gap between words.

            gridSize: 8,

            // set to true to allow word to be drawn partly outside of the canvas.
            // Allow word bigger than the size of the canvas to be drawn
            // This option is supported since echarts-wordcloud@2.1.0
            drawOutOfBound: false,

            // if the font size is too large for the text to be displayed,
            // whether to shrink the text. If it is set to false, the text will
            // not be rendered. If it is set to true, the text will be shrinked.
            // This option is supported since echarts-wordcloud@2.1.0
            shrinkToFit: false,

            // If perform layout animation.
            // NOTE disable it will lead to UI blocking when there is lots of words.
            layoutAnimation: true,

            // Global text style
            textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                // Color can be a callback function or a color string
                color: function () {
                    // Random color
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                focus: 'self',

                textStyle: {
                    textShadowBlur: 10,
                    textShadowColor: '#333'
                }
            },

            // Data is an array. Each array item must have name and value property.
            data: [{
                name: 'Farrah Abraham',
                value: 366,
                // Style of single text
                textStyle: {
                }
            },{
                name: 'Farraham',
                value: 66,
                // Style of single text
                textStyle: {
                }
            },{
                name: 'Abraham',
                value: 36,
                // Style of single text
                textStyle: {
                }
            },{
                name: 'Farrah',
                value: 166,
                // Style of single text
                textStyle: {
                }
            }]
        }]
    }
}
