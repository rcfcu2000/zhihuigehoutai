<template>
    <div class="gola pageBG">
        <page_header :title="pageTitle" />
        <el-form :inline="true" :model="searchData" class="goal-from">
            <el-form-item label="请选择起止时间">
                <el-date-picker v-model="searchData.date" @change="getData" :clearable="false" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange" start-placeholder="开始时间"
                    end-placeholder="结束时间" />
            </el-form-item>
        </el-form>

        <el-row :gutter="20">
            <el-col :span="10">
                <div class="box">
                    <boxHead title="访客分布" />

                    <div class="roduct_num_box">
                        <ul class="roduct_num_box_ctn">
                            <li :title="lueNum(indexData.data.gmv)">
                                <span class="ctn_num"> {{ lueNum(indexData.data.gmv) }} </span>
                                <span class="ctn_name"> GMV </span>
                            </li>
                            <li :title="lueNum(indexData.data.gmv)">
                                <span class="ctn_num"> {{ lueNum(indexData.data.profit) }} </span>
                                <span class="ctn_name"> 净利润 </span>
                            </li>
                            <li :title="lueNum(indexData.data.gmv)">
                                <span class="ctn_num"> {{ lueNum(indexData.data.profit_rate * 100) }}% </span>
                                <span class="ctn_name"> 净利润率 </span>
                            </li>
                            <li :title="lueNum(indexData.data.gmv)">
                                <span class="ctn_num"> {{ lueNum(indexData.data.spend) }} </span>
                                <span class="ctn_name"> 推广花费 </span>
                            </li>
                            <li>
                                <span class="ctn_num"> {{ lueNum(indexData.data.promotion_percentage * 100) }}% </span>
                                <span class="ctn_name"> 推广占比 </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="boxHead1">
                    月累GMV达成率
                </div>
                <div class="monthGmv">
                    <div class="box2_center_top_left_center_left">
                        <div>
                            <p class="num">{{ lueNum(indexData.data.month_gmv) }}</p>
                            <p class="name">累计GMV</p>
                        </div>
                        <div>
                            <p class="num">{{ lueNum(indexData.data.target_gmv) }}</p>
                            <p class="name">GMV目标</p>
                        </div>
                    </div>

                    <div class="box2_center_top_left_center_right">
                        <div class="absu"></div>
                        <div class="wenzi">
                            <div class="num">
                                {{ persentNum(indexData.data.target_day_rate) }}%
                            </div>
                            <div class="percentage">
                                目标: {{ persentNum(indexData.data.target_gmv_rate) }}%({{
            persentNum(indexData.data.target_day_rate - indexData.data.target_gmv_rate) }}%)
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="boxHead1">
                    货盘GMV达成率
                </div>
                <div class="palletGmv">
                    <el-table :data="palletGmvData.tableData" border v-loading="palletGmvload" class="palletGmv"
                        element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 120px">
                        <el-table-column v-for="item, index in palletGmvData.table_head" :key="index"
                            :prop="item.dataKey" :label="item.title" :width="item.width" :align="item.align"
                            :fixed="item.fixed">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="box">
                    <boxHead title="GMV趋势" />
                    <div id="gmvTrend" class="body_center">

                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="box" style="position: relative;">
                    <boxHead title="责任人分析" />
                    <div class="gmvTrend" style="top:25px;left:8.5vw;position:absolute">
                        <el-button type="primary" :icon="RefreshLeft" size="small" :circle="true"
                            @click="manager_filter_R" />
                    </div>
                    <div class="managerA">
                        <el-table ref="tableListRefmanager" :data="managerData.tableData" border v-loading="managerLoad"
                            class="palletGmv" show-overflow-tooltip
                            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 400px"
                            v-el-table-infinite-scroll="loadMore_manager" :infinite-scroll-distance="100"
                            :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                            :infinite-scroll-delay="2000" @filter-change="managerRowClick">
                            <el-table-column show-overflow-tooltip :label="manager_filter_label" width="100"
                                align="left" key="manager" prop="manager" :filters="manager_filter"
                                :filter-multiple="false" filter-class-name="manager_filter">
                            </el-table-column>
                            <el-table-column v-for="item, index in managerData.table_head" :key="index"
                                show-overflow-tooltip :prop="item.dataKey" :label="item.title" :width="item.width"
                                :align="item.align" :fixed="item.fixed">
                            </el-table-column>
                            <template #append v-if="nomore_manager">
                                <div
                                    style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                                    <el-icon>
                                        <MagicStick />
                                    </el-icon> <span>没有更多了</span>
                                </div>
                            </template>
                        </el-table>
                        <el-table ref="tableListRefmanager_sum" :show-header="false" :data="managerData.sumData" border
                            :v-loading="managerLoad" class="palletGmv" show-overflow-tooltip
                            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 30px">
                            <el-table-column show-overflow-tooltip label="责任人" width="120" align="left" key="manager"
                                prop="manager">
                            </el-table-column>
                            <el-table-column v-for="item, index in managerData.table_head" :key="index"
                                :prop="item.dataKey" show-overflow-tooltip :label="item.title" :width="item.width"
                                :align="item.align" :fixed="item.fixed">
                            </el-table-column>

                            <template #append v-if="nomore_manager">
                                <div
                                    style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                                    <el-icon>
                                        <MagicStick />
                                    </el-icon> <span>没有合计</span>
                                </div>
                            </template>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="box" style="position: relative;">
                    <boxHead title="类目分析" />
                    <div class="gmvTrend" style="top:25px;left:8vw;position:absolute">
                        <el-button type="primary" :icon="RefreshLeft" size="small" :circle="true"
                            @click="category_filter_R" />
                    </div>
                    <div class="managerA">
                        <el-table ref="tableListRefcategory" :data="categoryData.tableData" border
                            v-loading="categoryLoad" class="palletGmv" show-overflow-tooltip
                            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 400px"
                            v-el-table-infinite-scroll="loadMore_category" :infinite-scroll-distance="100"
                            :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                            :infinite-scroll-delay="2000" @filter-change="categoryRowClick">
                            <el-table-column show-overflow-tooltip :label="category_filter_label" width="120"
                                align="left" key="category_lv3" prop="category_lv3" :filters="category_filter"
                                :filter-multiple="false" filter-class-name="category_filter">
                            </el-table-column>
                            <el-table-column v-for="item, index in categoryData.table_head" :key="index"
                                show-overflow-tooltip :prop="item.dataKey" :label="item.title" :width="item.width"
                                :align="item.align" :fixed="item.fixed">
                            </el-table-column>

                            <template #append v-if="nomore_category">
                                <div
                                    style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                                    <el-icon>
                                        <MagicStick />
                                    </el-icon> <span>没有更多了</span>
                                </div>
                            </template>
                        </el-table>
                        <el-table ref="tableListRefcategory_sum" :show-header="false" :data="categoryData.sumData"
                            border :v-loading="categoryLoad" class="palletGmv" show-overflow-tooltip
                            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 30px">
                            <el-table-column show-overflow-tooltip label="流量来源" width="120" align="left"
                                key="category_lv3" prop="category_lv3">
                            </el-table-column>
                            <el-table-column v-for="item, index in categoryData.table_head" :key="index"
                                :prop="item.dataKey" show-overflow-tooltip :label="item.title" :width="item.width"
                                :align="item.align" :fixed="item.fixed">
                            </el-table-column>

                            <template #append v-if="nomore_category">
                                <div
                                    style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                                    <el-icon>
                                        <MagicStick />
                                    </el-icon> <span>没有合计</span>
                                </div>
                            </template>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="box">
                    <boxHead title="货盘详情" />
                    <div class="managerA">
                        <el-table ref="tableListRefpallet" :data="palletData.tableData" border v-loading="palletLoad"
                            class="palletGmv" element-loading-background="rgba(122, 122, 122, 0.8)"
                            style="width: 100%; height: 200px" v-el-table-infinite-scroll="loadMore_pallet"
                            :infinite-scroll-distance="100" :infinite-scroll-disabled="false"
                            :infinite-scroll-immediate="false" :infinite-scroll-delay="2000" @cell-click="palletClick">
                            <el-table-column v-for="item, index in palletData.table_head" :key="index"
                                show-overflow-tooltip :prop="item.dataKey" :label="item.title" :width="item.width"
                                :align="item.align" :fixed="item.fixed">
                            </el-table-column>

                            <template #append v-if="nomore_pallet">
                                <div
                                    style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                                    <el-icon>
                                        <MagicStick />
                                    </el-icon> <span>没有更多了</span>
                                </div>
                            </template>
                        </el-table>
                        <el-table ref="tableListRefpallet_sum" :show-header="false" :data="palletData.sumData"
                            border :v-loading="palletLoad" class="palletGmv" show-overflow-tooltip
                            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 30px">
                            <el-table-column v-for="item, index in palletData.table_head" :key="index"
                                :prop="item.dataKey" show-overflow-tooltip :label="item.title" :width="item.width"
                                :align="item.align" :fixed="item.fixed">
                            </el-table-column>

                            <template #append v-if="nomore_pallet">
                                <div
                                    style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                                    <el-icon>
                                        <MagicStick />
                                    </el-icon> <span>没有合计</span>
                                </div>
                            </template>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="box">
                    <boxHead title="商品详情" />
                    <div class="managerA">
                        <el-table ref="tableListRefproduct" :data="productData.tableData" border v-loading="productLoad"
                            class="palletGmv" element-loading-background="rgba(122, 122, 122, 0.8)"
                            style="width: 100%; height: 250px" v-el-table-infinite-scroll="loadMore_product"
                            :infinite-scroll-distance="100" :infinite-scroll-disabled="false"
                            :infinite-scroll-immediate="false" :infinite-scroll-delay="2000">
                            <el-table-column v-for="item, index in productData.table_head" :key="index"
                                show-overflow-tooltip :prop="item.dataKey" :label="item.title" :width="item.width"
                                :align="item.align" :fixed="item.fixed">

                                <template #default="scope">
                                    <div v-if="scope.column.property == 'product_name'" :title="scope.row.product_name"
                                        class="text_hidden">
                                        {{ scope.row.product_name }}
                                    </div>
                                </template>
                            </el-table-column>

                            <template #append v-if="nomore_product">
                                <div
                                    style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                                    <el-icon>
                                        <MagicStick />
                                    </el-icon> <span>没有更多了</span>
                                </div>
                            </template>
                        </el-table>
                        <el-table ref="tableListRefproduct_sum" :show-header="false" :data="productData.sumData" border
                            :v-loading="productLoad" class="palletGmv" show-overflow-tooltip
                            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 30px">
                            <el-table-column v-for="item, index in productData.table_head" :key="index"
                                :prop="item.dataKey" show-overflow-tooltip :label="item.title" :width="item.width"
                                :align="item.align" :fixed="item.fixed">
                            </el-table-column>

                            <template #append v-if="nomore_product">
                                <div
                                    style="height: 40px;width: 100%;display: flex;align-items: center;justify-content: center;">
                                    <el-icon>
                                        <MagicStick />
                                    </el-icon> <span>没有合计</span>
                                </div>
                            </template>
                        </el-table>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
    <goHome />
