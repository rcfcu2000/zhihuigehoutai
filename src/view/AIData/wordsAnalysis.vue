<!--
    关键词分析
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 14:35:35
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-20 17:37:02
 * @FilePath: \zhihuigehoutai\src\view\AIData\wordsAnalysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="wordsAnalysis">
        <page_header :title="pageTitle" />
        <el-form :inline="true" :model="searchData" class="goal-from">
            <el-form-item label="请选择起止时间">
                <el-date-picker v-model="searchData.date" @change="getData" :clearable="false" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange" start-placeholder="开始时间"
                    end-placeholder="结束时间" style="
            width: 220px;
            background: transparent;
            border-color: rgba(0, 98, 147, 0.5);
          " />
            </el-form-item>
        </el-form>
        <div class="page_words">
            <el-row :gutter="30" class="wordsRow">
                <el-col :span="12" v-for="(item, index) in boxData" :key="index">
                    <box :datas="item" :idx="index" />
                </el-col>
                <el-col :span="12">
                    <boxHead title="访客趋势" />
                    <div class="box_body" id="visitor">

                    </div>
                </el-col>
                <el-col :span="12">
                    <boxHead title="转化率趋势" />
                    <div class="box_body" id="conversion">

                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="wordsTable">
            <boxHead title="关键词明细" />
            <el-table ref="tableListRef" :data="wordsData.tableData" border v-loading="wordsLoad" class="palletGmv"
                show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                style="width: 100%; height: 400px" v-el-table-infinite-scroll="loadMore_words"
                :infinite-scroll-distance="100" :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                :infinite-scroll-delay="2000" :lazy="load_words" :load="loadWords"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="keyword"
                @row-click="rowClick">
                <el-table-column v-for="item, index in wordsData.table_head" :key="index" :prop="item.dataKey"
                    show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                    :fixed="item.fixed">
                </el-table-column>

                <template #append v-if="nomore_words">
                    <div style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                        <el-icon>
                            <MagicStick />
                        </el-icon> <span>没有更多了</span>
                    </div>
                </template>
            </el-table>
        </div>
    </div>
    <goHome />
</template>

<script setup lang="ts" name="wordsAnalysis">
import goHome from "./components/goHome.vue";
import page_header from './components/page_header.vue'
import box from './components/box.vue'
import boxHead from "./components/box_head.vue";
import { useUserStore } from "@/pinia/modules/user";
import { reactive, ref, onMounted } from "vue";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { persentNum, floatNum, lueNum, roundNum, chunkArray } from "@/utils/format.js";
import {
    getIndustrywordListdata,
    getKeywordListdata,
    getKeywordMuList,
    getKeywordTrendList,
    getScKeywordListdata,
} from "@/api/AIdata";

import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import 'echarts-wordcloud';
import { lineOptions1, lineOptions, wordsCloud } from "./echartsOptions";

