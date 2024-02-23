<!--
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-01-31 16:15:30
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-02-23 12:27:42
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\storeAnalysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="storeAnalysis pageBG">
        <page_header :title="pageTitle" />


        <el-row :gutter="20" class="pageBody">
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        店铺关键指标
                    </div>
                    <div id="box_body">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <div class="index_top">
                                    <div class="numS">
                                        {{ numS.data.shop_index.turnover_rate }}
                                    </div>
                                    <div class="describe">
                                        动销率
                                    </div>
                                </div>
                                <div id="index1" style="height: 140px;">

                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="index_top">
                                    <div class="numS" style="display: flex;align-items: center;">
                                        店铺层级:lv{{ numS.data.shop_index.level }}&nbsp;排名{{ numS.data.shop_index.ranking }}
                                    </div>
                                </div>
                                <div id="index2" style="height: 140px;">

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead1">
                        内容占比
                    </div>
                    <div id="box_body">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div id="index3" style="height: 260px;">

                                </div>
                            </el-col>
                            <el-col :span="16">
                                <div id="index4" style="height: 260px;">

                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        店铺服务分析
                    </div>
                    <div id="box_body">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="5">
                                        <div style="height: 140px;">
                                            <div class="numS">
                                                {{ numS.data.shop_service_analysis.first_product_return_rate }}
                                            </div>
                                            <div class="describe">
                                                首次品退率
                                            </div>
                                            <div class="describe" style="color: #01e5ff;">
                                                超过{{ numS.data.shop_service_analysis.first_product_return_rate_above_peers
                                                }}%同行
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="7">
                                        <div id="index5" style="height: 140px;">

                                        </div>
                                    </el-col>
                                    <el-col :span="5">
                                        <div style="height: 140px;">
                                            <div class="numS">
                                                {{ numS.data.shop_service_analysis.product_negative_review_rate }}
                                            </div>
                                            <div class="describe">
                                                商品差评率
                                            </div>
                                            <div class="describe" style="color: #01e5ff;">
                                                超过{{
                                                    numS.data.shop_service_analysis.product_negative_review_rate_above_peers
                                                }}%同行
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="7">
                                        <div id="index6" style="height: 140px;">

                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="9">
                                        <div id="index7" style="height: 140px;">

                                        </div>
                                        <div style="position: absolute;top:0;left: 50%;transform: translateX(-50%);">
                                            <div class="numS">
                                                {{ numS.data.shop_service_analysis.refund_rate }}%
                                            </div>
                                            <div class="describe" style="padding-top: 10px;">
                                                退款率
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="9">
                                        <div id="index8" style="height: 140px;">

                                        </div>
                                        <div style="position: absolute;top:0;left: 50%;transform: translateX(-50%);">
                                            <div class="numS">
                                                {{ numS.data.shop_service_analysis.refund_successful_amount }}
                                            </div>
                                            <div class="describe" style="padding-top: 10px;">
                                                退款率
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="numS">
                                            {{ numS.data.shop_service_analysis.violation_count }}
                                        </div>
                                        <div class="describe" style="padding-top: 10px;">
                                            违规数量
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        客服板块
                    </div>
                    <div id="box_body">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="8">
                                        <div id="index9" style="height: 140px;">

                                        </div>
                                        <div style="position: absolute;top:0;left: 50%;transform: translateX(-50%);">
                                            <div class="describe" style="padding-top: 10px;">
                                                客服销售额
                                            </div>
                                            <div class="numS">
                                                {{ numS.data.customer_service.customer_service_sales }}
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div id="index10" style="height: 140px;">
                                        </div>
                                        <div style="position: absolute;top:0;left: 50%;transform: translateX(-50%);">
                                            <div class="describe" style="padding-top: 10px;">
                                                客服销售额占比
                                            </div>
                                            <div class="numS">
                                                {{ numS.data.customer_service.customer_service_sales_ratio }}
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div id="index11" style="height: 140px;">
                                        </div>
                                        <div style="position: absolute;top:0;left: 50%;transform: translateX(-50%);">
                                            <div class="describe" style="padding-top: 10px;">
                                                平均响应时长（秒）
                                            </div>
                                            <div class="numS">
                                                {{ numS.data.customer_service.average_response_time_in_seconds }}
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="12">
                                        <div id="index12" style="height: 140px;">
                                        </div>
                                        <div style="position: absolute;top:0;left: 50%;transform: translateX(-50%);">
                                            <div class="describe" style="padding-top: 10px;">
                                                客户满意率
                                            </div>
                                            <div class="numS">
                                                {{ numS.data.customer_service.customer_satisfaction_rate }}
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div id="index13" style="height: 140px;">
                                        </div>
                                        <div style="position: absolute;top:0;left: 50%;transform: translateX(-50%);">
                                            <div class="describe" style="padding-top: 10px;">
                                                询单转化率
                                            </div>
                                            <div class="numS">
                                                {{ numS.data.customer_service.inquiry_conversion_rate }}
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        会员分析
                    </div>
                    <div id="box_body">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="8">
                                        <div style="height: 140px;">
                                            <div class="numS">
                                                {{ numS.data.customer_analysis.total_membership_count }}
                                            </div>
                                            <div class="describe">
                                                会员人数
                                            </div>
                                            <div class="describe" style="color: #01e5ff;">
                                                昨日招募会员数{{ numS.data.customer_analysis.members_recruited_yesterday
                                                }}
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div style="height: 140px;">
                                            <div class="numS">
                                                {{ numS.data.customer_analysis.member_transaction_penetration }}%
                                            </div>
                                            <div class="describe">
                                                会员成交渗透率
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div style="height: 140px;">
                                            <div class="numS">
                                                {{ numS.data.customer_analysis.member_average_order_value }}%
                                            </div>
                                            <div class="describe">
                                                会员客单价
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="8">
                                        <div id="index14" style="height: 140px;">

                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div id="index15" style="height: 140px;">

                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div id="index16" style="height: 140px;">

                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        流失分析
                    </div>
                    <div id="box_body">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="8">
                                        <div style="height: 140px;">
                                            <div class="numS">
                                                {{ numS.data.customer_lossAnalysis.amount_of_loss }}
                                            </div>
                                            <div class="describe">
                                                流失金额
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div style="height: 140px;">
                                            <div class="numS">
                                                {{ numS.data.customer_lossAnalysis.lost_members }}
                                            </div>
                                            <div class="describe">
                                                流失人数
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div style="height: 140px;">
                                            <div class="numS">
                                                {{ numS.data.customer_lossAnalysis.stores_causing_loss }}
                                            </div>
                                            <div class="describe">
                                                引起流失的店铺数
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24">
                                <el-row>
                                    <el-col :span="8">
                                        <div id="index17" style="height: 140px;">

                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div id="index18" style="height: 140px;">

                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div id="index19" style="height: 140px;">

                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>

    <!-- 头部的查询条件，追加进page_header组件 -->
    <Teleport to=".header_right">
        <div class="search">
            <div class="search_right">
                <label>请选择起止时间：</label>
                <el-date-picker v-model="searchData.date" :clearable="false" size="small" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange" start-placeholder="开始时间"
                    end-placeholder="结束时间" @change="timeChange" />
            </div>
        </div>
    </Teleport>
