<template>
    <div class="main">
        <div class="header">
            <span class="titl1_h1">货盘分析</span>
            <div class="search">
                <div class="search_left">
                    <div class="search_line">
                        负责人
                        <el-select v-model="searchData.name" class="select_width" placeholder="请选择" size="small">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="search_line">
                        本月货盘
                        <el-select v-model="searchData.monthData" class="select_width" placeholder="请选择" size="small">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="search_line">
                        货盘变化
                        <el-radio-group v-model="searchData.palletChange" size="small">
                            <el-radio-button label="上升" />
                            <el-radio-button label="持平" />
                            <el-radio-button label="下降" />
                        </el-radio-group>
                    </div>
                </div>
                <div class="search_right">
                    <div class="search_line">
                        流量归属原则
                        <el-select v-model="searchData.name" class="select_width" placeholder="请选择" size="small">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="search_line">
                        件单价
                        <el-select v-model="searchData.monthData" class="select_width" placeholder="请选择" size="small">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="search_line">
                        已上架月份
                        <el-input v-model="searchData.listedMonth" class="select_width" size="small" placeholder="请输入" />
                    </div>
                    <div class="search_line">
                        年月
                        <el-radio-group v-model="searchData.palletChange" style="color: #fff;" class="search_radio"
                            size="small">
                            <el-radio label="202309" />
                            <el-radio label="202310" />
                        </el-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="title">
            重点指标
        </div>
        <div class="roduct_num">
            <div class="roduct_num_box">
                <div class="roduct_num_box_title">
                    产品效率
                </div>
                <ul class="roduct_num_box_ctn">
                    <li>
                        <span class="ctn_num">
                            1.55
                        </span>
                        <span class="ctn_name">
                            连带率
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            5.72%
                        </span>
                        <span class="ctn_name">
                            加购率
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            1.36%
                        </span>
                        <span class="ctn_name">
                            收藏率
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            13.31%
                        </span>
                        <span class="ctn_name">
                            退款率
                        </span>
                    </li>
                </ul>
            </div>
            <div class="roduct_num_box">
                <div class="roduct_num_box_title">
                    产品质量
                </div>
                <ul class="roduct_num_box_ctn">
                    <li>
                        <span class="ctn_num">
                            11.37%
                        </span>
                        <span class="ctn_name">
                            老买家人数占比
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            11.98%
                        </span>
                        <span class="ctn_name">
                            老买家GWV占比
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            880
                        </span>
                        <span class="ctn_name">
                            老买家客单价
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            836
                        </span>
                        <span class="ctn_name">
                            客单价
                        </span>
                    </li>
                </ul>
            </div>
            <div class="roduct_num_box">
                <div class="roduct_num_box_title">
                    产品竞争率
                </div>
                <ul class="roduct_num_box_ctn">
                    <li>
                        <span class="ctn_num">
                            7833
                        </span>
                        <span class="ctn_name">
                            搜索访客数
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            5.33%
                        </span>
                        <span class="ctn_name">
                            搜多GMV占比
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            47.93%
                        </span>
                        <span class="ctn_name">
                            付费流量占比
                        </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            63.34%
                        </span>
                        <span class="ctn_name">
                            付费GMV占比
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="title">
            GMV拆解
        </div>
        <div class="GMV">
            <div class="GMV_left">
                <div class="GMV_left_tit">
                    最高层级{{ state.treeLevel }}
                </div>
                <div class="GMV_left_ctn" id="GMVDismantlingecharts">
                    <!-- <tree-view :treeData="state.treeData"></tree-view> -->
                </div>
            </div>
            <div class="GMV_right">
                <div class="echarts_title">
                    GMV对比
                </div>
                <div class="echarts_1" id="GMVcharts">

                </div>
                <div class="echarts_title">
                    GMV对比
                </div>
                <div class="echarts_1" id="Visitorcharts">

                </div>
            </div>
        </div>
        <div class="title">
            趋势对比
        </div>
        <div class="trend_comparison">
            <div class="trend_comparison_left flex_size">
                <div class="echarts_title">
                    货盘趋势
                </div>
                <div class="trend_comparison_box" id="Palletecharts">

                </div>
            </div>
            <div class="trend_comparison_right flex_size">
                <div class="echarts_title">
                    新老客对比
                </div>
                <div class="trend_comparison_box" id="newOldecharts">

                </div>
            </div>
        </div>
        <div class="trend_comparison">
            <div class="trend_comparison_left flex_size">
                <div class="echarts_title">
                    件单价GMV趋势
                </div>
                <div class="trend_comparison_box" id="unitPriceGMVcharts">

                </div>
            </div>
            <div class="trend_comparison_right flex_size">
                <div class="echarts_title">
                    件单价访客趋势
                </div>
                <div class="trend_comparison_box" id="unitPriceTrendcharts">

                </div>
            </div>
        </div>
        <div class="table_title">
            商品明细
        </div>
        <div class="table">
            <el-auto-resizer>
                <template #default="{ height, width }">
                    <el-table-v2 :columns="tableColumns" stripe :data="tableData" :width="width" :height="height" fixed>
                        <template #empty>
                            <div class="flex items-center justify-center h-100%">
                                <el-empty />
                            </div>
                        </template>
                    </el-table-v2>
                </template>
            </el-auto-resizer>
        </div>
    </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import { tableColumns } from './table'