</template>

<script setup lang="ts" name="goal">
import { RefreshLeft, } from '@element-plus/icons-vue'
import { reactive, onMounted, ref, nextTick } from "vue";
import goHome from "./components/goHome.vue";
import page_header from "./components/page_header.vue";
import boxHead from "./components/box_head.vue";
import {
    lineOptions,
} from "./echartsOptions";
import {
    GetGmvTargetdata,
    GetGmvTrenddata,
    getCategoryAlysisdata,
    getIndexdata_target,
    getManagerAlysisdata,
    getPalletListdata,
    getProductListdata,
} from "@/api/AIdata";
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js";
import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复

const pageTitle = "目标达成";

// 指数信息
const indexData = reactive({
    data: {} as any
})
const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    loading: false,
    date: ["2024-01-01", "2024-01-25"],
    product_manager: [] as any,
    current_inventory: [] as any,
    lv3: "",
    product_id: "",
    start_date: "",
    end_date: "",
    shop_name: "蜡笔派家居旗舰店", //店铺名称
});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};

const getData = async () => {
    await getManager()
    await getCategory()
    palletData.tableData = []
    await getPallet()
    await getProduct()
};

const remoteMethod = async () => { };

onMounted(async () => {
    await getData()
    await getIndexData();
    await getGmvTarget();
    await getGmvTrend();
});

