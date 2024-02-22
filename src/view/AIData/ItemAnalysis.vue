<template>
    <div class="main" v-loading.fullscreen.lock="state.loading" element-loading-background="rgba(122, 122, 122, 0.8)">
        <el-affix :offset="0">
            <div class="header">
                <span class="titl1_h1">单品分析</span>
                <div class="search">
                    <div class="search_left">

                    </div>
                    <div class="search_right">
                        <div class="search_line">
                            商品选择
                            <el-select v-model="searchData.product_id" class="select_width" placeholder="请选择"
                                @change="getData" size="small" filterable remote reserve-keyword remote-show-suffix
                                :remote-method="remoteMethod" :loading="searchData.loading">
                                <el-option v-for="item in state.shopList" :key="item.product_id" :label="item.product_name"
                                    :value="item.product_id" />
                            </el-select>
                        </div>

                        <div class="search_line">
                            请选择起止时间
                            <el-date-picker v-model="searchData.date" @change="getData" :clearable="false" size="small"
                                format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange"
                                start-placeholder="开始时间" end-placeholder="结束时间" />
                        </div>
                    </div>
                </div>
            </div>
        </el-affix>

        <div class="box">
            <div class="child" style="flex: 0.58;">
                <div class="title">单品重点指标</div>
                <div class="box_container" style="display:flex; flex-direction:column;justify-content: space-between;">
                    <div class="roduct_num">
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts1"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">商品访客数</div>
                                <div class="num"> {{ parseFloat((state.itemData.visitors_count).toFixed(0)) }}</div>
                            </div>
                        </div>
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts2"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">GMV</div>
                                <div class="num">{{ parseFloat((state.itemData.gmv).toFixed(2)) }}</div>
                            </div>
                        </div>
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts3"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">支付转化率</div>
                                <div class="num">{{ parseFloat((state.itemData.payment_conversion_rate * 100).toFixed(2))
                                }}%
                                </div>
                            </div>
                        </div>
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts4"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">搜索访客占比</div>
                                <div class="num">{{ parseFloat((state.itemData.search_visitor_ratio * 100).toFixed(2)) }}%
                                </div>
                            </div>
                        </div>
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts5"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">搜索GMV占比</div>
                                <div class="num">{{ parseFloat((state.itemData.search_gmv_ratio * 100).toFixed(2)) }}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="roduct_num">
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts6"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">老客占比</div>
                                <div class="num">{{ parseFloat((state.itemData.returning_customer_ratio * 100).toFixed(2))
                                }}%</div>
                            </div>
                        </div>
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts7"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">退款率</div>
                                <div class="num">{{ parseFloat((state.itemData.refund_rate * 100).toFixed(2)) }}%</div>
                            </div>
                        </div>
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts8"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">免费搜索点击率</div>
                                <div class="num">{{ parseFloat((state.itemData.free_search_click_rate * 100).toFixed(2)) }}%

                                </div>
                            </div>
                        </div>
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts9"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">连带购买叶子类目宽度</div>
                                <div class="num">{{ parseFloat((state.itemData.bundle_purchase * 100).toFixed(2)) }}</div>
                            </div>
                        </div>
                        <div class="roduct_num_box">
                            <div class="roduct_num_box_charts" id="echarts10"></div>
                            <div class="roduct_num_box_text">
                                <div class="tit">复购率</div>
                                <div class="num">{{ parseFloat((state.itemData.repeat_purchase_rate * 100).toFixed(2)) }}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="child" style="flex: 0.38;">
                <div class="title">价格力分析</div>
                <div class="box_container bg_img" id="echarts11">
                </div>
            </div>
        </div>


        <div class="box">
            <div class="child">
                <div class="title">SKU占比分析</div>
                <div class="box_container bg_img" id="echarts12">
                </div>
            </div>
            <div class="child">
                <div class="title">评价分析</div>
                <div class="box_container bg_img" id="echarts13">
                </div>
            </div>
        </div>


        <el-row :gutter="20">
            <el-col :span="12">
                <wordsTbale v-model="count" :Commodity_detail="allData[0]" :comKey="1" :clearData="clearData"
                    :current_inventory="current_inventory" @load-more="loadMore" :tableCount="wordsCount" />
            </el-col>
            <el-col :span="12">
                <dayListTbale v-model="count" :Commodity_detail="allData[1]" :comKey="0" :clearData="clearData"
                    :current_inventory="current_inventory" @load-more="loadMore" :tableCount="dayCount" />
            </el-col>
        </el-row>
        <goHome />
    </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import goHome from "./components/goHome.vue";
