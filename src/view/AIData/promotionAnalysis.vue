<template>
    <div class="main">
        <div class="header">
            <span class="titl1_h1">推广分析</span>
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
                            <el-radio-button label="场景推广" />
                            <el-radio-button label="精准人群推广" />
                            <el-radio-button label="关键词推广" />
                        </el-radio-group>
                    </div>
                </div>
                <div class="search_right">
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
                    重点指标
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    重点指标
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    重点指标
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    重点指标
                </div>
                <div class="echarts_size">
                </div>
            </div>
        </div>

        <!-- 明细表格查询条件 -->
        <div class="detailSearch">
            <el-form :inline="true" :model="searchData" size="small" class="form-inline" label-position="right">
                <el-form-item label="出价方式：">
                    <el-input v-model="searchData.bid_type" placeholder="" clearable />
                </el-form-item>
                <el-form-item label="货盘：">
                    <el-select v-model="searchData.pallet" class="m-2" placeholder="Select" size="small" style="width: 240px">
                        <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" /> -->
                    </el-select>
                    <el-input v-model="searchData.pallet" placeholder="" clearable />
                </el-form-item>
                <el-form-item label="关键词：">
                    <el-input v-model="searchData.keyword_filter" placeholder="" clearable />
                </el-form-item>
                <el-form-item label="人群：">
                    <el-input v-model="searchData.audience_filter" placeholder="" clearable />
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
} from '@/api/AIdata'

import { getMonthFinalDay,getMonday,weaklast } from '@/utils/getDate.ts'

import { reactive, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import comtable from './components/table.vue'

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

const searchData = reactive({
    name: '',
    monthData: '',
    palletChange: '上升',
    principle: '',
    originalPrice: '',
    listedMonth: '',
    years: '',

    // 明细表格
    keyword_filter: [], // 关键词
    audience_filter: '', // 人群
    bid_type: [], // 出价方式
    pallet: [], // 货盘

})

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
    } as any,
    allData: {}
})

onMounted(async () => {
    console.log(weaklast(),"weaklast(3)")
    getAll()
})
const getPlan = async () => {

}

const getProduct = async () => {

}
const getAll = async () => {
    const arr = {
        "audience_filter": [""],  //  人群筛选
        "bid_type": [""],  // 出价方式
        // "current_inventory": [
        //     "string"   // 当期货盘
        // ],
        "keyword_filter": [""],  // 关键词
        "pallet": [""],  // 货盘字段
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
    const [proRes, planRes, allRes] = [await getProductGetAlldata(arr), await getPlanGetAlldata(arr), await getPromotionGetAlldata(arr)]
    if (proRes.code === 0) {
        allData.Product.data = proRes.data
        console.log(proRes, "Productalldata")
    }
    if (planRes.code === 0) {
        allData.Plan.data = planRes.data
    }
    if (allRes.code === 0) {
        allData.allData = allRes.data
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
                flex: 0.4;
            }

            .search_right {
                display: flex;
                flex: 0.3;
                justify-content: space-between;

            }

            .search_line {
                margin: 0 12px;

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
}

::v-deep(.el-form-item__label) {
    color: rgba(1, 229, 255, 1);
    font-size: 16px;
    font-weight: 400;
    padding-right: 0;
}
</style>