<!--
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-03-13 17:36:40
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-13 17:48:19
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

    </div>
    <goHome />
</template>

<script setup lang="ts" name="crowd">
import page_header from "./components/page_header.vue";
import goHome from "./components/goHome.vue";
import boxHead from "./components/box_head.vue";
import { reactive, onMounted, ref } from "vue";
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js";
import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import {
    lineOptions,
} from "./echartsOptions";
import {
    GetGmvTargetdata,
    GetGmvTrenddata,
    getCategoryAlysisdata,
    getIndexdata_target,
    getManagerAlysisdata,
    getPalletListdata,
    getProductListdata,
} from "@/api/AIdata";
const pageTitle = "人群分析";
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};
const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    loading: false,
    date: ["2024-01-01", "2024-01-25"],
    product_id: "",
    start_date: "",
    end_date: "",
    shop_name: "蜡笔派家居旗舰店", //店铺名称
});

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