const pageTitle = "关键词分析"
const userStore = useUserStore();
const userid = {
    id: userStore.userInfo.nickName
};
const allData = reactive({
    componentTitle: '商品明细',
    data: [],
    column: [
        { title: '分类', width: '', align: 'center', dataKey: 'pallet', key: 'pallet', fixed: true, unit: '' },
        { title: '无界点击量', width: '', align: 'center', dataKey: 'product_name', key: 'product_name', unit: '' },
        { title: '无界点击率', width: '', align: 'center', dataKey: 'gmv', key: 'gmv', unit: '' },
        { title: '搜索访客', width: '', align: 'center', dataKey: 'gmv_percentage', key: 'gmv_percentage', unit: '%' },
        { title: '搜索转化率', width: '', align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', unit: '' },
        { title: '付费访客', width: '', align: 'center', dataKey: 'cost', key: 'cost', unit: '' },
        { title: '付费转化率', width: '', align: 'center', dataKey: 'cost_percentage', key: 'cost_percentage', unit: '%' },
        { title: '行业访客', width: '', align: 'center', dataKey: 'cost_trend', key: 'cost_trend', unit: '' },
        { title: '行业转化率', width: '', align: 'center', dataKey: 'roi', key: 'roi', unit: '' },
    ]
})

// 词云图数据
const boxData = reactive([
    { title: '无界词', chartsData: [] as any },
    { title: '生参付费词', chartsData: [] as any },
    { title: '生参免费词', chartsData: [] as any },
    { title: '生参行业词', chartsData: [] as any },
])


const searchData = reactive({
    keyword: '',
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    start_date: "",
    end_date: "",
    shop_name: "蜡笔派家居旗舰店", //店铺名称
    "pageNum": 0,
    "pageSize": 30,
});
//     getKeywordListdata,

onMounted(async () => {
    getData()
})

const getData = async () => {
    words_pageNum = 1
    await getTrafficdata()
    await getKeywordList()
    await getIndustrywordList()
    await getwordMuList()
    await getScKeywordList()
}

// 关键词趋势
const getTrafficdata = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getKeywordTrendList(data)];
    if (res.code == 0) {
        let visData = [{
            name: '无界词-点击量',
            data: [] as any
        }, {
            name: '生参付费词访客数',
            data: [] as any
        }, {
            name: '生参免费词访客数',
            data: [] as any
        }, {
            name: '行业-点击数',
            data: [] as any
        }
        ]
        let changeData = [{
            name: '无界词转化率',
            data: [] as any
        }, {
            name: '生参付费词转化率',
            data: [] as any
        }, {
            name: '生参免费词转化率',
            data: [] as any
        }, {
            name: '行业转化率',
            data: [] as any
        }
        ]
        let date = [] as any
        res.data.records?.map((item: any, index: any) => {
            visData[0].data.push(item.clicks)
            visData[1].data.push(item.visitors_count_notfree)
            visData[2].data.push(item.visitors_count_free)
            visData[3].data.push(item.industry_clicks)
            changeData[0].data.push(item.cr)
            changeData[1].data.push(item.cr_notfree)
            changeData[2].data.push(item.cr_free)
            changeData[3].data.push(item.cr_industry)
            date.push(item.date)
        })

        const chartDom = document.getElementById('visitor') as HTMLElement;
        const myChart = echarts.init(chartDom);
        const option = lineOptions(visData, date, false, '');
        option && myChart.setOption(option);
        let listener = function () {
            if (myChart) {
                myChart.resize();
            }
        };
        EleResize.on(chartDom, listener);

        const chartDom1 = document.getElementById('conversion') as HTMLElement;
        const myChart1 = echarts.init(chartDom1);
        const option1 = lineOptions(visData, date, false, '');
        option1 && myChart1.setOption(option1);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        EleResize.on(chartDom1, listener1);
    }
}
// 行业关键词
const getIndustrywordList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getIndustrywordListdata(data)];
    if (res.code == 0) {
        let len = res.data.records.length
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let arr = [] as any
                for (let i = 0; i < len; i++) {
                    let item = res.data.records[i]
                    item.name = item.keyword
                    item.value = item.visitors_count
                    arr.push(item)
                }
                boxData[3].chartsData = arr
            }
        }
    }
}

// 生意参谋收费免费关键词明细
const getScKeywordList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getScKeywordListdata(data)];
    if (res.code == 0) {
        let len1 = res.data.records_notfree.length
        let len2 = res.data.records_free.length
        if (len1 > 0) {
            let arr1 = [] as any
            for (let i = 0; i < len1; i++) {
                let item = res.data.records_notfree[i]
                item.name = item.keyword
                item.value = item.visitors_count
                arr1.push(item)
            }
            boxData[1].chartsData = arr1
        }
        if (len2 > 0) {
            let arr2 = [] as any
            for (let i = 0; i < len2; i++) {
                let item = res.data.records_free[i]
                item.name = item.keyword
                item.value = item.visitors_count
                arr2.push(item)
            }
            boxData[2].chartsData = arr2
        }
    }
}

// 无界词信息
const getKeywordList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getKeywordListdata(data)];
    if (res.code == 0) {
        let len = res.data.records.length
        if (len > 0) {
            let arr = [] as any
            for (let i = 0; i < len; i++) {
                let item = res.data.records[i]
                item.name = item.keyword
                item.value = item.visitors_count
                arr.push(item)
            }
            boxData[0].chartsData = arr
        }
    }
}

