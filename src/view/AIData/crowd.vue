<template>
    <div class="pageBG">
        <page_header :title="pageTitle" @changeShop="changeShop" />
        <el-form :inline="true" :model="searchData" class="goal-from">
            <el-form-item label="请选择起止时间">
                <el-date-picker v-model="searchData.date" @change="getData" :clearable="false" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="monthrange" start-placeholder="开始时间"
                    end-placeholder="结束时间" />
            </el-form-item>
        </el-form>
        <el-row :gutter="20">
            <el-col :span="10">
                <boxHead title="人群分布" />
                <el-table ref="tableListRef" :data="crowdsaData.tableData" border v-loading="crowdsaLoad"
                    class="palletGmv" show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px" row-key="keyword" @cell-click="crowdsaClick">
                    <el-table-column v-for="item, index in crowdsaData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_crowdsa">
                        <div style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有更多了</span>
                        </div>
                    </template>
                </el-table>
            </el-col>
            <el-col :span="4">
                <boxHead1 title="GMV分布" />
                <div id="gmvDis" style="height: 300px;">
                </div>
            </el-col>
            <el-col :span="10">
                <boxHead1 title="GMV趋势" />
                <div id="gmvTrend" style="height: 300px;">
                </div>
            </el-col>

            <el-col :span="10" style="position: relative;">
                <boxHead title="TOP10商品" />
                <div class="gmvTrend">
                    <span>人群类型：</span>
                    <el-select :key="channelsdata_key" @change="selectChange" v-model="searchData.crowd_type"
                        placeholder="请选择人群类型" style="width: 240px" class="gmvTrend_sel">
                        <el-option v-for="item in crowdsaData.tableData" :key="item.channel" :label="item.crowd_type"
                            :value="item.crowd_type" />
                    </el-select>
                </div>
                <el-table ref="tableListRef" :data="top10Data.tableData" border v-loading="top10Load" class="palletGmv"
                    show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="keyword"
                    @cell-click="top10Click">
                    <el-table-column v-for="item, index in top10Data.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_top10">
                        <div style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有更多了</span>
                        </div>
                    </template>
                </el-table>
            </el-col>
            <el-col :span="7">
                <boxHead1 title="人群分布" />
                <div id="gmvTrend1" style="height: 300px;">
                </div>
            </el-col>
            <el-col :span="7">
                <boxHead1 title="GMV趋势" />
                <div id="gmvTrend2" style="height: 300px;">
                </div>
            </el-col>

            <el-col :span="10" style="margin-top: 20px;position: relative;">
                <boxHeadtb title="商品流量来源" />
                <div class="gmvTrend" style="top:10px;left:8vw">
                    <el-button type="primary" :icon="RefreshLeft" size="small" :circle="true"
                        @click="proSource_filter_R" />
                </div>
                <el-table ref="tableListRef" :data="proSourceData.tableData" border v-loading="proSourceLoad"
                    class="palletGmv" show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px" v-el-table-infinite-scroll="loadMore_proSource"
                    :infinite-scroll-distance="100" :infinite-scroll-disabled="scroll_proSource"
                    :infinite-scroll-immediate="false" :infinite-scroll-delay="2000" @cell-click="crowdSrcClick"
                    @filter-change="proSourceClick">
                    <el-table-column show-overflow-tooltip :label="proSource_filter_label" width="120" align="left"
                        key="secondary_source" prop="secondary_source" :filters="proSource_filter"
                        :filter-multiple="false" filter-class-name="crowdSrc_filter">
                    </el-table-column>
                    <el-table-column v-for="item, index in proSourceData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_proSource">
                        <div
                            style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有更多了</span>
                        </div>
                    </template>
                </el-table>
                <el-table ref="tableListRef_sum" :show-header="false" :data="proSourceData.sumData" border
                    :v-loading="proSourceLoad" class="palletGmv" show-overflow-tooltip
                    element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 30px">
                    <el-table-column show-overflow-tooltip label="流量来源" width="120" align="left" key="secondary_source"
                        prop="secondary_source">
                    </el-table-column>
                    <el-table-column v-for="item, index in crowdSrcData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_proSource">
                        <div
                            style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有合计</span>
                        </div>
                    </template>
                </el-table>
            </el-col>
            <el-col :span="10" style="margin-top: 20px;position: relative;">
                <boxHeadtb title="人群流量来源" />
                <div class="gmvTrend" style="top:10px;left:8vw">
                    <el-button type="primary" :icon="RefreshLeft" size="small" :circle="true"
                        @click="crowdSrc_filter_R" />
                </div>
                <el-table ref="tableListRefcrowdSrc" :data="crowdSrcData.tableData" border :v-loading="crowdSrcLoad"
                    class="palletGmv" show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px" v-el-table-infinite-scroll="loadMore_crowdSrc"
                    :infinite-scroll-distance="100" :infinite-scroll-disabled="scroll_crowdSrc"
                    :infinite-scroll-immediate="false" :infinite-scroll-delay="2000" @filter-change="crowdSrcRowClick">
                    <el-table-column show-overflow-tooltip :label="crowdSrc_filter_label" width="120" align="left"
                        key="secondary_source" prop="secondary_source" :filters="crowdSrc_filter"
                        :filter-multiple="false" filter-class-name="crowdSrc_filter">
                    </el-table-column>
                    <el-table-column v-for="item, index in crowdSrcData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_crowdSrc">
                        <div
                            style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有更多了</span>
                        </div>
                    </template>
                </el-table>
                <el-table ref="tableListRefcrowdSrc_sum" :show-header="false" :data="crowdSrcData.sumData" border
                    :v-loading="crowdSrcLoad" class="palletGmv" show-overflow-tooltip
                    element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 30px">
                    <el-table-column show-overflow-tooltip label="流量来源" width="120" align="left" key="secondary_source"
                        prop="secondary_source">
                    </el-table-column>
                    <el-table-column v-for="item, index in crowdSrcData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_crowdSrc">
                        <div
                            style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有合计</span>
                        </div>
                    </template>
                </el-table>
            </el-col>
            <el-col :span="4" style="margin-top: 20px;">
                <boxHead1 title="人群分布" />
                <div id="popDis" style="height: 300px;">
                </div>
            </el-col>
        </el-row>

    </div>
    <goHome />