import {
    getProductDayList,
    getKeywordList,
    getChart3data,
    getIndexTrend,
    getIndexdata,
    getProductlist
} from "@/api/AIdata";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { useUserStore } from "@/pinia/modules/user";
import { reactive, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import 'echarts-wordcloud'
import { lineOptionsNum, XYlineOptions, pieItemOptions, wordsCloud } from "./echartsOptions";
import { useThrottle, useDebounce } from '@/utils/throttle-debounce';
import dayListTbale from './components/dayList_table.vue'
import wordsTbale from './components/words_table.vue'
const userStore = useUserStore();
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import { fa } from "element-plus/es/locale";
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
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
const pageNum_day = ref(0)
const pageNum_words = ref(0)
const pageSize = ref(20)
const wordsCount = ref(0)
const dayCount = ref(0)
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    loading: false,
    date: ['2024-01-01', '2024-01-11'],
    pageNum: 0,
    pageSize: pageSize,
    product_id: '',
    start_date: '',
    end_date: '',
});

onMounted(async () => {
    state.loading = true
    const res = await getProductlist(
        { key: state.key }
    )
    if (res.code === 0) {
        state.shopList = res.data.records
        searchData.product_id = state.shopList[0]?.product_id
        await getData()
        searchData.loading = false
    }

    // await getSearchShopList()
    // setTimeout(async () => {
    // await getData()
    // }, 3000)
})

const getSearchShopList = useThrottle(async () => {
    const res = await getProductlist(
        { key: state.key }
    )
    state.shopList = res.data.records
    searchData.loading = false
}, 1000)

const remoteMethod = async (query: string) => {
    searchData.loading = true
    state.key = query
    getSearchShopList()
}

const getData = async () => {
    pageNum_day.value = 0
    pageNum_words.value = 0
    clearData[0] = true
    await getTopData()
    await getWordsList(searchData)
    await getDayList(searchData)
    // setTimeout(() => {
    //     state.loading = false
    // }, 1000)
}

