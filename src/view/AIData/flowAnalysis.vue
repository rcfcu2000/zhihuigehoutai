<template>
    <div class="main" v-loading="state.loading" element-loading-background="rgba(122, 122, 122, 0.8)">
        <el-affix :offset="0">
            <div class="header">
                <span class="titl1_h1">流量分析</span>
                <div class="search">
                    <div class="search_left">
                        <div class="search_line">
                            负责人：
                            <el-select v-model="searchData.product_manager" collapse-tags collapse-tags-tooltip
                                class="select_width" placeholder="请选择" @change="getAllEcharts">
                                <el-option v-for="item in state.responsibleList" :key="item.responsible"
                                    :label="item.responsible" :value="item.responsible" />
                            </el-select>
                        </div>
                    </div>
                    <div class="search_right">
                        <div class="search_line">
                            流量归属原则：
                            <el-radio-group v-model="searchData.traffic_belong" @change="getAllEcharts" size="large">
                                <el-radio-button label="第一次" value="第一次" />
                                <el-radio-button label="每一次" value="每一次" />
                                <el-radio-button label="最后一次" value="最后一次" />
                            </el-radio-group>
                        </div>
                        <div class="search_line">
                            请选择起止时间：
                            <el-date-picker @change="getAllEcharts" v-model="searchData.date" :clearable="false"
                                format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate"
                                type="daterange" start-placeholder="开始时间" end-placeholder="结束时间" />
                        </div>
                    </div>
                </div>
            </div>
        </el-affix>

        <div class="pad020">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="title">渠道分布</div>
                    <div class="echarts_box">
                        <div id="pie1" style="height: 150px;"> </div>
                        <div id="pie2" style="height: 150px;"> </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="title">
                        <span>重点渠道访客&GMV趋势</span>
                        <el-select :key="channelsdata_key" @change="selectChange" v-model="searchData.channel" multiple
                            collapse-tags collapse-tags-tooltip placeholder="请选择渠道" style="width: 240px"
                            class="gmvTrend">
                            <el-option v-for="item in channelsdata" :key="item.channel" :label="item.channel"
                                :value="item.channel" />
                        </el-select>
                    </div>
                    <div class="echarts_box">
                        <div id="line1" style="height: 150px;"> </div>
                        <div id="line2" style="height: 150px;"> </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="echarts_title">货盘商品数</div>
                    <div class="echarts_box" id="barPallet" style="height: 250px;">

                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="echarts_title">商品明细</div>
                    <div class="echarts_box">
                        <div>
                            <el-table :data="productData.tableData" border v-loading="productLoad"
                                element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 250px"
                                v-el-table-infinite-scroll="loadMore_product" :infinite-scroll-distance="100"
                                :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                                :infinite-scroll-delay="2000" lazy :load="load_product"
                                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                                @cell-click="proCellClick">
                                <el-table-column label="商品ID" width="150">
                                    <template #default="scope">F
                                        <span>{{ scope.row.product_id }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品简称" show-overflow-tooltip width="200">

                                    <template #default="scope">
                                        <span>{{ scope.row.product_alias }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="GMV" width="150" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.gmv }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="净利润" align="center" width="120">

                                    <template #default="scope">
                                        <div class="alcenter">
                                            <el-icon size="15" color="#03FF91" v-if="scope.row.profit > 0.2">
                                                <Top />
                                            </el-icon>
                                            <el-icon size="15" color="#FECD04"
                                                v-if="scope.row.profit < 0.2 && scope.row.profit > -0.5">
                                                <Right />
                                            </el-icon>
                                            <el-icon size="15" color="red" v-if="scope.row.profit < -0.5">
                                                <Bottom />
                                            </el-icon>
                                            <span> {{ scope.row.profit }} </span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="盘货变化" align="center">

                                    <template #default="scope">
                                        <div v-if="scope.row.pallet_change === 1"
                                            style="width: 100%; background-color: #01E5FF;">上升
                                        </div>
                                        <div v-else-if="scope.row.pallet_change === -1" style="background-color: red;">
                                            下降
                                        </div>
                                        <div v-else>持平</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="上月货盘" align="center">

                                    <template #default="scope">
                                        <span>{{ scope.row.pre_pallet }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本月货盘" align="center">

                                    <template #default="scope">
                                        <span>{{ scope.row.cur_pallet }}</span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column label="货盘" align="center">

                                    <template #default="scope">
                                        <span>{{ scope.row.pallet }}</span>
                                    </template>
                                </el-table-column> -->
                                <el-table-column label="老客占比" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.old_percentage }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="付费GMV占比" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.pay_gmv_percentage }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="推广花费占比" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.spend_percentage }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="综合得分" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.overall_score }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="加购效率" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.add_car_efficiency }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="退款效率" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.refund_efficiency }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="复购效率" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.repurchase_efficiency }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="流量效率" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.loss_efficiency }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="转化效率" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.conversion_efficiency }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="支付转化率" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.pay_conversion_rate }}%</span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column label="流量归属原则" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.belong }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="责任人" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.responsible }}</span>
                                    </template>
                                </el-table-column> -->
                                <el-table-column label="UV价值" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.uv }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="跳失率" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.bounce_rate }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="平均停留时长" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.avg_stay_duration }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="访问深度" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.depth_visit }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="二级类目名称" width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.category_lv2 }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品名称" show-overflow-tooltip width="130" align="center">

                                    <template #default="scope">
                                        <span> {{ scope.row.product_name }}</span>
                                    </template>
                                </el-table-column>

                                <template #empty>
                                    <div class="flex items-center justify-center"
                                        style="height: 200px;width: 50%;display: flex;align-items: center;justify-content: center;">
                                        暂无数据
                                    </div>
                                </template>
                            </el-table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="tableHead" style="margin: 30px 0 0;"><span>流量分析</span> </div>
                    <div style="margin: 0px 0 30px;">
                        <el-table :data="flowData.tableData" border v-loading="flowLoad" class="palletGmv"
                            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 400px"
                            v-el-table-infinite-scroll="loadMore_flow" :infinite-scroll-distance="100"
                            :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                            :infinite-scroll-delay="2000" lazy :load="load_product"
                            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                            <el-table-column label="三级来源(组)" width="150" :show-overflow-tooltip="true">

                                <template #default="scope">
                                    <span>{{ scope.row.source_type_3 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="访客数" sortable :sort-method="(a, b) => sortList(a, b, 'gmv')"
                                width="100">

                                <template #default="scope">
                                    <span>{{ scope.row.visitors_count }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="访客TGI" width="100" align="center">

                                <template #default="scope">
                                    <span> {{ scope.row.visitor_tgi }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="购买TGI" width="100" align="center">

                                <template #default="scope">
                                    <span> {{ scope.row.buy_tgi }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="渠道属性" width="100" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.channel_attribute }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="渠道属性差异" width="120" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.channel_diff }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="客单价" width="100" align="center">

                                <template #default="scope">
                                    <span> {{ scope.row.customer_unit_price }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="支付买家数" width="100" align="center">

                                <template #default="scope">
                                    <span> {{ scope.row.paid_buyers }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="支付转化率" align="center" width="100">

                                <template #default="scope">
                                    <span>{{ scope.row.pay_conversion_rate }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="加购率" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.add_car_rate }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="加购人数" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.add_to_cart_buyers }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="加购转化率" width="100" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.add_cart_conversion_rate }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="全店加购率" width="100" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.shop_add_car_rate }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="全店加购转化率" width="130" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.shop_add_cart_conversion_rate }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="全店支付转化率" width="130" align="center">

                                <template #default="scope">
                                    <span>缺少字段</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="UV价值" width="80" align="center">

                                <template #default="scope">
                                    <span> {{ scope.row.uv }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="本品访客占比" width="120" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.product_visitor_percentage }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="本品买家占比" width="120">

                                <template #default="scope">
                                    <span>{{ scope.row.product_buyer_percentage }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="全店访客占比" width="120">

                                <template #default="scope">
                                    <span>{{ scope.row.shop_visitor_percentage }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="全店买家占比" width="120">

                                <template #default="scope">
                                    <span>{{ scope.row.shop_buyer_percentage }}%</span>
                                </template>
                            </el-table-column>

                            <template #empty>
                                <div class="flex items-center justify-center"
                                    style="height: 300px;width: 50%;display: flex;align-items: center;justify-content: center;">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="title">客户新访分析</div>
                    <div class="trend_comparison_box" id="customerAnalysis" style="height: 350px;">
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="title">客户新访转化率对比</div>
                    <div class="trend_comparison_box" id="customerRate" style="height: 350px;">
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="tableHead" style="margin: 30px 0 0;"><span>新老客分析</span> </div>
                    <div style="margin: 0px 0 30px;">
                        <el-table :data="customerData.tableData" border v-loading="customerLoad" class="palletGmv"
                            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 350px"
                            v-el-table-infinite-scroll="loadMore_customer" :infinite-scroll-distance="100"
                            :infinite-scroll-disabled="false" :infinite-scroll-immediate="false"
                            :infinite-scroll-delay="2000" lazy :load="load_product"
                            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                            <el-table-column label="日期" width="120">

                                <template #default="scope">
                                    <span>{{ scope.row.date }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="店铺客户数" show-overflow-tooltip width="120" sortable
                                :sort-method="(a, b) => sortList(a, b, 'search_gmv_ratio')">

                                <template #default="scope">
                                    <span>{{ scope.row.total_customers }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="客户新访" width="80" align="center">

                                <template #default="scope">
                                    <span> {{ scope.row.new_visits }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="客户新访占比" width="120" align="center">

                                <template #default="scope">
                                    <div class="alcenter">
                                        <el-icon size="15" color="#03FF91" v-if="scope.row.new_visits_percentage > 0.2">
                                            <Top />
                                        </el-icon>
                                        <el-icon size="15" color="#FECD04"
                                            v-if="scope.row.new_visits_percentage < 0.2 && scope.row.new_visits_percentage > -0.5">
                                            <Right />
                                        </el-icon>
                                        <el-icon size="15" color="red" v-if="scope.row.new_visits_percentage < -0.5">
                                            <Bottom />
                                        </el-icon>
                                        <span> {{ lueNum((scope.row.new_visits_percentage)) }} %</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="未购客户回访占比" width="150" align="center">

                                <template #default="scope">
                                    <span>{{ lueNum(scope.row.non_purchase_return_visits_percentage) }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="店铺转化率" width="100" align="center">

                                <template #default="scope">
                                    <div :class="scope.row.conversion_rate > 0.3 ? 'backgroundBlue' : ''"> {{
        lueNum((scope.row.conversion_rate)) }} %</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="客户新访转化率" width="150" align="center">

                                <template #default="scope">
                                    <span> {{ lueNum((scope.row.new_visit_payment_conversion_rate)) }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="未购新客回访转化率" width="180" align="center">

                                <template #default="scope">
                                    <span> {{ lueNum((scope.row.non_purchase_return_visits_percentage)) }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="已购新客回访转化率" width="180" align="center">

                                <template #default="scope">
                                    <span>{{ lueNum(scope.row.purchased_customer_return_visits_percentage) }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="店铺UV价值" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.shop_uv }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="客户新访UV价值" align="center">

                                <template #default="scope">
                                    <div v-if="scope.row.new_visit_uv === 1"
                                        style="width: 100%; background-color: #01E5FF;">上升
                                    </div>
                                    <div v-else-if="scope.row.new_visit_uv === -1" style="background-color: red;">下降
                                    </div>
                                    <div v-else>持平</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="未购新客回访UV价值" width="180" align="center">

                                <template #default="scope">
                                    <span>{{ scope.row.non_purchaser_uv }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="已购客户回访UV价值" width="180" align="center">

                                <template #default="scope">
                                    <span> {{ scope.row.purchaser_uv }} %</span>
                                </template>
                            </el-table-column>

                            <template #empty>
                                <div class="flex items-center justify-center"
                                    style="height: 300px;width: 50%;display: flex;align-items: center;justify-content: center;">
                                    <span> 暂无数据</span>
                                </div>
                            </template>
                        </el-table>
                    </div>
                </el-col>

            </el-row>
        </div>

        <goHome />
    </div>
</template>

<script setup lang="ts" name="palletLinkAnalysis">
import { tableColumns } from "./table";
import goHome from "./components/goHome.vue";
import {
    getResponsibleList,
    getCategoriesList,
    getChanneldata,
    getGmvVistorTrenddata,
    getPalletCountdata,
    getTrafficListdata,
    getProductListdata_traffic,
    getNewOldCustomerListdata,
    getTrafficChannelsdata,
} from "@/api/AIdata";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { useUserStore } from "@/pinia/modules/user";
import { reactive, onMounted, onUnmounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { persentNum, floatNum, lueNum,lueNum1, roundNum, groupBy } from "@/utils/format.js";
import type { FormInstance } from "element-plus";
import { pieOptionsHome, lineOptions1, XbarOptions, XYlineFlowOptions, XlineFlowOptions, lineOptions_lineAndbar, lineOptions } from "./echartsOptions";
const userStore = useUserStore();
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
const formRef = ref<FormInstance>();
const cities = [
    {
        label: -1,
        value: "上升",
    },
    {
        label: 0,
        value: "持平",
    },
    {
        label: 1,
        value: "下降",
    },
    {
        label: 100,
        value: "其他",
    },
];
const state = reactive({
    tableData: [],
    loading: true,
    responsibleList: [] as any,

});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const searchData = reactive({
    product_manager: [] as Array<any>, //	string 商品负责人 - 负责该商品的人员或团队名称w
    pallet: [], // 货盘
    // all: 999 as any,
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    productid: "",
    start_date: "",
    end_date: "",
    shop_name: "蜡笔派家居旗舰店", //店铺名称
    traffic_belong: "每一次", //流量归属原则
    channel: ['手淘搜索', '手淘推荐', '关键词推广', '精准人群推广', '智能场景'] as any, // 渠道
    pageNum: 0,
    pageSize: 20,
});

onMounted(async () => {
    await getData();
});

const getData = async () => {
    const [resp1, resp2] = [await getResponsibleList(), await getCategoriesList()];
    if (resp1.code === 0 && resp2.code === 0) {
        state.responsibleList = resp1.data.records;
        searchData.product_manager = [resp1.data.records[0].responsible];
        getAllEcharts()
        state.loading = false
    }
};


const getData2 = async () => {
    state.loading = true;
    let data = {
        // end_date: searchData.date[1],
        // start_date: searchData.date[0],
        // product_manager: searchData.product_manager,
        // inventory_change: searchData.inventory_change,
        // current_inventory: searchData.current_inventory,
    };

};

const getAllEcharts = async () => {
    state.loading = true;

    await getTrafficdata()
    await getPieEcharts()
    await getLineEcharts()
    await palletEcharts()
    await getProduct()
    await getFlow()
    await getCustomer()
    state.loading = false;
}

// 渠道列表
let channelsdata_key = ref(0)
let channelsdata = []
const getTrafficdata = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getTrafficChannelsdata(data)];
    if (res.code == 0) {
        channelsdata = res.data.records.length > 0 ? res.data.records : []
        channelsdata_key.value++
    }
}

const selectChange = async () => {
    await getLineEcharts()
    await getPieEcharts()
}

// 渠道分布
const pieData = {} as any
const getPieEcharts = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getChanneldata(data)];
    if (res.code == 0) {
        let pie1Data = {
            data: [],
            legendData: []
        } as any;
        let pie2Data = {
            data: [],
            legendData: []
        } as any;
        let legendData = [] as any;
        res.data.records?.map((item: any, index: any) => {
            let p1 = {
                name: item.tertiary_source,
                value: item.visitors_count
            };
            let p2 = {
                name: item.tertiary_source,
                value: item.gmv
            };
            legendData.push(item.tertiary_source)
            pie1Data.data.push(p1)
            pie2Data.data.push(p2)
        });
        pie1Data.legendData = legendData
        pie2Data.legendData = legendData

        const chartDom1 = document.getElementById("pie1") as HTMLElement;
        chartDom1.removeAttribute('_echarts_instance_')
        const myChart1 = echarts.init(chartDom1);

        const chartDom2 = document.getElementById("pie2") as HTMLElement;
        chartDom2.removeAttribute('_echarts_instance_')
        const myChart2 = echarts.init(chartDom2);

        const option1 = pieOptionsHome(pie1Data, '访客数');
        const option2 = pieOptionsHome(pie2Data, 'GMV');
        option1 && myChart1.setOption(option1);
        option2 && myChart2.setOption(option2);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        let listener2 = function () {
            if (myChart2) {
                myChart2.resize();
            }
        };
        EleResize.on(chartDom1, listener1);
        EleResize.on(chartDom2, listener2);
    }

}

// 重点渠道访客&GMV趋势
const getLineEcharts = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getGmvVistorTrenddata(data)];
    if (res.code == 0) {
        if (res.data.records) {
            const gmvTrendData = groupBy(res.data.records, 'tertiary_source')
            // 自增分组后的键
            let increment = 0;
            const incrementedKeysGroup = Object.keys(gmvTrendData).reduce((acc, key) => {
                acc[increment] = gmvTrendData[key];
                increment++;
                return acc;
            }, {});
            const arr = Object.values(incrementedKeysGroup)
            let seriesGmvData = [] as any
            let seriesVisData = [] as any
            let date = [] as any
            arr.map((item: any, index: any) => {
                let objGmv = {
                    name: '',
                    data: [] as any
                }
                let objVis = {
                    name: '',
                    data: [] as any
                }
                item.map((itm: any, idx: any) => {
                    objGmv.name = itm.tertiary_source
                    objGmv.data.push(itm.gmv)
                    objVis.name = itm.tertiary_source
                    objVis.data.push(itm.visitors_count)
                    if (index == 0) {
                        date.push(itm.date)
                    }
                })
                seriesGmvData.push(objGmv)
                seriesVisData.push(objVis)
            })

            const chartDom1: any = document.getElementById("line1") as HTMLElement;
            chartDom1.removeAttribute('_echarts_instance_')
            const myChart1 = echarts.init(chartDom1);

            const chartDom2: any = document.getElementById("line2") as HTMLElement;
            chartDom2.removeAttribute('_echarts_instance_')
            const myChart2 = echarts.init(chartDom2);

            if (chartDom1 != null && chartDom1 != "" && chartDom1 != undefined) {
                myChart1.clear()
            }
            if (chartDom2 != null && chartDom2 != "" && chartDom2 != undefined) {
                myChart2.clear()
            }

            const option1: any = lineOptions1(seriesGmvData, date);
            const option2: any = lineOptions1(seriesVisData, date);
            option1 && myChart1.setOption(option1);
            option2 && myChart2.setOption(option2);
            let listener1 = function () {
                if (myChart1) {
                    myChart1.resize();
                }
            };
            let listener2 = function () {
                if (myChart2) {
                    myChart2.resize();
                }
            };
            EleResize.on(chartDom1, listener1);
            EleResize.on(chartDom2, listener2);
        }


    }
}

const palletEcharts = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getPalletCountdata(data)];
    if (res.code == 0) {
        let arr = res.data.records?.map((item: any, index: any) => {
            item.name = item.pallet
            item.data = item.count
            return item
        })

        const chartDom1 = document.getElementById("barPallet") as HTMLElement;
        chartDom1.removeAttribute('_echarts_instance_')
        const myChart1 = echarts.init(chartDom1);
        const option1 = XbarOptions(arr) as any;
        option1 && myChart1.setOption(option1);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };

        EleResize.on(chartDom1, listener1);

    }
}



const sortList = (obj1, obj2, name: string) => {
    let val1 = obj1[name]
    let val2 = obj2[name]
    return val1 - val2
}


// 商品数据
const productData = reactive({
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
    tableData: []
})
let product_pageNum = 1
const product_pageSize = ref(20)
let nomore_product = ref(false)
let productLoad = ref(true)
let load_product = ref(false) //树节点加载
const getProduct = async () => {
    productLoad.value = true
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = product_pageNum
    data.pageSize = product_pageSize.value
    const [res] = [await getProductListdata_traffic(data)];
    if (res.code == 0) {
        const resd = res.data.records ? res.data.records.map((item: any, index: any) => {
            item.avg_stay_duration = lueNum(item.avg_stay_duration)
            item.depth_visit = lueNum(item.depth_visit)
            item.gmv = lueNum(item.gmv)
            item.overall_score = lueNum(item.overall_score)
            item.pallet_change = lueNum(item.pallet_change)
            item.profit = lueNum(item.profit)
            item.uv = lueNum(item.uv)

            item.add_car_efficiency = lueNum(item.add_car_efficiency * 100)
            item.conversion_efficiency = lueNum(item.conversion_efficiency * 100)
            item.loss_efficiency = lueNum(item.loss_efficiency * 100)
            item.old_percentage = lueNum(item.old_percentage * 100)
            item.pay_conversion_rate = lueNum(item.pay_conversion_rate * 100)
            item.pay_gmv_percentage = lueNum(item.pay_gmv_percentage * 100)
            item.refund_efficiency = lueNum(item.refund_efficiency * 100)
            item.repurchase_efficiency = lueNum(item.repurchase_efficiency * 100)
            item.spend_percentage = lueNum(item.spend_percentage * 100)
            item.bounce_rate = lueNum(item.bounce_rate * 100)
            item.children = []
            item.hasChildren = true
            return item
        }) : []
        nomore_product.value = (resd.length > 0) ? false : true
        productData.tableData = productData.tableData.concat(resd)
        productLoad.value = false
    }
}
const loadMore_product = async () => {
    product_pageNum++
    debounce(getProduct(), 1000)
}
const proCellClick = (row: any, column: any, cell: HTMLTableCellElement, event: Event) => {
    row = { ...row }
    searchData.productid = row.product_id
    searchData.pageNum = 0
    flowData.tableData = []
    getFlow()
    console.log(row, column, cell, event, "row: any, column: any, cell: HTMLTableCellElement, event: Event")
}
// 流量分析
const flowData = reactive({
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
    tableData: []
})
let flow_pageNum = 1
const flow_pageSize = ref(20)
let nomore_flow = ref(false)
let flowLoad = ref(true)
let load_flow = ref(false)
const getFlow = async () => {
    flowLoad.value = true
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = flow_pageNum
    data.pageSize = flow_pageSize.value
    const [res] = [await getTrafficListdata(data)];
    if (res.code == 0) {
        const resd = res.data.records ? res.data.records.map((item: any, index: any) => {
            item.buy_tgi = lueNum1(item.buy_tgi)
            item.visitor_tgi = lueNum1(item.visitor_tgi)
            item.channel_diff = lueNum(item.channel_diff * 100)
            item.customer_unit_price = lueNum(item.customer_unit_price)
            item.uv = lueNum(item.uv)

            item.add_car_rate = lueNum(item.add_car_rate * 100)  //加购率
            item.add_cart_conversion_rate = lueNum(item.add_cart_conversion_rate * 100)  //加购转化率
            item.pay_conversion_rate = lueNum(item.pay_conversion_rate * 100)  //支付转化率
            item.product_buyer_percentage = lueNum(item.product_buyer_percentage * 100)  //本品买家占比
            item.product_visitor_percentage = lueNum(item.product_visitor_percentage * 100)  // 本品访客占比
            item.shop_add_car_rate = lueNum(item.shop_add_car_rate * 100)  // 全店加购率
            item.shop_add_cart_conversion_rate = lueNum(item.shop_add_cart_conversion_rate * 100)  // 全店加购转化率
            item.shop_buyer_percentage = lueNum(item.shop_buyer_percentage * 100)  // 全店买家占比
            item.shop_visitor_percentage = lueNum(item.shop_visitor_percentage * 100)  // 全店访客占比
            item.children = []
            item.hasChildren = true
            return item
        }) : []
        nomore_flow.value = (resd.length > 0) ? false : true
        flowData.tableData = flowData.tableData.concat(resd)
        flowLoad.value = false
    }
}
const loadMore_flow = async () => {
    flow_pageNum++
    debounce(getFlow(), 1000)
}

// 新老客分析
const customerData = reactive({
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
    tableData: []
})
let customer_pageNum = 1
const customer_pageSize = ref(20)
let nomore_customer = ref(false)
let customerLoad = ref(true)
let load_customer = ref(false)
const getCustomer = async () => {
    customerLoad.value = true
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    data.pageNum = customer_pageNum
    data.pageSize = customer_pageSize.value
    const [res] = [await getNewOldCustomerListdata(data)];
    if (res.code == 0) {
        const new_visit_data = [{
            name: "客户新访",
            type: 'bar',
            data: [] as any
        }, {
            name: "客户新访占比",
            type: 'line',
            data: [] as any
        }, {
            name: "未购客户回访占比",
            type: 'line',
            data: [] as any
        }, {
            name: "已购客户回访占比",
            type: 'line',
            data: [] as any
        },] as any
        const new_visit_rate_data = [{
            name: "店铺转化率",
            type: 'line',
            data: [] as any
        }, {
            name: "客户新访转化率",
            type: 'line',
            data: [] as any
        }, {
            name: "未购客户回访转化率",
            type: 'line',
            data: [] as any
        }, {
            name: "已购客户回访转化率",
            type: 'line',
            data: [] as any
        },] as any

        let timeX = [] as any
        const resd = res.data.records ? res.data.records.map((item: any, index: any) => {
            item.date = item.date.substring(5, 10)  //店铺UV价值  
            item.shop_uv = lueNum(item.shop_uv)  //店铺UV价值  
            item.purchaser_uv = lueNum(item.purchaser_uv)  //已购客户回访UV价值
            item.non_purchaser_uv = lueNum(item.non_purchaser_uv)  //未购客户回访UV价值
            item.new_visits = lueNum(item.new_visits)  // 客户新访
            item.new_visit_uv = lueNum(item.new_visit_uv)  //客户新访UV价值
            item.total_customers = lueNum(item.total_customers)  // 店铺客户数
            item.conversion_rate = lueNum(item.conversion_rate * 100)  //店铺转化率
            item.new_visit_payment_conversion_rate = lueNum(item.new_visit_payment_conversion_rate * 100)  //客户新访支付转化率
            item.new_visits_percentage = lueNum(item.new_visits_percentage * 100)  //  客户新访占比
            item.non_purchase_return_visits_percentage = lueNum(item.non_purchase_return_visits_percentage * 100) //  未购客户回访占比
            item.purchased_customer_return_visits_percentage = lueNum(item.purchased_customer_return_visits_percentage * 100)  //  已购客户回访占比
            item.return_visit_payment_conversion_rate_non_purchasers = lueNum(item.return_visit_payment_conversion_rate_non_purchasers * 100)  //  未购客户回访支付转化率
            item.return_visit_payment_conversion_rate_purchasers = lueNum(item.return_visit_payment_conversion_rate_purchasers * 100)  //  已购客户回访支付转化率

            new_visit_data[0].data.push(item.new_visits)
            new_visit_data[1].data.push(item.new_visits_percentage)
            new_visit_data[2].data.push(item.non_purchase_return_visits_percentage)
            new_visit_data[3].data.push(item.purchased_customer_return_visits_percentage)


            new_visit_rate_data[0].data.push(item.conversion_rate)
            new_visit_rate_data[1].data.push(item.new_visit_payment_conversion_rate)
            new_visit_rate_data[2].data.push(item.return_visit_payment_conversion_rate_non_purchasers)
            new_visit_rate_data[3].data.push(item.return_visit_payment_conversion_rate_purchasers)
            timeX.push(item.date)
            return item
            //     "date": "string",日期   lineOptions_lineAndbar
        }) : []
        nomore_customer.value = (resd.length > 0) ? false : true
        customerData.tableData = customerData.tableData.concat(resd)
        customerLoad.value = false

        const chartDom1 = document.getElementById("customerAnalysis") as HTMLElement;
        const myChart1 = echarts.init(chartDom1);
        const option1 = lineOptions_lineAndbar(new_visit_data, timeX, false, '');
        option1 && myChart1.setOption(option1);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        EleResize.on(chartDom1, listener1);

        const chartDom2 = document.getElementById("customerRate") as HTMLElement;
        const myChart2 = echarts.init(chartDom2);
        const option2 = lineOptions(new_visit_rate_data, timeX, false, '');
        option2 && myChart2.setOption(option2);
        let listener2 = function () {
            if (myChart2) {
                myChart2.resize();
            }
        };
        EleResize.on(chartDom2, listener2);
    }
}
const loadMore_customer = async () => {
    customer_pageNum++
    debounce(getCustomer(), 1000)
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
$echarts_bg_img: url("./images/_2.png");

.gmvTrend {
    margin: 0 0 0 20px;
    background: rgb(14, 58, 121) !important;
}

::v-deep(.el-radio-button__inner) {
    background: transparent;
    border-color: rgb(1, 229, 255) !important;
    color: #fff;
}

.echarts_title {
    margin: 10px 0 16px 0;
    width: 220px;
    height: 32px;
    padding-left: 40px;
    background-image: url("./images/11.png");
    background-size: 100% 100%;
    font-size: 24px;
}

.tableHead {
    background-image: $table_bg_Title;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 43px;
    width: 100%;
    font-size: 24px;
    padding-left: 2.5vw;
    font-weight: 700;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 1);
}

.main {
    height: 100%;
    width: 100%;
    background-image: url("./images/bc.jpg");
    background-size: 100% 100%;
    color: #fff;
    overflow-y: auto;
    overflow-x: hidden;

    ::v-deep(.el-checkbox) {
        margin: 0 10px;
        color: #fff;
    }

    ::v-deep(.el-radio) {
        margin: 0 10px;
        color: #fff;
    }

    .header {
        height: 63px;
        width: 100%;
        background-image: url("./images/0.png");
        background-size: 100% 100%;
        background-color: rgb(1, 16, 37);
        position: relative;

        .search {
            padding-top: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            .search_left {
                display: flex;
                flex: 0.4;
                // justify-content: space-between;

            }

            .search_right {
                display: flex;
                // flex: 0.3;
                align-items: center;
                justify-content: space-between;
            }

            .search_line {
                margin: 0 4px;
                display: flex;
                align-items: center;

                .line {
                    display: flex;
                }

                .select_width {
                    width: 150px;
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

    .pad020 {

        .title {
            height: 70px;
            line-height: 60px;
            padding-left: 80px;
            font-size: 24px;
            font-weight: 700;
            // width: 462px;
            background-image: url("./images/image-2.png");
            background-size: contain;
            background-repeat: no-repeat;
        }

        .title_btn {
            display: flex;
            justify-content: space-between;

            .btn {
                margin-top: 24px;
                padding: 0 20px;
                height: 40px;
                border-radius: 2px;
                font-size: 12px;
                font-weight: 700;
                border: none;
                color: #fff;
                background: linear-gradient(180deg,
                        rgba(0, 72, 92, 1) 0%,
                        rgba(1, 190, 226, 1) 100%);
            }
        }

        .table_title {
            margin-top: 20px;
            // width: 98%;
            height: 43px;
            line-height: 43px;
            font-size: 24px;
            padding: 0 60px;
            font-weight: 700;
            background-image: url("./images/table_title.png");
            // background: linear-gradient(90deg, #008CC2 0%, #008CC2 100%);
            background-size: 100% 100%;
            margin-left: 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        ::v-deep(.el-overlay) {
            .el-overlay-dialog {
                .el-dialog {
                    background: linear-gradient(116.95deg,
                            rgba(0, 13, 36, 1) 0%,
                            rgba(0, 82, 117, 1) 100%);

                    .el-dialog__header {
                        border-bottom: 2px solid rgba(6, 132, 188, 1);

                        .el-dialog__title {
                            color: #fff;
                        }
                    }

                    .dialog-content {
                        color: #fff;

                        .item_line {
                            position: relative;

                            .position_right {
                                position: absolute;
                                right: 20px;
                            }
                        }

                        .tip {
                            margin: 10px 0;
                            font-size: 16px;
                        }

                        .input_width {
                            width: 140px;
                            margin: 0 10px;
                        }

                        .input_style {
                            .el-input__wrapper {
                                background: transparent;

                                .el-input__inner {
                                    color: #fff;
                                }
                            }
                        }

                        .btn_style {
                            background: transparent;
                            color: #fff;
                            border: 1px solid #fff;
                        }
                    }

                    .dialog-footer {
                        .btn {
                            border: none;
                            padding: 8px 18px;
                            margin: 0 10px;
                            color: #fff;
                            background: transparent;
                        }

                        .cancellation {
                            border: 1px solid #fff;
                        }

                        .primary {
                            border: 1px solid rgb(7, 95, 154);
                            background: rgb(7, 95, 154);
                        }
                    }
                }
            }
        }
    }

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

::v-deep(.el-form-item__label) {
    color: rgba(1, 229, 255, 1);
    font-size: 16px;
    font-weight: 400;
    padding-right: 0;
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

::v-deep(.el-table__row--striped) {
    background-color: rgb(7, 35, 82, 1);
}

::v-deep(.el-table-fixed-column--left) {
    border-right: 1px solid rgb(16, 97, 197);
    background-color: rgb(26, 46, 161);
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

::v-deep(.el-table) {
    .el-table__header {
        border-bottom: 1px solid rgb(16, 97, 197);

        tr {
            // color: rgb(255, 153, 0);
        }
    }

    .el-table__row .el-table_1_column_1 {
        border-right: 1px solid rgb(16, 97, 197);
    }
}

::v-deep(.el-table__empty-text) {
    display: flex;
    justify-content: center;
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