</template>

<script setup lang="ts" name="crowd">

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
import { EleResize } from "@/utils/echartsAuto.js";
import {
    lineOptions, pieItemOptions1, lineOptions1, lineOptions_lineAndbar
} from "./echartsOptions";
import {
    getCrowdGmv20Listdata,
    getCrowdGmvListdata,
    getCrowdGmvTrenddata,
    getCrowdSrcListdata,
    getProductCrowd10Listdata,
    getProductCrowdsListdata,
    getProductCrowdsTrendListdata,
    getProductSrcListdata,
} from "@/api/AIdata";
import { useUserStore } from '@/pinia/modules/user'

const userStore = useUserStore()
const pageTitle = "人群分析";
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};
const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    "crowd_type": "小镇中老年",
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").beginDate],
    start_date: "",
    end_date: "",
    "pageNum": 1,
    "pageSize": 30,
    shop_name: userStore.currentShop.shop_name, //店铺名称
    shop_id: userStore.currentShop.shop_id,
    "secondary_source": "",
    "tertiary_source": "",
    ids: [] as any,
});
let channelsdata_key = ref(0)

onMounted(() => {
    getData()
})

const changeShop = async () => {
    const currentShop = { ...userStore.currentShop }
    searchData.shop_name = currentShop.shop_name
    searchData.shop_id = currentShop.shop_id
    await getData()
}
const getData = async () => {
    searchData.secondary_source = ''
    searchData.tertiary_source = ''
    searchData.ids = []
    await get20data();
    await getListData();
    await getTrendListData()
    await getSrcListData()
    await getPro10ListData()
    await getProListData()
    await getProTrendListData()
    await getProSrcListData()
}

const selectChange = async () => {
    searchData.secondary_source = ''
    searchData.tertiary_source = ''
    searchData.ids = []
    crowdSrcData.tableData = []
    crowdSrc_pageNum = 1
    scroll_crowdSrc.value = false
    nomore_crowdSrc.value = false
    await getPro10ListData()
    await getProTrendListData()
    await getSrcListData()
}

