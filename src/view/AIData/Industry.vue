<!--
 * @Author: dtl 603388675@.com
 * @Date: 2024-03-27 12:16:14 市场分析
 * @LastEditors: dtl 603388675@.com
 * @LastEditTime: 2024-03-28 18:48:23
 * @FilePath: \zhihuigehoutai\src\view\AIData\Industry.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="pageBG">
        <page_header :title="pageTitle" />
        <el-form :inline="true" :model="searchData" class="goal-from">
            <el-form-item label="类目选择">
                <el-cascader :key="listKey" v-model="searchData.category" :options="categoryList"
                    :show-all-levels="false" :props="{ value: 'category', label: 'category' }"
                    @change="categoryChange" />
            </el-form-item>
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
        <el-row :gutter="20">
            <el-col :span="12">
                <boxHead title="本店类目分布" />
                <div class="twoPie">
                    <div id="pie1" style="height: 300px;"></div>
                    <div id="pie2" style="height: 300px;"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <boxHead title="本店和同行对比" />
                <div id="Compare" style="height: 300px;"></div>
            </el-col>
            <el-col :span="12">
                <boxHead title="GMV趋势对比" />
                <div id="gmvCompare" style="height: 300px;"></div>
            </el-col>
            <el-col :span="12">
                <boxHead title="访客趋势对比" />
                <div id="visCompare" style="height: 300px;"></div>
            </el-col>
            <el-col :span="12">
                <boxHead title="市场占有率趋势" />
                <div id="inCompare" style="height: 300px;"></div>
            </el-col>
            <el-col :span="12" style="position: relative;">
                <boxHead title="类目明细" />
                <div class="gmvTrend" style="top:24px;left:8vw">
                    <el-button type="primary" :icon="RefreshLeft" size="small" :circle="true"
                        @click="Industry_filter_R" />
                </div>
                <el-table ref="tableListRefIndustry" :data="IndustryData.tableData" border :v-loading="IndustryLoad"
                    class="palletGmv" show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px" v-el-table-infinite-scroll="loadMore_Industry"
                    :infinite-scroll-distance="100" :infinite-scroll-disabled="scroll_Industry"
                    :infinite-scroll-immediate="false" :infinite-scroll-delay="2000" @filter-change="IndustryRowClick">
                    <el-table-column show-overflow-tooltip :label="Industry_filter_label" width="120" align="left"
                        key="category2" prop="category2" :filters="Industry_filter" :filter-multiple="false"
                        filter-class-name="Industry_filter">
                    </el-table-column>
                    <el-table-column v-for="item, index in IndustryData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_Industry">
                        <div
                            style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有更多了</span>
                        </div>
                    </template>
                </el-table>
                <el-table ref="tableListRefIndustry_sum" :show-header="false" :data="IndustryData.sumData" border
                    :v-loading="IndustryLoad" class="palletGmv" show-overflow-tooltip
                    element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 30px">
                    <el-table-column show-overflow-tooltip label="合计" width="120" align="left" key="category2"
                        prop="category2">
                    </el-table-column>
                    <el-table-column v-for="item, index in IndustryData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>
                    <template #empty>
                        <div
                            style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有合计</span>
                        </div>
                    </template>
                </el-table>

            </el-col>
        </el-row>
    </div>
    <goHome />
</template>
<script setup lang="ts" name="Industry">
import { RefreshLeft, } from '@element-plus/icons-vue'
import { reactive, onMounted, ref, nextTick } from "vue";
import page_header from "./components/page_header.vue";
import goHome from "./components/goHome.vue";
import boxHead from "./components/box_head.vue";
import boxHead1 from "./components/box_head1.vue";
import boxHeadtb from "./components/box_head_tb.vue";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { persentNum, floatNum, lueNum, roundNum, groupBy } from "@/utils/format.js";
import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import {
    lineOptions, pieOptionsHome, pieItemOptions1, lineOptions1, lineOptions_lineAndbar
} from "./echartsOptions";
import { getCategoryGmvDetailList, getCategoryGmvList, getCategoryGmvTreadData, getShopIndustryList, } from "@/api/AIdata";