// 关键词明细信息
const tableListRef = ref()
const wordsData = reactive({
    table_head: [
        {
            title: "分类",
            width: '',
            align: "left",
            dataKey: "keyword",
            key: "keyword",
            fixed: true,
            unit: "",
        },
        {
            title: "词数量",
            width: '',
            align: "center",
            dataKey: "count",
            key: "count",
            fixed: false,
            unit: "",
        },
        {
            title: "无界点击量",
            width: '',
            align: "center",
            dataKey: "clicks",
            key: "clicks",
            fixed: false,
            unit: "",
        },
        {
            title: "无界转化率",
            width: '',
            align: "center",
            dataKey: "cr",
            key: "cr",
            fixed: false,
            unit: "%",
        },
        {
            title: "搜索访客",
            width: '',
            align: "center",
            dataKey: "visitors_count_free",
            key: "visitors_count_free",
            fixed: false,
            unit: "",
        },
        {
            title: "搜索转化率",
            width: '',
            align: "center",
            dataKey: "cr_free",
            key: "cr_free",
            fixed: false,
            unit: "%",
        },
        {
            title: "付费访客",
            width: '',
            align: "center",
            dataKey: "visitors_count_notfree",
            key: "visitors_count_notfree",
            fixed: false,
            unit: "",
        },
        {
            title: "付费转化率",
            width: '',
            align: "center",
            dataKey: "cr_notfree",
            key: "cr_notfree",
            fixed: false,
            unit: "%",
        },
        {
            title: "行业访客",
            width: '',
            align: "center",
            dataKey: "industry_clicks",
            key: "industry_clicks",
            fixed: false,
            unit: "",
        },
        {
            title: "行业转化率",
            width: '',
            align: "center",
            dataKey: "cr_industry",
            key: "cr_industry",
            fixed: false,
            unit: "%",
        },
    ],
    tableData: [] as any
})
let words_pageNum = 1
const words_pageSize = ref(20)
let nomore_words = ref(false)
let wordsLoad = ref(true)
let load_words = ref(false)
// 关键词明细
const getwordMuList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = words_pageNum
    const [res] = [await getKeywordMuList(data)];
    if (res.code == 0) {
        res.data.records.length > 0 ? chunkArrayAndRender(res.data.records, 100, 500, (chunk: any) => {
            chunk.map((item: any, index: any) => {
                item.count = lueNum(item.count)
                item.clicks = lueNum(item.clicks)
                item.visitors_count_free = lueNum(item.visitors_count_free)
                item.visitors_count_notfree = lueNum(item.visitors_count_notfree)
                item.industry_clicks = lueNum(item.industry_clicks)

                item.cr = lueNum(item.cr * 100) + '%'
                item.cr_notfree = lueNum(item.cr_notfree * 100) + '%'
                item.cr_free = lueNum(item.cr_free * 100) + '%'
                item.cr_industry = lueNum(item.cr_industry * 100) + '%'
                item.hasChildren = ref(true)
                item.children = [] as any
                item.id = wordsData.tableData.length++
                return item
            })
            wordsData.tableData = chunk
        }) : []
        wordsLoad.value = false
        refreshTable()
    }
}
/**
     * 刷新table
    */
const refreshTable = () => {
    let table = tableListRef.value;
    //强制刷新组件
    table.doLayout()
}
const loadMore_words = async () => {
    words_pageNum++
    searchData.keyword = ''
    debounce(getwordMuList(), 1000)
}
// 节流
function debounce(func: any, limit = 500) {
    const inThrottle = ref(false);

    return function (...args) {
        if (!inThrottle.value) {
            func(...args);
            inThrottle.value = true;
            setTimeout(() => (inThrottle.value = false), limit);
        }
    };
}

// 表格行点击
const rowClick = (row: any, column: any, event: Event) => {
    load_words.value = true
    // searchData.keyword = row.keyword
}
interface words {
    id: number
    keyword: number
    count: string
    clicks: string
    cr: string
    visitors_count_free: string
    cr_free: string
    visitors_count_notfree: string
    cr_notfree: string
    industry_clicks: string
    cr_industry: string
    hasChildren?: boolean
    children?: words[]
}
// 加载子数据
const childPageNum = 0
const loadWords = async (row: any, treeNode: TreeNode, resolve: (id: any[]) => void) => {
    console.log(row.id, "load")
    let data = searchData;
    data.keyword = row.keyword
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = childPageNum
    const [res] = [await getKeywordMuList(data)];
    if (res.code == 0) {
        res.data.records.length > 0 ? chunkArrayAndRender(res.data.records, 100, 500, (chunk: any, index: any) => {
            chunk.map((item: any, index: any) => {
                item.count = lueNum(item.count)
                item.clicks = lueNum(item.clicks)
                item.visitors_count_free = lueNum(item.visitors_count_free)
                item.visitors_count_notfree = lueNum(item.visitors_count_notfree)
                item.industry_clicks = lueNum(item.industry_clicks)

                item.cr = lueNum(item.cr * 100) + '%'
                item.cr_notfree = lueNum(item.cr_notfree * 100) + '%'
                item.cr_free = lueNum(item.cr_free * 100) + '%'
                item.cr_industry = lueNum(item.cr_industry * 100) + '%'
                // item.hasChildren = ref(true)
                // item.children = [] as any
                item.id = wordsData.tableData.length++
                return item
            })
            // wordsData.tableData[row.id].children = wordsData.tableData[row.id].children.concat(chunk)
            resolve(chunk)
            refreshTable()
        }) : []
        // treeNode.lazy = false
        // refreshTable()
    }
}

