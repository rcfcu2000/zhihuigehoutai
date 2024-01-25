<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-23 10:19:12
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-01-25 14:28:12
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="tableHead">
        {{ componentTitle }}
    </div>
    <div id="echarts" style="width: 10dvw;height: 30px;">
    </div>
    <div class="aiData_table table" :key="count">
        <el-table :data="tableData" style="width: 100%;height: 280px;">
            <el-table-column v-for="head, index in tableHead" :key="index" :prop="head.dataKey" :label="head.title"
                :fixed="head.fixed" :align="head.align" :width="head.width">
                <template #default="scope">
                    <!-- 趋势折线 -->

                    <div
                        v-if="scope.column.property == 'gmv_trend' || scope.column.property == 'cost_trend' || scope.column.property == 'roi_trend' || scope.column.property == 'spend_trend'">
                        <div :id="componentTitle + propData.comKey + scope.$index" style="width: 100px;height: 30px;">
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts" name="comTable">
import { ref, reactive, watch, getCurrentInstance, nextTick } from 'vue'
import { table_lineOptions } from "../echartsOptions"
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复

import * as echarts from 'echarts';


const count = ref(0)
let tableHead = ref([
    { key: 'date', dataKey: 'date', title: '日期', align: 'center', width: 150, fixed: true },
    { key: 'name', dataKey: 'name', title: '名称', align: 'center', width: 150 },
    { key: 'address', dataKey: 'address', title: '地址', align: 'center', width: 150 }
])
let tableData = ref([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
])

// mock趋势折线数据
const lineData = () => {
    let arr = []
    let max = 5000
    let min = 1
    for (let i = 0; i < 15; i++) {
        let num = parseInt(Math.random() * (max - min + 1) + min)
        arr.push(num)
    }
    console.log(arr, "linedata")
    return arr
}

const propData = defineProps(['Commodity_detail', 'comKey'])
const componentTitle = ref('')
tableData = propData.Commodity_detail.data.records
tableHead = propData.Commodity_detail.column
watch(propData.Commodity_detail, (newD, oldD) => {
    componentTitle.value = newD.componentTitle
    console.log(newD, newD, "watch")
    tableHead = newD.column
    tableData = newD.data.records

    let chartDom = document.getElementById('echarts');
    let myChart = echarts.init(chartDom);
    let option = table_lineOptions(lineData());
    let listener = function () {
        if (myChart) {
            myChart.resize();
        }
    };
    option && myChart.setOption(option);
    EleResize.on(chartDom, listener);
    count.value++
    // nextTick(() => {
    //     tableData.forEach((element, index) => {
    //         let chartDom = document.getElementById(componentTitle.value + propData.comKey + index);
    //         let myChart = echarts.init(chartDom);
    //         let option = table_lineOptions(lineData());
    //         option && myChart.setOption(option);
    //         count.value++
    //     });
    //     const instance = getCurrentInstance();
    //     instance?.proxy?.$forceUpdate()
    // })
})

</script>

<style lang="scss" scoped>
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

::v-deep(.tableHeadClass) {
    border-bottom-color: rgb(16, 97, 197);
    // border-right: 1px solid rgb(16, 97, 197);

    .el-table-v2__header-cell {
        .el-table-v2__header-cell-text {
            color: rgba(255, 255, 255, 1);
            font-size: 18px;
            font-weight: 600;
        }
    }
}

// rgb(16, 97, 197)

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

.table {
    height: 280px;
    padding: 10px;
    // width: 98%;
    overflow: auto;
    margin-bottom: 10px;
    margin-top: 4px;
    // border: 1px solid #fff;

    ::v-deep(.el-auto-resizer) {
        .el-table-v2 {
            .el-table-v2__main {
                background: none;

                .el-table-v2__header {

                    //表格头部
                    .el-table-v2__header-row {
                        border-bottom-color: rgb(16, 97, 197);

                        .el-table-v2__header-cell {
                            background: none;
                        }
                    }
                }

                .el-table-v2__body {

                    // 表格主体内容
                    .el-table-v2__row:nth-child(2n) {
                        background-color: rgb(7, 35, 82, 1);
                    }

                    .el-table-v2__row:hover {
                        background-color: rgb(32, 96, 169);
                    }

                    .el-table-v2__row {
                        border-bottom-color: rgb(16, 97, 197);
                        // height: auto !important;
                    }
                }
            }
        }
    }
}
</style>