// 指数信息
const getIndexData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getIndexdata_target(data)];
    if (res.code == 0) {
        indexData.data = res.data ? res.data : {}
    }
}

// 货盘GMV达成率
const palletGmvData = reactive({
    table_head: [
        {
            title: "",
            width: '',
            align: "center",
            dataKey: "name",
            key: "name",
            fixed: true,
            unit: "",
        },
        {
            title: "S",
            width: '',
            align: "center",
            dataKey: "S",
            key: "S",
            unit: "",
        },
        {
            title: "A",
            width: '',
            align: "center",
            dataKey: "A",
            key: "A",
            unit: "",
        },
        {
            title: "B",
            width: '',
            align: "center",
            dataKey: "B",
            key: "B",
            unit: "",
        },
        {
            title: "C",
            width: '',
            align: "center",
            dataKey: "C",
            key: "C",
            unit: "",
        },
        {
            title: "D",
            width: '',
            align: "center",
            dataKey: "D",
            key: "D",
            unit: "",
        },
    ],
    tableData: [],
});
const palletGmvload = ref(true);
const getGmvTarget = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await GetGmvTargetdata(data)];
    if (res.code == 0) {
        let arr = [
            { name: "累计GMV" },
            { name: "GMV目标" },
            { name: "GMV达成率" },
        ] as any;
        res.data.records?.map((item: any, index: any) => {
            if (item.pallet == "S") {
                arr[0].S = lueNum(item.month_gmv);
                arr[1].S = lueNum(item.target_gmv);
                arr[2].S = persentNum(item.target_gmv_rate) + "%";
            }
            if (item.pallet == "A") {
                arr[0].A = lueNum(item.month_gmv);
                arr[1].A = lueNum(item.target_gmv);
                arr[2].A = persentNum(item.target_gmv_rate) + "%";
            }
            if (item.pallet == "B") {
                arr[0].B = lueNum(item.month_gmv);
                arr[1].B = lueNum(item.target_gmv);
                arr[2].B = persentNum(item.target_gmv_rate) + "%";
            }
            if (item.pallet == "C") {
                arr[0].C = lueNum(item.month_gmv);
                arr[1].C = lueNum(item.target_gmv);
                arr[2].C = persentNum(item.target_gmv_rate) + "%";
            }
            if (item.pallet == "D") {
                arr[0].D = lueNum(item.month_gmv);
                arr[1].D = lueNum(item.target_gmv);
                arr[2].D = persentNum(item.target_gmv_rate) + "%";
            }
        });
        palletGmvData.tableData = arr;
        palletGmvload.value = false;
    }
};