</template>
<script setup lang="ts" name="storeAnalysis">
import { reactive, onMounted, ref } from "vue";
import {
    shopGetAlldata,
    getAllTrenddata
} from "@/api/AIdata";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { mergeArr } from "@/utils/format";
import page_header from './components/page_header.vue'
import { lineFillOptionsNum, lineOptions1_y, pieItemOptions1, lineOptionsNum } from "./echartsOptions"
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import * as echarts from 'echarts';

const pageTitle = "店铺分析"
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const pageSize = ref(20)
const searchData = reactive({
    // shopId: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, weaklast(-8)[0]],

    page_num: 0,
    page_size: pageSize,
    start_date: '',
    end_date: '',
    shop_name: '蜡笔派家居旗舰店',
});

onMounted(async () => {
    await getAllData(searchData)
    await getTrendData(searchData)
})

const timeChange = (val:any) => {
    searchData.date = val
    console.log(searchData,"timeChangetimeChange")
    getAllData(searchData)
    getTrendData(searchData)
}

const numS = reactive({
    data: {
        "shop_index": {
            "turnover_rate": 0,
            "level": 0,
            "ranking": 0
        },
        "content": {
            "type": "",
            "amount": 0,
            "proportion": 0
        },
        "shop_service_analysis": {
            "first_product_return_rate": 0,
            "first_product_return_rate_above_peers": 0,
            "first_product_return_rate_vs_industry_average": 0,
            "first_product_return_rate_vs_industry_excellent": 0,
            "product_negative_review_rate": 0,
            "product_negative_review_rate_above_peers": 0,
            "product_negative_review_rate_vs_industry_average": 0,
            "product_negative_review_rate_vs_industry_excellent": 0,
            "refund_rate": 0,
            "refund_successful_amount": 0,
            "violation_count": 0
        },
        "customer_service": {
            "customer_service_sales": 0,
            "customer_service_sales_ratio": 0,
            "average_response_time_in_seconds": 0,
            "customer_satisfaction_rate": 0,
            "inquiry_conversion_rate": 0
        },
        "customer_analysis": {
            "total_membership_count": 0,
            "members_recruited_yesterday": 0,
            "member_transaction_penetration": 0,
            "industry_standard_penetration": 0,
            "industry_premium_penetration": 0,
            "member_average_order_value": 0
        },
        "customer_lossAnalysis": {
            "amount_of_loss": 0,
            "lost_members": 0,
            "stores_causing_loss": 0
        }
    }
})
const getAllData = async (obj: any) => {
    obj.start_date = obj.date[0]
    obj.end_date = obj.date[1]
    const allData = await shopGetAlldata(obj)
    if (allData.code == 0 && allData.data) {
        numS.data = allData.data
    }
}
// 指标
let shop_index_trend = {
    chatrsX: [] as Array<any>,
    turnover_rate: [] as Array<any>, // 动销率
    ranking: [] as Array<any>, // 店铺排行
};
// 内容
let content_trend = {
    chatrsX: [] as Array<any>,
    lineData: [
        {
            name: '直播',
            data: [] as Array<any>,
        },
        {
            name: '短视频',
            data: [] as Array<any>,
        },
        {
            name: '图文',
            data: [] as Array<any>,
        },
    ],
    pieData: [
        {
            name: '直播',
            value: 0,
        },
        {
            name: '短视频',
            value: 0,
        },
        {
            name: '图文',
            value: 0,
        },
    ],
};
// 店铺服务
let shop_service_analysis_trend = {
    chatrsX: [] as Array<any>,
    refund_rate: [] as Array<any>, //退款率
    refund_successful_amount: [] as Array<any>, //退款成功金额
    firstR_line: [
        {
            name: '本店',
            data: [] as Array<any>,
        },
        {
            name: '行业平均',
            data: [] as Array<any>,
        },
        {
            name: '行业优秀',
            data: [] as Array<any>,
        },
    ],
    negative_line: [
        {
            name: '本店',
            data: [] as Array<any>,
        },
        {
            name: '行业平均',
            data: [] as Array<any>,
        },
        {
            name: '行业优秀',
            data: [] as Array<any>,
        },
    ],
};
// 会员
let customer_analysis_trend = {
    chatrsX: [] as Array<any>,
    total_membership_count: [] as Array<any>,
    member_average_order_value: [] as Array<any>,
    lineData: [
        {
            name: '本店',
            data: [] as Array<any>,
        },
        {
            name: '行业达标',
            data: [] as Array<any>,
        },
        {
            name: '行业优质',
            data: [] as Array<any>,
        },
    ],
};
// 流失
let customer_loss_trend = {
    chatrsX: [] as Array<any>,
    amount_of_loss: [] as Array<any>,
    lost_members: [] as Array<any>,
    stores_causing_loss: [] as Array<any>,
};
// 客服
let customer_service_trend = {
    chatrsX: [] as Array<any>,
    customer_service_sales: [] as Array<any>,
    customer_service_sales_ratio: [] as Array<any>,
    average_response_time_in_seconds: [] as Array<any>,
    customer_satisfaction_rate: [] as Array<any>,
    inquiry_conversion_rate: [] as Array<any>,
};
const getTrendData = async (obj: any) => {
    obj.start_date = obj.date[0]
    obj.end_date = obj.date[1]
    const allData = await getAllTrenddata(obj)
    if (allData.code == 0 && allData.data) {
        shop_index_trend.chatrsX = []
        shop_index_trend.turnover_rate = []
        shop_index_trend.ranking = []
        allData.data.shop_index_trend.records?.map((item: any) => {
            shop_index_trend.chatrsX.push(item.date)
            shop_index_trend.turnover_rate.push(item.turnover_rate)
            shop_index_trend.ranking.push(item.ranking)
        })
        let chartDom1: any = document.getElementById('index1');
        let myChart1 = echarts.init(chartDom1);
        let option1 = lineFillOptionsNum(shop_index_trend.turnover_rate, mergeArr(shop_index_trend.chatrsX));
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        option1 && myChart1.setOption(option1);
        EleResize.on(chartDom1, listener1);

        let chartDom2: any = document.getElementById('index2');
        let myChart2 = echarts.init(chartDom2);
        let option2 = lineFillOptionsNum(shop_index_trend.ranking, mergeArr(shop_index_trend.chatrsX));
        let listener2 = function () {
            if (myChart2) {
                myChart2.resize();
            }
        };
        option2 && myChart2.setOption(option2);
        EleResize.on(chartDom2, listener2);

        content_trend.chatrsX = []
        content_trend.lineData[0].data = []
        content_trend.lineData[1].data = []
        content_trend.lineData[2].data = []
        allData.data.content_trend.records?.map((item: any) => {
            content_trend.chatrsX.push(item.date)
            if (item.type == '直播') {
                content_trend.lineData[0].data.push(item.amount)
            }
            if (item.type == '短视频') {
                content_trend.lineData[1].data.push(item.amount)
            }
            if (item.type == '图文') {
                content_trend.lineData[2].data.push(item.amount)
            }
        })
        let pieData = [] as Array<any>
        content_trend.lineData.map((item: any) => {
            let obj = {
                name: item.name,
                value: 0
            }
            item.data.map((itm: any) => {
                obj.value += itm
            })
            pieData.push(obj)
        })

        let chartDom3: any = document.getElementById('index3');
        let myChart3 = echarts.init(chartDom3);
        let option3 = pieItemOptions1(pieData);
        let listener3 = function () {
            if (myChart3) {
                myChart3.resize();
            }
        };
        option3 && myChart3.setOption(option3);
        EleResize.on(chartDom3, listener3);

        let chartDom4: any = document.getElementById('index4');
        let myChart4 = echarts.init(chartDom4);
        let option4 = lineOptions1_y(content_trend.lineData, mergeArr(content_trend.chatrsX));
        let listener4 = function () {
            if (myChart4) {
                myChart4.resize();
            }
        };
        option4 && myChart4.setOption(option4);
        EleResize.on(chartDom4, listener4);

        shop_service_analysis_trend.chatrsX = []
        shop_service_analysis_trend.refund_rate = []
        shop_service_analysis_trend.refund_successful_amount = []
        shop_service_analysis_trend.firstR_line[0].data = []
        shop_service_analysis_trend.firstR_line[1].data = []
        shop_service_analysis_trend.firstR_line[2].data = []
        shop_service_analysis_trend.negative_line[0].data = []
        shop_service_analysis_trend.negative_line[1].data = []
        shop_service_analysis_trend.negative_line[2].data = []
        allData.data.shop_service_analysis_trend.records?.map((item: any) => {
            shop_service_analysis_trend.chatrsX.push(item.date)
            shop_service_analysis_trend.refund_rate.push(item.refund_rate)
            shop_service_analysis_trend.refund_successful_amount.push(item.refund_successful_amount)

            shop_service_analysis_trend.firstR_line[0].data.push(item.first_product_return_rate)
            shop_service_analysis_trend.firstR_line[1].data.push(item.first_product_return_rate_vs_industry_average)
            shop_service_analysis_trend.firstR_line[2].data.push(item.first_product_return_rate_vs_industry_excellent)

            shop_service_analysis_trend.negative_line[0].data.push(item.product_negative_review_rate)
            shop_service_analysis_trend.negative_line[1].data.push(item.product_negative_review_rate_vs_industry_average)
            shop_service_analysis_trend.negative_line[2].data.push(item.product_negative_review_rate_vs_industry_excellent)
        })
        let chartDom5: any = document.getElementById('index5');
        let myChart5 = echarts.init(chartDom5);
        let option5 = lineOptions1_y(shop_service_analysis_trend.firstR_line, mergeArr(shop_service_analysis_trend.chatrsX), true);
        let listener5 = function () {
            if (myChart5) {
                myChart5.resize();
            }
        };
        option5 && myChart5.setOption(option5);
        EleResize.on(chartDom5, listener5);

        let chartDom6: any = document.getElementById('index6');
        let myChart6 = echarts.init(chartDom6);
        let option6 = lineOptions1_y(shop_service_analysis_trend.negative_line, mergeArr(shop_service_analysis_trend.chatrsX), true);
        let listener6 = function () {
            if (myChart6) {
                myChart6.resize();
            }
        };
        option6 && myChart6.setOption(option6);
        EleResize.on(chartDom6, listener6);

        let chartDom7: any = document.getElementById('index7');
        let myChart7 = echarts.init(chartDom7);
        let option7 = lineFillOptionsNum(shop_service_analysis_trend.refund_rate, mergeArr(shop_service_analysis_trend.chatrsX));
        let listener7 = function () {
            if (myChart7) {
                myChart7.resize();
            }
        };
        option7 && myChart7.setOption(option7);
        EleResize.on(chartDom7, listener7);

        let chartDom8: any = document.getElementById('index8');
        let myChart8 = echarts.init(chartDom8);
        let option8 = lineFillOptionsNum(shop_service_analysis_trend.refund_successful_amount, mergeArr(shop_service_analysis_trend.chatrsX));
        let listener8 = function () {
            if (myChart8) {
                myChart8.resize();
            }
        };
        option8 && myChart8.setOption(option8);
        EleResize.on(chartDom8, listener8);

        customer_service_trend.chatrsX = []
        customer_service_trend.customer_service_sales = []
        customer_service_trend.customer_service_sales_ratio = []
        customer_service_trend.average_response_time_in_seconds = []
        customer_service_trend.customer_satisfaction_rate = []
        customer_service_trend.inquiry_conversion_rate = []
        allData.data.customer_service_trend.records?.map((item: any) => {
            customer_service_trend.chatrsX.push(item.date)

            customer_service_trend.customer_service_sales.push(item.customer_service_sales)
            customer_service_trend.customer_service_sales_ratio.push(item.customer_service_sales_ratio)
            customer_service_trend.average_response_time_in_seconds.push(item.average_response_time_in_seconds)
            customer_service_trend.customer_satisfaction_rate.push(item.customer_satisfaction_rate)
            customer_service_trend.inquiry_conversion_rate.push(item.inquiry_conversion_rate)
        })

        let chartDom9: any = document.getElementById('index9');
        let myChart9 = echarts.init(chartDom9);
        let option9 = lineOptionsNum(customer_service_trend.customer_service_sales);
        let listener9 = function () {
            if (myChart9) {
                myChart9.resize();
            }
        };
        option9 && myChart9.setOption(option9);
        EleResize.on(chartDom9, listener9);

        let chartDom10: any = document.getElementById('index10');
        let myChart10 = echarts.init(chartDom10);
        let option10 = lineOptionsNum(customer_service_trend.customer_service_sales_ratio);
        let listener10 = function () {
            if (myChart10) {
                myChart10.resize();
            }
        };
        option10 && myChart10.setOption(option10);
        EleResize.on(chartDom10, listener10);

        let chartDom11: any = document.getElementById('index11');
        let myChart11 = echarts.init(chartDom11);
        let option11 = lineOptionsNum(customer_service_trend.average_response_time_in_seconds);
        let listener11 = function () {
            if (myChart11) {
                myChart11.resize();
            }
        };
        option11 && myChart11.setOption(option11);
        EleResize.on(chartDom11, listener11);

        let chartDom12: any = document.getElementById('index12');
        let myChart12 = echarts.init(chartDom12);
        let option12 = lineOptionsNum(customer_service_trend.customer_satisfaction_rate);
        let listener12 = function () {
            if (myChart12) {
                myChart12.resize();
            }
        };
        option12 && myChart12.setOption(option12);
        EleResize.on(chartDom12, listener12);

        let chartDom13: any = document.getElementById('index13');
        let myChart13 = echarts.init(chartDom13);
        let option13 = lineOptionsNum(customer_service_trend.customer_satisfaction_rate);
        let listener13 = function () {
            if (myChart13) {
                myChart13.resize();
            }
        };
        option13 && myChart13.setOption(option13);
        EleResize.on(chartDom13, listener13);

        customer_analysis_trend.chatrsX = []
        customer_analysis_trend.total_membership_count = []
        customer_analysis_trend.member_average_order_value = []
        customer_analysis_trend.lineData[0].data = []
        customer_analysis_trend.lineData[1].data = []
        customer_analysis_trend.lineData[2].data = []
        allData.data.customer_analysis_trend.records?.map((item: any) => {
            customer_analysis_trend.chatrsX.push(item.date)
            customer_analysis_trend.total_membership_count.push(item.total_membership_count)
            customer_analysis_trend.member_average_order_value.push(item.member_average_order_value)

            customer_analysis_trend.lineData[0].data.push(item.member_transaction_penetration)
            customer_analysis_trend.lineData[1].data.push(item.industry_standard_penetration)
            customer_analysis_trend.lineData[2].data.push(item.industry_premium_penetration)
        })

        let chartDom14: any = document.getElementById('index14');
        let myChart14 = echarts.init(chartDom14);
        let option14 = lineFillOptionsNum(customer_analysis_trend.total_membership_count, mergeArr(customer_analysis_trend.chatrsX));
        let listener14 = function () {
            if (myChart14) {
                myChart14.resize();
            }
        };
        option14 && myChart14.setOption(option14);
        EleResize.on(chartDom14, listener14);

        let chartDom15: any = document.getElementById('index15');
        let myChart15 = echarts.init(chartDom15);
        let option15 = lineOptions1_y(customer_analysis_trend.lineData, mergeArr(customer_analysis_trend.chatrsX), true);
        let listener15 = function () {
            if (myChart15) {
                myChart15.resize();
            }
        };
        option15 && myChart15.setOption(option15);
        EleResize.on(chartDom15, listener15);
        
        let chartDom16: any = document.getElementById('index16');
        let myChart16 = echarts.init(chartDom16);
        let option16 = lineFillOptionsNum(customer_analysis_trend.member_average_order_value, mergeArr(customer_analysis_trend.chatrsX));
        let listener16 = function () {
            if (myChart16) {
                myChart16.resize();
            }
        };
        option16 && myChart16.setOption(option16);
        EleResize.on(chartDom16, listener16);

        customer_loss_trend.chatrsX = []
        customer_loss_trend.amount_of_loss = []
        customer_loss_trend.lost_members = []
        customer_loss_trend.stores_causing_loss = []
        allData.data.customer_loss_trend.records?.map((item: any) => {
            customer_loss_trend.chatrsX.push(item.date)
            customer_loss_trend.amount_of_loss.push(item.amount_of_loss)
            customer_loss_trend.lost_members.push(item.lost_members)
            customer_loss_trend.stores_causing_loss.push(item.stores_causing_loss)
        })
        
        let chartDom17: any = document.getElementById('index17');
        let myChart17 = echarts.init(chartDom17);
        let option17 = lineFillOptionsNum(customer_loss_trend.amount_of_loss, mergeArr(customer_loss_trend.chatrsX));
        let listener17 = function () {
            if (myChart17) {
                myChart17.resize();
            }
        };
        option17 && myChart17.setOption(option17);
        EleResize.on(chartDom17, listener17);
        
        let chartDom18: any = document.getElementById('index18');
        let myChart18 = echarts.init(chartDom18);
        let option18 = lineFillOptionsNum(customer_loss_trend.lost_members, mergeArr(customer_loss_trend.chatrsX));
        let listener18 = function () {
            if (myChart18) {
                myChart18.resize();
            }
        };
        option18 && myChart18.setOption(option18);
        EleResize.on(chartDom18, listener18);
        
        let chartDom19: any = document.getElementById('index19');
        let myChart19 = echarts.init(chartDom19);
        let option19 = lineFillOptionsNum(customer_loss_trend.stores_causing_loss, mergeArr(customer_loss_trend.chatrsX));
        let listener19 = function () {
            if (myChart19) {
                myChart19.resize();
            }
        };
        option19 && myChart19.setOption(option19);
        EleResize.on(chartDom19, listener19);
    }
}