const pageTitle = "市场分析";

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};
const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    start_date: "",
    end_date: "",
    "pageNum": 1,
    "pageSize": 30,
    shop_name: "蜡笔派家居旗舰店", //店铺名称
    "category": "",
});

onMounted(() => {
    getData()
})
const getData = async () => {
    await getCategoryList()
    await getGmvList()
    await getGmvTrend()
    await getIndustryList()
}

// 获取类目明细

const tableListRefIndustry = ref()
const tableListRefIndustry_sum = ref()
const IndustryData = reactive({
    table_head: [
        // {
        //     title: "类目名称",
        //     width: '',
        //     align: "center",
        //     dataKey: "category2",
        //     key: "category2",
        //     fixed: false,
        //     unit: "%",
        // },
        {
            title: "类目GMV",
            width: '',
            align: "center",
            dataKey: "customer_unit_price",
            key: "customer_unit_price",
            fixed: false,
            unit: "",
        },
        {
            title: "本店GMV",
            width: '',
            align: "center",
            dataKey: "gmv",
            key: "gmv",
            fixed: false,
            unit: "%",
        },
        {
            title: "本店GMV占比",
            width: '140',
            align: "center",
            dataKey: "crowd_tgi",
            key: "crowd_tgi",
            fixed: false,
            unit: "",
        },
        {
            title: "市场占有率",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
        {
            title: "类目访问数",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
        {
            title: "类目加购率",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
        {
            title: "类目客单价",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
        {
            title: "本店客单价",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as any,
    sumData: [] as any,
})
let Industry_filter_label = "类目名称"
let Industry_pageNum = 1
let nomore_Industry = ref(false)
let scroll_Industry = ref(false)
let IndustryLoad = ref(true)
let Industry_filter = [] as any
let Industry_filterData = [] as any
let Industry_filterFirst = [] as any
const getCategoryList = async (filter: boolean = false, level: number = 0) => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCategoryGmvDetailList(data)]
    if (res.code == 0) {
        let arr = [] as any;
        if (res.data.records.length > 0) {
            IndustryData.tableData = res.data.records.map((item: any, index: any) => {

                item.category_visitors_count = lueNum(item.category_visitors_count)
                item.visitors_count = lueNum(item.visitors_count)
                item.gmv = lueNum(item.gmv)
                item.category_gmv = lueNum(item.category_gmv)
                item.customer_unit_price = lueNum(item.customer_unit_price)
                item.category_customer_unit_price = lueNum(item.category_customer_unit_price)

                item.rate = lueNum(item.rate * 100) + '%'
                item.add_to_cart_rate = lueNum(item.add_to_cart_rate * 100) + '%'
                item.category_add_to_cart_rate = lueNum(item.category_add_to_cart_rate * 100) + '%'
                if (item.category3) {
                    item.category2 = item.category3
                }
                if (level == 0) {
                    let obj = {
                        text: item.category2,
                        value: item.category2,
                        index: index
                    }
                    Industry_filter.push(obj)
                }
                arr.push(item)
            })
        } else {
            nomore_Industry.value = true
            scroll_Industry.value = true
        }

        if (res.data.sum !== null && res.data.sum !== undefined) {
            let sum = res.data.sum
            sum.category_visitors_count = lueNum(sum.category_visitors_count)
            sum.visitors_count = lueNum(sum.visitors_count)
            sum.gmv = lueNum(sum.gmv)
            sum.category_gmv = lueNum(sum.category_gmv)
            sum.customer_unit_price = lueNum(sum.customer_unit_price)
            sum.category_customer_unit_price = lueNum(sum.category_customer_unit_price)

            sum.rate = lueNum(sum.rate * 100) + '%'
            sum.add_to_cart_rate = lueNum(sum.add_to_cart_rate * 100) + '%'
            sum.category_add_to_cart_rate = lueNum(sum.category_add_to_cart_rate * 100) + '%'
            IndustryData.sumData = [sum]
        }
        if (filter) {
            IndustryData.tableData = [...Industry_filterData, ...arr].filter(item => item !== undefined)
        } else {
            IndustryData.tableData = [...IndustryData.tableData, ...arr].filter(item => item !== undefined)
            Industry_filterFirst = [...IndustryData.tableData, ...arr].filter(item => item !== undefined)
        }
        IndustryLoad.value = false
        refreshTable()
        nextTick(() => {
            addScrollListener();
        });
    }
}
const refreshTable = () => {
    let table = tableListRefIndustry.value;
    let tables = tableListRefIndustry_sum.value;
    //强制刷新组件
    table.doLayout()
    tables.doLayout()
}

// 添加滚动监听函数
const addScrollListener = () => {
    const table1 = tableListRefIndustry.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    const table2 = tableListRefIndustry_sum.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    tableListRefIndustry.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table2.scrollLeft = event.target.scrollLeft
    }
    tableListRefIndustry_sum.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table1.scrollLeft = event.target.scrollLeft
    }
};
// 滚动加载更多
const loadMore_Industry = async () => {
    Industry_pageNum++
    // searchData.keyword = ''
    debounce(getCategoryList(), 300)
}
// 筛选点击
const IndustryRowClick = async (newFilters: any) => {
    let counter = 1;
    const newObject = {} as any;

    Object.keys(newFilters).forEach(key => {
        newObject[`key${counter}`] = [...newFilters[key]];
        counter++;
    });
    searchData.category = Industry_filter_label = newObject.key1[0]
    const data = Industry_filterFirst.find(Industry_filterData => Industry_filterData.category2 === newObject.key1[0]);
    Industry_filterData = [{ ...data }]
    scroll_Industry.value = false
    getCategoryList(true, 1)
}
// 重置筛选
const Industry_filter_R = () => {
    Industry_filter_label = "类目名称"
    Industry_pageNum = 1
    IndustryData.tableData = Industry_filterFirst
    refreshTable()
}

// 选择类目
const categoryChange = async (value) => {
    searchData.category = value.toString()
    Industry_pageNum = 1
    nomore_Industry.value = false
    scroll_Industry.value = false
    IndustryLoad.value = true
    IndustryData.tableData = []
    Industry_filter_label = "类目名称"
    await getCategoryList()
}

// 获取类目gmv列表
let categoryList: any
let listKey = ref(0)
const getGmvList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCategoryGmvList(data)]
    console.log(res, "getCategoryGmvList")
    if (res.code == 0) {
        let pie1Data = {
            data: [],
            legendData: []
        } as any;
        let pie2Data = {
            data: [],
            legendData: []
        } as any;
        let legendData = [] as any;
        if (res.data.records.length > 0) {
            categoryList = res.data.records
            res.data.records.map((item: any, index: any) => {
                let obj1 = {
                    name: item.category,
                    value: item.gmv
                }
                pie1Data.data.push(obj1)
                let obj2 = {
                    name: item.category,
                    value: item.visitors_count
                }
                pie2Data.data.push(obj2)
                legendData.push(item.category)
            })
        }
        listKey.value++
        let chartDom1: any = document.getElementById('pie1');
        let myChart1 = echarts.init(chartDom1);
        let option1 = pieItemOptions1(pie1Data.data, true);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        option1 && myChart1.setOption(option1);
        EleResize.on(chartDom1, listener1);

        let chartDom2: any = document.getElementById('pie2');
        let myChart2 = echarts.init(chartDom2);
        let option2 = pieItemOptions1(pie2Data.data, true);
        let listener2 = function () {
            if (myChart2) {
                myChart2.resize();
            }
        };
        option2 && myChart2.setOption(option2);
        EleResize.on(chartDom2, listener2);
    }
}