const allData = reactive([{
    componentTitle: '关键词分析',
    data: [] as Array<any>,
    column: [
        {
            title: '类型', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', fixed: true, unit: '', children: [
                { title: '流量来源', width: 100, align: 'center', dataKey: 'keyword', key: 'keyword', unit: '', },
            ]
        },
        {
            title: '手淘搜索', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', unit: '', children: [
                { title: '访客数', width: 80, align: 'center', dataKey: 'visitor_count', key: 'visitor_count', unit: '', },
                { title: '加购率', width: 80, align: 'center', dataKey: 'plan_id', key: 'plan_id', unit: '', },
                { title: '转化率', width: 80, align: 'center', dataKey: 'plan_id', key: 'plan_id', unit: '', },
                { title: '粉丝支付买家数', width: 125, align: 'center', dataKey: 'fans_paid_buyers_count', key: 'fans_paid_buyers_count', unit: '', },
                { title: '直接支付买家数', width: 125, align: 'center', dataKey: 'direct_paid_buyers_count', key: 'direct_paid_buyers_count', unit: '', },
            ]
        },
        {
            title: '直通车', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', unit: '', children: [
                { title: '访客数', width: 80, align: 'center', dataKey: 'visitor_count', key: 'visitor_count', unit: '', },
                { title: '加购率', width: 80, align: 'center', dataKey: 'plan_id', key: 'plan_id', unit: '', },
                { title: '转化率', width: 80, align: 'center', dataKey: 'plan_id', key: 'plan_id', unit: '', },
                { title: '粉丝支付买家数', width: 125, align: 'center', dataKey: 'fans_paid_buyers_count', key: 'fans_paid_buyers_count', unit: '', },
                { title: '直接支付买家数', width: 125, align: 'center', dataKey: 'direct_paid_buyers_count', key: 'direct_paid_buyers_count', unit: '', },
            ]
        },
        {
            title: '总计', width: 100, align: 'center', dataKey: 'pallet', key: 'pallet', unit: '', children: [
                { title: '访客数', width: 80, align: 'center', dataKey: 'visitor_count', key: 'visitor_count', unit: '', },
                { title: '加购率', width: 80, align: 'center', dataKey: 'plan_id', key: 'plan_id', unit: '', },
                { title: '转化率', width: 80, align: 'center', dataKey: 'plan_id', key: 'plan_id', unit: '', },
                { title: '粉丝支付买家数', width: 125, align: 'center', dataKey: 'fans_paid_buyers_count', key: 'fans_paid_buyers_count', unit: '', },
                { title: '直接支付买家数', width: 125, align: 'center', dataKey: 'direct_paid_buyers_count', key: 'direct_paid_buyers_count', unit: '', },
            ]
        },
    ]
}, {
    componentTitle: '每日明细',
    data: [] as Array<any>,
    column: [
        { title: '日期', width: 120, align: 'center', dataKey: 'date', key: 'date', fixed: true, unit: '', },
        { title: '商品访客数', width: 100, align: 'center', dataKey: 'product_visitor_count', key: 'product_visitor_count', unit: '' },
        { title: 'GMV', width: 100, align: 'center', dataKey: 'gmv', key: 'gmv', },
        { title: '支付转化率', width: 100, align: 'center', dataKey: 'payment_conversion_rate', key: 'payment_conversion_rate', unit: '' },
        { title: '搜索访客占比', width: 110, align: 'center', dataKey: 'search_visitor_ratio', key: 'search_visitor_ratio', unit: '%' },
        { title: '老买家占比', width: 100, align: 'center', dataKey: 'returning_customer_ratio', key: 'returning_customer_ratio', unit: '' },
        { title: '搜索GMV占比', width: 115, align: 'center', dataKey: 'search_gmv_ratio', key: 'search_gmv_ratio', unit: '' },
        { title: '退款率', width: 100, align: 'center', dataKey: 'refund_rate', key: 'refund_rate', unit: '' },
        { title: '价格力星级', width: 100, align: 'center', dataKey: 'price_power_stars', key: 'price_power_stars', unit: '' },
        { title: '价格力额外曝光', width: 125, align: 'center', dataKey: 'price_power_extra_exposure', key: 'price_power_extra_exposure', unit: '' },
        { title: '免费搜索点击率', width: 125, align: 'center', dataKey: 'free_search_click_through_rate', key: 'free_search_click_through_rate', unit: '' },
        { title: '连带购买叶子类目宽度', width: 100, align: 'center', dataKey: 'associated_purchase_subcategory_width', key: 'associated_purchase_subcategory_width', unit: '' },
        { title: '复购率', width: 100, align: 'center', dataKey: 'repeat_purchase_rate', key: 'repeat_purchase_rate', unit: '' },
        { title: '推广花费', width: 100, align: 'center', dataKey: 'promotion_cost', key: 'promotion_cost', unit: '' },
        { title: '推广ROI', width: 100, align: 'center', dataKey: 'promotion_roi', key: 'promotion_roi', unit: '' },
    ]
}])
const count = ref()
let clearData = reactive([false])
const current_inventory = reactive([])

const getTopData = async () => {
    const data = {
        end_date: searchData.date[1],
        start_date: searchData.date[0],
        product_id: searchData.product_id,
    }
    const [res1, res2, res3] = [await getChart3data(data), await getIndexTrend(data), await getIndexdata(data)]
    if (res1.code === 0 && res2.code === 0 && res3.code === 0) {
        state.itemChart3data = { ...res1.data }
        state.itemIndexTrend = res2.data.records ?? [];
        state.itemData = { ...res3.data };
        await getHeaderChart()
        state.loading = false

    }
}