// mock折线数据
const lineData = () => {
    let arr = []
    let max = 5000
    let min = 1
    for (let i = 0; i < 15; i++) {
        let num = parseInt(Math.random() * (max - min + 1) + min)
        arr.push(num)
    }
    return arr
}
</script>
<style lang="scss" scoped>
.storeAnalysis{
    overflow-y: auto;
    overflow-x: hidden;
}

.el-row {
    padding: 0;
}

.el-col {
    position: relative;
}

.index_top {
    height: 120px;
    z-index: 100;
}

.numS {
    text-align: center;
    font-size: 2.3vw;
    color: rgba(255, 255, 255, 1);
    padding: 20px 0 10px 0;
}

.describe {
    text-align: center;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
}

.pageBody {
    padding: 30px 20px 0;
}

.boxHead {
    background-repeat: no-repeat;
    background-image: $box_head_bg_img;
    font-size: 24px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 0 0 4.5vw;
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

#box_body {
    background-image: $echarts_bg_img2;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 280px;
    position: relative;
}

.indexStore {
    height: 355px;
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

.search {
    padding-top: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;

    .search_left {
        display: flex;
        flex: 0.35;
        // justify-content: space-between;

    }

    .search_right {
        // display: flex;
        // flex: 0.35;
    }

    .search_line {
        margin: 0 10px;

        .line {
            display: flex;
        }

        .select_width {
            width: 100px;
        }

    }
}
</style>