// 获取类目gmv趋势
const getGmvTrend = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCategoryGmvTreadData(data)]
    console.log(res, "getCategoryGmvTreadData")
    if (res.code == 0) {
        let date = [] as any
        let objRate = {
            name: '市场占有率',
            type: 'line',
            data: [] as any
        }
        let objGmv = {
            name: '类目GMV',
            type: 'bar',
            data: [] as any
        }
        let objVisCate = {
            name: '类目访问人数',
            type: 'line',
            data: [] as any
        }
        let objVis = {
            name: '本店访客数',
            type: 'line',
            data: [] as any
        }
        let objGmv1 = {
            name: '本店GMV',
            type: 'line',
            data: [] as any
        }
        let serieslineAndBarData = [] as any
        let seriesVisRate = [] as any
        let seriesGmvRate = [] as any
        res.data.records.map((item: any, index: any) => {
            objGmv.data.push(item.category_gmv)
            objGmv1.data.push(item.gmv)
            objRate.data.push(item.rate)
            objVisCate.data.push(item.category_visitors_count)
            objVis.data.push(item.visitors_count)
            date.push(item.date)

        })
        serieslineAndBarData.push(objGmv, objRate)
        seriesVisRate.push(objVisCate, objVis)
        seriesGmvRate.push(objGmv, objGmv1)

        let chartDom1: any = document.getElementById('inCompare');
        let myChart1 = echarts.init(chartDom1);
        let option1 = lineOptions_lineAndbar(serieslineAndBarData, date, false, '');
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        option1 && myChart1.setOption(option1);
        EleResize.on(chartDom1, listener1);

        let chartDom2: any = document.getElementById('visCompare');
        let myChart2 = echarts.init(chartDom2);
        let option2 = lineOptions_lineAndbar(seriesVisRate, date, false, '');
        let listener2 = function () {
            if (myChart2) {
                myChart2.resize();
            }
        };
        option2 && myChart2.setOption(option2);
        EleResize.on(chartDom2, listener2);

        let chartDom3: any = document.getElementById('gmvCompare');
        let myChart3 = echarts.init(chartDom3);
        let option3 = lineOptions_lineAndbar(seriesGmvRate, date, false, '');
        let listener3 = function () {
            if (myChart3) {
                myChart3.resize();
            }
        };
        option3 && myChart3.setOption(option3);
        EleResize.on(chartDom3, listener3);
    }
}