import { reactive, onMounted, onUnmounted, ref } from 'vue'

// import TreeView from './components/TreeView.vue'
import { lineOptions, barOptions } from './echartsOptions'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]

const state = reactive({
    treeData: [
        { name: 'Node A', children: [] },
        {
            name: 'Node B',
            children: [
                { name: 'Node C', children: [] },
                { name: 'Node D', children: [] }
            ]
        },
    ],
    tree:[] as any,
    treeLevel: 0,
})

const searchData = reactive({
    name: '',
    monthData: '',
    palletChange: '上升',
    principle: '',
    originalPrice: '',
    listedMonth: '',
    years: ''

})
const generateColumns = (length = 10, prefix = 'column_', props?: any) =>
    Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
    }))

const generateData = (
    columns: ReturnType<typeof generateColumns>,
    length = 200,
    prefix = 'row-'
) =>
    Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
            (rowData, column, columnIndex) => {
                rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
                return rowData
            },
            {
                id: `${prefix}${rowIndex}`,
                parentId: null,
            }
        )
    })

const columns = generateColumns(26)
const tableData = generateData(columns, 200)
onMounted(() => {
    contrastGMV()
    contrastVisitor()
    palletTrend()
    newOldContrast()
    unitPriceGMV()
    unitPriceTrend()
    GMVDismantling()
    state.treeLevel = getLevel(state.tree)
})
Math.floor(Math.random() * (1 - 100) + 100)//1~100的随机数
let data = Array.from(new Array(30), (x, i) => Math.floor(Math.random() * (1 - 100) + 100))
const contrastGMV = () => {
    const chartDom = document.getElementById('GMVcharts') as HTMLElement;
    const myChart = echarts.init(chartDom);

    let arr = [
        {
            name: '店铺GMV',
            data: data
        },
        {
            name: '行业交易金额',
            data: data
        }
    ]
    const option = lineOptions(arr)
    option && myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize()
    })
}
const contrastVisitor = () => {
    const chartDom = document.getElementById('Visitorcharts') as HTMLElement;
    const myChart = echarts.init(chartDom);

    let arr = [
        {
            name: '店铺访客数',
            data: data
        },
        {
            name: '行业访问人数',
            data: data
        }
    ]
    const option = lineOptions(arr)
    option && myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize()
    })
}
const palletTrend = () => {
    const chartDom = document.getElementById('Palletecharts') as HTMLElement;
    const myChart = echarts.init(chartDom);

    let arr = [
        {
            name: 'S',
            data: data
        },
        {
            name: 'A',
            data: data
        },
        {
            name: 'B',
            data: data
        },
        {
            name: 'C',
            data: data
        },
        {
            name: 'D',
            data: data
        }
    ]
    const option = lineOptions(arr)
    option && myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize()
    })
}
const newOldContrast = () => {
    const chartDom = document.getElementById('newOldecharts') as HTMLElement;
    const myChart = echarts.init(chartDom);

    let arr = [
        {
            name: '支付卖家数',
            data: data
        },
        {
            name: '支付新卖家数',
            data: data
        },
        {
            name: '支付老买家数',
            data: data
        }
    ]
    const option = lineOptions(arr)
    option && myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize()
    })
}
const unitPriceGMV = () => {
    const chartDom = document.getElementById('unitPriceGMVcharts') as HTMLElement;
    const myChart = echarts.init(chartDom);

    let arr = [
        {
            name: '0-300元',
            data: data
        },
        {
            name: '300-600元',
            data: data
        },
        {
            name: '600-900元',
            data: data
        },
        {
            name: '900-1200元',
            data: data
        }
    ]
    const option = barOptions(arr)
    option && myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize()
    })
}
const unitPriceTrend = () => {
    const chartDom = document.getElementById('unitPriceTrendcharts') as HTMLElement;
    const myChart = echarts.init(chartDom);

    let arr = [
        {
            name: '0-300元',
            data: data
        },
        {
            name: '300-600元',
            data: data
        },
        {
            name: '600-900元',
            data: data
        },
        {
            name: '900-1200元',
            data: data
        }
    ]
    const option = barOptions(arr)
    option && myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize()
    })
}


