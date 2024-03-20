<!--
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-03-13 17:36:40
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-20 18:31:59
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\crowd.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="pageBG">
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
        <el-row :gutter="20">
            <el-col :span="10">
                <boxHead title="人群分布" />
                <el-table ref="tableListRef" :data="crowdsaData.tableData" border v-loading="crowdsaLoad"
                    class="palletGmv" show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px" v-el-table-infinite-scroll="loadMore_crowdsa"
                    :infinite-scroll-distance="100" :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                    :infinite-scroll-delay="2000" :lazy="load_crowdsa" :load="loadcrowdsa"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="keyword"
                    @row-click="rowClick">
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
                <div></div>
            </el-col>
            <el-col :span="10">
                <boxHead1 title="GMV趋势" />
                <div></div>
            </el-col>

            <el-col :span="10">
                <boxHead title="TOP10商品" />
                <el-table ref="tableListRef" :data="top10Data.tableData" border v-loading="top10Load" class="palletGmv"
                    show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px" v-el-table-infinite-scroll="loadMore_top10"
                    :infinite-scroll-distance="100" :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                    :infinite-scroll-delay="2000" :lazy="load_top10" :load="loadtop10"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="keyword"
                    @row-click="rowClick">
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
                <div></div>
            </el-col>
            <el-col :span="7">
                <boxHead1 title="GMV趋势" />
                <div></div>
            </el-col>

            <el-col :span="10" style="margin-top: 20px;">
                <boxHeadtb title="商品流量来源" />
                <el-table ref="tableListRef" :data="proSourceData.tableData" border v-loading="proSourceLoad"
                    class="palletGmv" show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px" v-el-table-infinite-scroll="loadMore_proSource"
                    :infinite-scroll-distance="100" :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                    :infinite-scroll-delay="2000" :lazy="load_proSource" :load="loadproSource"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="keyword"
                    @row-click="rowClick">
                    <el-table-column v-for="item, index in proSourceData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_proSource">
                        <div style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有更多了</span>
                        </div>
                    </template>
                </el-table>
            </el-col>
            <el-col :span="10" style="margin-top: 20px;">
                <boxHeadtb title="人群流量来源" />
                <el-table ref="tableListRef" :data="crowdSrcData.tableData" border v-loading="crowdSrcLoad" class="palletGmv"
                    show-overflow-tooltip element-loading-background="rgba(122, 122, 122, 0.8)"
                    style="width: 100%; height: 300px" v-el-table-infinite-scroll="loadMore_crowdSrc"
                    :infinite-scroll-distance="100" :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                    :infinite-scroll-delay="2000" :lazy="load_crowdSrc" :load="loadcrowdSrc"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" row-key="keyword"
                    @row-click="rowClick">
                    <el-table-column v-for="item, index in crowdSrcData.table_head" :key="index" :prop="item.dataKey"
                        show-overflow-tooltip :label="item.title" :width="item.width" :align="item.align"
                        :fixed="item.fixed">
                    </el-table-column>

                    <template #append v-if="nomore_crowdSrc">
                        <div style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                            <el-icon>
                                <MagicStick />
                            </el-icon> <span>没有更多了</span>
                        </div>
                    </template>
                </el-table>
            </el-col>
            <el-col :span="4" style="margin-top: 20px;">
                <boxHead1 title="人群分布" />
                <div></div>
            </el-col>
        </el-row>

    </div>
    <goHome />
</template>

<script setup lang="ts" name="crowd">
import { reactive, onMounted, ref } from "vue";
import page_header from "./components/page_header.vue";
import goHome from "./components/goHome.vue";
import boxHead from "./components/box_head.vue";
import boxHead1 from "./components/box_head1.vue";
import boxHeadtb from "./components/box_head_tb.vue";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js";
import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import {
    lineOptions,
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
const pageTitle = "人群分析";
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};
const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    "crowd_type": "小镇中老年",
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    start_date: "",
    end_date: "",
    "pageNum": 1,
    "pageSize": 30,
    shop_name: "蜡笔派家居旗舰店", //店铺名称
    "secondary_source": "",
    "tertiary_source": "",
    ids: [] as any,
});

onMounted(() => {
    getData()
})

const getData = async () => {
    await get20data();
    await getListData();
    await getTrendListData()
    await getSrcListData()
    await getPro10ListData()
    await getProListData()
    await getProTrendListData()
    await getProSrcListData()
}

// 人群流量来源Top20
const get20data = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdGmv20Listdata(data)];
    console.log(res, 'getCrowdGmv20Listdata')
    if (res.code == 0) {

    }

}

