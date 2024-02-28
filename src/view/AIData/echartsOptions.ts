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

const roundNum = (num) => {
    num = Math.round(num)
    return num
}
function lueNum(num) {
    // 格式化为千分位输出 num.toLocaleString()
    if (num > 9999) {
        num = (num / 10000).toFixed(2); //保留小数点后两位
        if (num > 9999) {
            num = (num.toLocaleString() / 10000).toFixed(0) + "亿";
        } else {
            num = roundNum(num.toLocaleString()) + "万";
        }
    } else {
        num = num.toFixed(0)
    }
    return num;
}
const orderMap = {
    S: 1,
    A: 2,
    B: 3,
    C: 4,
    D: 5
};

// 自定义比较函数，根据对象的name属性和特定逻辑进行排序

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

const genData = (count) => {
    // prettier-ignore
    const nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
    ];
    const legendData = [] as any;
    const seriesData = [] as any;
    for (var i = 0; i < count; i++) {
        var name =
            Math.random() > 0.65
                ? makeWord(4, 1) + '·' + makeWord(3, 0)
                : makeWord(2, 1);
        legendData.push(name);
        seriesData.push({
            name: name,
            value: Math.round(Math.random() * 100000)
        });
    }
    return {
        legendData: legendData,
        seriesData: seriesData
    };
    function makeWord(max, min) {
        const nameLen = Math.ceil(Math.random() * max + min);
        const name = [] as any;
        for (var i = 0; i < nameLen; i++) {
            name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        }
        return name.join('');
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

// 多线图
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
// 多线图
export const lineOptions1_y = (arr: any, date: any, linetype: boolean = false, type: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis',
            valueFormatter: (value: number | string, dataIndex: number) => {
                if (type == '%') {
                    return `${persentNum(value)}${type}`
                } else {
                    return `${value}`
                }
            }
        },
        legend: {
            top: "5%",
            // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            data: arr?.map((i: { name: any; }) => i.name),
            textStyle: {
                color: '#FFF'
            }
        },
        grid: {
            left: '10%',
            right: '8%',
            bottom: '10%',
            containLabel: true
        },
        dataZoom: [
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0, 1]
            }
        ],
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
                show: false,
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
            // console.log(index, 'index')
            return {
                name: i.name,
                symbolSize: 1, // 设置数据点的大小为8像素
                smooth: linetype,
                type: 'line',
                data: i.data,
                itemStyle: {
                    color: backColor[index],
                },
                lineStype: {
                    type: (linetype && index > 0) ? 'dashed' : 'solid'
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
    arr = arr.sort(by("cost"))
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
        grid: {
            top: '5%',
            left: '10%',
            right: '10%',
            bottom: '5%'
        },
        title: {
            text: '本期货盘',
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
                radius: ['60%', '80%'],
                // center: ['40%', '60%'],
                // adjust the start angle
                minAngle: 15,//最小角度
                startAngle: 90, //起始角度
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
    arr = arr.sort(by("value"))
    // arr = arr.sort((a, b) => a.value - b.value).reverse();
    // console.log(arr)
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
            top: '5%',
            left: '15%',
            right: '15%',
            bottom: '5%'
        },
        xAxis: {
            type: 'value',
            boundaryGap: false,
            // inverse: true,
            axisLabel: {
                color: '#fff',
                show: false,
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

// 词云图
export const wordsCloud = (arr: any, name: any) => {
    return {
        tooltip: {
        },
        grid: {
            left: '0',
            right: '0',
            bottom: '0',
            // containLabel: true
        },
        title: {
            text: name,
            left: 10,
            top: 20,
            textStyle: {
                color: '#FFF',
                fontSize: fontSize(0.2),
            }
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
                bottom: 'center',
                width: '98%',
                height: '80%',
                right: null,
                // bottom: null,

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
                    fontFamily: 'PingFangSC-Semibold',
                    fontWeight: 400,
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';

                    },
                },
                emphasis: {
                    focus: 'self',
                    textStyle: {
                        textShadowBlur: 0,
                        textShadowColor: '#ffffff',
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
            left: "5%",
            right: "5%",
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
                data: arr,
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

export const XYlineOptionspalletAnalysis1 = (date: any, shop: any, industry: any) => {
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
        xAxis: {
            type: "category",
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
                name: "店铺GMV",
                // nameLocation:'center',
                nameTextStyle: {
                    color: "#fff"
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff"
                    },
                    show: true,
                    formatter: (params) => {
                        return lueNum(params)
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
                name: "行业交易金额",
                position: "right",
                axisLine: {
                    show: false
                },
                axisTick: { show: false },
                minInterval: 1,
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
                name: "店铺GMV",
                type: "line",
                stack: "店铺GMV",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#a8f5a1",
                        lineStyle: {
                            color: "#a8f5a1"
                        }
                    }
                },
                data: shop,
            },
            {
                name: "行业交易金额",
                yAxisIndex: 1,
                type: "line",
                stack: "行业交易金额",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                data: industry
            }
        ]
    }
}

export const XYlineOptionspalletAnalysis2 = (date: any, shop: any, industry: any) => {
    return {
        tooltip: {
            trigger: "axis"
        },
        legend: {
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
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: date,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff',
                },

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
                name: "店铺访客数",
                // nameLocation:'center',
                nameTextStyle: {
                    color: "#fff"
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#fff"
                    },
                    formatter: (params) => {
                        return lueNum(params)
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
                minInterval: 1,
                name: "行业访问人数",
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
                name: "店铺访客数",
                type: "line",
                stack: "店铺访客数",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#a8f5a1",
                        lineStyle: {
                            color: "#a8f5a1"
                        }
                    }
                },
                data: shop,
            },
            {
                name: "行业访问人数",
                yAxisIndex: 1,
                type: "line",
                stack: "行业访问人数",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                data: industry
            }
        ]
    }
}

export const XYlineOptions = (date: any, leave: any, price: any) => {
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
        xAxis: {
            type: "category",
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
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#a8f5a1",
                        lineStyle: {
                            color: "#a8f5a1"
                        }
                    }
                },
                data: leave,
            },
            {
                name: "件单价",
                yAxisIndex: 1,
                type: "line",
                stack: "件单价",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                data: price
            }
        ]
    }
}


