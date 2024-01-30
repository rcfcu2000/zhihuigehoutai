<template>
    <div class="main">
        <el-affix :offset="0" @scroll="affixChange">
            <div class="header">
                <span class="titl1_h1">推广分析</span>
                <div class="search">
                    <div class="search_left">
                        <div class="search_line">
                            负责人
                            <el-select v-model="searchData.product_manager" class="select_width" placeholder="请选择"
                                @change="getData2" size="small" multiple>
                                <el-option v-for="item in state.responsibleList" :key="item.responsible"
                                    :label="item.responsible" :value="item.responsible" />
                            </el-select>
                        </div>
                        <div class="search_line">
                            本月货盘
                            <el-select v-model="searchData.current_inventory" clearable multiple @change="getData2"
                                class="select_width" placeholder="请选择" size="small">
                                <el-option v-for="item in state.monthPallet" :key="item.current_inventory"
                                    :label="item.current_inventory" :value="item.current_inventory" />
                            </el-select>
                        </div>
                        <div class="search_line">
                            货盘变化
                            <el-select v-model="searchData.scene_category" clearable multiple @change="getData2"
                                class="select_width" placeholder="请选择" size="small">
                                <el-option v-for="(item, index) in cities" :key="item.value" :label="item.value"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>
                    <div class="search_right">
                        <div class="search_line">
                            请选择起止时间
                            <el-date-picker @change="getData2()" :clearable="false" v-model="searchData.date" size="small"
                                format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange"
                                start-placeholder="开始时间" end-placeholder="结束时间" />
                        </div>
                    </div>
                </div>
            </div>
        </el-affix>

        <div class="title">
            重点指标
        </div>
        <div class="roduct">
            <div class="roduct_left">
                <div class="roduct_num_box">
                    <ul class="roduct_num_box_ctn">
                        <li :title="parseFloat((state.titleData.promotion_cost).toFixed(2))">
                            <span class="ctn_num">
                                {{ lueNum(state.titleData.promotion_cost) }}
                            </span>
                            <span class="ctn_name">
                                推广花费
                            </span>
                        </li>
                        <li :title="parseFloat((state.titleData.promotion_gmv).toFixed(2))">
                            <span class="ctn_num">
                                {{ lueNum(state.titleData.promotion_gmv) }}
                            </span>
                            <span class="ctn_name">
                                推广GMV
                            </span>
                        </li>
                        <li :title="parseFloat((state.titleData.overall_gmv).toFixed(2))">
                            <span class="ctn_num">
                                {{ lueNum(state.titleData.overall_gmv) }}
                            </span>
                            <span class="ctn_name">
                                店铺GMV
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.cost_percentage * 100).toFixed(2)) }}%
                            </span>
                            <span class="ctn_name">
                                花费占比
                            </span>
                        </li>
                        <li :title="parseFloat((state.titleData.promotion_gmv_percentage * 100).toFixed(2))">
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.promotion_gmv_percentage * 100).toFixed(2)) }}%
                            </span>
                            <span class="ctn_name">
                                推广GMV占比
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="roduct_num_box">
                    <ul class="roduct_num_box_ctn">
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.promotion_add_to_cart_rate * 100).toFixed(2)) }}%
                            </span>
                            <span class="ctn_name">
                                推广加购率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.overall_add_to_cart_rate * 100).toFixed(2)) }}%
                            </span>
                            <span class="ctn_name">
                                全店加购率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.promotion_conversion_rate * 100).toFixed(2)) }}%
                            </span>
                            <span class="ctn_name">
                                推广转化率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.overall_conversion_rate * 100).toFixed(2)) }}%
                            </span>
                            <span class="ctn_name">
                                全店转化率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.promotion_gmv_percentage).toFixed(2)) }}
                            </span>
                            <span class="ctn_name">
                                推广ROI
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="roduct_right">
                <div class="roduct_right_list" v-for="(ikun, index) in state.extendList" :key="index">
                    <div class="roduct_right_title"> {{ ikun.scene_category }}</div>
                    <ul class="roduct_right_ctn">
                        <li class="roduct_right_ctn_data" :title="parseFloat(ikun.spend.toFixed(2))">
                            <span class="ctn_num"> {{ lueNum(ikun.spend) }} </span>
                            <span class="ctn_tit">花费</span>
                        </li>
                        <li class="roduct_right_ctn_data" :title="parseFloat(ikun.transaction_cost.toFixed(2))">
                            <span class="ctn_num">{{ lueNum(ikun.transaction_cost) }}</span>
                            <span class="ctn_tit">成交成本</span>
                        </li>
                        <li class="roduct_right_ctn_data" :title="parseFloat(ikun.gmv.toFixed(2))">
                            <span class="ctn_num">{{ lueNum(ikun.gmv) }}</span>
                            <span class="ctn_tit">GMV</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num">{{ parseFloat((ikun.channel_percentage * 100).toFixed(2)) }}%</span>
                            <span class="ctn_tit">渠道占比</span>
                        </li>
                        <li class="roduct_right_ctn_data" :title="parseFloat(ikun.promotion_roi.toFixed(2))">
                            <span class="ctn_num">{{ lueNum(ikun.promotion_roi) }}</span>
                            <span class="ctn_tit">推广ROI</span>
                        </li>
                        <li class="roduct_right_ctn_data" :title="parseFloat(ikun.clicks.toFixed(2))">
                            <span class="ctn_num">{{ lueNum(ikun.clicks) }}</span>
                            <span class="ctn_tit">点击量</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num"> {{ parseFloat((ikun.click_through_rate * 100).toFixed(2)) }} %</span>
                            <span class="ctn_tit">点击率</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num">{{ parseFloat((ikun.cpc).toFixed(2)) }}</span>
                            <span class="ctn_tit">CPC</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num">{{ parseFloat((ikun.add_to_cart_cost).toFixed(2)) }}</span>
                            <span class="ctn_tit">加购成本</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="echarts_ctn">
            <div class="echarts_box" style=" width:25%;">
                <div class="echarts_title">
                    出价类型分析
                </div>
                <div class="echarts_size aiData_table" style="box-sizing: border-box; padding: 10px;">
                    <el-table :data="state.tableData" height="100%" style="width: 100%" @row-click="tableRwoClick">
                        <el-table-column label="出价类型" show-overflow-tooltip>
                            <template #default="scope">
                                <span>{{ scope.row.bid_type }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="花费">
                            <template #default="scope">
                                <span>{{ lueNum(scope.row.spend) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="GMV">
                            <template #default="scope">
                                <span>{{ lueNum(scope.row.gmv) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="GMV占比">
                            <template #default="scope">
                                <span> {{ parseFloat((scope.row.gmv_percentage * 100).toFixed(2)) }} %</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="点击量">
                            <template #default="scope">
                                <span> {{ lueNum(parseFloat((scope.row.clicks).toFixed(2))) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="点击率">
                            <template #default="scope">
                                <span> {{ parseFloat((scope.row.click_through_rate * 100).toFixed(2)) }}%</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="加购成本">
                            <template #default="scope">
                                <span>{{ lueNum(scope.row.add_to_cart_cost) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="推广ROI">
                            <template #default="scope">
                                <span>{{ lueNum(scope.row.promotion_roi) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="成交成本">
                            <template #default="scope">
                                <span>{{ lueNum(scope.row.transaction_cost) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="推广转化率">
                            <template #default="scope">
                                <span>{{ parseFloat((scope.row.conversion_rate * 100).toFixed(2)) }}</span>
                            </template>
                        </el-table-column>
                        <template #empty>
                            <div class="flex items-center justify-center h-100%">
                                <el-empty />
                            </div>
                        </template>
                    </el-table>
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    货盘花费
                </div>
                <div class="echarts_size" id="PromtionEcharts2">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    关键词花费(TOP-20)
                </div>
                <div class="echarts_size" id="PromtionEcharts3">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    人群花费(TOP-20)
                </div>
                <div class="echarts_size" id="PromtionEcharts4">
                </div>
            </div>
        </div>

        <!-- 明细表格查询条件 -->
        <div class="detailSearch">
            <el-form :inline="true" :model="searchData" size="small" class="form-inline" label-position="right">
                <el-form-item label="出价方式：" v-if="state.tableSearchLv === 1">
                    <el-select v-model="searchData.bid_type" class="m-2" placeholder="请选择" size="small" multiple
                        @change="selectChange" style="width: 240px">
                        <el-option v-for="(item, index) in all.allData.bidTypeAnalysis.records" :key="index"
                            :label="item.bid_type" :value="item.bid_type" />
                    </el-select>
                </el-form-item>
                <el-form-item label="货盘：" v-if="state.tableSearchLv === 2">
                    <el-select v-model="searchData.pallet" class="m-2" placeholder="请选择" size="small" multiple
                        @change="selectChange" style="width: 240px">
                        <el-option v-for="(item, index) in all.allData.palletCost.records" :key="index" :label="item.pallet"
                            :value="item.pallet" />
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词：" v-if="state.tableSearchLv === 3">
                    <el-select v-model="searchData.keyword_filter" class="m-2" placeholder="请选择" size="small" multiple
                        @change="selectChange" style="width: 240px">
                        <el-option v-for="(item, index) in all.allData.keywordCost.records" :key="index"
                            :label="item.keyword" :value="item.keyword" />
                    </el-select>
                </el-form-item>
                <el-form-item label="人群：" v-if="state.tableSearchLv === 4">
                    <el-select v-model="searchData.audience_filter" class="m-2" placeholder="请选择" size="small" multiple
                        @change="selectChange" style="width: 240px">
                        <el-option v-for="(item, index) in all.allData.crowdSpend.records" :key="index" :label="item.crowd"
                            :value="item.crowd" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

        <product_table v-model="count" :Commodity_detail="allData[0]" :comKey="0" :clearData="clearData"  :current_inventory="current_inventory"
            @load-more="loadMore"></product_table>

        <plan_table v-model="count" :Commodity_detail="allData[1]" :comKey="1" :clearData="clearData"  @load-more="loadMore"
            :current_inventory="cities">
        </plan_table>
        <goHome />
        <!-- 明细表格 -->
        <!-- <TransitionGroup name="list" tag="comtable">
            <template v-for="item, index in allData" :key="index">
                <comtable :Commodity_detail="item" :comKey="index" @load-more="loadMore" />
            </template>
        </TransitionGroup> -->

    </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import {
    getPromotionGetAlldata,
    getProductGetAlldata,
    getPlanGetAlldata,
    getResponsibleList,
    getSubGmvList,
    getSearchdata,
    getProductThendListdata,
    getPlanThendListdata,
} from '@/api/AIdata'
import goHome from "./components/goHome.vue";
import { getMonthFinalDay, getMonday, weaklast } from '@/utils/getDate.ts'
import { pieOptions, barOptionsX } from "./echartsOptions";
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import comtable from './components/table.vue'
import product_table from './components/product_table.vue'
import plan_table from './components/plan_table.vue'
import { lueNum } from "@/utils/format.js"
const pageNum_pro = ref(0)
const pageNum_plan = ref(0)
const pageSize = ref(20)
const cities = [
    {
        value: "场景推广",
    },
    {
        value: "精准人群推广",
    },
    {
        value: "关键词推广",
    },
];

const affixChange = () => {
    // const searchDom = document.getElementsByClassName('search')
    // console.log(searchDom,"setAttribute")
    // searchDom[0].setAttribute('class','search_scroll')
}

const searchData = reactive({
    product_manager: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
    current_inventory: [] as Array<any>, // string 当期货盘
    promotion_type: [], // string
    scene_category: [] as Array<any>, //string 计划类型
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("6").beginDate, weaklast(-8)[0]],

    ids: [] as Array<any>,

    // 明细表格
    end_date: '',
    start_date: '',
    keyword_filter: [] as any, // 关键词
    audience_filter: [] as any, // 人群
    bid_type: [] as any, // 出价方式
    pallet: [] as any, // 货盘
    pageNum: 1,
    pageSize: pageSize,
})

const state = reactive({
    titleData: {
        cost_percentage: 0, // 花费占比
        overall_add_to_cart_rate: 0, // 全店加购率
        overall_conversion_rate: 0, // 全店转化率
        overall_gmv: 0, // 全店GMV
        // overall_roi: 0, // 全店投资回报率
        promotion_add_to_cart_rate: 0, // 推广加购率
        promotion_conversion_rate: 0, // 推广转化
        promotion_cost: 0, // 推广花费
        promotion_gmv: 0, // 推广产生的GMV
        promotion_gmv_percentage: 0, // 推广GMV占比
        // promotion_roi: 0, // 推广投资回报率
        // promotion_traffic_percentage: 0, // 推广流量占比
    } as any,
    extendList: [] as any,
    responsibleList: [] as any, // 获取用户
    monthPallet: [] as any, // 获取货盘信息
    tableData: [] as any,
    echartsData2: [] as any,
    echartsData3: [] as any,
    echartsData4: [] as any,
    tableSearchLv: 1,
    planAnalysis: [] as any,
})

const current_inventory = reactive([])

// 接口返回的全部数据
const allData = reactive([{
    componentTitle: '商品明细',
    data: [] as Array<any>,
    column: [
        // { title: '本月货盘', width: 120, align: 'center', dataKey: 'pallet', key: 'pallet', fixed: true, unit: '',},
        { title: '商品名称', width: 100, align: 'center', dataKey: 'product_alias', key: 'product_alias', unit: '', },
        { title: '推广GMV', width: 100, align: 'center', dataKey: 'gmv', key: 'gmv', unit: '' },
        { title: 'GMV全店占比(%)', width: 140, align: 'center', dataKey: 'gmv_percentage', key: 'gmv_percentage', unit: '%' },
        { title: '推广GMV趋势', width: 140, align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', unit: '' },
        { title: '花费', width: 100, align: 'center', dataKey: 'cost', key: 'cost', unit: '' },
        { title: '花费全店占比(%)', width: 130, align: 'center', dataKey: 'cost_percentage', key: 'cost_percentage', unit: '%' },
        { title: '花费趋势', width: 130, align: 'center', dataKey: 'cost_trend', key: 'cost_trend', unit: '' },
        { title: 'ROI', width: 100, align: 'center', dataKey: 'roi', key: 'roi', unit: '' },
        { title: '推广ROI', width: 100, align: 'center', dataKey: 'roi', key: 'roi', },
        { title: '推广ROI趋势', width: 130, align: 'center', dataKey: 'roi_trend', key: 'roi_trend', },
        { title: '点击率(%)', width: 100, align: 'center', dataKey: 'click_through_rate', key: 'click_through_rate', unit: '%' },
        { title: '点击量', width: 100, align: 'center', dataKey: 'clicks', key: 'clicks', unit: '' },
        { title: '转化率(%)', width: 100, align: 'center', dataKey: 'conversion_rate', key: 'conversion_rate', unit: '%' },
        // { title: '支付转化率', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', },
        { title: '直接ROI', width: 100, align: 'center', dataKey: 'direct_roi', key: 'direct_roi', unit: '' },
        { title: '客单价', width: 100, align: 'center', dataKey: 'average_order_value', key: 'average_order_value', unit: '' },
        { title: '直接成交金额', width: 120, align: 'center', dataKey: 'direct_transaction_amount', key: 'direct_transaction_amount', unit: '' },
        { title: '直接成交笔数', width: 120, align: 'center', dataKey: 'direct_transaction_count', key: 'direct_transaction_count', unit: '' },
        { title: '间接ROI', width: 100, align: 'center', dataKey: 'indirect_roi', key: 'indirect_roi', unit: '' },
        { title: '间接成交金额', width: 120, align: 'center', dataKey: 'indirect_transaction_amount', key: 'indirect_transaction_amount', unit: '' },
        { title: '间接成交笔数', width: 120, align: 'center', dataKey: 'indirect_transaction_count', key: 'indirect_transaction_count', unit: '' },
        { title: '老客占比(%)', width: 120, align: 'center', dataKey: 'existing_customer_percentage', key: 'existing_customer_percentage', unit: '%' },
        { title: '收藏加购率(%)', width: 120, align: 'center', dataKey: 'favorite_add_to_cart_rate', key: 'favorite_add_to_cart_rate', unit: '%' },
    ]
}, {
    componentTitle: '计划明细',
    data: [] as Array<any>,
    column: [
        // { title: '计划类型', width: 120, align: 'center', dataKey: 'plan_id', key: 'plan_id', fixed: true, unit: '',},
        { title: '加购成本', width: 100, align: 'center', dataKey: 'add_to_cart_cost', key: 'add_to_cart_cost', unit: '' },
        { title: '出价类型', width: 100, align: 'center', dataKey: 'bid_type', key: 'bid_type', unit: '' },
        { title: '计划名称', width: 100, align: 'center', dataKey: 'campaign_name', key: 'campaign_name', unit: '' },
        // { title: '场景名称', width: 100, align: 'center', dataKey: 'promotion_type', key: 'promotion_type', unit: '' },

        { title: 'GMV', width: 100, align: 'center', dataKey: 'gmv', key: 'gmv', },
        { title: 'GMV趋势', width: 130, align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', },
        { title: 'ROI', width: 100, align: 'center', dataKey: 'roi', key: 'roi', unit: '' },
        { title: 'ROI趋势', width: 130, align: 'center', dataKey: 'roi_trend', key: 'roi_trend', unit: '' },
        { title: '花费', width: 100, align: 'center', dataKey: 'spend', key: 'spend', unit: '' },
        { title: '花费趋势', width: 130, align: 'center', dataKey: 'spend_trend', key: 'spend_trend', unit: '' },
        { title: '成交成本', width: 100, align: 'center', dataKey: 'transaction_cost', key: 'transaction_cost', unit: '' },
        { title: '点击率(%)', width: 100, align: 'center', dataKey: 'click_through_rate', key: 'click_through_rate', unit: '%' },
        { title: '点击量', width: 100, align: 'center', dataKey: 'clicks', key: 'clicks', unit: '' },
        { title: '转化率(%)', width: 100, align: 'center', dataKey: 'conversion_rate', key: 'conversion_rate', unit: '%' },
        { title: '每次点击成本', width: 120, align: 'center', dataKey: 'cpc', key: 'cpc', unit: '' },
        { title: '直接ROI', width: 100, align: 'center', dataKey: 'direct_roi', key: 'direct_roi', unit: '' },
        { title: '直接成交金额', width: 120, align: 'center', dataKey: 'direct_transaction_amount', key: 'direct_transaction_amount', unit: '' },
        { title: '直接成交笔数', width: 120, align: 'center', dataKey: 'direct_transaction_count', key: 'direct_transaction_count', unit: '' },
        { title: '间接ROI', width: 100, align: 'center', dataKey: 'indirect_roi', key: 'indirect_roi', unit: '' },
        { title: '间接成交金额', width: 120, align: 'center', dataKey: 'indirect_transaction_amount', key: 'indirect_transaction_amount', unit: '' },
        { title: '间接成交笔数', width: 120, align: 'center', dataKey: 'indirect_transaction_count', key: 'indirect_transaction_count', unit: '' },

        // { title: '计划编号', width: 100, align: 'center', dataKey: 'plan_id', key: 'plan_id', },
        // { title: '花费全店占比', width: 100, align: 'center', dataKey: 'cost_percentage', key: 'cost_percentage', },
        // { title: '支付转化率', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', },
    ]
}])

const all = reactive({
    allData: {
        bidTypeAnalysis: { records: [] },
        palletCost: { records: [] },
        keywordCost: { records: [] },
        crowdSpend: { records: [] },
    }
})

onMounted(async () => {
    getAll(searchData)
    getData()
    // getDetailPro(searchData)
    // getDetailPlan(searchData)
})
const getPlan = async () => {

}

const tableRwoClick = async (row, column, event) => {
    console.log(row, column, event)
    allData[0].data = []
    state.tableSearchLv = 1;
    searchData.keyword_filter = [], // 关键词
        searchData.audience_filter = [], // 人群
        searchData.pallet = [], // 货盘
        searchData.bid_type = [row.bid_type];
    await selectChange()
}

const getProduct = async () => {

}

// 获取四个图表数据
const getEchartsData = async () => {
    let data = {
        end_date: searchData.date[1],
        start_date: searchData.date[0],
        current_inventory: [],
        product_manager: searchData.product_manager,
        scene_category: searchData.scene_category,
    };
    const res = await getSearchdata(data)
    if (res.code === 0) {
        state.tableData = res.data.bidTypeAnalysis.records
        state.echartsData2 = res.data.palletCost.records
        state.echartsData3 = res.data.keywordCost.records
        state.echartsData4 = res.data.crowdSpend.records
        await echarts2()
        await echarts3()
        await echarts4()
    }

}

const getData2 = async () => {

    pageNum_pro.value = 0
    pageNum_plan.value = 0
    await getPromotionGetAll()
    await getEchartsData()
    await getDetailPro(searchData)
    await getDetailPlan(searchData)
};

const getData = async () => {
    const resp1 = await getResponsibleList();
    if (resp1.code === 0) {
        state.responsibleList = resp1.data.records;
        searchData.product_manager = [resp1.data.records[0].responsible];
        let data = {
            end_date: searchData.date[1],
            start_date: searchData.date[0],
            current_inventory: [],
            product_manager: String(searchData.product_manager),
            scene_category: searchData.scene_category,
        };
        const resp2 = await getSubGmvList(data);
        if (resp2.code === 0) {
            state.monthPallet = resp2.data.records;
            state.monthPallet.forEach((element, index) => {
                const obj = {
                    text: element.current_inventory,
                    value: element.current_inventory
                }
                current_inventory.push(obj)
            })
            count.value++
            await getData2();

        }
    }
}

const getPromotionGetAll = async () => {
    let data = {
        end_date: searchData.date[1],
        start_date: searchData.date[0],
        current_inventory: [],
        product_manager: searchData.product_manager,
        scene_category: searchData.scene_category,
    };
    const res = await getPromotionGetAlldata(data);
    if (res.code === 0) {
        state.titleData = res.data.promotionIndex1
        state.extendList = res.data.promotionIndex2.records

        res.data.planAnalysis.records.map(item => {
            item.value = item.promotion_type
            item.text = item.promotion_type
        })
        state.planAnalysis = res.data.planAnalysis.records
    }
}



const echarts2 = async () => {
    const chartDom = document.getElementById("PromtionEcharts2") as HTMLElement;
    const myChart = echarts.init(chartDom);

    const arr = state.echartsData2
    const option = pieOptions(arr);
    option && myChart.setOption(option);
    myChart.on("click", function (params: any) {
        allData[0].data = []
        searchData.keyword_filter = [], // 关键词
            searchData.audience_filter = [], // 人群
            searchData.bid_type = [], // 出价方式
            state.tableSearchLv = 2;
        searchData.pallet = [params.name]
        selectChange()
    })
    window.addEventListener("resize", () => {
        myChart.resize();
    });
}

const echarts3 = async () => {
    const chartDom = document.getElementById("PromtionEcharts3") as HTMLElement;
    const myChart = echarts.init(chartDom);

    const arr = state.echartsData3?.map(i => {
        return {
            name: i.keyword,
            value: i.cost,
            zhanbi: i.cost_percentage,
            roi: i.roi
        }
    })
    const option = barOptionsX(arr);
    option && myChart.setOption(option);
    myChart.on("click", function (params: any) {
        allData[0].data = []
        searchData.audience_filter = [], // 人群
            searchData.bid_type = [], // 出价方式
            searchData.pallet = [], // 货盘
            state.tableSearchLv = 3;
        searchData.keyword_filter = [params.name]
        selectChange()
    })
    window.addEventListener("resize", () => {
        myChart.resize();
    });
}

const echarts4 = async () => {
    const chartDom = document.getElementById("PromtionEcharts4") as HTMLElement;
    const myChart = echarts.init(chartDom);

    const arr = state.echartsData4?.map(i => {
        return {
            name: i.crowd,
            value: i.spend,
            zhanbi: i.spend_percentage,
            roi: i.roi
        }
    })
    const option = barOptionsX(arr);
    option && myChart.setOption(option);
    myChart.on("click", function (params: any) {
        allData[0].data = []
        searchData.keyword_filter = [], // 关键词
            searchData.bid_type = [], // 出价方式
            searchData.pallet = [], // 货盘
            state.tableSearchLv = 4;
        searchData.audience_filter = [params.name]
        selectChange()
    })
    window.addEventListener("resize", () => {
        myChart.resize();
    });
}

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const getAll = async (arr: any) => {
    arr.end_date = arr.date[1]
    arr.start_date = arr.date[0]
    const allRes = await getPromotionGetAlldata(arr)
    if (allRes.code === 0) {
        all.allData.bidTypeAnalysis.records = allRes.data.bidTypeAnalysis.records
        all.allData.palletCost.records = allRes.data.palletCost.records
        all.allData.keywordCost.records = allRes.data.keywordCost.records
        all.allData.crowdSpend.records = allRes.data.crowdSpend.records
    }
    count.value++
}

let clearData = reactive([false])
const product_ids = [] as Array<any>;
const count = ref()
// 产品明细
const getDetailPro = async (arr: any) => {
    pageNum_pro.value++
    arr.pageNum = pageNum_pro
    // arr.product_manager = [arr.product_manager]
    arr.end_date = arr.date[1]
    arr.start_date = arr.date[0]
    const [proRes] = [await getProductGetAlldata(arr)]
    if (proRes.code === 0 && proRes.data.records) {
        proRes.data.records.map((item: any) => {
            product_ids.push(item.product_id)
        })
        productThend(product_ids, proRes.data.records)
    }
}
// 商品趋势
const productThend = async (arr: Array<any>, records: Array<any>) => {
    searchData.ids = arr
    const thendList = await getProductThendListdata(searchData)
    if (thendList.code === 0 && thendList.data.records) {
        records.map((items: any) => {
            let thendObj = {
                gmv_trend: [] as Array<any>,
                roi_trend: [] as Array<any>,
                cost_trend: [] as Array<any>,
                times: [] as Array<any>,
            }
            thendList.data.records.map((item: any) => {
                if (item.product_id === items.product_id) {
                    item.records.map((it: any) => {
                        thendObj.gmv_trend.push(it.gmv_trend)
                        thendObj.roi_trend.push(it.roi_trend)
                        thendObj.cost_trend.push(it.spend_trend)
                        thendObj.times.push(it.date)
                    })
                }
            })
            items.gmv_trend = thendObj.gmv_trend
            items.roi_trend = thendObj.roi_trend
            items.cost_trend = thendObj.cost_trend
            items.times = thendObj.times
        })
        allData[0].data = records
    }
    product_ids.splice(0,product_ids.length)
}

const plan_ids = [] as Array<any>
// 计划明细
const getDetailPlan = async (arr: any) => {
    pageNum_plan.value++
    arr.pageNum = pageNum_plan
    // arr.product_manager = [arr.product_manager
    arr.end_date = arr.date[1]
    arr.start_date = arr.date[0]
    const [planRes] = [await getPlanGetAlldata(arr)]
    if (planRes.code === 0 && planRes.data.records) {
        planRes.data.records.map((item: any) => {
            plan_ids.push(item.plan_id)
        })
    }
    planThend(plan_ids, planRes.data.records)
}
// 计划趋势
const planThend = async (arr: Array<any>, records: Array<any>) => {
    searchData.ids = arr
    const thendList = await getPlanThendListdata(searchData)
    if (thendList.code === 0 && thendList.data.records) {
        records.map((items: any) => {
            let thendObj = {
                gmv_trend: [] as Array<any>,
                roi_trend: [] as Array<any>,
                spend_trend: [] as Array<any>,
                times: [] as Array<any>,
            }
            thendList.data.records.map((item: any) => {
                if (item.plan_id === items.plan_id) {
                    item.records.map((it: any) => {
                        thendObj.gmv_trend.push(it.gmv_trend)
                        thendObj.roi_trend.push(it.roi_trend)
                        thendObj.spend_trend.push(it.spend_trend)
                        thendObj.times.push(it.date)
                    })
                }
            })
            items.gmv_trend = thendObj.gmv_trend
            items.roi_trend = thendObj.roi_trend
            items.spend_trend = thendObj.spend_trend
            items.times = thendObj.times
        })
        allData[1].data = records
    }
    plan_ids.splice(0,plan_ids.length)
}

const loadMore = (at: string) => {
    clearData[0] = false
    if (at == 'product') {
        getDetailPro(searchData)
    }
    if (at == 'plan') {
        getDetailPlan(searchData)
    }
}

// 商品表格筛选
const changePallet = (value: Array<any>) => {
    searchData.current_inventory = value
    pageNum_pro.value = 0
    allData[0].data = []
    getDetailPro(searchData)
}

const changePlan_Pallet = (value: Array<any>) => {
    searchData.scene_category = value
}

// 筛选条件改变时
const selectChange = () => {
    clearData[0] = true
    pageNum_pro.value = 0
    pageNum_plan.value = 0
    getDetailPlan(searchData)
    getDetailPro(searchData)
}


</script>

<style lang="scss" scoped>
$echarts_bg_img1: url('./images/chrats_size.png');
$echarts_bg_img2: url('./images/_2.png');


.main {
    height: 100%;
    width: 100%;
    background-image: url('./images/bc.jpg');
    background-size: 100% 100%;
    color: #fff;
    overflow-y: auto;
    overflow-x: hidden;

    .header {
        height: 63px;
        width: 100%;
        background-image: url('./images/0.png');
        background-size: 100% 100%;
        position: relative;

        .search_scroll {
            background-color: rgba(0, 0, 0, 0.8);
            translate: 0.3s;
        }

        .search {
            width: 100dvw;
            padding: 0px 10px 0;
            padding-top: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            // position: fixed;

            .search_left {
                display: flex;
                flex: 0.4;

                .search_line {
                    flex: 0.3;
                }
            }

            .search_right {
                display: flex;
                flex: 0.3;
                justify-content: space-between;

            }

            .search_line {

                .line {
                    display: flex;
                    justify-content: space-between;
                }

                .select_width {
                    width: 100px;
                }

                ::v-deep(.el-radio) {
                    color: #fff;
                    margin: 0 10px;
                }

                .el-checkbox {
                    color: #fff;
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

    .roduct {
        display: flex;
        justify-content: space-between;
        height: 260px;

        .roduct_left {
            display: flex;
            flex: 0.38;
            justify-content: space-between;
            flex-direction: column;

            .roduct_num_box {
                height: 88px;
                background-image: url('./images/image-3.png');
                background-size: 100% 100%;
                padding: 10px;


                .roduct_num_box_ctn {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                    li {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .ctn_num {
                            font-size: 18px;
                            line-height: 50px;

                            color: rgba(1, 217, 255, 1.00);
                        }
                    }
                }
            }
        }

        .roduct_right {
            flex: 0.56;
            background-image: url('./images/lr.png');
            background-size: 100% 100%;

            .roduct_right_list {
                display: flex;
                flex-direction: column;
                padding: 10px 10%;
            }

            .roduct_right_title {
                text-align: center;
                color: rgba(255, 120, 2, 1);
                font-size: 18px;
            }

            .roduct_right_ctn {
                display: flex;
                justify-content: space-between;

                .roduct_right_ctn_data {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .ctn_num {
                        font-size: 24px;
                        color: rgba(1, 217, 255, 1);
                    }
                }
            }
        }
    }

    .echarts_ctn {
        display: flex;
        justify-content: space-around;
        width: 100%;
        // height: 400px;

        .echarts_box {
            flex: 0.24;

            .echarts_size {
                width: 100%;
                height: 360px;
                background-image: $echarts_bg_img1;
                object-fit: cover;
                background-size: 100% 100%;
                padding: 10px 10px;
                box-sizing: border-box;
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


    .table_title {
        margin-top: 40px;
        // width: 98%;
        height: 43px;
        line-height: 43px;
        font-size: 24px;
        padding-left: 5%;
        font-weight: 700;
        background-image: url('./images/table_title.png');
        background-size: 100% 100%;
        margin-left: 20px;
        box-sizing: border-box;
    }

    .table {
        height: 432px;
        // width: 98%;
        overflow: auto;
        margin-top: 4px;
        border: 1px solid #fff;
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

.form-inline {
    padding: 18px 0 0 0;
    text-align: right;
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

::v-deep(.el-form-item__label) {
    color: rgba(1, 229, 255, 1);
    font-size: 16px;
    font-weight: 400;
    padding-right: 0;
}
</style>