const GMVDismantling = () => {
    const chartDom = document.getElementById('GMVDismantlingecharts') as HTMLElement;
    const myChart = echarts.init(chartDom);
    state.tree = [{
        name: 'GMV',
        value: 2402195,
        id: '1',
        children: [
            {
                name: "S",
                value: 1772471,
                id: '1-1',
                children: [
                    {
                        name: "住宅家具",
                        id: '1-4-1',
                        value: 1772471,
                        children: [
                            { name: "床垫类", value: 1772471, id: '1-4-1-1', }
                        ]
                    }
                ]
            },
            {
                name: "A",
                id: '1-2',
                value: 839184,
                children: [
                    { name: "床上用品", value: 250797, id: '1-2-1', },
                    {
                        name: "住宅家具", value: 588388, id: '1-2-1-1', children: [
                            { name: "床垫类", value: 588388, id: '1-2-1-1-1' }
                        ]
                    },
                ]
            },
            {
                name: "B",
                id: '1-3',
                value: 442476,
                children: [
                    { name: "(空白)", value: 4848, id: '1-3-1', },
                    { name: "床上用品", value: 6470, id: '1-3-2', },
                    {
                        name: "住宅家具", value: 431158, id: '1-3-2-1', children: [
                            { name: "床垫类", value: 431158, id: '1-3-2-1-1' }
                        ]
                    },
                ]
            },
            {
                name: "C",
                id: '1-4',
                value: 13085,
                children: [
                    {
                        name: "住宅家具", value: 13085, id: '1-4-1', children: [
                            { name: "床垫类", value: 13085, id: '1-4-1-1' }
                        ]
                    },
                ]
            }, {
                name: "D",
                id: '1-5',
                value: 6731,
                children: [
                    { name: "(空白)", value: 127, id: '1-5-1', },
                    { name: "床上用品", value: 1547, id: '1-5-2', },
                    {
                        name: "住宅家具", value: 5057, id: '1-5-3', children: [
                            { name: "床垫类", value: 5057, id: '1-5-3-1', }
                        ]
                    },
                ]
            },
        ]
    }]
    const option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },

        series: [
            {
                type: 'tree',
                id: 0,
                name: 'tree1',
                data: state.tree,
                top: '10%',
                left: '8%',
                bottom: '22%',
                right: '20%',
                //   symbol: spirit,  // 1
                //   symbolSize: 20,
                lineStyle: {
                    width: 2, // 线的宽度
                    color: '#FECD04'
                },

                label: {
                    position: 'center',
                    // color: "#fff",
                    // width: 100,
                    // height: 20,
                    // lineHeight: -70,
                    // borderWidth: 0.5,  // 边框宽度
                    // borderRadius: 20,  // 边框圆角
                    // borderColor: "#B034FF",   // 文字块的边框色
                    // backgroundColor: "#ccc",  // 文字块的背景色

                    rich: {
                        a: {
                            color: '#FECD04',
                            lineHeight: 60,
                            fontSize: 18
                        },
                        b: {
                            backgroundColor: {
                                image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F25%2F20200525121206_tujpk.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707983711&t=8d8e6381a1d8f8f95e3fdcb4e7349dc9'
                            },
                            height: 20,
                            width: 100,
                        },
                    },
                    // formatter: [
                    //     '{a|这段文本采用样式a}',
                    //     '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
                    // ].join('\n'),

                    formatter: function (param) {
                        // return (
                        //     param.name + '     ' + param.value + 'b'
                        // )
                        // return  [
                        //     param.name + '     ' + param.value + 'b'
                        // ]
                        return [
                            `{a|${param.name}    ${param.value}}`,
                            // '{b|}'
                        ].join('\n')
                    },


                },
                // leaves: { // 叶子节点的特殊配置，如上面的树图实例中，叶子节点和非叶子节点的标签位置不同。
                //     label: { // 描述了叶子节点所对应的文本标签的样式。
                //         position: 'right',
                //         verticalAlign: 'middle',
                //         align: 'center',
                //         color: '#B034FF',
                //         width: 100,
                //         height: 40,
                //         lineHeight: 40,
                //         borderWidth: 0.5,  // 边框宽度
                //         borderRadius: 20,  // 边框圆角
                //         borderColor: "#B034FF",   // 文字块的边框色
                //         backgroundColor: "#fff",  // 文字块的背景色
                //         rich: {
                //             img1: {
                //                 // backgroundColor: {
                //                 //     image: Showers,
                //                 // },
                //                 height: 40
                //             }
                //         },
                //         formatter: function (param) {
                //             var res = "";
                //             res += param.name + '{img1|}';
                //             return res;
                //         },
                //     }
                // },
                roam: true,
                initialTreeDepth: 1,  // 树图初始展开的层级（深度）
                expandAndCollapse: true, // 子树折叠和展开的交互，默认打开
                emphasis: {
                    focus: 'descendant'
                },
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ],
    }


    option && myChart.setOption(option);
    myChart.on('click', function (params) {
        console.log(myChart)
    });
    window.addEventListener('resize', () => {
        myChart.resize()
    })
}


