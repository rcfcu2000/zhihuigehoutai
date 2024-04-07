<!--
 * @Author: dtl 603388675@.com
 * @Date: 2024-03-25 12:26:52
 * @LastEditors: dtl 603388675@.com
 * @LastEditTime: 2024-04-07 10:18:10
 * @FilePath: \zhihuigehoutai\src\view\AIData\wordsAnalysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="wordsAnalysis">
        <page_header :title="pageTitle" />
        <div style="position: absolute;top:25px;left: 8vw;z-index: 100;">
            <el-button-group class="ml-4">
                <el-button type="primary" size="large" color="#E6A23C" @click="rateClick" :autofocus="ratefocus">支付转化率</el-button>
                <el-button type="primary" size="large" color="#E6A23C" @click="visClick" :autofocus="visfocus">访客数</el-button>
            </el-button-group>
        </div>
        <el-form :inline="true" :model="searchData" class="goal-from">
            <el-form-item label="请选择起止时间：">
                <el-date-picker v-model="searchData.date" @change="getData" :clearable="false" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" type="daterange" start-placeholder="开始时间"
                    end-placeholder="结束时间" />
            </el-form-item>
        </el-form>
        <div class="page_words">
            <el-row :gutter="30" class="wordsRow">
                <el-col :span="12" v-for="(item, index) in boxData" :key="index">
                    <box :datas="item" :idx="index" @wordsClick="words_click" />
                </el-col>
                <el-col :span="12">
                    <boxHead title="访客趋势" />
                    <div class="box_body" id="visitor">
                        <el-skeleton :rows="4" animated> </el-skeleton>
                    </div>
                </el-col>
                <el-col :span="12">
                    <boxHead title="转化率趋势" />
                    <div class="box_body" id="conversion">
                        <el-skeleton :rows="4" animated> </el-skeleton>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="wordsTable" style="position:relative">
            <boxHead title="关键词明细" />
            <div class="gmvTrend" style="top:24px;left:9.5vw;position: absolute;">
                <el-button type="primary" :icon="RefreshLeft" size="small" :circle="true" @click="words_filter_R" />
            </div>
            <el-table ref="tableListRefwords" :data="wordsData.tableData" border v-loading="wordsLoad" class="palletGmv"
                show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                style="width: 100%; height: 400px" v-el-table-infinite-scroll="loadMore_words"
                :infinite-scroll-distance="100" :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                :infinite-scroll-delay="2000" @row-click="rowClick" @filter-change="wordsRowClick">
                <el-table-column show-overflow-tooltip :label="words_filter_label" width="120" align="left"
                    key="keyword" prop="keyword" :filters="words_filter" :filter-multiple="false"
                    filter-class-name="words_filter">
                </el-table-column>
                <el-table-column v-for="item, index in wordsData.table_head" :key="index" :prop="item.dataKey"
                    show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                    :fixed="item.fixed">
                </el-table-column>

                <template #append v-if="nomore_words">
                    <div style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                        <el-icon>
                            <MagicStick />
                        </el-icon> <span>没有更多了</span>
                    </div>
                </template>
            </el-table>
            <el-table ref="tableListRefwords_sum" :show-header="false" :data="wordsData.sumData" border
                :v-loading="wordsLoad" class="palletGmv" show-overflow-tooltip
                element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 30px">
                <el-table-column show-overflow-tooltip label="合计" width="120" align="left" key="keyword" prop="keyword">
                </el-table-column>
                <el-table-column v-for="item, index in wordsData.table_head" :key="index" :prop="item.dataKey"
                    show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                    :fixed="item.fixed">
                </el-table-column>
                <template #empty>
                    <div style="height: 30px;width: 100%;display: flex;align-items: center;justify-content: center;">
                        <el-icon>
                            <MagicStick />
                        </el-icon> <span>没有合计</span>
                    </div>
                </template>
            </el-table>
        </div>
    </div>
    <goHome />
</template>

<script setup lang="ts" name="wordsAnalysis">
import { RefreshLeft, } from '@element-plus/icons-vue'
import goHome from "./components/goHome.vue";
import page_header from './components/page_header.vue'
import box from './components/box.vue'
import boxHead from "./components/box_head.vue";
import { useUserStore } from "@/pinia/modules/user";
import { reactive, ref, onMounted, nextTick } from "vue";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { persentNum, floatNum, lueNum, mergeArr, chunkArray, lueNum1 } from "@/utils/format.js";
import {
    getIndustrywordListdata,
    getKeywordListdata,
    getKeywordMuList,
    getKeywordTrendList,
    getScKeywordListdata,
} from "@/api/AIdata";

