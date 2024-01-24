<template>
    <div class="main">
        <div class="header">
            <span class="titl1_h1">推广分析</span>
            <div class="search">
                <div class="search_left">
                    <div class="search_line">
                        负责人
                        <el-select v-model="searchData.product_manager" class="select_width" placeholder="请选择"
                            @change="getData2" size="small">
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
                        <el-date-picker @change="getData2" v-model="searchData.date" size="small" format="YYYY/MM/DD"
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
                                151239
                            </span>
                            <span class="ctn_name">
                                推广花费
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                510938
                            </span>
                            <span class="ctn_name">
                                推广GMV
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                3073947
                            </span>
                            <span class="ctn_name">
                                店铺GMV
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                4.92%
                            </span>
                            <span class="ctn_name">
                                花费占比
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                16.92%
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
                                7.97%
                            </span>
                            <span class="ctn_name">
                                推广加购率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                5.84%
                            </span>
                            <span class="ctn_name">
                                全店加购率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                1.12%
                            </span>
                            <span class="ctn_name">
                                推广转化率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                1.25%
                            </span>
                            <span class="ctn_name">
                                全店转化率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                3.38
                            </span>
                            <span class="ctn_name">
                                推广ROI
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="roduct_right">
                <div class="roduct_right_title"> 精准人群推广</div>
                <ul class="roduct_right_ctn">
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">151239</span>
                        <span class="ctn_tit">花费</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">204.38</span>
                        <span class="ctn_tit">成交成本</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">510938</span>
                        <span class="ctn_tit">GMV</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">24.10%</span>
                        <span class="ctn_tit">GMV占比</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">3.38</span>
                        <span class="ctn_tit">推广ROI</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">54821</span>
                        <span class="ctn_tit">点击量</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">0.84%</span>
                        <span class="ctn_tit">点击率</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">2.76</span>
                        <span class="ctn_tit">CPC</span>
                    </li>

                </ul>
            </div>
        </div>
        <div class="echarts_ctn">
            <div class="echarts_box">
                <div class="echarts_title">
                    出价类型分析
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    货盘花费
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    关键词花费(TOP-20)
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    人群花费(TOP-20)
                </div>
                <div class="echarts_size">
                </div>
            </div>
        </div>

        <!-- 明细表格查询条件 -->
        <div class="detailSearch">
            <el-form :inline="true" :model="searchTableData" size="small" class="form-inline" label-position="right">
                <el-form-item label="出价方式：">
                    <el-input v-model="searchTableData.bid_type" placeholder="" clearable />
                </el-form-item>
                <el-form-item label="货盘：">
                    <el-select v-model="searchTableData.pallet" class="m-2" placeholder="Select" size="small" style="width: 240px">
                        <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" /> -->
                    </el-select>
                    <el-input v-model="searchTableData.pallet" placeholder="" clearable />
                </el-form-item>
                <el-form-item label="关键词：">
                    <el-input v-model="searchTableData.keyword_filter" placeholder="" clearable />
                </el-form-item>
                <el-form-item label="人群：">
                    <el-input v-model="searchTableData.audience_filter" placeholder="" clearable />
                </el-form-item>
            </el-form>
        </div>
        <!-- 商品明细 -->
        <comtable :Commodity_detail="allData.Product" />
        <!-- 计划明细 -->
        <comtable :Commodity_detail="allData.Plan" />

    </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import {
    getPromotionGetAlldata,
    getProductGetAlldata,
    getPlanGetAlldata,
    getResponsibleList,
    getSubGmvList,
} from '@/api/AIdata'

import { getMonthFinalDay,getMonday,weaklast } from '@/utils/getDate.ts'
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import comtable from './components/table.vue'

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
    date: [getMonthFinalDay("6").beginDate, getMonthFinalDay("0").beginDate],
})

const state = reactive({
    titleData: {

    } as any,
    responsibleList: [] as any, // 获取用户
    monthPallet: [] as any, // 获取货盘信息
})

const searchTableData = reactive({
    // 明细表格
    keyword_filter: [], // 关键词
    audience_filter: '', // 人群
    bid_type: [], // 出价方式
    pallet: [], // 货盘

})