export const barOptionsY = (arr: any) => {
    return {

        tooltip: {
            trigger: 'axis',

            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return '<div>'
                    + '<span class="echartsToolTip">sku名称</span>' + params[0].name + '<br>'
                    + '<span class="echartsToolTip">支付金额</span>' + params[0].value + '<br/>'
                    + '<span class="echartsToolTip">支付买家数</span>' + parseFloat((params[0].data.pay_buyers).toFixed(2)) + '' + '<br/>'
                    + '<span class="echartsToolTip">支付件数</span>' + parseFloat((params[0].data.pay_quantity).toFixed(2)) + '<br/>'
                    + '<span class="echartsToolTip">加购件数</span>' + parseFloat((params[0].data.add_to_cart_count).toFixed(2)) + '<br/>'
                    + '</div>';
            }
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
            data: arr.map(i => i.sku_name),
            // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'Indonesia', 'USA', 'India', 'China', 'Indonesia', 'USA', 'India', 'China', 'Indonesia', 'USA', 'India', 'China', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World', 'Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
            axisLabel: {
                color: '#fff',
                rotate: 90,
                formatter: function (value) {
                    // var str = value.split("");
                    // return str.join("\n");
                    if (value.length > 8) {
                        return `${value.slice(0, 8)}...`
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
                data: arr,
            }
        ]
    }
}

// 饼图
export const pieItemOptions = (arr: any) => {
    arr = arr.sort(by("value"))
    // const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return '<div>'
                    + '<span class="echartsToolTip">sku名称</span>' + params.name + '<br>'
                    + '<span class="echartsToolTip">支付金额</span>' + params.value + '<br/>'
                    + '<span class="echartsToolTip">支付买家数</span>' + parseFloat((params.data.pay_buyers).toFixed(2)) + '' + '<br/>'
                    + '<span class="echartsToolTip">支付件数</span>' + parseFloat((params.data.pay_quantity).toFixed(2)) + '<br/>'
                    + '<span class="echartsToolTip">加购件数</span>' + parseFloat((params.data.add_to_cart_count).toFixed(2)) + '<br/>'
                    + '</div>';
            },
        },
        grid: {
            top: "10px",
            left: '0',
            right: '0',
            bottom: '10px',
            // containLabel: true
        },
        title: {
            text: 'SKU名称',
            right: 20,
            top: "10%",
            textStyle: {
                color: '#FFF'
            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 20,
            icon: "circle",
            pageIconSize: [15, 15], // 设置上一页、下一页的尺寸 
            pageTextStyle: {  // 设置上一页、下一页文字样式 
                color: '#fff'
            },
            pageIconColor: '#fff',
            top: "20%",
            textStyle: {
                color: '#FFF'
            },
            formatter: function (name) {
                var maxLength = 15; // 最大长度限制
                if (name.length > maxLength) {
                    name = name.slice(0, maxLength) + '...';
                }
                return name
            },
        },
        series: [
            {
                type: 'pie',
                radius: ['60%', '80%'],
                // minAngle: 15,//最小角度
                // startAngle: 90, //起始角度
                // adjust the start angle
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bolder'
                    },
                    // formatter(params) {
                    //     return params.name + '  ' + params.value + '  ';
                    // }
                    formatter: function (params) {
                        var maxLength = 10; // 最大长度限制
                        if (params.name.length > maxLength) {
                            return params.name.substring(0, maxLength) + "..." + '  ' + params.value + '  '; // 超过最大长度则添加省略号
                        } else {
                            return params.name + '  ' + params.value + '  '; // 未超过最大长度则返回原始名称
                        }
                    },
                },
                data: arr,
                itemStyle: {
                    // color: function () {
                    //     return 'rgb(' + [
                    //         Math.round(Math.random() * 160),
                    //         Math.round(Math.random() * 160),
                    //         Math.round(Math.random() * 160)
                    //     ].join(',') + ')';

                    // },
                    // color: backColor,
                    // normal: {
                    //     color: function (colors) {
                    //         return backColor[colors.dataIndex];
                    //     }
                    // }
                },
            }
        ]
    }
}