// gmv趋势
const getGmvTrend = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await GetGmvTrenddata(data)];

    if (res.code == 0) {
        let arr2 = [
            {
                name: "GMV",
                data: [] as any,
            },
            {
                name: "推广GMV",
                data: [] as any,
            },
            {
                name: "推广花费",
                data: [] as any,
            },
        ];
        let timeX = [] as any
        res.data.records?.map((item: any, index: any) => {
            arr2[0].data.push(floatNum(item.gmv))
            arr2[1].data.push(floatNum(item.promotion_gmv))
            arr2[2].data.push(floatNum(item.spend))
            timeX.push(item.date)
        })

        const chartDom1 = document.getElementById("gmvTrend") as HTMLElement;
        const myChart1 = echarts.init(chartDom1);
        const option1 = lineOptions(arr2, timeX, false, '');
        option1 && myChart1.setOption(option1);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        EleResize.on(chartDom1, listener1);
    }

}

//刷新table
const tableListRefmanager = ref()
const tableListRefmanager_sum = ref()
const refreshTable = () => {
    let table = tableListRefmanager.value;
    let tables = tableListRefmanager_sum.value;
    //强制刷新组件
    table.doLayout()
    tables.doLayout()
}
const tableListRefcategory = ref()
const tableListRefcategory_sum = ref()
const refreshTable1 = () => {
    let table = tableListRefcategory.value;
    let tables = tableListRefcategory_sum.value;
    //强制刷新组件
    table.doLayout()
    tables.doLayout()
}
// 责任人分析
const managerData = reactive({
    table_head: [
        // {
        //     title: "负责人",
        //     width: '',
        //     align: "center",
        //     dataKey: "manager",
        //     key: "manager",
        //     fixed: true,
        //     unit: "",
        // },
        {
            title: "GMV",
            width: '100',
            align: "center",
            dataKey: "gmv",
            key: "gmv",
            fixed: false,
            unit: "",
        },
        {
            title: "时间进度",
            width: '',
            align: "center",
            dataKey: "target_day_rate",
            key: "target_day_rate",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV达成率",
            width: '120',
            align: "center",
            dataKey: "target_gmv_rate",
            key: "target_gmv_rate",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV目标",
            width: '100',
            align: "center",
            dataKey: "target_gmv",
            key: "target_gmv",
            fixed: false,
            unit: "",
        },
        {
            title: "经营利润",
            width: '',
            align: "center",
            dataKey: "profit",
            key: "profit",
            fixed: false,
            unit: "",
        },
        {
            title: "利润目标",
            width: '',
            align: "center",
            dataKey: "profit_rate",
            key: "profit_rate",
            fixed: false,
            unit: "",
        },
        {
            title: "利润达成率",
            width: '',
            align: "center",
            dataKey: "profit_target_rate",
            key: "profit_target_rate",
            fixed: false,
            unit: "",
        },
    ] as any,
    tableData: [] as any,
    sumData: [] as any,
})
let manager_filter_label = "负责人"
let manager_pageNum = 1
const manager_pageSize = ref(20)
let nomore_manager = ref(false)
let scroll_manager = ref(false)
let managerLoad = ref(true)
let manager_filter = [] as any
let manager_filterData = [] as any
let manager_filterFirst = [] as any
const getManager = async (filter: boolean = false, level: number = 0) => {
    managerLoad.value = true
    let data = searchData as any;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = manager_pageNum
    data.pageSize = manager_pageSize.value
    const [res] = [await getManagerAlysisdata(data)];
    if (res.code == 0) {
        let arr = [] as any
        if (res.data.records.length > 0) {
            res.data.records.map((item: any, index: any) => {
                item.gmv = lueNum(item.gmv)
                item.target_day_rate = lueNum(item.target_day_rate * 100) + '%'
                item.target_gmv = lueNum(item.target_gmv)
                item.target_gmv_rate = lueNum(item.target_gmv_rate * 100) + '%'
                item.profit = lueNum(item.profit)
                item.profit_rate = lueNum(item.profit_rate * 100) + '%'
                item.profit_target_rate = lueNum(item.profit_target_rate * 100) + '%'
                if (level == 0) {
                    let obj = {
                        text: item.manager,
                        value: item.manager,
                        index: index
                    }
                    manager_filter.push(obj)
                }
                arr.push(item)
            })
        } else {
            nomore_manager.value = true
            scroll_manager.value = true
        }
        if (res.data.sum !== null && res.data.sum !== undefined) {
            let sum = res.data.sum
            sum.manager = '合计'
            sum.crowd_tgi = lueNum(sum.crowd_tgi)
            sum.customer_unit_price = lueNum(sum.customer_unit_price)
            sum.gmv = lueNum(sum.gmv)
            sum.paid_buyers = lueNum(sum.paid_buyers)
            sum.visitors_count = lueNum(sum.visitors_count)
            sum.payment_conversion_rate = lueNum(sum.payment_conversion_rate * 100) + '%'
            managerData.sumData = [sum]
        }
        if (filter) {
            managerData.tableData = [...manager_filterData, ...arr].filter(item => item !== undefined)
        } else {
            managerData.tableData = [...managerData.tableData, ...arr].filter(item => item !== undefined)
            manager_filterFirst = [...managerData.tableData, ...arr].filter(item => item !== undefined)
        }
        managerLoad.value = false
        refreshTable()
        nextTick(() => {
            addScrollListener();
        });
    }
}
// 添加滚动监听函数
const addScrollListener = () => {
    const table1 = tableListRefmanager.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    const table2 = tableListRefmanager_sum.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    tableListRefmanager.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table2.scrollLeft = event.target.scrollLeft
    }
    tableListRefmanager_sum.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table1.scrollLeft = event.target.scrollLeft
    }
};
// 滚动加载更多
const loadMore_manager = async () => {
    manager_pageNum++
    managerLoad.value = true
    debounce(getManager(), 300)
}
// 筛选点击
const managerRowClick = async (newFilters: any) => {
    let counter = 1;
    const newObject = {} as any;

    Object.keys(newFilters).forEach(key => {
        newObject[`key${counter}`] = [...newFilters[key]];
        counter++;
    });
    searchData.product_manager = manager_filter_label = newObject.key1
    const data = manager_filterFirst.find(manager_filterData => manager_filterData.secondary_source === newObject.key1[0]);
    manager_filterData = [{ ...data }]
    scroll_manager.value = false
    getManager(true, 1)
}
// 重置筛选
const manager_filter_R = () => {
    manager_filter_label = "流量来源"
    manager_pageNum = 1
    managerData.tableData = manager_filterFirst
    refreshTable()
}

