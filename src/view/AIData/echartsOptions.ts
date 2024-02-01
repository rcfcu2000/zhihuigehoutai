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


const by = function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a > b ? -1 : 1;
            }
            return typeof a > typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
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
            },
            axisTick: {
                show: false,
            },
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
            },
            axisTick: {
                show: false,
            },
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
            trigger: 'item',
            formatter: function (params) {
                return '<div>' + params.name + '<br>'
                    + '花费' + " : " + params.value + ' (' + parseFloat((params.data.cost_rate * 100).toFixed(2)) + ') %' + '<br/>'
                    + 'GMV' + " : " + params.data.gmv + ' (' + parseFloat((params.data.gmv_rate * 100).toFixed(2)) + ') %' + '<br/>'
                    + 'ROI' + " : " + params.data.roi
                    + '</div>';
            }

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
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['40%', '60%'],
                // adjust the start angle
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bolder'
                    },
                    formatter(param) {
                        return param.name + ' (' + param.percent + '%)';
                    }
                },
                data: arr.map(i => {
                    return {
                        value: i.cost,
                        name: i.pallet,
                        gmv: i.gmv,
                        roi: i.roi,
                        cost_rate: i.cost_rate,
                        gmv_rate: i.gmv_rate,
                    }
                }),
                itemStyle: {
                    // color: backColor,
                    normal: {
                        color: function (colors) {
                            return backColor[colors.dataIndex];
                        }
                    }
                },
                // data: [
                //     { value: 1048, name: 'S' },
                //     { value: 735, name: 'A' },
                //     { value: 580, name: 'B' },
                //     { value: 484, name: 'C' },
                //     { value: 300, name: 'D' },

                // ]
            }
        ]
    }
}
//横轴柱状图
export const barOptionsX = (arr: any) => {
    // console.log(arr)
    arr = arr.sort(by("value"))
    // console.log(arr.sort(by("value")))
    return {
        tooltip: {
            trigger: 'axis',

            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return '<div>' + params[0].name + '<br>'
                    + '花费' + " : " + params[0].value + '<br/>'
                    + '花费占比' + " : " + parseFloat((params[0].data.zhanbi * 100).toFixed(2)) + ' %' + '<br/>'
                    + 'ROI' + " : " + parseFloat((params[0].data.roi * 100).toFixed(2))
                    + '</div>';
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
                start: 0,
                end: 10,
                type: 'slider',
                show: true,
                handleSize: 0,//滑动条的 左右2个滑动条的大小
                height: '80%',//组件高度
                left: 600, //左边的距离
                right: 8,//右边的距离
                top: 50,//上边边的距离
                borderColor: "none",
                fillerColor: '#909399',//滑动块的颜色
                backgroundColor: 'rgba(13,33,117,0.5)',//两边未选中的滑动条区域的颜色
                showDataShadow: false,//是否显示数据阴影 默认auto
                showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
                realtime: false, //是否实时更新
                minValueSpan: 10,  // 放大到最少几个
                maxValueSpan: 10,  //  缩小到最多几个
                filterMode: 'filter',
                yAxisIndex: [0, 1],//控制的y轴
            },
            //滑块的属性
            {
                type: "inside",
                zoomOnMouseWheel: false,  // 关闭滚轮缩放
                moveOnMouseWheel: true, // 开启滚轮平移
                moveOnMouseMove: true, // 鼠标移动能触发数据窗口平移
                show: true,
                yAxisIndex: [0, 1],
                start: 0,
                end: 10,
            },
        ],
        yAxis: {
            type: 'category',
            inverse: true,
            // show:false,
            data: arr.map(i => i.name),
            // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
            axisLabel: {
                color: '#fff',
                formatter: function (value) {
                    if (value.length > 4) {
                        return `${value.slice(0, 4)}...`
                    }
                    return value
                },
            },
            axisTick: {
                show: false // 不显示坐标轴刻度线
            },
            axisLine: {
                show: false, // 不显示坐标轴线
            },
            splitLine: {
                show: false // 不显示网格线
            },
            // formatter(param) {
            //     return param.name + ' (' + '%)';
            // }
        },
        series:
            [
                {
                    type: 'bar',
                    barCategoryGap: "100%",
                    data: arr,
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
    // console.log(arr)
    // arr.sort((a, b) =>  a.numIndex - b.numIndex )
    // console.log(arr)
    const backColor = ['#01E5FF', '#C2FDF4', '#03FF91', '#FECD04', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data: arr?.map((i: { name: any; }) => i.name),
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
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            // inverse:true,
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
        series: arr?.map((i: { name: string; data: [number]; }, index: number) => {
            return {
                type: 'bar',
                name: i.name,
                // yAxisIndex:1,
                barGap: 0,
                stack: 'Total',
                data: i.data,
                itemStyle: {
                    color: backColor[index],
                }
            }
        }),
        // dataSorting: {
        //     sortType: 'none'
        // }
        // series: arr,
    }
}

/**
 * @description: 
 * @param {Array} arr 一维数组[1,2,3]
 * @return {*}
 */
export const table_lineOptions = (arr: Array<any>, date: Array<any>) => {
    const backColor = ['#046991', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        color: backColor,
        tooltip: {
            trigger: 'axis',
            position: [10, 10],
            formatter: (params: Object) => {
                return params[0].data.toFixed(2)
                console.log(params, "tooltip")
            },
            className: 'echarts-tooltip echarts-tooltip-dark'
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
            show: false,
            data: date
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


export const wordsCloud = (arr: any) => {
    arr = [
        { value: 67, name: '红腹角雉' },
        { value: 98, name: '麝牛' },
        { value: 97, name: '山舌鱼' },
        { value: 100, name: '羚羊' },
        { value: 37, name: '非洲王子' },
        { value: 83, name: '麋鹿' },
        { value: 60, name: '中华鲟' },
        { value: 42, name: '鮪鱼' },
        { value: 96, name: '射水鱼' },
        { value: 54, name: '果子狸' },
        { value: 33, name: '小春鱼' },
        { value: 84, name: '水獭' },
        { value: 86, name: '刺猬' }
    ]
    return {
        tooltip: {

        },
        series: [
            {
                type: 'wordCloud',
                // 要绘制云的形状,默认是 circle，可选的参数有 cardioid 、 diamond 、 triangle-forward 、 triangle 、 star
                shape: 'star',
                // 保持maskImage的纵横比或1:1的形状
                // 从echarts-wordcloud@2.1.0开始支持该选项
                keepAspect: false,

                // 左/上/宽/高/右/下用于字云的定位
                // 默认放置在中心，大小为75% x 80%。
                left: 'center',
                top: 'center',
                width: '70%',
                height: '80%',
                right: null,
                bottom: null,

                // 数据中的值将映射到的文本大小范围。
                // 默认值为最小12px，最大60px。
                sizeRange: [12, 60],

                // 文字旋转范围和步进程度。文本将通过rotationStep 45在[- 90,90]范围内随机旋转
                rotationRange: [-60, 90],
                rotationStep: 2,

                // 网格大小(以像素为单位)，用于标记画布的可用性
                // 网格大小越大，单词之间的间隔就越大
                gridSize: 2,

                // 设置为true允许文字部分地绘制在画布之外。
                // 允许画比画布大的字
                // 从echarts-wordcloud@2.1.0开始支持该选项
                drawOutOfBound: false,

                // 如果字体太大，无法显示文本，是否缩小文本。如果设置为false，则文本将不被渲染。如果设置为true，文本将被缩小。
                shrinkToFit: true,

                // 是否执行布局动画。
                //当单词较多时禁用会导致UI阻塞。
                layoutAnimation: true,

                // 全局文本样式
                textStyle: {
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    // Color可以是回调函数或颜色字符串
                    color: function () {
                        // 任意颜色
                        return (
                            'rgb(' +
                            [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                            ].join(',') +
                            ')'
                        )
                    },
                },
                emphasis: {
                    focus: 'self',
                    textStyle: {
                        textShadowBlur: 10,
                        textShadowColor: '#333',
                    },
                },
                data: arr,
            },
        ],
    }
}


export const lineOptionsNum = (arr: any) => {
    return {
        grid: {
            top: "2%",
            left: "2%",
            right: "2%",
            bottom: "10%",
            // containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [
            {
                symbol: "none",
                data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0.1,
                                color: 'rgba(255,255,255, 0.2)' // 0% 处的颜色
                            },
                            {
                                offset: 0.1,
                                color: 'rgba(255,255,255, 0.2)' // 0% 处的颜色
                            },
                            {
                                offset: 0.1,
                                color: 'rgba(255,255,255, 0.2)' // 0% 处的颜色
                            },
                            {
                                offset: 0.1,
                                color: 'rgba(255,255,255, 0.2)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    }
                },
                color: 'rgba(255,255,255, 0.2)', //线条颜色
            }
        ]
    }
}

export const XYlineOptions = (arr: any) => {
    return {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            // data: ["价格力星级", "件单价"],
            top: "2%",
            textStyle: {
                color: '#FFF'
            }
        },
        grid: {
            left: "4%",
            right: "4%",
            bottom: "5%",
            containLabel: true
        },
        toolbox: {
            feature: {
                // 去掉图片下载
                // saveAsImage: {}
            }
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
                "08-30",
                "08-31",
                "09-01",
                "09-02",
                "09-03",
                "09-04",
                "09-05",
            ],
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff',
                }
            },
            axisLabel: {
                show: true,
                color: '#fff'
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#e0e6f126"
                }
            },
        },
        yAxis: [
            {
                type: "value",
                name: "价格力星级",
                // nameLocation:'center',
                nameTextStyle: {
                    color: "#fff"
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#fff"
                    }
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false,
                },
                axisTick: { show: false },

            },
            {
                nameTextStyle: {
                    color: "#fff"
                },
                type: "value",
                name: "件单价",
                position: "right",
                axisLine: {
                    show: false
                },
                axisTick: { show: false },
                // min: 0,
                // max: 200,
                axisLabel: {
                    textStyle: {
                        color: "#fff"
                    },
                    show: true,
                    interval: "auto",
                    formatter: "{value}"
                },
                splitLine: {
                    show: false,
                },
                // show: true
            }
        ],
        series: [
            {
                name: "价格力星级",
                type: "line",
                stack: "价格力星级",
                itemStyle: {
                    normal: {
                        color: "#a8f5a1",
                        lineStyle: {
                            color: "#a8f5a1"
                        }
                    }
                },
                data: [5, 4, 5, 1, 2, 5, 3]
            },
            {
                name: "件单价",
                yAxisIndex: 1,
                type: "line",
                stack: "件单价",
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                data: [50, 100, 120, 55, 23, 78, 200]
            }
        ]
    }
}