const getLevel = (arr) => {
    let maxLevel = 0;
    (function callBack(arr, level) {
        ++level;
        maxLevel = Math.max(level, maxLevel);
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (item.children && item.children.length > 0) {
                callBack(item.children, level);
            } else {
                delete item.children;
            }
        }
    })(arr, 0);
    return maxLevel;
};
</script>

<style lang="scss" scoped>
$echarts_bg_img: url('./images/_2.png');

.main {
    height: 100%;
    width: 100%;
    background-image: url('./images/bc.jpg');
    background-size: 100% 100%;
    color: #fff;
    overflow: auto;

    .header {
        height: 63px;
        width: 100%;
        background-image: url('./images/0.png');
        background-size: 100% 100%;
        position: relative;

        .search {
            padding-top: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            .search_left {
                display: flex;
                flex: 0.3;
                justify-content: space-between;
            }

            .search_right {
                display: flex;
                flex: 0.3;
                justify-content: space-between;

            }

            .search_line {
                .select_width {
                    width: 100px;
                }

                .search_radio {
                    ::v-deep(.el-radio) {
                        color: #fff;

                    }

                }
            }
        }

        .titl1_h1 {
            position: absolute;
            width: 120px;
            line-height: 40px;
            font-size: 30px;
            font-weight: 700;
            inset: 0;
            margin: 0 auto;
        }
    }

    .title {
        height: 70px;
        line-height: 60px;
        padding-left: 80px;
        font-size: 24px;
        font-weight: 700;
        width: 462px;
        background-image: url('./images/image-2.png');
        background-size: 100% 100%;
    }

    .roduct_num {
        display: flex;
        height: 112px;
        justify-content: space-around;

        .roduct_num_box {
            flex: 0.3;
            background-image: url('./images/image-3.png');
            background-size: 100% 100%;
            padding: 10px;

            .roduct_num_box_title {
                text-align: center;
                color: #FF7802;
                font-size: 18px;
                height: 36px;
            }

            .roduct_num_box_ctn {
                display: flex;
                justify-content: space-around;

                li {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .ctn_num {
                        font-size: 18px;
                        color: rgba(1, 217, 255, 1.00);
                    }
                }
            }
        }
    }

    .echarts_title {
        margin: 10px 0 16px 0;
        width: 340px;
        height: 32px;
        padding-left: 50px;
        background-image: url('./images/11.png');
        background-size: 100% 100%;
        font-size: 24px;
    }

    .GMV {
        display: flex;
        justify-content: space-around;

        .GMV_left {
            flex: 0.4;

            // background-color: pink;
            .GMV_left_tit {
                height: 66px;
                line-height: 66px;
                text-align: center;
                color: #FF7802;
                font-size: 18px;
                font-weight: 600;
                background: rgb(3, 37, 93, 0.5);
            }

            .GMV_left_ctn {
                // background-color: rgb(34, 87, 157, 0.8);
                background: url('./images/_13.png') no-repeat;
                // background-image: url('./images/_13.png');
                // background-size: 100% 100%;
                background-position: center;
                margin: 20px 20px;
                height: 400px;
            }
        }

        .GMV_right {
            flex: 0.56;
        }

        .echarts_1 {
            height: 193px;
            width: 100%;
            background-image: $echarts_bg_img;
            background-size: 100% 100%;
        }
    }

    .trend_comparison {
        display: flex;
        justify-content: space-around;

        .flex_size {
            flex: 0.48;
        }

        .trend_comparison_box {
            padding: 10px 20px;
            height: 252px;
            background-image: $echarts_bg_img;
            background-size: 100% 100%;
        }
    }

    .table_title {
        margin-top: 20px;
        width: 98%;
        height: 43px;
        line-height: 43px;
        font-size: 24px;
        padding-left: 60px;
        font-weight: 700;
        // background-image: url('./images/table_title.png');
        background: linear-gradient(90deg, #008CC2 0%, #008CC2 100%);
        background-size: 100% 100%;
        margin-left: 20px;
        box-sizing: border-box;
    }

    .table {
        height: 432px;
        padding: 10px;
        width: 98%;
        overflow: auto;
        margin-bottom: 10px;
        margin-top: 4px;
        // border: 1px solid #fff;

        ::v-deep(.el-auto-resizer) {
            .el-table-v2 {
                .el-table-v2__main {
                    background: none;

                    .el-table-v2__header {

                        //表格头部
                        .el-table-v2__header-row {
                            .el-table-v2__header-cell {
                                background: none;
                            }
                        }
                    }

                    .el-table-v2__body {

                        // 表格主体内容
                        .el-table-v2__row:nth-child(2n) {
                            background-color: rgba(124, 145, 170, 0.5);
                        }

                        .el-table-v2__row:hover {
                            background-color: rgb(32, 96, 169);
                        }
                    }
                }
            }
        }
    }
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
    width: 6px;
    /* 横向滚动条宽度 */
}

::-webkit-scrollbar-track {
    background-color: #00053f;
    /* 滚动条背景色 */
}

::-webkit-scrollbar-thumb {
    background-color: rgb(33, 90, 169);
    /* 滑块颜色 */
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgb(33, 183, 206);
    /* 滑块悬停状态颜色 */
}
</style>