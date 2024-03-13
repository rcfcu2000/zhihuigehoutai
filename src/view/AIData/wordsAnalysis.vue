<!--
    关键词分析
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 14:35:35
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-13 16:51:25
 * @FilePath: \zhihuigehoutai\src\view\AIData\wordsAnalysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="wordsAnalysis">
        <page_header :title="pageTitle" />
        <el-form :inline="true" :model="searchData" class="goal-from">
            <el-form-item label="请选择起止时间">
                <el-date-picker v-model="searchData.date" @change="getData" :clearable="false" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange" start-placeholder="开始时间"
                    end-placeholder="结束时间" style="
            width: 220px;
            background: transparent;
            border-color: rgba(0, 98, 147, 0.5);
          " />
            </el-form-item>
        </el-form>
        <div class="page_words">
            <el-row :gutter="30" class="wordsRow">
                <el-col :span="12" v-for="(item,index) in boxData" :key="index">
                    <box :datas="item" :index="index" />
                </el-col>
                <el-col :span="12">
                    <boxHead title="访客趋势" />
                    <div class="box_body" id="visitor">

                    </div>
                </el-col>
                <el-col :span="12">
                    <boxHead title="转化率趋势" />
                    <div class="box_body" id="conversion">

                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="wordsTable">
            <boxHead title="关键词明细" />
            <el-table :data="wordsData.tableData" border v-loading="wordsLoad" class="palletGmv"
                element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 400px"
                v-el-table-infinite-scroll="loadMore_words" :infinite-scroll-distance="100"
                :infinite-scroll-disabled="false" :infinite-scroll-immediate="false" :infinite-scroll-delay="2000" lazy
                :load="load_words" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column v-for="item, index in wordsData.table_head" :key="index" :prop="item.dataKey"
                    :label="item.title" :width="item.width" :align="item.align" :fixed="item.fixed">
                </el-table-column>

                <template #append v-if="nomore_words">
                    <div style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                        <el-icon>
                            <MagicStick />
                        </el-icon> <span>没有更多了</span>
                    </div>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts" name="wordsAnalysis">
import page_header from './components/page_header.vue'
import box from './components/box.vue'
import boxHead from "./components/box_head.vue";
import { useUserStore } from "@/pinia/modules/user";
import { reactive, ref, onMounted } from "vue";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import {
    getIndustrywordListdata,
    getKeywordListdata,
    getKeywordMuList,
    getKeywordTrendList,
    getScKeywordListdata,
} from "@/api/AIdata";
import * as echarts from "echarts";
import 'echarts-wordcloud';
import { lineOptions1, lineOptions } from "./echartsOptions";

const pageTitle = "关键词分析"
const userStore = useUserStore();
const userid = {
    id: userStore.userInfo.nickName
};
const allData = reactive({
    componentTitle: '商品明细',
    data: [],
    column: [
        { title: '分类', width: '', align: 'center', dataKey: 'pallet', key: 'pallet', fixed: true, unit: '' },
        { title: '无界点击量', width: '', align: 'center', dataKey: 'product_name', key: 'product_name', unit: '' },
        { title: '无界点击率', width: '', align: 'center', dataKey: 'gmv', key: 'gmv', unit: '' },
        { title: '搜索访客', width: '', align: 'center', dataKey: 'gmv_percentage', key: 'gmv_percentage', unit: '%' },
        { title: '搜索转化率', width: '', align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', unit: '' },
        { title: '付费访客', width: '', align: 'center', dataKey: 'cost', key: 'cost', unit: '' },
        { title: '付费转化率', width: '', align: 'center', dataKey: 'cost_percentage', key: 'cost_percentage', unit: '%' },
        { title: '行业访客', width: '', align: 'center', dataKey: 'cost_trend', key: 'cost_trend', unit: '' },
        { title: '行业转化率', width: '', align: 'center', dataKey: 'roi', key: 'roi', unit: '' },
    ]
})

// 词云图数据
const boxData = ref([
    { title: '无界词', chartsData: [] },
    { title: '生参付费词', chartsData: [] },
    { title: '生参免费词', chartsData: [] },
    { title: '生参行业词', chartsData: [] },
])


const searchData = reactive({
    keyword: '',
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    start_date: "",
    end_date: "",
    shop_name: "蜡笔派家居旗舰店", //店铺名称
    "pageNum": 0,
    "pageSize": 0,
});
// getIndustrywordListdata,
//     getKeywordListdata,
//     getKeywordMuList,
//     getKeywordTrendList,
//     getScKeywordListdata,

onMounted(async () => {
    await getTrafficdata()
    await getIndustrywordList()
    await getwordMuList()
    await getScKeywordList()
})

// 关键词趋势
const getTrafficdata = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getKeywordTrendList(data)];
    if (res.code == 0) {
        console.log(res, 'getKeywordTrendList')
    }
}
// 关键词趋势
const getIndustrywordList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getIndustrywordListdata(data)];
    if (res.code == 0) {
        console.log(res, 'getIndustrywordListdata')
    }
}
// 关键词明细
const getwordMuList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getKeywordMuList(data)];
    if (res.code == 0) {
        console.log(res, 'getKeywordMuList')
    }
}

// 关键词明细
const getScKeywordList = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getScKeywordListdata(data)];
    if (res.code == 0) {
        console.log(res, 'getScKeywordListdata')
    }
}

// 关键词明细信息
const wordsData = reactive({
    table_head: [
        {
            title: "类目名称",
            width: '',
            align: "center",
            dataKey: "words_lv3",
            key: "words_lv3",
            fixed: true,
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
            title: "时间进度",
            width: '',
            align: "center",
            dataKey: "target_day_rate",
            key: "target_day_rate",
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
            title: "GMV目标",
            width: '',
            align: "center",
            dataKey: "target_gmv",
            key: "target_gmv",
            fixed: false,
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
    ],
    tableData: []
})
let words_pageNum = 1
const words_pageSize = ref(20)
let nomore_words = ref(false)
let wordsLoad = ref(true)
let load_words = ref(false)

</script>

<style lang="scss" scoped>
.wordsAnalysis {
    background-image: $page_bg;
    background-size: 100% 100%;
    height: 100vh;
    color: rgba(255, 255, 255, 1);
    overflow-y: auto;
    overflow-x: hidden;
}

.page_words {
    padding: 0 0 0 5vm;
}

// 修改element样式

.wordsRow {
    padding: 1vw;
}

.goal-from {
    text-align: right;
    position: absolute;
    right: 7.5vw;
    top: 2.5vh;
    z-index: 100;
}

::v-deep(.el-form-item__label) {
    color: #fff !important;
}
.box_body{
    background-image: $echarts_bg_img2;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 268px;
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