export const barOptionsY = (arr: any) => {
    return {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            // data: ["价格力星级", "件单价"],
            top: "2%",
            textStyle: {
                color: '#FFF'
            }
        },
        grid: {
            left: "4%",
            right: "4%",
            bottom: "5%",
            containLabel: true
        },
        toolbox: {
            feature: {
                // 去掉图片下载
                // saveAsImage: {}
            }
        },
        dataZoom: [
            {
                start: 0,
                end: 30,
                type: 'slider',
                show: true,
                handleSize: 0,//滑动条的 左右2个滑动条的大小
                height: '10px',//组件高度
                left: 0, //左边的距离
                right: 8,//右边的距离
                bottom: 0,
                // top: 100,//上边边的距离
                borderColor: "none",
                fillerColor: '#909399',//滑动块的颜色
                backgroundColor: 'rgba(13,33,117,0.5)',//两边未选中的滑动条区域的颜色
                showDataShadow: false,//是否显示数据阴影 默认auto
                showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
                realtime: false, //是否实时更新
                minValueSpan: 30,  // 放大到最少几个
                maxValueSpan: 30,  //  缩小到最多几个
                filterMode: 'filter',
                xAxisIndex: [0, 1],//控制的y轴
            },
            //滑块的属性
            {
                type: "inside",
                zoomOnMouseWheel: false,  // 关闭滚轮缩放
                moveOnMouseWheel: true, // 开启滚轮平移
                moveOnMouseMove: true, // 鼠标移动能触发数据窗口平移
                show: true,
                xAxisIndex: [0, 1],
                start: 0,
                end: 10,
            },
        ],
        xAxis: {
            type: 'category',
            inverse: false,
            // show:false,
            // data: arr.map(i => i.name),
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'Indonesia', 'USA', 'India', 'China', 'Indonesia', 'USA', 'India', 'China', 'Indonesia', 'USA', 'India', 'China', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
            axisLabel: {
                color: '#fff',
                formatter: function (value) {
                    if (value.length > 2) {
                        return `${value.slice(0, 1)}...`
                    }
                    return value
                },
            },
            axisTick: {
                show: false // 不显示坐标轴刻度线
            },
            axisLine: {
                show: false, // 不显示坐标轴线
            },
            splitLine: {
                show: false // 不显示网格线
            },
        },
        yAxis: {
            // inverse: true,
            type: 'value',
            boundaryGap: false,
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                show: false,
            },
        },
        //     [
        //     {
        //         type: 'bar',
        //         barCategoryGap: "100%",
        //         data: arr,
        //         barWidth: fontSize(0.1),
        //         itemStyle: {
        //             color: '#01E5FF',
        //         }
        //     },
        // ]
        series: [
            {
                // name: "件单价",
                barWidth: fontSize(0.1),
                type: "bar",
                stack: "件单价",
                itemStyle: {
                    color: '#01E5FF',
                },
                sort: 'descending',
                data: [50, 100, 120, 55, 50, 100, 120, 55, 50, 100, 120, 55, 50, 100, 120, 55, 50, 100, 120, 55, 23, 78, 200, 50, 100, 120, 55, 23, 78, 200, 50, 100, 120, 55, 23, 78, 200, 50, 100, 120, 55, 23, 78, 200]
            }
        ]
    }
}