import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js";
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
    searchData.keyword = ''
    words_pageNum = 1
    wordsData.tableData = [] as any
    words_filterData = [] as any
    words_filter = [] as any
    await getTrafficdata()
    await getKeywordList()
    await getwordswordList()
    await getScKeywordList()
    await getwordMuList()
}
let dataType = 'vis'
let ratefocus = false
let visfocus = true
const visClick = () => {
    dataType = 'vis'
    visfocus = true
    ratefocus = false
    change_words()
}
const rateClick = () => {
    dataType = 'rate'
    visfocus = false
    ratefocus = true
    change_words()
}
const change_words = async () => {
    await getKeywordList()
    await getwordswordList()
    await getScKeywordList()
}
const words_change = async () => {
    words_filter_label = "分类"
    wordsData.tableData = []
    words_filterFirst = []
    words_pageNum = 1
    await getTrafficdata()
    await getwordMuList()
}
const words_click = (params) => {
    searchData.keyword = params.name
    debounce(words_change(), 300)
    console.log(params, "words_click")
}
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
            changeData[0].data.push(item.cr*100)
            changeData[1].data.push(item.cr_notfree*100)
            changeData[2].data.push(item.cr_free*100)
            changeData[3].data.push(item.cr_industry*100)
            date.push(item.date)
        })

        const chartDom = document.getElementById('visitor') as HTMLElement;
        const myChart = echarts.init(chartDom);
        myChart.clear()
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
        myChart1.clear()
        const option1 = lineOptions(changeData, date, false, '%');
        option1 && myChart1.setOption(option1);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        EleResize.on(chartDom1, listener1);
    }
}
const getwordswordList = async () => {
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
                if (dataType == 'vis') {
                    item.value = (item.visitors_count)
                } else {
                    item.value = (item.payment_conversion_rate)
                }
                    arr.push(item)
                }
                boxData[3].chartsData = arr
            }
        }
    }
}

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
                if (dataType == 'vis') {
                    item.value = (item.visitors_count)
                } else {
                    item.value = (item.payment_conversion_rate)
                }
                arr1.push(item)
            }
            boxData[1].chartsData = arr1
        }
        if (len2 > 0) {
            let arr2 = [] as any
            for (let i = 0; i < len2; i++) {
                let item = res.data.records_free[i]
                item.name = item.keyword
                if (dataType == 'vis') {
                    item.value = (item.visitors_count)
                } else {
                    item.value = (item.payment_conversion_rate)
                }
                arr2.push(item)
            }
            boxData[2].chartsData = arr2
        }
    }
}

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
                if (dataType == 'vis') {
                    item.value = (item.visitors_count)
                } else {
                    item.value = (item.payment_conversion_rate)
                }
                arr.push(item)
            }
            boxData[0].chartsData = arr
        }
    }
}