const get20data = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdGmv20Listdata(data)];
    console.log(res, 'getCrowdGmv20Listdata')
    if (res.code == 0) {
        let arr1 = [] as any;
        if (res.data.records.length > 0) {
            res.data.records.map((item: any, index: any) => {
                let obj1 = {
                    name: item.crowd_type,
                    value: item.gmv
                }
                arr1.push(obj1)
            })
        }else{
            return
        }

        let chartDom1: any = document.getElementById('popDis');
        let myChart1 = echarts.init(chartDom1);
        let option1 = pieItemOptions1(arr1, false);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        option1 && myChart1.setOption(option1);
        EleResize.on(chartDom1, listener1);
    }

}

const tableListRef = ref()
const crowdsaData = reactive({
    table_head: [
        {
            title: "人群类型",
            width: '',
            align: "left",
            dataKey: "crowd_type",
            key: "crowd_type",
            fixed: false,
            unit: "",
        },
        {
            title: "支付金额(万)",
            width: '120',
            align: "center",
            dataKey: "customer_unit_price",
            key: "customer_unit_price",
            fixed: false,
            unit: "",
        },
        {
            title: "访客数",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
        {
            title: "人群TGI",
            width: '',
            align: "center",
            dataKey: "crowd_tgi",
            key: "crowd_tgi",
            fixed: false,
            unit: "%",
        },
        {
            title: "客单价",
            width: '',
            align: "center",
            dataKey: "customer_unit_price",
            key: "customer_unit_price",
            fixed: false,
            unit: "",
        },
        {
            title: "支付转化率",
            width: '',
            align: "center",
            dataKey: "payment_conversion_rate",
            key: "payment_conversion_rate",
            fixed: false,
            unit: "%",
        },
        {
            title: "人群加购率",
            width: '',
            align: "center",
            dataKey: "add_car_rate",
            key: "add_car_rate",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as Array<any>
})
let crowdsa_pageNum = 1
const crowdsa_pageSize = ref(20)
let nomore_crowdsa = ref(false)
let crowdsaLoad = ref(true)
let load_crowdsa = ref(false)
const getListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdGmvListdata(data)];
    if (res.code == 0) {
        let arr = [] as any;
        let arr1 = [] as any;
        crowdsaData.tableData = res.data.records.length > 0 ? res.data.records.map((item: any, index: any) => {
            let obj = {
                name: item.crowd_type,
                value: item.customer_unit_price
            }
            arr.push(obj)
            let obj1 = {
                name: item.crowd_type,
                value: item.visitors_count
            }
            arr1.push(obj1)
            if (item.tertiary_source) {
                item.secondary_source = item.secondary_source + '_' + item.tertiary_source
            }
            item.crowd_tgi = lueNum(item.crowd_tgi)
            item.customer_unit_price = lueNum(item.customer_unit_price)
            item.gmv = lueNum(item.gmv)
            item.visitors_count = lueNum(item.visitors_count)

            item.payment_conversion_rate = lueNum(item.payment_conversion_rate * 100) + '%'
            item.add_car_rate = lueNum(item.add_car_rate * 100) + '%'
            return item
        }) : []
        crowdsaLoad.value = false
        channelsdata_key.value++

        let chartDom: any = document.getElementById('gmvDis');
        let myChart = echarts.init(chartDom);
        let option = pieItemOptions1(arr, false);
        let listener = function () {
            if (myChart) {
                myChart.resize();
            }
        };
        option && myChart.setOption(option);
        EleResize.on(chartDom, listener);
        myChart.on('click', function (params) {
            searchData.crowd_type = params.name
            searchData.secondary_source = ''
            searchData.tertiary_source = ''
            searchData.ids = []
            crowdSrcData.tableData = []
            crowdSrc_pageNum = 1
            scroll_crowdSrc.value = false
            nomore_crowdSrc.value = false
            getSrcListData() //人群流量
            getProTrendListData() // GMV趋势
            getPro10ListData() //top10
        });
    }
}

const crowdsaClick = async (row: any, column: any, cell: HTMLTableCellElement, event: Event) => {
    searchData.crowd_type = row.crowd_type
    searchData.secondary_source = ''
    searchData.tertiary_source = ''
    searchData.ids = []
    crowdSrcData.tableData = []
    crowdSrc_pageNum = 1
    scroll_crowdSrc.value = false
    nomore_crowdSrc.value = false
    await getSrcListData() //人群流量
    await getProTrendListData() // GMV趋势
    await getPro10ListData() //top10
}

const getTrendListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdGmvTrenddata(data)];
    if (res.code == 0) {
        const gmvTrendData = groupBy(res.data.records, 'crowd_type')
        let increment = 0;
        const incrementedKeysGroup = Object.keys(gmvTrendData).reduce((acc, key) => {
            acc[increment] = gmvTrendData[key];
            increment++;
            return acc;
        }, {});
        const arr = Object.values(incrementedKeysGroup)
        let seriesGmvData = [] as any
        let date = [] as any
        let objline = {
            name: '支付金额',
            type: 'bar',
            data: [] as any
        }
        let objBar = {
            name: '购买偏好TGI',
            type: 'line',
            data: [] as any
        }
        arr.map((item: any, index: any) => {
            let objGmv = {
                name: '',
                data: [] as any
            }
            item.map((itm: any, idx: any) => {
                objGmv.name = itm.crowd_type
                objGmv.data.push(itm.gmv)
                if (index == 0) {
                    date.push(itm.date)
                }
                objline.data.push(itm.crowd_tgi)
                objBar.data.push(itm.customer_unit_price)
            })
            seriesGmvData.push(objGmv)
        })

        let chartDom: any = document.getElementById('gmvTrend');
        let myChart = echarts.init(chartDom);
        let option = lineOptions1(seriesGmvData,date, false);
        let listener = function () {
            if (myChart) {
                myChart.resize();
            }
        };
        option && myChart.setOption(option);
        EleResize.on(chartDom, listener);
    }
}

