<template>
    <div class="gola pageBG">
        <page_header :title="pageTitle" />
        <!-- <el-affix :offset="0">
            <div class="header">
                <span class="titl1_h1">单品分析</span>
                <div class="search">
                    <div class="search_left">
                        <div class="search_line">
                            商品选择
                            <el-select v-model="searchData.product_id" class="select_width" placeholder="请选择"
                                @change="getData" filterable remote reserve-keyword remote-show-suffix
                                :remote-method="remoteMethod" :loading="searchData.loading">
                                <el-option v-for="item in state.shopList" :key="item.product_id" :label="item.product_name"
                                    :value="item.product_id" />
                            </el-select>
                        </div>
                    </div>
                    <div class="search_right">
                        <div class="search_line">
                            请选择起止时间
                            <el-date-picker v-model="searchData.date" @change="getData" :clearable="false"
                                format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange"
                                start-placeholder="开始时间" end-placeholder="结束时间" />
                        </div>
                    </div>
                </div>
            </div>
        </el-affix> -->

        <el-row :gutter="20">
            <el-col :span="10">
                <div class="box">
                    <boxHead title="访客分布" />

                    <div class="roduct_num_box">
                        <ul class="roduct_num_box_ctn">
                            <li :title="1">
                                <span class="ctn_num">
                                    123123123
                                </span>
                                <span class="ctn_name">
                                    推广花费
                                </span>
                            </li>
                            <li :title="1">
                                <span class="ctn_num">
                                    123123123
                                </span>
                                <span class="ctn_name">
                                    推广GMV
                                </span>
                            </li>
                            <li :title="1">
                                <span class="ctn_num">
                                    123123123
                                </span>
                                <span class="ctn_name">
                                    店铺GMV
                                </span>
                            </li>
                            <li>
                                <span class="ctn_num">
                                    123123123
                                </span>
                                <span class="ctn_name">
                                    花费占比
                                </span>
                            </li>
                            <li :title="1">
                                <span class="ctn_num">
                                    123123123
                                </span>
                                <span class="ctn_name">
                                    推广GMV占比
                                </span>
                            </li>
                            <li :title="1">
                                <span class="ctn_num">
                                    123123123
                                </span>
                                <span class="ctn_name">
                                    推广流量占比
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="echarts_title">
                    月累GMV达成率
                </div>
            </el-col>
            <el-col :span="7">
                <div class="echarts_title">
                    货盘GMV达成率
                </div>
            </el-col>
            <el-col :span="10">
                <div class="box">
                    <boxHead title="GMV趋势" />

                </div>
            </el-col>
            <el-col :span="7">
                <div class="box">
                    <boxHead title="责任人分析" />

                </div>
            </el-col>
            <el-col :span="7">
                <div class="box">
                    <boxHead title="类目分析" />
                    
                </div>
            </el-col>
        </el-row>

    </div>
    <goHome />
</template>

<script setup lang="ts" name="goal" >
import { reactive, onMounted, ref } from "vue";
import goHome from "./components/goHome.vue";
import page_header from './components/page_header.vue'
import boxHead from './components/box_head.vue'
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
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js"
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复

const pageTitle = "目标达成"

const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    loading: false,
    date: ['2024-01-01', '2024-01-11'],
    product_id: '',
    start_date: '',
    end_date: '',
});
const state = reactive({
    shopList: [] as any,
    key: "" as any,
    loading: false,
    itemData: {
        visitors_count: 0,
        bundle_purchase: 0,
        free_search_click_rate: 0,
        gmv: 0,
        payment_conversion_rate: 0,
        refund_rate: 0,
        repeat_purchase_rate: 0,
        returning_customer_ratio: 0,
        search_gmv_ratio: 0,
        search_visitor_ratio: 0,
    },
    itemIndexTrend: [] as any,
    itemChart3data: {} as any,
});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}

const getData = async (params: any) => {

}

const remoteMethod = async (params: any) => {

}



</script>

<style lang="scss" scoped>
.storeAnalysis {
    overflow-y: auto;
    overflow-x: hidden;
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
</style>