// 类目分析
const categoryData = reactive({
    table_head: [
        // {
        //     title: "类目名称",
        //     width: '',
        //     align: "center",
        //     dataKey: "category_lv3",
        //     key: "category_lv3",
        //     fixed: true,
        //     unit: "",
        // },
        {
            title: "GMV",
            width: '100',
            align: "center",
            dataKey: "gmv",
            key: "gmv",
            fixed: false,
            unit: "",
        },
        {
            title: "时间进度",
            width: '',
            align: "center",
            dataKey: "target_day_rate",
            key: "target_day_rate",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV达成率",
            width: '100',
            align: "center",
            dataKey: "target_gmv_rate",
            key: "target_gmv_rate",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV目标",
            width: '100',
            align: "center",
            dataKey: "target_gmv",
            key: "target_gmv",
            fixed: false,
            unit: "",
        },
        {
            title: "商品简称",
            width: '',
            align: "center",
            dataKey: "product_name",
            key: "product_name",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as any,
    sumData: [] as any
})
let category_filter_label = "类目名称"
let category_pageNum = 1
const category_pageSize = ref(20)
let nomore_category = ref(false)
let scroll_category = ref(false)
let categoryLoad = ref(true)
let category_filter = [] as any
let category_filterData = [] as any
let category_filterFirst = [] as any
const getCategory = async (filter: boolean = false, level: number = 0) => {
    categoryLoad.value = true
    let data = searchData as any;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = category_pageNum
    data.pageSize = category_pageSize.value
    const [res] = [await getCategoryAlysisdata(data)];
    if (res.code == 0) {
        let arr = [] as any
        if (res.data.records.length > 0) {
            res.data.records.map((item: any, index: any) => {
                item.gmv = lueNum(item.gmv)
                item.target_day_rate = lueNum(item.target_day_rate * 100) + '%'
                item.target_gmv = lueNum(item.target_gmv)
                item.target_gmv_rate = lueNum(item.target_gmv_rate * 100) + '%'

                if (level == 0) {
                    let obj = {
                        text: item.category_lv3,
                        value: item.category_lv3,
                        index: index
                    }
                    category_filter.push(obj)
                }
                arr.push(item)
            })

        } else {
            nomore_category.value = true
            scroll_category.value = true
        }
        if (res.data.sum !== null && res.data.sum !== undefined) {
            let sum = res.data.sum
            sum.category_lv3 = '合计'
            sum.crowd_tgi = lueNum(sum.crowd_tgi)
            sum.customer_unit_price = lueNum(sum.customer_unit_price)
            sum.gmv = lueNum(sum.gmv)
            sum.paid_buyers = lueNum(sum.paid_buyers)
            sum.visitors_count = lueNum(sum.visitors_count)
            sum.payment_conversion_rate = lueNum(sum.payment_conversion_rate * 100) + '%'
            categoryData.sumData = [sum]
        }
        if (filter) {
            categoryData.tableData = [...category_filterData, ...arr].filter(item => item !== undefined)
        } else {
            categoryData.tableData = [...categoryData.tableData, ...arr].filter(item => item !== undefined)
            category_filterFirst = [...categoryData.tableData, ...arr].filter(item => item !== undefined)
        }
        categoryLoad.value = false
        refreshTable1()
        nextTick(() => {
            addScrollListener1();
        });
    }
}
// 添加滚动监听函数
const addScrollListener1 = () => {
    const table1 = tableListRefcategory.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    const table2 = tableListRefcategory_sum.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    tableListRefcategory.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table2.scrollLeft = event.target.scrollLeft
    }
    tableListRefcategory_sum.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table1.scrollLeft = event.target.scrollLeft
    }
};
const loadMore_category = async () => {
    category_pageNum++
    categoryLoad.value = true
    debounce(getCategory(), 300)
}
// 筛选点击
const categoryRowClick = async (newFilters: any) => {
    let counter = 1;
    const newObject = {} as any;

    Object.keys(newFilters).forEach(key => {
        newObject[`key${counter}`] = [...newFilters[key]];
        counter++;
    });
    searchData.lv3 = category_filter_label = newObject.key1[0]
    const data = category_filterFirst.find(category_filterData => category_filterData.secondary_source === newObject.key1[0]);
    category_filterData = [{ ...data }]
    scroll_category.value = false
    getCategory(true, 1)
}
// 重置筛选
const category_filter_R = () => {
    category_filter_label = "流量来源"
    category_pageNum = 1
    categoryData.tableData = category_filterFirst
    refreshTable()
}