// 关键字分析
const getWordsList = async (arr: any) => {
    pageNum_words.value++
    arr.pageNum = pageNum_words.value
    arr.start_date = arr.date[0]
    arr.end_date = arr.date[1]
    const res = await getKeywordList(arr)
    if (res.code == 0 && res.data.records) {
        wordsCount.value = res.data.count
        allData[0].data = res.data.records
    } else {
        ElMessage.error(res.msg)
    }
}
// 每日明细
const getDayList = async (arr: any) => {
    pageNum_day.value++
    arr.pageNum = pageNum_day.value
    arr.start_date = arr.date[0]
    arr.end_date = arr.date[1]
    const res = await getProductDayList(arr)
    if (res.code == 0 && res.data.records) {
        dayCount.value = res.data.count
        allData[1].data = res.data.records
    } else {
        ElMessage.error(res.msg)
    }
}


const getHeaderChart = () => {
    const chartDom1 = document.getElementById("echarts1") as HTMLElement;
    chartDom1.removeAttribute('_echarts_instance_')
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("echarts2") as HTMLElement;
    chartDom2.removeAttribute('_echarts_instance_')
    const myChart2 = echarts.init(chartDom2);

    const chartDom3 = document.getElementById("echarts3") as HTMLElement;
    chartDom3.removeAttribute('_echarts_instance_')
    const myChart3 = echarts.init(chartDom3);

    const chartDom4 = document.getElementById("echarts4") as HTMLElement;
    chartDom4.removeAttribute('_echarts_instance_')
    const myChart4 = echarts.init(chartDom4);

    const chartDom5 = document.getElementById("echarts5") as HTMLElement;
    chartDom5.removeAttribute('_echarts_instance_')
    const myChart5 = echarts.init(chartDom5);

    const chartDom6 = document.getElementById("echarts6") as HTMLElement;
    chartDom6.removeAttribute('_echarts_instance_')
    const myChart6 = echarts.init(chartDom6);

    const chartDom7 = document.getElementById("echarts7") as HTMLElement;
    chartDom7.removeAttribute('_echarts_instance_')
    const myChart7 = echarts.init(chartDom7);

    const chartDom8 = document.getElementById("echarts8") as HTMLElement;
    chartDom8.removeAttribute('_echarts_instance_')
    const myChart8 = echarts.init(chartDom8);

    const chartDom9 = document.getElementById("echarts9") as HTMLElement;
    chartDom9.removeAttribute('_echarts_instance_')
    const myChart9 = echarts.init(chartDom9);

    const chartDom10 = document.getElementById("echarts10") as HTMLElement;
    chartDom10.removeAttribute('_echarts_instance_')
    const myChart10 = echarts.init(chartDom10);

    const chartDom11 = document.getElementById("echarts11") as HTMLElement;
    chartDom11.removeAttribute('_echarts_instance_')
    const myChart11 = echarts.init(chartDom11);

    const chartDom12 = document.getElementById("echarts12") as HTMLElement;
    chartDom12.removeAttribute('_echarts_instance_')
    const myChart12 = echarts.init(chartDom12);

    const chartDom13 = document.getElementById("echarts13") as HTMLElement;
    chartDom13.removeAttribute('_echarts_instance_')
    const myChart13 = echarts.init(chartDom13);
    let arr1 = state.itemIndexTrend?.map(i => i.visitors_count)
    let arr2 = state.itemIndexTrend?.map(i => i.gmv)
    let arr3 = state.itemIndexTrend?.map(i => i.payment_conversion_rate)
    let arr4 = state.itemIndexTrend?.map(i => i.search_visitor_ratio)
    let arr5 = state.itemIndexTrend?.map(i => i.search_gmv_ratio)
    let arr6 = state.itemIndexTrend?.map(i => i.returning_customer_ratio)
    let arr7 = state.itemIndexTrend?.map(i => i.refund_rate)
    let arr8 = state.itemIndexTrend?.map(i => i.free_search_click_rate)
    let arr9 = state.itemIndexTrend?.map(i => i.bundle_purchase)
    let arr10 = state.itemIndexTrend?.map(i => i.repeat_purchase_rate)

    let arr11Date = state.itemChart3data.price_power?.records?.map(i => i.date)
    let arr11pp_level = state.itemChart3data.price_power?.records?.map(i => i.pp_level)
    let arr11unit_price = state.itemChart3data.price_power?.records?.map(i => i.unit_price)

    let arr12 = state.itemChart3data.sku?.records?.map(i => {
        return {
            name: i.sku_name,
            value: parseFloat((i.pay_amount).toFixed(2)),
            ...i,

        }
    })


    let arr13 = state.itemChart3data.review?.records?.map(i => {
        return {
            value: i.count,
            name: i.keyword
        }
    })
    const option1 = lineOptionsNum(arr1);
    const option2 = lineOptionsNum(arr2);
    const option3 = lineOptionsNum(arr3);
    const option4 = lineOptionsNum(arr4);
    const option5 = lineOptionsNum(arr5);
    const option6 = lineOptionsNum(arr6);
    const option7 = lineOptionsNum(arr7);
    const option8 = lineOptionsNum(arr8);
    const option9 = lineOptionsNum(arr9);
    const option10 = lineOptionsNum(arr10);

    const option11 = XYlineOptions(arr11Date, arr11pp_level, arr11unit_price);
    const option12 = pieItemOptions(arr12);
    const option13 = wordsCloud(arr13, '');


    option1 && myChart1.setOption(option1);
    option2 && myChart2.setOption(option2);
    option3 && myChart3.setOption(option3);
    option4 && myChart4.setOption(option4);
    option5 && myChart5.setOption(option5);
    option6 && myChart6.setOption(option6);
    option7 && myChart7.setOption(option7);
    option8 && myChart8.setOption(option8);
    option9 && myChart9.setOption(option9);
    option10 && myChart10.setOption(option10);

    option11 && myChart11.setOption(option11);
    option12 && myChart12.setOption(option12);
    option13 && myChart13.setOption(option13);


    window.addEventListener("resize", () => {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
        myChart4.resize();
        myChart5.resize();
        myChart6.resize();
        myChart7.resize();
        myChart8.resize();
        myChart9.resize();
        myChart10.resize();

        myChart11.resize();
        myChart12.resize();
        myChart13.resize();
    });

}

