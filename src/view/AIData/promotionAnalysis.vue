<template>
    <div class="main">
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
                        <div class="line">
                            <el-radio-group v-model="searchData.all" @change="changeCheckGroup('999')" class="ml-4">
                                <el-radio :label="999" border size="small">全部</el-radio>
                            </el-radio-group>
                            <el-checkbox-group v-model="searchData.inventory_change" size="small"
                                @change="changeCheckGroup('dx')">
                                <el-checkbox border v-for="(item, index) in cities" :key="item.label" :label="item.label">{{
                                    item.value
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div class="search_right">
                    <div class="search_line">
                        请选择起止时间
                        <el-date-picker @change="getData2()" v-model="searchData.date" size="small" format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange"
                            start-placeholder="开始时间" end-placeholder="结束时间" />
                    </div>
                </div>
            </div>

        </div>
        <div class="title">
            重点指标
        </div>
        <div class="roduct">
            <div class="roduct_left">
                <div class="roduct_num_box">
                    <ul class="roduct_num_box_ctn">
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.promotion_cost).toFixed(2)) }}
                            </span>
                            <span class="ctn_name">
                                推广花费
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.promotion_gmv).toFixed(2)) }}
                            </span>
                            <span class="ctn_name">
                                推广GMV
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                {{ parseFloat((state.titleData.overall_gmv).toFixed(2)) }}
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
                        <li>
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
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num"> {{ parseFloat((ikun.spend).toFixed(2)) }} </span>
                            <span class="ctn_tit">花费</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num">{{ parseFloat((ikun.transaction_cost).toFixed(2)) }}</span>
                            <span class="ctn_tit">成交成本</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num">{{ parseFloat((ikun.gmv).toFixed(2)) }}</span>
                            <span class="ctn_tit">GMV</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num">{{ parseFloat((ikun.channel_percentage * 100).toFixed(2)) }}%</span>
                            <span class="ctn_tit">渠道占比</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num">{{ parseFloat((ikun.promotion_roi).toFixed(2)) }}</span>
                            <span class="ctn_tit">推广ROI</span>
                        </li>
                        <li class="roduct_right_ctn_data">
                            <span class="ctn_num">{{ parseFloat((ikun.clicks).toFixed(2)) }}</span>
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
            <div class="echarts_box">
                <div class="echarts_title">
                    出价类型分析
                </div>
                <div class="echarts_size aiData_table" style="box-sizing: border-box; padding: 10px;">
                    <el-table :data="state.tableData" max-height="350px" style="width: 100%" @row-click="tableRwoClick">
                        <el-table-column label="出价类型" show-overflow-tooltip>
                            <template #default="scope">
                                <span>{{ scope.row.bid_type }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="花费">
                            <template #default="scope">
                                <span>{{ scope.row.spend }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="GMV">
                            <template #default="scope">
                                <span>{{ scope.row.gmv }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="GMV占比">
                            <template #default="scope">
                                <span> {{ parseFloat((scope.row.gmv_percentage * 100).toFixed(2)) }} %</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="点击量">
                            <template #default="scope">
                                <span> {{ parseFloat((scope.row.clicks).toFixed(2)) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="点击率">
                            <template #default="scope">
                                <span> {{ parseFloat((scope.row.click_through_rate * 100).toFixed(2)) }}%</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="加购成本">
                            <template #default="scope">
                                <span>{{ scope.row.add_to_cart_cost }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="推广ROI">
                            <template #default="scope">
                                <span>{{ scope.row.promotion_roi }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="成交成本">
                            <template #default="scope">
                                <span>{{ scope.row.transaction_cost }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="推广转化率">
                            <template #default="scope">
                                <span>{{ scope.row.conversion_rate }}</span>
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
        <div class="detailSearch" :key="count">
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

        <!-- 商品明细 -->
        <!-- <el-table id="table0" :data="allData[0].data" border style="width: 100%;height: 280px;">
            <el-table-column v-for="head, index in allData[0].column" :key="index" :prop="head.dataKey" :label="head.title"
                :fixed="head.fixed" :align="head.align" :width="head.width" :filters="head.filters"
                :filter-method="filterTag">
                <template #default="scope">
                    <div v-if="scope.column.property == 'gmv_trend' || scope.column.property == 'cost_trend'">
                        <div :ref="generateRandomString()" style="width: 10dvw;height: 30px;">
                        </div>
                    </div>

                    <div v-else-if="scope.column.property == 'product_alias'" :title="scope.row.product_name"
                        class="text_hidden">
                        {{ scope.row.product_alias }}
                    </div>

                    <div v-else-if="head.unit == '%'">
                        {{ persentNum(scope.row[scope.column.property]) }}{{ head.unit }}
                    </div>

                    <div v-else-if="(typeof scope.row[scope.column.property]) != 'number'">
                        {{ scope.row[scope.column.property] }}
                    </div>

                    <div v-else>
                        {{ floatNum(scope.row[scope.column.property]) }}
                    </div>

                </template>
            </el-table-column>
        </el-table> -->

        <!-- 明细表格 -->
        <TransitionGroup name="list" tag="comtable">
            <template v-for="item, index in allData" :key="index">
                <comtable :Commodity_detail="item" :comKey="index" @load-more="loadMore" />
            </template>
        </TransitionGroup>

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
} from '@/api/AIdata'

import { getMonthFinalDay, getMonday, weaklast } from '@/utils/getDate.ts'
import { pieOptions, barOptionsX } from "./echartsOptions";
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import comtable from './components/table.vue'

import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import { persentNum, floatNum } from "@/utils/format.js"
const count = ref(0)
const pageNum_pro = ref(1)
const pageNum_plan = ref(1)
const pageSize = ref(20)
const cities = [
    {
        label: -1,
        value: "场景推广",
    },
    {
        label: 0,
        value: "精准人群推广",
    },
    {
        label: 1,
        value: "关键词推广",
    },
];

const searchData = reactive({
    product_manager: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
    current_inventory: [], // string 当期货盘
    inventory_change: [],
    all: 999 as any,
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("6").beginDate, weaklast(-8)[0]],


    // 明细表格
    end_date: '',
    start_date: '',
    keyword_filter: [], // 关键词
    audience_filter: [], // 人群
    bid_type: [], // 出价方式
    pallet: [], // 货盘
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
})

const current_inventory = reactive([])

// 接口返回的全部数据
const allData = reactive([{
    componentTitle: '商品明细',
    data: [],
    column: [
        { title: '本月货盘', width: 120, align: 'center', dataKey: 'pallet', key: 'pallet', fixed: true, unit: '', filters: current_inventory },
        { title: '商品名称', width: 100, align: 'center', dataKey: 'product_alias', key: 'product_alias', unit: '', filters: [] },
        { title: '推广GMV', width: 100, align: 'center', dataKey: 'gmv', key: 'gmv', unit: '' },
        { title: 'GMV全店占比(%)', width: 140, align: 'center', dataKey: 'gmv_percentage', key: 'gmv_percentage', unit: '%' },
        { title: '推广GMV趋势', width: 120, align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', unit: '' },
        { title: '花费', width: 100, align: 'center', dataKey: 'cost', key: 'cost', unit: '' },
        { title: '花费全店占比(%)', width: 130, align: 'center', dataKey: 'cost_percentage', key: 'cost_percentage', unit: '%' },
        { title: '花费趋势', width: 100, align: 'center', dataKey: 'cost_trend', key: 'cost_trend', unit: '' },
        { title: 'ROI', width: 100, align: 'center', dataKey: 'roi', key: 'roi', unit: '' },
        // { title: '推广ROI', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', },
        // { title: '推广ROI趋势', width: 100, align: 'center', dataKey: 'roi_trend', key: 'roi_trend', },
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
    data: [],
    column: [
        { title: '本月货盘', width: 120, align: 'center', dataKey: 'plan_id', key: 'plan_id', fixed: true, unit: '', filters: current_inventory },
        { title: '加购成本', width: 100, align: 'center', dataKey: 'add_to_cart_cost', key: 'add_to_cart_cost', unit: '' },
        { title: '出价方式', width: 100, align: 'center', dataKey: 'bid_type', key: 'bid_type', unit: '' },
        { title: '计划名称', width: 100, align: 'center', dataKey: 'campaign_name', key: 'campaign_name', unit: '' },
        { title: '场景名称', width: 100, align: 'center', dataKey: 'campaign_scene', key: 'campaign_scene', unit: '' },

        { title: 'GMV', width: 100, align: 'center', dataKey: 'gmv', key: 'gmv', },
        // { title: 'GMV趋势', width: 100, align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', },
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
        { title: 'ROI', width: 100, align: 'center', dataKey: 'roi', key: 'roi', unit: '' },
        { title: 'ROI趋势', width: 100, align: 'center', dataKey: 'roi_trend', key: 'roi_trend', unit: '' },
        { title: '花费', width: 100, align: 'center', dataKey: 'spend', key: 'spend', unit: '' },
        { title: '花费趋势', width: 100, align: 'center', dataKey: 'spend_trend', key: 'spend_trend', unit: '' },
        { title: '成交成本', width: 100, align: 'center', dataKey: 'transaction_cost', key: 'transaction_cost', unit: '' },

        // { title: 'GMV全店占比', width: 100, align: 'center', dataKey: 'gmv_percentage', key: 'gmv_percentage', },
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
    allData[0].data = []
    state.tableSearchLv = 1;
    searchData.keyword_filter = [], // 关键词
        searchData.audience_filter = [], // 人群
        searchData.pallet = [], // 货盘
        searchData.bid_type = [column];
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
        inventory_change: searchData.all ? [searchData.all] : searchData.inventory_change,
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

const changeCheckGroup = (type: string) => {
    if (type === "999") {
        searchData.inventory_change = [];
    } else {
        searchData.all = null;
    }
    getData2();
};

const getData2 = async () => {

    pageNum_pro.value = 1
    pageNum_plan.value = 1
    await getPromotionGetAll()
    await getEchartsData()
    await selectChange()
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
            inventory_change: searchData.all ? [searchData.all] : searchData.inventory_change,
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
        inventory_change: searchData.all ? [searchData.all] : searchData.inventory_change,
    };
    const res = await getPromotionGetAlldata(data);
    if (res.code === 0) {
        state.titleData = res.data.promotionIndex1
        state.extendList = res.data.promotionIndex2.records
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
const getAll = async (arr: object) => {
    const allRes = await getPromotionGetAlldata(arr)
    if (allRes.code === 0) {
        all.allData.bidTypeAnalysis.records = allRes.data.bidTypeAnalysis.records
        all.allData.palletCost.records = allRes.data.palletCost.records
        all.allData.keywordCost.records = allRes.data.keywordCost.records
        all.allData.crowdSpend.records = allRes.data.crowdSpend.records
    }
    count.value++
}

const filterTag = (value: string, row: User) => {
    return row.pallet === value
}

let randomStrings = []
// 不重复随机数
/**
 * @description: 
 * @param {*} min 最小数
 * @param {*} max 最大数
 * @param {*} count 生成数量
 * @return {*}
 * 调用函数生成长度为10的随机字符串
 * console.log(generateRandomString(10));
 */
const generateRandomString = () => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 包含所有大小写字母和数字的字符集合
    var result = '';

    for (var i = 0; i < 15; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length); // 获取随机索引值
        result += characters[randomIndex]; // 根据索引从字符集合中选择对应位置的字符并添加到结果字符串中
    }
    randomStrings.push(result)
    return result;
}

const getDetailPro = async (arr: object) => {
    arr.pageNum = pageNum_pro
    // arr.product_manager = [arr.product_manager]
    arr.end_date = arr.date[1]
    arr.start_date = arr.date[0]
    const [proRes] = [await getProductGetAlldata(arr)]
    if (proRes.code === 0) {
        allData[0].data = [...allData[0].data, ...proRes.data.records]
    }
    pageNum_pro.value++
}
const getDetailPlan = async (arr: object) => {
    arr.pageNum = pageNum_plan
    // arr.product_manager = [arr.product_manager]
    arr.end_date = arr.date[1]
    arr.start_date = arr.date[0]
    const [planRes] = [await getPlanGetAlldata(arr)]
    if (planRes.code === 0) {
        allData[1].data = [...allData[1].data, ...planRes.data.records]
        allData[1].data.forEach(element => {
            element.pallet = element.campaign_name
        });
    }
    pageNum_plan.value++
}

const loadMore = (at: string) => {
    if (at == 'product') {
        getDetailPro(searchData)
    }
    if (at == 'plan') {
        getDetailPlan(searchData)
    }
}

// 筛选条件改变时
const selectChange = () => {
    pageNum_pro.value = 1
    pageNum_plan.value = 1
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

        .search {
            padding-top: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            .search_left {
                display: flex;
                flex: 0.35;
                justify-content: space-between;

                .search_line:last-child {
                    width: 520px;
                    display: flex;
                    align-items: center;
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