/**
 * @description: 
 * @param {*} array 原数组
 * @param {*} chunkSize 分段大小
 * @param {*} delay 分段间隔时间
 * @param {*} renderCallback
 * @return {*}
 * 
// 示例用法
let originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let chunkSize = 3; // 每个分段的大小
let delay = 1000; // 处理完一个分段后等待1秒钟

chunkArrayAndRender(originalArray, chunkSize, delay, renderChunk);
 */
function chunkArrayAndRender(array, chunkSize, delay, renderCallback) {
    let index = 0;

    function processChunk() {
        // 确定当前分段的终点
        const end = Math.min(index + chunkSize, array.length);
        // 切割当前分段
        const chunk = array.slice(index, end);

        if (chunk.length > 0) {
            // 如果当前分段还有数据则进行处理
            renderCallback(chunk); // 渲染当前分段

            // 定时执行下一分段的处理
            setTimeout(processChunk, delay);
        } else {
            console.log('所有分段处理渲染完毕');
        }

        // 更新下一次处理的起点
        index += chunkSize;
    }

    // 开始处理第一个分段
    processChunk();
}

// 渲染分段数据的回调函数
function renderChunk(chunk) {
    // 这里的 "render" 只是一个示例，在实际中可能是更新DOM、发送到服务器等操作
    console.log('渲染分段数据：', chunk);
}



</script>

<style lang="scss" scoped>
.wordsAnalysis {
    background-image: $page_bg;
    background-size: 100% 100%;
    height: 100vh;
    color: rgba(255, 255, 255, 1);
    overflow-y: auto;
    overflow-x: hidden;
}

.page_words {
    padding: 0 0 0 5vm;
}

// 修改element样式

.wordsRow {
    padding: 1vw;
}

.goal-from {
    text-align: right;
    position: absolute;
    right: 7.5vw;
    top: 2.5vh;
    z-index: 100;
}

::v-deep(.el-form-item__label) {
    color: #fff !important;
}

.box_body {
    background-image: $echarts_bg_img2;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 268px;
}

.wordsTable {
    padding: 0 20px 20px;
}




::v-deep(.el-table) {
    background: transparent;
}

::v-deep(.el-table-fixed-column--left) {
    background: transparent !important;
}

::v-deep(.el-table tr) {
    background: transparent;

}

::v-deep(.el-table.is-scrolling-left th.el-table-fixed-column--left) {
    background: transparent;
}

::v-deep(.el-table th.el-table__cell) {
    background: transparent;
    color: #fff;
}

::v-deep(.el-table-v2__row) {
    border-bottom: none;
    border-right: 1px solid rgb(16, 97, 197);
}

::v-deep(.el-table-v2__header-cell) {
    background: transparent;
}

::v-deep(.el-table-v2__left) {
    background: transparent;

}

::v-deep(.el-table-v2__row) {
    border-bottom: none;
    border-right: 1px solid rgb(16, 97, 197);
}

::v-deep(.el-table th.el-table__cell.is-leaf, .el-table td.el-table__cell) {
    border-bottom-color: rgb(16, 97, 197);
}

::v-deep(.el-table) {
    color: rgba(255, 255, 255, 1)
}

::v-deep(.el-table td.el-table__cell) {
    border: none !important;
}

::v-deep(.el-table__inner-wrapper::before) {
    background-color: rgb(16, 97, 197);
}

::v-deep(.el-table--border .el-table__cell) {
    border-right: rgba(1, 217, 255, 1);
}

::v-deep(.hover-row) {
    background-color: rgba(#fff, 0.2) !important;
}


::v-deep(.el-table__row:hover) {
    background-color: rgba(#fff, 0.2) !important;
}

::v-deep(.el-table__body tr td.el-table__cell) {
    background-color: transparent !important;
}

::v-deep(.el-table__body tr.hover-row>td.el-table__cell) {
    background-color: rgba(#fff, 0.2) !important;
}

::v-deep(.palletGmv .el-table__body tr td.el-table__cell) {
    padding: 2px 0 !important;
}

::v-deep(.el-table-fixed-column--left) {
    background-color: rgba(1, 16, 37, 1) !important;
}

::v-deep(.el-table__expand-icon > .el-icon) {
    color: #fff !important
}
</style>