const loadMore = (at: string) => {
    clearData[0] = false
    if (at == 'day') {
        getDayList(searchData)
    }
    if (at == 'words') {
        getWordsList(searchData)
    }
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

    .box {
        display: flex;
        justify-content: space-around;
        height: 30%;

        .child {
            height: 100%;
            flex: 0.48;

            .box_container {
                height: calc(100% - 70px);

                .roduct_num {
                    height: 44%;
                    margin: 1px 0;
                    background-image: url("./images/image-3.png");
                    background-size: 100% 100%;
                    display: flex;
                    padding: 0 4%;

                    .roduct_num_box {
                        flex: 0.2;
                        // border: 1px solid #ccc;
                        position: relative;
                        // padding: 0 10px;
                        // box-sizing: border-box;

                        .roduct_num_box_charts {
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            position: absolute;
                            // background-color: red;
                        }

                        .roduct_num_box_text {
                            position: relative;
                            text-align: center;
                            height: 100%;
                            // z-index: 1;
                            // display: flex;
                            // flex-direction: column;
                            // align-items: center;
                            // justify-content: center;

                            .tit {
                                font-size: 16px;
                            }

                            .num {
                                font-size: 38px;
                                position: absolute;
                                inset: 0;
                                height: 40px;
                                margin: auto;
                            }
                        }
                    }
                }
            }

            .table {
                border: 1px solid #ccc;
                height: 360px;
                padding: 10px;
                width: 98%;
                box-sizing: border-box;
                overflow: auto;
                margin-bottom: 10px;
                margin-top: 4px;
                overflow-x: hidden;
            }

            .bg_img {
                background-image: $echarts_bg_img;
                background-size: 100% 100%;
            }
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

    .echarts_title {
        margin: 10px 0 16px 0;
        width: 220px;
        height: 32px;
        padding-left: 40px;
        background-image: url("./images/11.png");
        background-size: 100% 100%;
        font-size: 24px;
    }




    .table_title {
        margin-top: 20px;
        width: 98%;
        height: 43px;
        line-height: 43px;
        font-size: 24px;
        padding: 0 40px;
        font-weight: 700;
        background-image: url("./images/table_title.png");
        // background: linear-gradient(90deg, #008CC2 0%, #008CC2 100%);
        background-size: 100% 100%;
        // margin-left: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
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

    .el-input__inner {
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
</style>
  