// 饼图
export const pieItemOptions1 = (arr: any) => {
    // const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'item',
        },
        // title: {
        //     text: 'SKU名称',
        //     right: 20,
        //     top: "32%",
        //     textStyle: {
        //         color: '#FFF'
        //     }
        // },
        grid: {
            left: '6%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            type: 'scroll',
            left: 'center',
            // orient: 'vertical',
            // right: 20,
            icon: "circle",
            pageIconSize: [15, 15], // 设置上一页、下一页的尺寸 
            pageTextStyle: {  // 设置上一页、下一页文字样式 
                color: '#fff'
            },
            pageIconColor: '#fff',
            top: "5%",
            textStyle: {
                color: '#FFF'
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['30%', '50%'],
                center: ['50%', '50%'],
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bolder'
                    },
                    formatter: function (params) {
                        var maxLength = 10; // 最大长度限制
                        if (params.name.length > maxLength) {
                            return params.name.substring(0, maxLength) + "..." + '  ' + params.value + '  '; // 超过最大长度则添加省略号
                        } else {
                            return params.name + '  ' + params.value + '  '; // 未超过最大长度则返回原始名称
                        }
                    },
                    // formatter(params) {
                    //     return params.name + '  ' + params.value + '  ';
                    // }
                },
                data: arr,
            }
        ]
    }
}

