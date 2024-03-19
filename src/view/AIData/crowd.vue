<!--
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-03-13 17:36:40
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-18 15:08:16
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\crowd.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="pageBG">
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
        <el-row :gutter="20">
            <el-col :span="10">
                <boxHead title="人群分布" />
                <div></div>
            </el-col>
            <el-col :span="4">
                <boxHead1 title="GMV分布" />
                <div></div>
            </el-col>
            <el-col :span="10">
                <boxHead1 title="GMV趋势" />
                <div></div>
            </el-col>
            
            <el-col :span="10">
                <boxHead title="TOP10商品" />
                <div></div>
            </el-col>
            <el-col :span="7">
                <boxHead1 title="人群分布" />
                <div></div>
            </el-col>
            <el-col :span="7">
                <boxHead1 title="GMV趋势" />
                <div></div>
            </el-col>
            
            <el-col :span="10" class="colflex">
                <boxHeadtb title="商品流量来源" />
                <div></div>
            </el-col>
            <el-col :span="10" class="colflex">
                <boxHeadtb title="人群流量来源" />
                <div></div>
            </el-col>
            <el-col :span="4">
                <boxHead1 title="人群分布" />
                <div></div>
            </el-col>
        </el-row>

    </div>
    <goHome />
</template>

<script setup lang="ts" name="crowd">
import { reactive, onMounted, ref } from "vue";
import page_header from "./components/page_header.vue";
import goHome from "./components/goHome.vue";
import boxHead from "./components/box_head.vue";
import boxHead1 from "./components/box_head1.vue";
import boxHeadtb from "./components/box_head_tb.vue";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js";
import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import {
    lineOptions,
} from "./echartsOptions";
import {
    getCrowdGmv20Listdata,
    getCrowdGmvListdata,
    getCrowdGmvTrenddata,
    getCrowdSrcListdata,
    getProductCrowd10Listdata,
    getProductCrowdsListdata,
    getProductCrowdsTrendListdata,
    getProductSrcListdata,
} from "@/api/AIdata";
const pageTitle = "人群分析";
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};
const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    "crowd_type": "小镇中老年",
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    start_date: "",
    end_date: "",
    "pageNum": 1,
    "pageSize": 30,
    shop_name: "蜡笔派家居旗舰店", //店铺名称
    "secondary_source": "",
    "tertiary_source": "", 
    ids: [] as any,
});

onMounted(()=>{
    getData()
})

const getData = async () => {
    await get20data();
    await getListData();
    await getTrendListData()
    await getSrcListData()
    await getPro10ListData()
    await getProListData()
    await getProTrendListData()
    await getProSrcListData()
}

// 人群流量来源Top20
const get20data = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdGmv20Listdata(data)];
    console.log(res,'getCrowdGmv20Listdata')
    if(res.code == 0){

    }

}

// 人群GMV数据列表
const getListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdGmvListdata(data)];
    console.log(res,'getCrowdGmvListdata')
    if(res.code == 0){

    }

}

// 人群GMV趋势数据列表
const getTrendListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdGmvTrenddata(data)];
    console.log(res,'getCrowdGmvTrenddata')
    if(res.code == 0){

    }

}

// 人群流量来源
const getSrcListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getCrowdSrcListdata(data)];
    console.log(res,'getCrowdSrcListdata')
    if(res.code == 0){

    }

}

// 商品crowd分类10
const getPro10ListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowd10Listdata(data)];
    console.log(res,'getProductCrowd10Listdata')
    if(res.code == 0){

    }

}

// 某一商品按人群分类数据
const getProListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowdsListdata(data)];
    console.log(res,'getProductCrowdsListdata')
    if(res.code == 0){

    }

}

// 某一商品按人群分类趋势数据
const getProTrendListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductCrowdsTrendListdata(data)];
    console.log(res,'getProductCrowdsTrendListdata')
    if(res.code == 0){

    }

}

// 商品流量来源
const getProSrcListData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getProductSrcListdata(data)];
    console.log(res,'getProductSrcListdata')
    if(res.code == 0){

    }

}

</script>

<style lang="scss" scoped>
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

.colflex{
    display: flex;
    align-items: center;
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