<template>
    <div class="main" v-loading.fullscreen.lock="state.loading" element-loading-background="rgba(122, 122, 122, 0.8)">
        <el-affix :offset="0">
            <div class="header">
                <span class="titl1_h1">流量分析</span>
                <div class="search">
                    <div class="search_left">
                        <div class="search_line">
                            负责人
                            <el-select v-model="searchData.product_manager" collapse-tags collapse-tags-tooltip
                                class="select_width" placeholder="请选择" @change="getData2">
                                <el-option v-for="item in state.responsibleList" :key="item.responsible"
                                    :label="item.responsible" :value="item.responsible" />
                            </el-select>
                        </div>
                        <div class="search_line">
                            本期货盘
                            <el-select v-model="searchData.current_inventory" collapse-tags collapse-tags-tooltip clearable
                                multiple @change="getData2" class="select_width" placeholder="全部">
                                <el-option v-for="item in state.monthPallet" :key="item.current_inventory"
                                    :label="item.current_inventory" :value="item.current_inventory" />
                            </el-select>
                        </div>
                        <div class="search_line">
                            货盘变化
                            <el-select v-model="searchData.inventory_change" collapse-tags collapse-tags-tooltip clearable
                                multiple @change="getData2" class="select_width" placeholder="全部">
                                <el-option v-for="(item, index) in cities" :key="index" :label="item.value"
                                    :value="item.label">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="search_right">
                        <div class="search_line">
                            请选择起止时间
                            <el-date-picker @change="getData2" v-model="searchData.date" :clearable="false"
                                format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange"
                                start-placeholder="开始时间" end-placeholder="结束时间" />
                        </div>
                    </div>
                </div>
            </div>
        </el-affix>

        <div class="box1">
            <div class="box1_left">
                <div class="title">渠道分布</div>
                <div class="echarts_box">
                    <div id="pie1"> </div>
                    <div id="pie2"> </div>
                </div>
            </div>
            <div class="box1_right">
                <div class="title">重点渠道访客&GMV趋势</div>
                <div class="echarts_box">
                    <div id="line1"> </div>
                    <div id="line2"> </div>
                </div>
            </div>
        </div>

        <div class="box2">
            <div class="box2_left">
                <div class="echarts_title">货盘商品数</div>
                <div class="echarts_box" id="barPallet">

                </div>
            </div>
            <div class="box2_right">
                <div class="table_title">商品明细</div>
                <div class="echarts_box">
                    <div class="aiData_table table">
                        <el-table :data="state.tableData">
                            <el-table-column label="商品ID" width="150">
                                <template #default="scope">F
                                    <span>{{ scope.row.product_id }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="商品简称" show-overflow-tooltip width="200">
                                <template #default="scope">
                                    <span>{{ scope.row.product_abbreviation }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="GMV" sortable :sort-method="(a, b) => sortList(a, b, 'gmv')" width="150"
                                align="center">
                                <template #default="scope">
                                    <span> {{ parseFloat((scope.row.gmv).toFixed(0)) }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="净利润率" sortable
                                :sort-method="(a, b) => sortList(a, b, 'net_profit_margin')" width="150" align="center">
                                <template #default="scope">
                                    <div class="alcenter">
                                        <el-icon size="15" color="#03FF91" v-if="scope.row.net_profit_margin > 0.2">
                                            <Top />
                                        </el-icon>
                                        <el-icon size="15" color="#FECD04"
                                            v-if="scope.row.net_profit_margin < 0.2 && scope.row.net_profit_margin > -0.5">
                                            <Right />
                                        </el-icon>
                                        <el-icon size="15" color="red" v-if="scope.row.net_profit_margin < -0.5">
                                            <Bottom />
                                        </el-icon>
                                        <span> {{ parseFloat((scope.row.net_profit_margin * 100).toFixed(2)) }} %</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="产品分类" width="150" align="center">
                                <template #default="scope">
                                    <span>{{ scope.row.product_category }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="搜索访客占比" sortable
                                :sort-method="(a, b) => sortList(a, b, 'search_visitor_ratio')" width="150" align="center">
                                <template #default="scope">
                                    <div :class="scope.row.search_visitor_ratio > 0.3 ? 'backgroundBlue' : ''"> {{
                                        parseFloat((scope.row.search_visitor_ratio * 100).toFixed(2)) }} %</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="搜索GMV占比" sortable
                                :sort-method="(a, b) => sortList(a, b, 'search_gmv_ratio')" width="150" align="center">
                                <template #default="scope">
                                    <span> {{ parseFloat((scope.row.search_gmv_ratio * 100).toFixed(2)) }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="老客占比" sortable
                                :sort-method="(a, b) => sortList(a, b, 'returning_customer_ratio')" width="130"
                                align="center">
                                <template #default="scope">
                                    <span> {{ parseFloat((scope.row.returning_customer_ratio * 100).toFixed(2)) }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="本月货盘" align="center">
                                <template #default="scope">
                                    <span>{{ scope.row.current_inventory }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="上月货盘" align="center">
                                <template #default="scope">
                                    <span>{{ scope.row.last_period_stockpile }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="盘货变化" align="center">
                                <template #default="scope">
                                    <div v-if="scope.row.stockpile_change === 1"
                                        style="width: 100%; background-color: #01E5FF;">上升
                                    </div>
                                    <div v-else-if="scope.row.stockpile_change === -1" style="background-color: red;">下降
                                    </div>
                                    <div v-else>持平</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="客单价" sortable :sort-method="(a, b) => sortList(a, b, 'unit_price')"
                                width="100" align="center">
                                <template #default="scope">
                                    <span>{{ parseFloat((scope.row.unit_price).toFixed(2)) }} </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="预估毛利率" sortable
                                :sort-method="(a, b) => sortList(a, b, 'estimated_gross_profit_margin')" width="140"
                                align="center">
                                <template #default="scope">
                                    <span> {{ parseFloat((scope.row.estimated_gross_profit_margin * 100).toFixed(2))
                                    }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="支付转化率" sortable
                                :sort-method="(a, b) => sortList(a, b, 'payment_conversion_rate')" width="140"
                                align="center">
                                <template #default="scope">
                                    <span>{{ parseFloat((scope.row.payment_conversion_rate * 100).toFixed(2)) }} %</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="收藏率" sortable :sort-method="(a, b) => sortList(a, b, 'collection_rate')"
                                width="100" align="center">
                                <template #default="scope">
                                    <span> {{ parseFloat((scope.row.collection_rate * 100).toFixed(2)) }} %</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="加购率" sortable
                                :sort-method="(a, b) => sortList(a, b, 'add_to_cart_rate')" width="100" align="center">
                                <template #default="scope">
                                    <span> {{ parseFloat((scope.row.add_to_cart_rate * 100).toFixed(2)) }}%</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="连带率" sortable :sort-method="(a, b) => sortList(a, b, 'attachment_rate')"
                                width="100" align="center">
                                <template #default="scope">
                                    <span> {{ parseFloat((scope.row.attachment_rate).toFixed(2)) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="三级类目" width="200">
                                <template #default="scope">
                                    <span>{{ scope.row.tertiary_category }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="商品名称" show-overflow-tooltip width="200">
                                <template #default="scope">
                                    <span>{{ scope.row.product_name }}</span>
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
            </div>
        </div>


        <div class="table_title"><span>流量分析</span> </div>
        <div class="aiData_table table">
            <el-table :data="state.tableData" max-height="400">
                <el-table-column label="三级来源(组)" width="150">
                    <template #default="scope">
                        <span>{{ scope.row.product_id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="访客数" sortable :sort-method="(a, b) => sortList(a, b, 'gmv')" width="100">
                    <template #default="scope">
                        <span>{{ scope.row.product_abbreviation }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="访客TGI" width="100" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.gmv).toFixed(0)) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="购买TGI" width="100" align="center">
                    <template #default="scope">
                        <div class="alcenter">
                            <el-icon size="15" color="#03FF91" v-if="scope.row.net_profit_margin > 0.2">
                                <Top />
                            </el-icon>
                            <el-icon size="15" color="#FECD04"
                                v-if="scope.row.net_profit_margin < 0.2 && scope.row.net_profit_margin > -0.5">
                                <Right />
                            </el-icon>
                            <el-icon size="15" color="red" v-if="scope.row.net_profit_margin < -0.5">
                                <Bottom />
                            </el-icon>
                            <span> {{ parseFloat((scope.row.net_profit_margin * 100).toFixed(2)) }} %</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="渠道属性" width="100" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.product_category }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="渠道属性差异" width="120" align="center">
                    <template #default="scope">
                        <div :class="scope.row.search_visitor_ratio > 0.3 ? 'backgroundBlue' : ''"> {{
                            parseFloat((scope.row.search_visitor_ratio * 100).toFixed(2)) }} %</div>
                    </template>
                </el-table-column>
                <el-table-column label="客单价" width="100" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.search_gmv_ratio * 100).toFixed(2)) }}%</span>
                    </template>
                </el-table-column>
                <el-table-column label="支付买家数" width="100" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.returning_customer_ratio * 100).toFixed(2)) }}%</span>
                    </template>
                </el-table-column>
                <el-table-column label="支付转化率" align="center" width="100">
                    <template #default="scope">
                        <span>{{ scope.row.current_inventory }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="加购率" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.last_period_stockpile }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="加购人数" align="center">
                    <template #default="scope">
                        <div v-if="scope.row.stockpile_change === 1" style="width: 100%; background-color: #01E5FF;">上升
                        </div>
                        <div v-else-if="scope.row.stockpile_change === -1" style="background-color: red;">下降</div>
                        <div v-else>持平</div>
                    </template>
                </el-table-column>
                <el-table-column label="加购转化率" width="100" align="center">
                    <template #default="scope">
                        <span>{{ parseFloat((scope.row.unit_price).toFixed(2)) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="全店加购率" width="100" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.estimated_gross_profit_margin * 100).toFixed(2)) }}%</span>
                    </template>
                </el-table-column>
                <el-table-column label="全店加购转化率" width="130" align="center">
                    <template #default="scope">
                        <span>{{ parseFloat((scope.row.payment_conversion_rate * 100).toFixed(2)) }} %</span>
                    </template>
                </el-table-column>
                <el-table-column label="全店支付转化率" width="130" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.collection_rate * 100).toFixed(2)) }} %</span>
                    </template>
                </el-table-column>
                <el-table-column label="UV价值" width="80" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.add_to_cart_rate * 100).toFixed(2)) }}%</span>
                    </template>
                </el-table-column>
                <el-table-column label="本品访客占比" width="120" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.attachment_rate).toFixed(2)) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="本品买家占比" width="120">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.attachment_rate).toFixed(2)) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="全店访客占比" width="120">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.attachment_rate).toFixed(2)) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="全店买家占比" width="120">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.attachment_rate).toFixed(2)) }}</span>
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

        <div class="trend_comparison">
            <div class="trend_comparison_left flex_size">
                <div class="title">客户新访分析</div>
                <div class="trend_comparison_box" id="customerAnalysis">
                </div>
            </div>
            <div class="trend_comparison_right flex_size">
                <div class="title">客户新访转化率对比</div>
                <div class="trend_comparison_box" id="customerRate">
                </div>
            </div>
        </div>
        <div class="table_title"><span>新老客分析</span> </div>
        <div class="aiData_table table">
            <el-table :data="state.tableData" max-height="400">
                <el-table-column label="日期" width="120">
                    <template #default="scope">
                        <span>{{ scope.row.product_id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="店铺客户数" show-overflow-tooltip width="120" sortable
                    :sort-method="(a, b) => sortList(a, b, 'search_gmv_ratio')">
                    <template #default="scope">
                        <span>{{ scope.row.product_abbreviation }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="客户新访" width="80" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.gmv).toFixed(0)) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="客户新访占比" width="120" align="center">
                    <template #default="scope">
                        <div class="alcenter">
                            <el-icon size="15" color="#03FF91" v-if="scope.row.net_profit_margin > 0.2">
                                <Top />
                            </el-icon>
                            <el-icon size="15" color="#FECD04"
                                v-if="scope.row.net_profit_margin < 0.2 && scope.row.net_profit_margin > -0.5">
                                <Right />
                            </el-icon>
                            <el-icon size="15" color="red" v-if="scope.row.net_profit_margin < -0.5">
                                <Bottom />
                            </el-icon>
                            <span> {{ parseFloat((scope.row.net_profit_margin * 100).toFixed(2)) }} %</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="未购客户回访占比" width="150" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.product_category }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="店铺转化率" width="100" align="center">
                    <template #default="scope">
                        <div :class="scope.row.search_visitor_ratio > 0.3 ? 'backgroundBlue' : ''"> {{
                            parseFloat((scope.row.search_visitor_ratio * 100).toFixed(2)) }} %</div>
                    </template>
                </el-table-column>
                <el-table-column label="客户新访转化率" width="150" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.search_gmv_ratio * 100).toFixed(2)) }}%</span>
                    </template>
                </el-table-column>
                <el-table-column label="未购新客回访转化率" width="180" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.returning_customer_ratio * 100).toFixed(2)) }}%</span>
                    </template>
                </el-table-column>
                <el-table-column label="已购新客回访转化率" width="180" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.current_inventory }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="店铺UV价值" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.last_period_stockpile }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="客户新访UV价值" align="center">
                    <template #default="scope">
                        <div v-if="scope.row.stockpile_change === 1" style="width: 100%; background-color: #01E5FF;">上升
                        </div>
                        <div v-else-if="scope.row.stockpile_change === -1" style="background-color: red;">下降</div>
                        <div v-else>持平</div>
                    </template>
                </el-table-column>
                <el-table-column label="未购新客回访UV价值" width="180" align="center">
                    <template #default="scope">
                        <span>{{ parseFloat((scope.row.unit_price).toFixed(2)) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="已购客户回访UV价值" width="180" align="center">
                    <template #default="scope">
                        <span> {{ parseFloat((scope.row.collection_rate * 100).toFixed(2)) }} %</span>
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

        <goHome />
    </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import { tableColumns } from "./table";
import goHome from "./components/goHome.vue";
import {
    getAlldata,
    getPriceRangedata,
    getUserPriceRange,
    setUserPriceRange,
    getResponsibleList,
    getCategoriesList,
    getSubGmvList,
    inventorygetProductThendListdata,
} from "@/api/AIdata";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { useUserStore } from "@/pinia/modules/user";
import { reactive, onMounted, onUnmounted, ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { pieOptionsHome, lineOptions2, XbarOptions, XYlineFlowOptions, XlineFlowOptions } from "./echartsOptions";
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
    product_manager: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
    current_inventory: [] as any, // string 当期货盘
    inventory_change: [],
    all: 999 as any,
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
});


Math.floor(Math.random() * (1 - 100) + 100); //1~100的随机数
let data = Array.from(new Array(31), (x, i) =>
    Math.floor(Math.random() * (1 - 100) + 100)
);


onMounted(async () => {
    await getData();
});



const getData = async () => {
    const [resp1, resp2] = [await getResponsibleList(), await getCategoriesList()];
    if (resp1.code === 0 && resp2.code === 0) {
        state.responsibleList = resp1.data.records;
        // console.log([resp1.data.records[0].responsible])
        searchData.product_manager = resp1.data.records[0].responsible;
        getAllEcharts()
        state.loading = false
    }
};


const getData2 = async () => {
    state.loading = true;
    let data = {
        end_date: searchData.date[1],
        start_date: searchData.date[0],
        product_manager: searchData.product_manager,
        inventory_change: searchData.inventory_change,
        current_inventory: searchData.current_inventory,
    };

};

const getAllEcharts = () => {
    getPieEcharts()
    getLineEcharts()
    palletEcharts()
    customerAnalysisEcharts()
}



const getPieEcharts = () => {
    const chartDom1 = document.getElementById("pie1") as HTMLElement;
    chartDom1.removeAttribute('_echarts_instance_')
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("pie2") as HTMLElement;
    chartDom2.removeAttribute('_echarts_instance_')
    const myChart2 = echarts.init(chartDom2);

    const option1 = pieOptionsHome([], '访客数');
    const option2 = pieOptionsHome([], 'GMV');
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

const getLineEcharts = () => {
    const chartDom1 = document.getElementById("line1") as HTMLElement;
    chartDom1.removeAttribute('_echarts_instance_')
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("line2") as HTMLElement;
    chartDom2.removeAttribute('_echarts_instance_')
    const myChart2 = echarts.init(chartDom2);

    let arr = [
        {
            name: '手淘搜索',
            data: data,
        },
        {
            name: '手淘推荐',
            data: data,
        },
        {
            name: '万相台',
            data: data,
        },
        {
            name: '引力魔方',
            data: data,
        },
        {
            name: '直通车',
            data: data,
        },
    ]

    const option1 = lineOptions2(arr);
    const option2 = lineOptions2(arr);
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

const palletEcharts = () => {
    const chartDom1 = document.getElementById("barPallet") as HTMLElement;
    chartDom1.removeAttribute('_echarts_instance_')
    const myChart1 = echarts.init(chartDom1);
    let arr = [
        {
            name: 'S',
            data: 105
        },
        {
            name: 'A',
            data: 59
        },
        {
            name: 'B',
            data: 44
        },
        {
            name: 'C',
            data: 77
        },
        {
            name: 'D',
            data: 60
        },
    ]
    const option1 = XbarOptions(arr);
    option1 && myChart1.setOption(option1);
    let listener1 = function () {
        if (myChart1) {
            myChart1.resize();
        }
    };

    EleResize.on(chartDom1, listener1);
}

const customerAnalysisEcharts = () => {
    const chartDom1 = document.getElementById("customerAnalysis") as HTMLElement;
    chartDom1.removeAttribute('_echarts_instance_')
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("customerRate") as HTMLElement;
    chartDom2.removeAttribute('_echarts_instance_')
    const myChart2 = echarts.init(chartDom2);

    let arr = data;
    const option1 = XYlineFlowOptions(arr);
    option1 && myChart1.setOption(option1);

    const option2 = XlineFlowOptions(arr);
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



const sortList = (obj1, obj2, name: string) => {
    let val1 = obj1[name]
    let val2 = obj2[name]
    return val1 - val2
}





</script>
<style lang="scss" scoped>
$echarts_bg_img: url("./images/_2.png");

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
                flex: 0.3;
                justify-content: space-between;
            }

            .search_line {
                margin: 0 4px;

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

    .title {
        height: 70px;
        line-height: 60px;
        padding-left: 80px;
        font-size: 24px;
        font-weight: 700;
        width: 462px;
        background-image: url("./images/image-2.png");
        background-size: 100% 100%;
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

    .box1 {
        display: flex;
        // justify-content: space-between;
        height: 36%;
        justify-content: space-around;

        .echarts_box {
            height: calc(100% - 70px);
            width: 100%;
        }

        .box1_left {
            flex: 0.28;

            .title {
                width: 100%;
            }

            .echarts_box {

                background: url("./images/piecharts.png") no-repeat;
                background-position: left;
                display: flex;
                flex-direction: column;

                div {
                    flex: 0.5;
                    // border: 1px solid #ccc;
                }
            }
        }

        .box1_right {
            flex: 0.7;

            .echarts_box {
                // border: 1px solid #ccc;
                background-image: $echarts_bg_img;
                background-size: 100% 100%;
                display: flex;
                flex-direction: column;

                div {
                    flex: 0.5;
                    // border: 1px solid #ccc;
                }
            }
        }


    }

    .box2 {
        display: flex;
        // justify-content: space-between;
        height: 36%;
        justify-content: space-around;

        .echarts_box {
            height: calc(100% - 70px);
            width: 100%;
        }

        .box2_left {
            flex: 0.2;

            .title {
                width: 100%;
            }

            .echarts_box {

                background-image: $echarts_bg_img;
                background-size: 100% 100%;

            }
        }

        .box2_right {
            // flex: 0.78;
            width: 79%;
            height: 100%;

            .echarts_box {
                // background-color: #fff;
                overflow: hidden;

                .table {
                    height: 100%;
                    width: 98%;
                    overflow: auto;
                }
            }
        }


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

    .trend_comparison {

        height: 30%;
        display: flex;
        justify-content: space-around;

        .flex_size {
            flex: 0.48;
        }

        .trend_comparison_box {
            padding: 10px 20px;
            height: calc(100% - 78px);
            background-image: $echarts_bg_img;
            background-size: 100% 100%;
            position: relative;

            .eharts_empty {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
            }
        }
    }

    .table_title {
        margin-top: 20px;
        width: 98%;
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

    .table {
        height: 360px;
        padding: 10px;
        width: 98%;
        box-sizing: border-box;
        overflow: auto;
        margin-bottom: 10px;
        margin-top: 4px;
        overflow-x: hidden;

        .backgroundBlue {
            width: 100%;
            background-color: #01E5FF;
        }

        .alcenter {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        // border: 1px solid #fff;

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
</style>
  