export const pieOptionsHome = (arr: any, title: string) => {
    const data = genData(20);
    return {
        grid: {
            left: '0%',
            right: '4%',
            bottom: '4%',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            icon: "circle",
            pageIconSize: [15, 15], // 设置上一页、下一页的尺寸 
            pageTextStyle: {  // 设置上一页、下一页文字样式 
                color: '#fff'
            },
            pageIconColor: '#fff',
            color: "#fff",
            right: 10,
            top: 50,
            bottom: 20,
            data: data.legendData,
            textStyle: {
                color: "#fff",
            },
        },
        graphic: {
            type: "text",
            left: "27%",
            top: "center",
            style: {
                text: title,
                textAlign: "center",
                fill: "#fff",
                fontSize: 12,
                fontWeight: 700
            }
        },
        series: [
            {
                name: '姓名',
                type: 'pie',
                radius: ['30%', '50%'],
                center: ['30%', '50%'],
                data: data.seriesData,
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bolder'
                    },

                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
}

// 百分比数字换算
function persentNum(num) {
    let n = Number(num) * 100
    return n.toFixed(2)
}
export const lineFillOptionsNum = (arr: any, times: any, type: any) => {
    return {
        tooltip: {
            show: true,
            trigger: "axis",
            // formatter: '{b0}<br />{c0}'
            formatter: (params: any) => {
                if (type == '%') {
                    return `${params[0].axisValue}<br />${persentNum(params[0].value)}${type}`
                } else {
                    return `${params[0].axisValue}<br />${params[0].value}`
                }
            }
        },
        grid: {
            top: "2%",
            left: "5%",
            right: "5%",
            bottom: "10%",
            // containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false,
            data: times
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [
            {
                symbol: "none",
                data: arr,
                type: 'line',
                lineStyle: {
                    width: 4
                },
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
                                color: 'rgba(2,111,141, 1)' // 0% 处的颜色
                            },
                            {
                                offset: 0.1,
                                color: 'rgba(2,111,141, 1)' // 0% 处的颜色
                            },
                            {
                                offset: 0.1,
                                color: 'rgba(2,111,141, 1)' // 0% 处的颜色
                            },
                            {
                                offset: 0.1,
                                color: 'rgba(2,111,141, 1)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    }
                },
                color: 'rgba(3,171,217, 1)', //线条颜色
            }
        ]
    }
}

// 
export const flowLineOption = () => {
    return {

    }
}

// 假数据线图2
export const lineOptions2 = (arr: any) => {
    const backColor = ['#01E5FF', '#C2FDF4', '#FECD04', '#0304FF', '#FD89EE']
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 20,
            icon: "circle",
            pageIconSize: [15, 15], // 设置上一页、下一页的尺寸 
            pageTextStyle: {  // 设置上一页、下一页文字样式 
                color: '#fff'
            },
            pageIconColor: '#fff',
            top: "20%",
            textStyle: {
                color: '#FFF'
            },
            formatter: function (name) {
                var maxLength = 15; // 最大长度限制
                if (name.length > maxLength) {
                    name = name.slice(0, maxLength) + '...';
                }
                return name
            },
        },
        grid: {
            left: '3%',
            right: '10%',
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

// 横轴货盘柱状图
export const XbarOptions = (arr: any) => {
    // arr = arr.sort(compareByName)
    // console.log(arr.sort(compareByName))
    return {
        grid: {
            top: '5%',
            left: '15%',
            right: '4%',
            bottom: '5%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        xAxis: {
            type: 'value',  // X轴为数值类型,
            boundaryGap: false,
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'category',  // Y轴为类别类型
            inverse: true,
            axisLabel: {
                color: '#fff',
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
            data: arr.map(i => i.name)  // Y轴上的类别数据
        },
        series: [{
            type: 'bar',
            // barCategoryGap: "100%",
            data: arr.map(i => i.data),
            // barWidth: '60%',
            label: {
                show: true,
                position: 'right',
                color: '#fff'
            },
            itemStyle: {
                color: '#01E5FF',
            }
        }]
    }
}


export const XYlineFlowOptions = (arr) => {
    return {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            top: "2%",
            textStyle: {
                color: '#FFF'
            }
        },
        grid: {
            left: "2%",
            right: "2%",
            // top: '2%',
            bottom: "0%",
            containLabel: true
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: ['1月1日', '1月2日', '1月3日', '1月4日', '1月5日', '1月6日', '1月7日'],
            axisPointer: {
                type: 'shadow'
            },
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
                // name: "行业交易金额",
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
                    formatter: '{value}%'
                },
                splitLine: {
                    show: false,
                },
                // show: true
            }
        ],
        series: [
            {
                name: "客户新访",
                type: "bar",
                stack: "客户新访",
                barGap: fontSize(0.1), //柱子之间间距
                barWidth: fontSize(0.1),
                itemStyle: {
                    normal: {
                        color: "#a8f5a1",
                        lineStyle: {
                            color: "#a8f5a1"
                        }
                    }
                },
                data: [88, 99, 100, 655, 235, 452, 77],
            },
            {
                name: "客户新访占比",
                yAxisIndex: 1,
                type: "line",
                stack: "客户新访占比1",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    }
                },
                data: [10, 20, 54, 20, 30, 45, 78]
            },
            {
                name: "未购客户回访占比",
                yAxisIndex: 1,
                type: "line",
                stack: "客户新访占比2",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    }
                },
                data: [5, 77, 20, 7, 72, 30, 22]
            },
            {
                name: "已购客户回访占比",
                yAxisIndex: 1,
                type: "line",
                stack: "客户新访占比3",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    }
                },
                data: [40, 55, 44, 33, 22, 29, 30]
            }
        ]
    }
}

export const XlineFlowOptions = (arr) => {
    return {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            top: "2%",
            textStyle: {
                color: '#FFF'
            }
        },
        grid: {
            left: "2%",
            right: "2%",
            // top: '2%',
            bottom: "0%",
            containLabel: true
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: ['1月1日', '1月2日', '1月3日', '1月4日', '1月5日', '1月6日', '1月7日'],
            axisPointer: {
                type: 'shadow'
            },
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
        yAxis: {
            nameTextStyle: {
                color: "#fff"
            },
            type: "value",
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
                formatter: '{value}%'
            },
            splitLine: {
                show: false,
            },
            // show: true
        },
        series: [
            {
                name: "店铺转化率",
                type: "line",

                itemStyle: {
                    normal: {
                        color: "red",
                        lineStyle: {
                            color: "red",
                            type: 'dashed' // 设置线条为虚线
                        }
                    }
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    }
                },
                data: [20, 25, 22, 11, 11, 15, 38],
            },
            {
                name: "客户新访转化率",
                type: "line",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    }
                },
                data: [10, 20, 54, 20, 30, 45, 78]
            },
            {
                name: "未购客户回访转化率",
                type: "line",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    }
                },
                data: [5, 77, 20, 7, 72, 30, 22]
            },
            {
                name: "已购客户回访转化率",
                type: "line",
                symbolSize: 0, // 设置数据点的大小为8像素
                itemStyle: {
                    normal: {
                        color: "#b78ffc",
                        lineStyle: {
                            color: "#b78ffc"
                        }
                    }
                },
                tooltip: {
                    valueFormatter: function (value) {
                        return value + '%';
                    }
                },
                data: [40, 55, 44, 33, 22, 29, 30]
            }
        ]
    }
}