// 人群GMV数据列表
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
    tableData: [] as any
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
        crowdsaData.tableData = res.data.records.length > 0 ? res.data.records.map((item: any, index: any) => {
            item.crowd_tgi = lueNum(item.crowd_tgi)
            item.customer_unit_price = lueNum(item.customer_unit_price)
            item.gmv = lueNum(item.gmv)
            item.visitors_count = lueNum(item.visitors_count)

            item.payment_conversion_rate = lueNum(item.payment_conversion_rate * 100) + '%'
            item.add_car_rate = lueNum(item.add_car_rate * 100) + '%'
            return item
        }) : []
        crowdsaLoad.value = false
    }
}

// 人群GMV趋势数据列表
const getTrendListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdGmvTrenddata(data)];
    console.log(res, 'getCrowdGmvTrenddata')
    if (res.code == 0) {

    }

}

// 人群流量来源
const crowdSrcData = reactive({
    table_head: [
        {
            title: "流量来源",
            width: '',
            align: "left",
            dataKey: "secondary_source",
            key: "secondary_source",
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
            title: "渠道访问偏好TGI",
            width: '140',
            align: "center",
            dataKey: "crowd_tgi",
            key: "crowd_tgi",
            fixed: false,
            unit: "",
        },
    ],
    tableData: [] as any
})
let crowdSrc_pageNum = 1
const crowdSrc_pageSize = ref(20)
let nomore_crowdSrc = ref(false)
let crowdSrcLoad = ref(true)
let load_crowdSrc = ref(false)
const getSrcListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdSrcListdata(data)];
    console.log(res, 'getCrowdSrcListdata')
    if (res.code == 0) {
        res.data.records.length > 0 ? res.data.records.map((item: any, index: any) => {
            item.crowd_tgi = lueNum(item.crowd_tgi)
            item.customer_unit_price = lueNum(item.customer_unit_price)
            item.gmv = lueNum(item.gmv)
            item.paid_buyers = lueNum(item.paid_buyers)
            item.visitors_count = lueNum(item.visitors_count)

            item.payment_conversion_rate = lueNum(item.payment_conversion_rate * 100) + '%'
            item.hasChildren = ref(true)
            item.children = [] as any
            item.id = crowdSrcData.tableData.length++
            return item
        }) : []
        crowdSrcData.tableData = res.data.records
        crowdSrcLoad.value = false
    }

}

// 商品crowd分类10
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
let top10_pageNum = 1
const top10_pageSize = ref(20)
let nomore_top10 = ref(false)
let top10Load = ref(true)
let load_top10 = ref(false)
const getPro10ListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowd10Listdata(data)];
    console.log(res, 'getProductCrowd10Listdata')
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

// 某一商品按人群分类数据
const getProListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowdsListdata(data)];
    console.log(res, 'getProductCrowdsListdata')
    if (res.code == 0) {

    }

}

// 某一商品按人群分类趋势数据
const getProTrendListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowdsTrendListdata(data)];
    console.log(res, 'getProductCrowdsTrendListdata')
    if (res.code == 0) {

    }

}

// 商品流量来源
const proSourceData = reactive({
    table_head: [
        {
            title: "流量来源",
            width: '',
            align: "left",
            dataKey: "secondary_source",
            key: "secondary_source",
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
            title: "访客TGI",
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
let proSource_pageNum = 1
const proSource_pageSize = ref(20)
let nomore_proSource = ref(false)
let proSourceLoad = ref(true)
let load_proSource = ref(false)
const getProSrcListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductSrcListdata(data)];
    if (res.code == 0) {
        res.data.records.length > 0 ? res.data.records.map((item: any, index: any) => {
            item.crowd_tgi = lueNum(item.crowd_tgi)
            item.customer_unit_price = lueNum(item.customer_unit_price)
            item.gmv = lueNum(item.gmv)
            item.paid_buyers = lueNum(item.paid_buyers)
            item.visitors_count = lueNum(item.visitors_count)

            item.payment_conversion_rate = lueNum(item.payment_conversion_rate * 100) + '%'
            item.hasChildren = ref(true)
            item.children = [] as any
            item.id = proSourceData.tableData.length++
            return item
        }) : []
        proSourceData.tableData = res.data.records
        proSourceLoad.value = false
    }

}

const loadMore_crowdsa = async () => {
    crowdsa_pageNum++
    searchData.keyword = ''
    debounce(getListData(), 1000)
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