const tableListRefcrowdSrc = ref()
const tableListRefcrowdSrc_sum = ref()
const refreshTable = () => {
    let table = tableListRefcrowdSrc.value;
    let tables = tableListRefcrowdSrc_sum.value;
    table.doLayout()
    tables.doLayout()
}

const crowdSrcData = reactive({
    table_head: [
        {
            title: "访客数",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
        {
            title: "支付买家数",
            width: '',
            align: "center",
            dataKey: "paid_buyers",
            key: "paid_buyers",
            fixed: false,
            unit: "%",
        },
        {
            title: "支付金额",
            width: '',
            align: "center",
            dataKey: "customer_unit_price",
            key: "customer_unit_price",
            fixed: false,
            unit: "",
        },
        {
            title: "支付转化率",
            width: '',
            align: "center",
            dataKey: "payment_conversion_rate",
            key: "payment_conversion_rate",
            fixed: false,
            unit: "%",
        },
        {
            title: "渠道访问偏好TGI",
            width: '140',
            align: "center",
            dataKey: "crowd_tgi",
            key: "crowd_tgi",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as any,
    sumData: [] as any,
})
let crowdSrc_filter_label = "流量来源"
let crowdSrc_pageNum = 1
let nomore_crowdSrc = ref(false)
let scroll_crowdSrc = ref(false)
let crowdSrcLoad = ref(true)
let crowdSrc_filter = [] as any
let crowdSrc_filterData = [] as any
let crowdSrc_filterFirst = [] as any
const getSrcListData = async (filter: boolean = false, level: number = 0) => {
    crowdSrcLoad.value = true
    let data = searchData;
    data.pageNum = crowdSrc_pageNum
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdSrcListdata(data)];
    if (res.code == 0) {
        let arr = [] as any
        if (res.data.records.length > 0) {
            res.data.records.map((item: any, index: any) => {
                item.crowd_tgi = lueNum(item.crowd_tgi)
                item.customer_unit_price = lueNum(item.customer_unit_price)
                item.gmv = lueNum(item.gmv)
                item.paid_buyers = lueNum(item.paid_buyers)
                item.visitors_count = lueNum(item.visitors_count)

                item.payment_conversion_rate = lueNum(item.payment_conversion_rate * 100) + '%'
                if (item.tertiary_source) {
                    item.secondary_source = item.tertiary_source
                }
                if (level == 0) {
                    let obj = {
                        text: item.secondary_source,
                        value: item.secondary_source,
                        index: index
                    }
                    crowdSrc_filter.push(obj)
                }
                arr.push(item)
            })
        } else {
            nomore_crowdSrc.value = true
            scroll_crowdSrc.value = true
        }
        if (res.data.sum !== null && res.data.sum !== undefined) {
            let sum = res.data.sum
            sum.crowd_tgi = lueNum(sum.crowd_tgi)
            sum.customer_unit_price = lueNum(sum.customer_unit_price)
            sum.gmv = lueNum(sum.gmv)
            sum.paid_buyers = lueNum(sum.paid_buyers)
            sum.visitors_count = lueNum(sum.visitors_count)
            sum.payment_conversion_rate = lueNum(sum.payment_conversion_rate * 100) + '%'
            crowdSrcData.sumData = [sum]
        }
        if (filter) {
            crowdSrcData.tableData = [...crowdSrc_filterData, ...arr].filter(item => item !== undefined)
        } else {
            crowdSrcData.tableData = [...crowdSrcData.tableData, ...arr].filter(item => item !== undefined)
            crowdSrc_filterFirst = [...crowdSrcData.tableData, ...arr].filter(item => item !== undefined)
        }
        crowdSrcLoad.value = false
        refreshTable()
        nextTick(() => {
            addScrollListener();
        });
    }
}

const addScrollListener = () => {
    const table1 = tableListRefcrowdSrc.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    const table2 = tableListRefcrowdSrc_sum.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    tableListRefcrowdSrc.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table2.scrollLeft = event.target.scrollLeft
    }
    tableListRefcrowdSrc_sum.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table1.scrollLeft = event.target.scrollLeft
    }
};
const loadMore_crowdSrc = async () => {
    crowdSrc_pageNum++
    // searchData.keyword = ''
    debounce(getSrcListData(), 1000)
}