const tableListRefwords = ref()
const tableListRefwords_sum = ref()
const wordsData = reactive({
    table_head: [
        // {
        //     title: "分类",
        //     width: '',
        //     align: "left",
        //     dataKey: "keyword",
        //     key: "keyword",
        //     fixed: true,
        //     unit: "",
        // },
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
    tableData: [] as any,
    sumData: [] as any,
})
let words_filter_label = "分类"
let words_pageNum = 1
const words_pageSize = ref(20)
let nomore_words = ref(false)
let scroll_words = ref(false)
let wordsLoad = ref(true)
let load_words = ref(false)
let words_filter = [] as any
let words_filterData = [] as any
let words_filterFirst = [] as any
let sumData = [] as any
const getwordMuList = async (filter: boolean = false, level: number = 0) => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = words_pageNum
    const [res] = [await getKeywordMuList(data)];
    if (res.code == 0) {
        let arr = [] as any;
        if (res.data.records.length > 0) {
            res.data.records.map((item: any, index: any) => {
                item.count = lueNum1(item.count)
                item.clicks = lueNum(item.clicks)
                item.visitors_count_free = lueNum1(item.visitors_count_free)
                item.visitors_count_notfree = lueNum1(item.visitors_count_notfree)
                item.industry_clicks = lueNum1(item.industry_clicks)

                item.cr = lueNum(item.cr * 100) + '%'
                item.cr_notfree = lueNum(item.cr_notfree * 100) + '%'
                item.cr_free = lueNum(item.cr_free * 100) + '%'
                item.cr_industry = lueNum(item.cr_industry) + '%'

                if (level == 0) {
                    let obj = {
                        text: item.keyword,
                        value: item.keyword,
                        index: index
                    }
                    words_filter.push(obj)
                }
                arr.push(item)
            })
        } else {
            nomore_words.value = true
            scroll_words.value = true
            searchData.pageNum--
        }

        if (res.data.sum !== null && res.data.sum !== undefined && !filter) {
            let sum = res.data.sum
            sum.keyword = '合计'
            sum.count = lueNum1(sum.count)
            sum.clicks = lueNum(sum.clicks)
            sum.visitors_count_free = lueNum1(sum.visitors_count_free)
            sum.visitors_count_notfree = lueNum1(sum.visitors_count_notfree)
            sum.industry_clicks = lueNum1(sum.industry_clicks)
            sum.cr = lueNum(sum.cr * 100) + '%'
            sum.cr_notfree = lueNum(sum.cr_notfree * 100) + '%'
            sum.cr_free = lueNum(sum.cr_free * 100) + '%'
            sum.cr_industry = lueNum(sum.cr_industry) + '%'
            wordsData.sumData = [sum]
            sumData = [sum]
        }else{
            wordsData.sumData = words_filterData
        }
        if (filter) {
            wordsData.tableData = [...words_filterData, ...arr].filter(item => item !== undefined)
        } else {
            words_filterFirst = [...wordsData.tableData, ...arr].filter(item => item !== undefined)
            wordsData.tableData = [...wordsData.tableData, ...arr].filter(item => item !== undefined)
        }
        wordsLoad.value = false
        refreshTable()
        nextTick(() => {
            addScrollListener();
        });
    }
}
// 重置筛选
const words_filter_R = () => {
    searchData.keyword = ''
    words_pageNum = 1
    words_filter_label = "分类"
    wordsData.tableData = mergeArr(words_filterFirst)
    wordsData.sumData = sumData
    refreshTable()
}
// 添加滚动监听函数
const addScrollListener = () => {
    const table1 = tableListRefwords.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    const table2 = tableListRefwords_sum.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    tableListRefwords.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table2.scrollLeft = event.target.scrollLeft
    }
    tableListRefwords_sum.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table1.scrollLeft = event.target.scrollLeft
    }
};
// 筛选点击
const wordsRowClick = async (newFilters: any) => {
    let counter = 1;
    const newObject = {} as any;

    Object.keys(newFilters).forEach(key => {
        newObject[`key${counter}`] = [...newFilters[key]];
        counter++;
    });
    console.log(newObject,'newObject')
    searchData.keyword = newObject.key1[0]
    if(newObject.key1.length == 0){
        words_filter_label = '全部'
    }
    const data = words_filterFirst.find(words_filterData => words_filterData.keyword === newObject.key1[0]);
    words_filterData = [{ ...data }]
    scroll_words.value = false
    getwordMuList(true, 1)
}
/**
     * 刷新table
    */
const refreshTable = () => {
    let table = tableListRefwords.value;
    let tables = tableListRefwords_sum.value;
    //强制刷新组件
    table.doLayout()
    tables.doLayout()
}
const loadMore_words = async () => {
    words_pageNum++
    debounce(getwordMuList(), 300)
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
    words_clicks: string
    cr_words: string
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
                item.words_clicks = lueNum(item.words_clicks)

                item.cr = lueNum(item.cr * 100) + '%'
                item.cr_notfree = lueNum(item.cr_notfree * 100) + '%'
                item.cr_free = lueNum(item.cr_free * 100) + '%'
                item.cr_words = lueNum(item.cr_words * 100) + '%'
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
.el-button {
    color: #fff;
}

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

::v-deep(.el-input__wrapper, .el-date-editor) {
    background: transparent !important;
    box-shadow: none;
    border-radius: 5px;
    border: 1px solid rgba(1, 229, 255, 1);
    width: 200px;

    .el-range-input {
        color: #777777;
    }
}

::v-deep(.el-radio-button__inner) {
    color: #777777 !important;
}

::v-deep(.el-input__inner) {
    color: #777777;
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