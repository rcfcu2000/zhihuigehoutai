<!--
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-01-31 16:15:30
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-02-05 18:45:14
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
                                <div id="index1">

                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="numS">

                                </div>
                                <div id="index2">

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
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        店铺服务分析
                    </div>
                    <div id="box_body">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        客服板块
                    </div>
                    <div id="box_body">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        会员分析
                    </div>
                    <div id="box_body">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="indexStore">
                    <div class="boxHead">
                        流失分析
                    </div>
                    <div id="box_body">
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>

    <!-- 头部的查询条件，追加进page_header组件 -->
    <Teleport to=".header_right">
        <div class="search">
            <div class="search_right">
                <label>请选择起止时间</label>
                <el-date-picker v-model="searchData.date" :clearable="false" size="small" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange" start-placeholder="开始时间"
                    end-placeholder="结束时间" />
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
import page_header from './components/page_header.vue'

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
        console.log(numS.data, "numS.data.shop_index.turnover_ratenumS.data.shop_index.turnover_rate")
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

        allData.data.shop_index_trend.records?.map((item: any) => {
            shop_index_trend.chatrsX.push(item.date)
            shop_index_trend.turnover_rate.push(item.turnover_rate)
            shop_index_trend.ranking.push(item.ranking)
        })
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

        allData.data.customer_analysis_trend.records?.map((item: any) => {
            customer_analysis_trend.chatrsX.push(item.date)
            customer_analysis_trend.total_membership_count.push(item.total_membership_count)
            customer_analysis_trend.member_average_order_value.push(item.member_average_order_value)

            customer_analysis_trend.lineData[0].data.push(item.member_transaction_penetration)
            customer_analysis_trend.lineData[1].data.push(item.industry_standard_penetration)
            customer_analysis_trend.lineData[2].data.push(item.industry_premium_penetration)
        })

        allData.data.customer_loss_trend.records?.map((item: any) => {
            customer_loss_trend.chatrsX.push(item.date)
            customer_loss_trend.amount_of_loss.push(item.amount_of_loss)
            customer_loss_trend.lost_members.push(item.lost_members)
            customer_loss_trend.stores_causing_loss.push(item.stores_causing_loss)

        })

        allData.data.customer_service_trend.records?.map((item: any) => {
            customer_service_trend.chatrsX.push(item.date)

            customer_service_trend.customer_service_sales.push(item.customer_service_sales)
            customer_service_trend.customer_service_sales_ratio.push(item.customer_service_sales_ratio)
            customer_service_trend.average_response_time_in_seconds.push(item.average_response_time_in_seconds)
            customer_service_trend.customer_satisfaction_rate.push(item.customer_satisfaction_rate)
            customer_service_trend.inquiry_conversion_rate.push(item.inquiry_conversion_rate)
        })
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
.index_top {
    height: 120px;
    z-index: 100;
}

.numS {
    text-align: center;
    font-size: 48px;
    color: rgba(255, 255, 255, 1);
    padding: 20px 0 10px 0;
}

.describe {
    text-align: center;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.7);
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
    padding-top: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .search_left {
        display: flex;
        flex: 0.35;
        // justify-content: space-between;

    }

    .search_right {
        display: flex;
        flex: 0.35;
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