const crowdSrcClick = async (row: any, column: any, cell: HTMLTableCellElement, event: Event) => {
    searchData.secondary_source = row.secondary_source
    searchData.tertiary_source = row.tertiary_source
    searchData.ids = []
    await getListData()
}

const crowdSrcRowClick = async (newFilters: any) => {
    let counter = 1;
    const newObject = {} as any;

    Object.keys(newFilters).forEach(key => {
        newObject[`key${counter}`] = [...newFilters[key]];
        counter++;
    });
    searchData.secondary_source = crowdSrc_filter_label = newObject.key1[0]
    const data = crowdSrc_filterFirst.find(crowdSrc_filterData => crowdSrc_filterData.secondary_source === newObject.key1[0]);
    crowdSrc_filterData = [{ ...data }]
    scroll_crowdSrc.value = false
    getSrcListData(true, 1)
}

const crowdSrc_filter_R = () => {
    crowdSrc_filter_label = "流量来源"
    crowdSrc_pageNum = 1
    crowdSrcData.tableData = crowdSrc_filterFirst
    refreshTable()
}

const top10Data = reactive({
    table_head: [
        {
            title: "商品名称",
            width: '',
            align: "left",
            dataKey: "product_name",
            key: "product_name",
            fixed: false,
            unit: "",
        },
        {
            title: "商品ID",
            width: '',
            align: "center",
            dataKey: "product_id",
            key: "product_id",
            fixed: false,
            unit: "",
        },
        {
            title: "访客数",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
        {
            title: "支付买家数",
            width: '',
            align: "center",
            dataKey: "paid_buyers",
            key: "paid_buyers",
            fixed: false,
            unit: "%",
        },
        {
            title: "支付金额",
            width: '',
            align: "center",
            dataKey: "customer_unit_price",
            key: "customer_unit_price",
            fixed: false,
            unit: "",
        },
        {
            title: "支付转化率",
            width: '',
            align: "center",
            dataKey: "payment_conversion_rate",
            key: "payment_conversion_rate",
            fixed: false,
            unit: "%",
        },
        {
            title: "购买偏好TGI",
            width: '120',
            align: "center",
            dataKey: "crowd_tgi",
            key: "crowd_tgi",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as any
})
let nomore_top10 = ref(false)
let top10Load = ref(true)
const getPro10ListData = async () => {
    top10Load.value = true
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowd10Listdata(data)];
    if (res.code == 0) {
        top10Data.tableData = res.data.records.length > 0 ? res.data.records.map((item: any, index: any) => {
            item.crowd_tgi = lueNum(item.crowd_tgi)
            item.customer_unit_price = lueNum(item.customer_unit_price)
            item.gmv = lueNum(item.gmv)
            item.paid_buyers = lueNum(item.paid_buyers)
            item.visitors_count = lueNum(item.visitors_count)

            item.payment_conversion_rate = lueNum(item.payment_conversion_rate * 100) + '%'
            return item
        }) : []
        top10Load.value = false
    }
}

const top10Click = async (row: any, column: any, cell: HTMLTableCellElement, event: Event) => {
    searchData.ids = [row.product_id]
    searchData.secondary_source = ''
    searchData.tertiary_source = ''
    proSourceData.tableData = []
    scroll_proSource.value = false
    nomore_proSource.value = false
    proSource_pageNum = 1
    await getProSrcListData()
    await getProTrendListData()
    await getTrendListData()
}

const getProListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowdsListdata(data)];
    if (res.code == 0) {
        const gmvTrendData = groupBy(res.data.records, 'crowd_type')
        let increment = 0;
        const incrementedKeysGroup = Object.keys(gmvTrendData).reduce((acc, key) => {
            acc[increment] = gmvTrendData[key];
            increment++;
            return acc;
        }, {});
        const arr = Object.values(incrementedKeysGroup)
        let serieslineAndBarData = [] as any
        let date1 = [] as any
        let objline = {
            name: '支付金额',
            type: 'bar',
            data: [] as any
        }
        let objBar = {
            name: '购买偏好TGI',
            type: 'line',
            data: [] as any
        }
        arr.map((item: any, index: any) => {
            let objGmv = {
                name: '',
                data: [] as any
            }
            item.map((itm: any, idx: any) => {
                objGmv.name = itm.crowd_type
                objGmv.data.push(itm.gmv)
                if (idx == 0) {
                    date1.push(itm.crowd_type)
                }
                objline.data.push(itm.crowd_tgi)
                objBar.data.push(itm.customer_unit_price)
            })
        })
        serieslineAndBarData.push(objline, objBar)
        let chartDom1: any = document.getElementById('gmvTrend1');
        let myChart1 = echarts.init(chartDom1);
        let option1 = lineOptions_lineAndbar(serieslineAndBarData, date1, false, '');
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        option1 && myChart1.setOption(option1);
        EleResize.on(chartDom1, listener1);
    }
}

const getProTrendListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowdsTrendListdata(data)];
    if (res.code == 0) {
        let serieslineAndBarData = [] as any
        let date = [] as any
        let objline = {
            name: '支付金额',
            type: 'bar',
            data: [] as any
        }
        let objBar = {
            name: '购买偏好TGI总和',
            type: 'line',
            data: [] as any
        }
        res.data.records.length > 0 ? res.data.records.map((item: any, index: any) => {
            objline.data.push(item.crowd_tgi)
            objBar.data.push(item.customer_unit_price)
            date.push(item.date)
        }) : []
        serieslineAndBarData.push(objline, objBar)

        let chartDom1: any = document.getElementById('gmvTrend2');
        let myChart1 = echarts.init(chartDom1);
        let option1 = lineOptions_lineAndbar(serieslineAndBarData, date, false, '');
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        option1 && myChart1.setOption(option1);
        EleResize.on(chartDom1, listener1);

    }

}


const tableListRef_sum = ref()
const refreshTable1 = () => {
    let table = tableListRef.value;
    let tables = tableListRef_sum.value;
    table.doLayout()
    tables.doLayout()
}

const proSourceData = reactive({
    table_head: [
        // {
        //     title: "流量来源",
        //     width: '',
        //     align: "left",
        //     dataKey: "secondary_source",
        //     key: "secondary_source",
        //     fixed: false,
        //     unit: "",
        // },
        {
            title: "访客数",
            width: '',
            align: "center",
            dataKey: "visitors_count",
            key: "visitors_count",
            fixed: false,
            unit: "",
        },
        {
            title: "支付买家数",
            width: '',
            align: "center",
            dataKey: "paid_buyers",
            key: "paid_buyers",
            fixed: false,
            unit: "%",
        },
        {
            title: "支付金额",
            width: '',
            align: "center",
            dataKey: "customer_unit_price",
            key: "customer_unit_price",
            fixed: false,
            unit: "",
        },
        {
            title: "支付转化率",
            width: '',
            align: "center",
            dataKey: "payment_conversion_rate",
            key: "payment_conversion_rate",
            fixed: false,
            unit: "%",
        },
        {
            title: "访客TGI",
            width: '120',
            align: "center",
            dataKey: "crowd_tgi",
            key: "crowd_tgi",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as any,
    sumData: [] as any
})
let proSource_filter_label = "流量来源"
let proSource_pageNum = 1
let nomore_proSource = ref(false)
let scroll_proSource = ref(false)
let proSourceLoad = ref(true)
let proSource_filter = [] as any
let proSource_filterData = [] as any
let proSource_filterFirst = [] as any
const getProSrcListData = async (filter: boolean = false, level: number = 0) => {
    proSourceLoad.value = true
    let data = searchData;
    data.pageNum = proSource_pageNum
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductSrcListdata(data)];
    if (res.code == 0) {
        let arr = [] as any
        if (res.data.records.length > 0) {
            res.data.records.map((item: any, index: any) => {
                item.crowd_tgi = lueNum(item.crowd_tgi)
                item.customer_unit_price = lueNum(item.customer_unit_price)
                item.gmv = lueNum(item.gmv)
                item.paid_buyers = lueNum(item.paid_buyers)
                item.visitors_count = lueNum(item.visitors_count)
                if (item.tertiary_source) {
                    item.secondary_source = item.tertiary_source
                }

                item.payment_conversion_rate = lueNum(item.payment_conversion_rate * 100) + '%'
                if (level == 0) {
                    let obj = {
                        text: item.secondary_source,
                        value: item.secondary_source,
                        index: index
                    }
                    proSource_filter.push(obj)
                }
                arr.push(item)
            })
        } else {
            nomore_proSource.value = true
            scroll_proSource.value = true
        }
        if (res.data.sum !== null && res.data.sum !== undefined) {
            let sum = res.data.sum
            sum.crowd_tgi = lueNum(sum.crowd_tgi)
            sum.customer_unit_price = lueNum(sum.customer_unit_price)
            sum.gmv = lueNum(sum.gmv)
            sum.paid_buyers = lueNum(sum.paid_buyers)
            sum.visitors_count = lueNum(sum.visitors_count)
            sum.payment_conversion_rate = lueNum(sum.payment_conversion_rate * 100) + '%'
            proSourceData.sumData = [sum]
        }
        if (filter) {
            proSourceData.tableData = [...proSource_filterData, ...arr].filter(item => item !== undefined)
            refreshTable()
        } else {
            proSourceData.tableData = [...proSourceData.tableData, ...arr].filter(item => item !== undefined)
            proSource_filterFirst = [...proSourceData.tableData, ...arr].filter(item => item !== undefined)
        }
        proSourceLoad.value = false
        refreshTable()
        nextTick(() => {
            addScrollListener1();
        });
    }
}

const addScrollListener1 = () => {
    const table1 = tableListRef.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    const table2 = tableListRef_sum.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    tableListRef.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table2.scrollLeft = event.target.scrollLeft
    }
    tableListRef_sum.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table1.scrollLeft = event.target.scrollLeft
    }
};

const proSourceClick = async (newFilters: any) => {
    let counter = 1;
    const newObject = {} as any;

    Object.keys(newFilters).forEach(key => {
        newObject[`key${counter}`] = [...newFilters[key]];
        counter++;
    });
    searchData.secondary_source = proSource_filter_label = newObject.key1[0]
    const data = proSource_filterFirst.find(proSource_filterData => proSource_filterData.secondary_source === newObject.key1[0]);
    proSource_filterData = [{ ...data }]
    scroll_proSource.value = false
    getProSrcListData(true, 1)
}

const proSource_filter_R = () => {
    proSource_filter_label = "流量来源"
    proSource_pageNum = 1
    proSourceData.tableData = proSource_filterFirst
    refreshTable1()
}

const loadMore_proSource = async () => {
    proSource_pageNum++
    // searchData.keyword = ''
    debounce(getProSrcListData(), 1000)
}

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

function debounce1(fn: any, delay = 500) {
    let timeoutId = null;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
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
    color: #777777 !important;
}

#gmvDis,
#popDis {
    background: url("./images/_13.png") no-repeat;
    background-position: center;
    background-size: cover;
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

::v-deep(.el-input__inner) {
    color: #777777;
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