// 货盘详情
const palletData = reactive({
    table_head: [
        {
            title: "本月货盘",
            width: '',
            align: "center",
            dataKey: "pallet",
            key: "pallet",
            fixed: true,
            unit: "",
        },
        {
            title: "累计GMV",
            width: '',
            align: "center",
            dataKey: "month_gmv",
            key: "month_gmv",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV目标",
            width: '',
            align: "center",
            dataKey: "target_gmv",
            key: "target_gmv",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV达成率",
            width: '',
            align: "center",
            dataKey: "target_gmv_rate",
            key: "target_gmv_rate",
            fixed: false,
            unit: "",
        },
        {
            title: "推广花费",
            width: '',
            align: "center",
            dataKey: "spend",
            key: "spend",
            fixed: false,
            unit: "",
        },
        {
            title: "推广预算",
            width: '',
            align: "center",
            dataKey: "monthly_budget",
            key: "monthly_budget",
            fixed: false,
            unit: "",
        },
        {
            title: "推广占比",
            width: '',
            align: "center",
            dataKey: "promotion_percentage",
            key: "promotion_percentage",
            fixed: false,
            unit: "",
        },
        {
            title: "推广目标占比",
            width: '',
            align: "center",
            dataKey: "promotion_target_percentage",
            key: "promotion_target_percentage",
            fixed: false,
            unit: "",
        },
        {
            title: "推广差异",
            width: '',
            align: "center",
            dataKey: "promotion_diff",
            key: "promotion_diff",
            fixed: false,
            unit: "",
        },
        {
            title: "时间进度",
            width: '',
            align: "center",
            dataKey: "time_schedule",
            key: "time_schedule",
            fixed: false,
            unit: "",
        },
        {
            title: "综合ROI",
            width: '',
            align: "center",
            dataKey: "composite_roi",
            key: "composite_roi",
            fixed: false,
            unit: "",
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
            title: "净利润",
            width: '',
            align: "center",
            dataKey: "profit",
            key: "profit",
            fixed: false,
            unit: "",
        },
        {
            title: "支付人数",
            width: '',
            align: "center",
            dataKey: "paid_buyers",
            key: "paid_buyers",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as any,
    sumData: [] as any,
})
let pallet_pageNum = 1
const pallet_pageSize = ref(20)
let nomore_pallet = ref(false)
let palletLoad = ref(true)
const getPallet = async () => {
    palletLoad.value = true
    let data = searchData as any;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = pallet_pageNum
    data.pageSize = pallet_pageSize.value
    const [res] = [await getPalletListdata(data)];
    if (res.code == 0) {
        const resd = res.data.records ? res.data.records.map((item: any, index: any) => {
            item.month_gmv = lueNum(item.month_gmv)
            item.target_gmv = lueNum(item.target_gmv)
            item.monthly_budget = lueNum(item.monthly_budget)
            item.spend = lueNum(item.spend)
            item.customer_unit_price = lueNum(item.customer_unit_price)
            item.profit = lueNum(item.profit)
            item.time_schedule = lueNum(item.time_schedule * 100) + "%"
            item.target_gmv_rate = lueNum(item.target_gmv_rate * 100) + '%'
            item.target_day_rate = lueNum(item.target_day_rate * 100) + '%'
            item.promotion_percentage = lueNum(item.promotion_percentage * 100) + "%"
            item.promotion_target_percentage = lueNum(item.promotion_target_percentage * 100) + "%"
            return item
        }) : []
        if (res.data.sum !== null && res.data.sum !== undefined) {
            let sum = res.data.sum
            sum.pallet = '合计'
            sum.month_gmv = lueNum(sum.month_gmv)
            sum.target_gmv = lueNum(sum.target_gmv)
            sum.monthly_budget = lueNum(sum.monthly_budget)
            sum.spend = lueNum(sum.spend)
            sum.customer_unit_price = lueNum(sum.customer_unit_price)
            sum.profit = lueNum(sum.profit)
            sum.time_schedule = lueNum(sum.time_schedule * 100) + "%"
            sum.target_gmv_rate = lueNum(sum.target_gmv_rate * 100) + '%'
            sum.target_day_rate = lueNum(sum.target_day_rate * 100) + '%'
            sum.promotion_percentage = lueNum(sum.promotion_percentage * 100) + "%"
            sum.promotion_target_percentage = lueNum(sum.promotion_target_percentage * 100) + "%"
            palletData.sumData = [sum]
        }
        nomore_pallet.value = (resd.length > 0) ? false : true
        palletData.tableData = palletData.tableData.concat(resd)
        palletLoad.value = false
    }
}
const loadMore_pallet = async () => {
    pallet_pageNum++
    palletLoad.value = true
    debounce(getPallet(), 300)
}
// 单元格点击
const palletClick = async (row: any, column: any, cell: HTMLTableCellElement, event: Event) => {
    productData.tableData = [] as any
    searchData.current_inventory = [row.pallet]
    await getProduct()
}

//刷新table
const tableListRefproduct = ref()
const tableListRefproduct_sum = ref()
const refreshTable2 = () => {
    let table = tableListRefproduct.value;
    let tables = tableListRefproduct_sum.value;
    //强制刷新组件
    table.doLayout()
    tables.doLayout()
}
// 商品详情
const productData = reactive({
    table_head: [
        {
            title: "商品ID",
            width: '120',
            align: "center",
            dataKey: "product_id",
            key: "product_id",
            fixed: true,
            unit: "",
        },
        {
            title: "商品简称",
            width: '',
            align: "center",
            dataKey: "product_name",
            key: "product_name",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV",
            width: '',
            align: "center",
            dataKey: "gmv",
            key: "gmv",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV目标",
            width: '',
            align: "center",
            dataKey: "target_gmv",
            key: "target_gmv",
            fixed: false,
            unit: "",
        },
        {
            title: "GMV达成率",
            width: '',
            align: "center",
            dataKey: "target_gmv_rate",
            key: "target_gmv_rate",
            fixed: false,
            unit: "",
        },
        {
            title: "推广花费",
            width: '',
            align: "center",
            dataKey: "spend",
            key: "spend",
            fixed: false,
            unit: "",
        },
        {
            title: "推广预算",
            width: '',
            align: "center",
            dataKey: "monthly_budget",
            key: "monthly_budget",
            fixed: false,
            unit: "",
        },
        {
            title: "推广占比",
            width: '',
            align: "center",
            dataKey: "promotion_percentage",
            key: "promotion_percentage",
            fixed: false,
            unit: "",
        },
        {
            title: "推广目标占比",
            width: '120',
            align: "center",
            dataKey: "promotion_target_percentage",
            key: "promotion_target_percentage",
            fixed: false,
            unit: "",
        },
        {
            title: "推广差异",
            width: '',
            align: "center",
            dataKey: "promotion_diff",
            key: "promotion_diff",
            fixed: false,
            unit: "",
        },
        {
            title: "时间进度",
            width: '',
            align: "center",
            dataKey: "target_day_rate",
            key: "target_day_rate",
            fixed: false,
            unit: "",
        },
        {
            title: "综合ROI",
            width: '',
            align: "center",
            dataKey: "composite_roi",
            key: "composite_roi",
            fixed: false,
            unit: "",
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
            title: "净利润",
            width: '',
            align: "center",
            dataKey: "profit",
            key: "profit",
            fixed: false,
            unit: "",
        },
        {
            title: "支付人数",
            width: '',
            align: "center",
            dataKey: "paid_buyers",
            key: "paid_buyers",
            fixed: false,
            unit: "",
        },
        {
            title: "类目名称",
            width: '',
            align: "center",
            dataKey: "category_lv3",
            key: "category_lv3",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as any,
    sumData: [] as any,
})
let product_pageNum = 1
const product_pageSize = ref(20)
let nomore_product = ref(false)
let productLoad = ref(true)
let load_product = ref(false)
const getProduct = async () => {
    productLoad.value = true
    let data = searchData as any;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = product_pageNum
    data.pageSize = product_pageSize.value
    const [res] = [await getProductListdata(data)];
    if (res.code == 0) {
        const resd = res.data.records ? res.data.records.map((item: any, index: any) => {
            item.month_gmv = lueNum(item.month_gmv)
            item.target_gmv = lueNum(item.target_gmv)
            item.monthly_budget = lueNum(item.monthly_budget)
            item.spend = lueNum(item.spend)
            item.customer_unit_price = lueNum(item.customer_unit_price)
            item.profit = lueNum(item.profit)
            item.time_schedule = lueNum(item.time_schedule * 100) + "%"
            item.target_gmv_rate = lueNum(item.target_gmv_rate * 100) + '%'
            item.target_day_rate = lueNum(item.target_day_rate * 100) + '%'
            item.promotion_percentage = lueNum(item.promotion_percentage * 100) + "%"
            item.promotion_target_percentage = lueNum(item.promotion_target_percentage * 100) + "%"
            return item
        }) : []

        if (res.data.sum !== null && res.data.sum !== undefined) {
            let sum = res.data.sum
            sum.product_id = '合计'
            sum.month_gmv = lueNum(sum.month_gmv)
            sum.target_gmv = lueNum(sum.target_gmv)
            sum.monthly_budget = lueNum(sum.monthly_budget)
            sum.spend = lueNum(sum.spend)
            sum.customer_unit_price = lueNum(sum.customer_unit_price)
            sum.profit = lueNum(sum.profit)
            sum.time_schedule = lueNum(sum.time_schedule * 100) + "%"
            sum.target_gmv_rate = lueNum(sum.target_gmv_rate * 100) + '%'
            sum.target_day_rate = lueNum(sum.target_day_rate * 100) + '%'
            sum.promotion_percentage = lueNum(sum.promotion_percentage * 100) + "%"
            sum.promotion_target_percentage = lueNum(sum.promotion_target_percentage * 100) + "%"
            productData.sumData = [sum]
        }
        nomore_product.value = (resd.length > 0) ? false : true
        productData.tableData = productData.tableData.concat(resd)
        productLoad.value = false
        refreshTable2()
        nextTick(() => {
            addScrollListener2();
        });
    }
}
const loadMore_product = async () => {
    product_pageNum++
    productLoad.value = true
    debounce(getProduct(), 300)
}
// 添加滚动监听函数
const addScrollListener2 = () => {
    const table1 = tableListRefproduct.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    const table2 = tableListRefproduct_sum.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    tableListRefproduct.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table2.scrollLeft = event.target.scrollLeft
    }
    tableListRefproduct_sum.value.scrollBarRef.wrapRef.onscroll = (event: any) => {
        table1.scrollLeft = event.target.scrollLeft
    }
};


// 节流
const debounce = async (func: any, delay: any) => {
    let inThrottle = true;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, delay);
        }
    };
}