const Commodity_detail = {
    title: "商品明细",
    tableData: [
        {
            cost_percentage: 0, // 花费占比
            overall_add_to_cart_rate: 0, // 全店加购率
            overall_conversion_rate: 0, // 全店转化率
            overall_gmv: 0, // 全店GMV
            overall_roi: 0, // 全店投资回报率
            promotion_add_to_cart_rate: 0, // 推广加购率
            promotion_conversion_rate: 0, // 推广转化
            promotion_cost: 0, // 推广花费
            promotion_gmv: 0, // 推广产生的GMV
            promotion_gmv_percentage: 0, // 推广GMV占比
            promotion_roi: 0, // 推广投资回报率
            promotion_traffic_percentage: 0, // 推广流量占比
        }
    ],
}

// 接口返回的全部数据
const allData = reactive({
    Product: {
        componentTitle: '商品明细',
        data: [],
        column: [
            { title: '本月货盘', width: 120, align: 'center', dataKey: 'pallet', key: 'pallet', fixed: true },
            { title: '商品名称', width: 120, align: 'center', dataKey: 'product_name', key: 'product_name', },
            { title: '推广GMV', width: 120, align: 'center', dataKey: 'gmv', key: 'gmv', },
            { title: 'GMV全店占比', width: 120, align: 'center', dataKey: 'gmv_percentage', key: 'gmv_percentage', },
            { title: '推广GMV趋势', width: 120, align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', },
            { title: '花费', width: 100, align: 'center', dataKey: 'cost', key: 'cost', },
            { title: '花费全店占比', width: 120, align: 'center', dataKey: 'cost_percentage', key: 'cost_percentage', },
            { title: '花费趋势', width: 100, align: 'center', dataKey: 'cost_trend', key: 'cost_trend', },
            { title: 'ROI', width: 100, align: 'center', dataKey: 'roi', key: 'roi', },
            // { title: '推广ROI', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', },
            // { title: '推广ROI趋势', width: 100, align: 'center', dataKey: 'roi_trend', key: 'roi_trend', },
            { title: '点击率', width: 100, align: 'center', dataKey: 'click_through_rate', key: 'click_through_rate', },
            { title: '点击量', width: 100, align: 'center', dataKey: 'clicks', key: 'clicks', },
            { title: '转化率', width: 100, align: 'center', dataKey: 'conversion_rate', key: 'conversion_rate', },
            // { title: '支付转化率', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', },
            { title: '直接ROI', width: 100, align: 'center', dataKey: 'direct_roi', key: 'direct_roi', },
            { title: '客单价', width: 100, align: 'center', dataKey: 'average_order_value', key: 'average_order_value', },
            { title: '直接成交金额', width: 120, align: 'center', dataKey: 'direct_transaction_amount', key: 'direct_transaction_amount', },
            { title: '直接成交笔数', width: 120, align: 'center', dataKey: 'direct_transaction_count', key: 'direct_transaction_count', },
            { title: '间接ROI', width: 100, align: 'center', dataKey: 'indirect_roi', key: 'indirect_roi', },
            { title: '间接成交金额', width: 120, align: 'center', dataKey: 'indirect_transaction_amount', key: 'indirect_transaction_amount', },
            { title: '间接成交笔数', width: 120, align: 'center', dataKey: 'indirect_transaction_count', key: 'indirect_transaction_count', },
            { title: '老客占比', width: 100, align: 'center', dataKey: 'existing_customer_percentage', key: 'existing_customer_percentage', },
            { title: '收藏加购率', width: 120, align: 'center', dataKey: 'favorite_add_to_cart_rate', key: 'favorite_add_to_cart_rate', },
        ]
    } as any,
    Plan: {
        componentTitle: '计划明细',
        data: [],
        column: [
            { title: '本月货盘', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', fixed: true },
            { title: '加购成本', width: 100, align: 'center', dataKey: 'add_to_cart_cost', key: 'add_to_cart_cost', },
            { title: '出价方式', width: 100, align: 'center', dataKey: 'bid_type', key: 'bid_type', },
            { title: '计划名称', width: 100, align: 'center', dataKey: 'campaign_name', key: 'campaign_name', },
            { title: '场景名称', width: 100, align: 'center', dataKey: 'campaign_scene', key: 'campaign_scene', },

            { title: 'GMV', width: 100, align: 'center', dataKey: 'gmv', key: 'gmv', },
            // { title: 'GMV趋势', width: 100, align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', },
            { title: '点击率', width: 100, align: 'center', dataKey: 'click_through_rate', key: 'click_through_rate', },
            { title: '点击量', width: 100, align: 'center', dataKey: 'clicks', key: 'clicks', },
            { title: '转化率', width: 100, align: 'center', dataKey: 'conversion_rate', key: 'conversion_rate', },
            { title: '每次点击成本', width: 120, align: 'center', dataKey: 'cpc', key: 'cpc', },
            { title: '直接ROI', width: 100, align: 'center', dataKey: 'direct_roi', key: 'direct_roi', },
            { title: '直接成交金额', width: 120, align: 'center', dataKey: 'direct_transaction_amount', key: 'direct_transaction_amount', },
            { title: '直接成交笔数', width: 120, align: 'center', dataKey: 'direct_transaction_count', key: 'direct_transaction_count', },
            { title: '间接ROI', width: 100, align: 'center', dataKey: 'indirect_roi', key: 'indirect_roi', },
            { title: '间接成交金额', width: 120, align: 'center', dataKey: 'indirect_transaction_amount', key: 'indirect_transaction_amount', },
            { title: '间接成交笔数', width: 120, align: 'center', dataKey: 'indirect_transaction_count', key: 'indirect_transaction_count', },
            { title: 'ROI', width: 100, align: 'center', dataKey: 'roi', key: 'roi', },
            { title: 'ROI趋势', width: 100, align: 'center', dataKey: 'roi_trend', key: 'roi_trend', },
            { title: '花费', width: 100, align: 'center', dataKey: 'spend', key: 'spend', },
            { title: '花费趋势', width: 100, align: 'center', dataKey: 'spend_trend', key: 'spend_trend', },
            { title: '成交成本', width: 100, align: 'center', dataKey: 'transaction_cost', key: 'transaction_cost', },


            // { title: 'GMV全店占比', width: 100, align: 'center', dataKey: 'gmv_percentage', key: 'gmv_percentage', },
            // { title: '花费全店占比', width: 100, align: 'center', dataKey: 'cost_percentage', key: 'cost_percentage', },
            // { title: '支付转化率', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', },
        ]
    } as any
})

onMounted(async () => {
    console.log(weaklast(),"weaklast(3)")

    getAll()
})
const getPlan = async () => {

}

const getProduct = async () => {

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

};

const getData = async () => {
    const resp1 = await getResponsibleList();
    if (resp1.code === 0) {
        state.responsibleList = resp1.data.records;
        searchData.product_manager = resp1.data.records[0].responsible;
        let data = {
            end_date: searchData.date[1],
            start_date: searchData.date[0],
            current_inventory: [],
            product_manager: searchData.product_manager,
            inventory_change: searchData.all ? [searchData.all] : searchData.inventory_change,
        };
        const resp2 = await getSubGmvList(data);
        if (resp2.code === 0) {
            state.monthPallet = resp2.data.records;
            await getData2();
        }
    }

}

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const getAll = async () => {
    const arr = {
        "audience_filter": "",  //  人群筛选
        "bid_type": "",  // 出价方式
        // "current_inventory": [
        //     "string"   // 当期货盘
        // ],
        "keyword_filter": "",  // 关键词
        "pallet": "",  // 货盘字段
        // "product_manager": [
        //     "string"   // 商品负责人
        // ],
        // "scene_category": [
        //     "string"  // 场景分类
        // ],
        // "shop_filter": "", // 店铺筛选字段，用于存储店铺筛选条件的详细信息
        "end_date": "2023-01-21", // 日期 - 数据统计的时间点
        "start_date": "2023-01-01",
    }
    const [proRes, planRes] = [await getProductGetAlldata(arr), await getPlanGetAlldata(arr)]
    if (proRes.code === 0) {
        allData.Product.data = proRes.data
        console.log(proRes, "Productalldata")
    }
    if (planRes.code === 0) {
        allData.Plan.data = planRes.data
    }
    console.log(allData, "结束时间")
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
                flex: 0.5;

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

            .roduct_right_title {
                text-align: center;
                color: rgba(255, 120, 2, 1);
                font-size: 18px;
            }

            .roduct_right_ctn {
                height: 80px;
                display: flex;
                padding: 6% 10%;
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