// 获取行业数据
const getIndustryList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getShopIndustryList(data)]
    console.log(res, "getShopIndustryList")
    if (res.code == 0) {

    }
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

</script>
<style lang="scss" scoped>
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

.twoPie {
    display: flex;
    justify-content: space-around;
}

#pie1,
#pie2 {
    background: url("./images/_13.png") no-repeat;
    background-position-x: center;
    background-position-y: bottom;
    background-size: 50% 80%;
    width: 45%;
}

.gmvTrend {
    position: absolute;
    top: 20px;
    right: 20px;
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
    font-size: 1.5em;
    font-weight: 600;
}

.gmvTrend_sel {
    background: rgb(14, 58, 121) !important;
}

::v-deep(.el-input__wrapper) {
    background: transparent !important;
    box-shadow: none;
    border-radius: 0;
    border: 1px solid rgba(1, 229, 255, 1);
    width: 200px;

    .el-range-input {
        color: #fff;
    }
}

::v-deep(.el-input__inner) {
    color: #fff;
}

::v-deep(.el-checkbox .el-checkbox__label) {
    color: #000 !important;
}

::v-deep(.el-popper).is-light {
    background-color: rgb(0, 98, 147);
    border: 1px solid rgb(0, 98, 147);
}

::v-deep(.el-select-dropdown__item).hover {
    background-color: rgb(0, 0, 0, 0.3);
}

::v-deep(.el-select-dropdown__item) {
    :hover {
        background-color: rgb(0, 0, 0, 0.3);
    }
}

::v-deep(.el-select-dropdown__item).selected {
    background-color: rgb(0, 0, 0, 0.1);
}

::v-deep(.el-select-dropdown__item) {
    color: #fff;
}

::v-deep(.el-select__tags) {
    .el-tag--info {
        background-color: rgba(0, 98, 147, 0.5);
    }
}

::v-deep(.el-select__tags) {
    .el-tag--info span {
        color: #fff;
    }
}


.colflex {
    display: flex;
    align-items: center;
}

::v-deep(.el-table) {
    background: transparent;
}

::v-deep(.el-table__empty-block) {
    min-height: auto;
}

::v-deep(.el-table-fixed-column--left) {
    background: transparent !important;
}

::v-deep(.el-table tr) {
    background: transparent;
}

::v-deep(.el-table .cell) {
    padding: 0;
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
</style>