// 
</script>

<style lang="scss" scoped>
$echarts_bg_img: url("./images/_2.png");

.monthGmv {
    display: flex;
    justify-content: space-between;
    height: 120px;
}

.boxHead1 {
    background-repeat: no-repeat;
    background-image: $box_head_bg_img1;
    background-position-y: 50%;
    font-size: 24px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 0 0 1.5vw;
}

.box2_center_top_left_center_left {
    flex: 0.3;
    vertical-align: top;
    letter-spacing: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .num {
        font-size: 24px;
        font-weight: 400;

        color: rgba(1, 217, 255, 1);
        text-align: left;
    }

    .name {
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 87, 51, 1);
        text-align: left;
        vertical-align: top;
    }
}

.box2_center_top_left_center_right {
    flex: 0.6;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .absu {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: url("./images/nnnn.png");
        background-size: 100% 100%;
    }

    .wenzi {
        position: relative;
        z-index: 1;

        .num {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: 0px;
            color: rgba(255, 0, 0, 1);
        }

        .percentage {
            font-size: 18px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }
    }
}

.body_center {
    background-image: $echarts_bg_img;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 400px;
}

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

.gola {
    overflow-y: auto;
    overflow-x: hidden;
}

.echarts_title {
    margin: 10px 0 16px 0;
    width: 340px;
    height: 32px;
    padding-left: 50px;
    background-image: url("./images/11.png");
    background-size: 100% 100%;
    font-size: 24px;
}

.roduct_num_box {
    height: 120px;
    background-image: url("./images/image-3.png");
    background-size: 100% 100%;
    padding: 10px;
    display: flex;
    align-items: center;

    .roduct_num_box_ctn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;

        li {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .ctn_num {
                font-size: 18px;
                line-height: 50px;

                color: rgba(1, 217, 255, 1);
            }
        }
    }
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
    border: none;
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