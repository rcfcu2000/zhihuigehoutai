
<template>
    <div class="tableHead">
        {{ componentTitle }}
    </div>
    <div class="aiData_table table" :key="count">
        <!--  v-loading="loadType" -->
        <el-table ref="planTableListRef" :id="'table' + comKey" :data="tableData" border v-loading="loadType"
            element-loading-background="rgba(122, 122, 122, 0.8)" style="height: 280px;"
            v-el-table-infinite-scroll="loadMore_plan" :infinite-scroll-distance="300" @current-change="currentChange">
            <!-- <el-table-column prop="promotion_type" label="计划类型" fixed width="120" align="center" :filters="current_inventory.data"
                :filter-method="filterTag" column-key="plan_pallet"> -->
            <el-table-column prop="promotion_type" label="计划类型" fixed width="120" align="center" column-key="plan_pallet">

            </el-table-column>
            <el-table-column v-for="head, index in tableHead" :key="index" :prop="head.dataKey" :label="head.title"
                :fixed="head.fixed" :align="head.align" :width="head.width">
                <template #default="scope">
                    <div
                        v-if="scope.column.property == 'roi_trend' || scope.column.property == 'spend_trend' || scope.column.property == 'gmv_trend'">
                        <div :id="scope.row.plan_id + '_' + scope.column.property" style="width: 8dvw;height: 30px;">
                        </div>
                    </div>

                    <div
                        v-else-if="scope.column.property == 'spend' || scope.column.property == 'clicks' || scope.column.property == 'direct_transaction_count' || scope.column.property == 'indirect_transaction_count'">
                        {{ roundNum(scope.row[scope.column.property]) }}
                    </div>
                    <div v-else-if="head.unit == '%'">
                        {{ persentNum(scope.row[scope.column.property]) }}{{ head.unit }}
                    </div>

                    <div v-else-if="(typeof scope.row[scope.column.property]) != 'number'" class="text_hidden"
                        :title="scope.row[scope.column.property]">
                        {{ scope.row[scope.column.property] }}
                    </div>

                    <div v-else>
                        {{ lueNum(scope.row[scope.column.property]) }}
                    </div>

                </template>
            </el-table-column>
            <template #append v-if="nomore && tableData.length > 0">

                <div style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                    <el-icon>
                        <MagicStick />
                    </el-icon> <span>没有更多了</span>
                </div>
            </template>
        </el-table>
        <el-table ref="planTableListRef_sum" :data="tableDataSum" :show-header="false" empty-text="--">
            <el-table-column label="合计" fixed width="120" align="center" column-key="plan_pallet">
                <template #default>
                    <div>合计</div>
                </template>
            </el-table-column>
            <el-table-column v-for="head, index in tableHead" :key="index" :prop="head.dataKey" :label="head.title"
                :fixed="head.fixed" :align="head.align" :width="head.width">
                <template #default="scope">
                    <div
                        v-if="scope.column.property == 'roi_trend' || scope.column.property == 'spend_trend' || scope.column.property == 'gmv_trend'">
                        <div :id="scope.row.id + '_' + scope.column.property" style="width: 8dvw;height: 30px;">
                        </div>
                    </div>
                    <div
                        v-else-if="scope.column.property == 'spend' || scope.column.property == 'clicks' || scope.column.property == 'direct_transaction_count' || scope.column.property == 'indirect_transaction_count'">
                        {{ lueNum1(roundNum(scope.row[scope.column.property])) }}
                    </div>
                    <div v-else-if="head.unit == '%'">
                        {{ lueNum(scope.row[scope.column.property]*100) }}{{ head.unit }}
                    </div>

                    <div v-else-if="(typeof scope.row[scope.column.property]) != 'number'" class="text_hidden"
                        :title="scope.row[scope.column.property]">
                        {{ scope.row[scope.column.property] }}
                    </div>

                    <div v-else>
                        {{ lueNum(scope.row[scope.column.property]) }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts" name="comTable">
import { ref, reactive, watch, getCurrentInstance, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { table_lineOptions } from "../echartsOptions"
import { EleResize } from "@/utils/echartsAuto.js";
import { persentNum, floatNum, lueNum,lueNum1, roundNum } from "@/utils/format.js"
import type { TableColumnCtx } from 'element-plus'

import * as echarts from 'echarts';

const count = ref(0)
const loadType = ref(false)
let tableHead = ref([
    { key: 'date', dataKey: 'date', title: '日期', align: 'center', width: 150, fixed: true },
    { key: 'name', dataKey: 'name', title: '名称', align: 'center', width: 150 },
    { key: 'address', dataKey: 'address', title: '地址', align: 'center', width: 150 }
])
let tableData = reactive([] as Array<any>)
let tableDataSum = reactive([] as Array<any>)
const comKey = ref(0)
const countModel = defineModel({
    type: Number, default: 0
})

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


const propData = defineProps(['Commodity_detail', 'comKey', 'clearData', 'current_inventory', 'tableCount'])
const emit = defineEmits(['loadMore', 'changePallet'])
const componentTitle = ref('计划明细')
const current_inventory = reactive({
    data: []
})
tableData = propData.Commodity_detail.data
tableHead = propData.Commodity_detail.column
comKey.value = tableData.length
const filterTag = (value: string, row: User) => {
    return row.promotion_type === value
}
const filterChange = (res) => {
    const checkValue = res.plan_pallet
    emit('changePallet', checkValue)
}
let randomStrings = []
const planTableListRef = ref();
const planTableListRefs = ref();
const planTableListRef_sum = ref();
const nomore = ref(false)

const addScrollListener = () => {
    const table1 = planTableListRef.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    const table2 = planTableListRef_sum.value?.$el.querySelector('.el-scrollbar__wrap--hidden-default');
    planTableListRef.value.scrollBarRef.wrapRef.onscroll = (event:any) => {
        table2.scrollLeft = event.target.scrollLeft
    }
    planTableListRef_sum.value.scrollBarRef.wrapRef.onscroll = (event:any) => {
        table1.scrollLeft = event.target.scrollLeft
    }
};

const currentChange = (currentRow: any, oldCurrentRow: any) => {
    console.log(currentRow, oldCurrentRow, "currentRow, oldCurrentRow")
}

const refreshTable = () => {
    let table = planTableListRef.value;
    table.doLayout()
}
watch([propData.Commodity_detail], ([newD]) => {
    if (newD.clearData[0]) {
        tableData = []
        refreshTable()
        loadType.value = true
    }
    componentTitle.value = newD.componentTitle
    tableHead = newD.column
    tableData = tableData.concat(newD.data)
    tableDataSum = [newD.sumTrend]
    countModel.value = tableData.length
    comKey.value = tableData.length
    refreshTable()
    nextTick(() => {
        loadType.value = false
        newD.data.forEach((item: any) => {
            const domId_1 = item.plan_id + '_' + 'gmv_trend'
            const domId_2 = item.plan_id + '_' + 'spend_trend'
            const domId_3 = item.plan_id + '_' + 'roi_trend'
            let chartDom1: any = document.getElementById(domId_1);
            let chartDom2: any = document.getElementById(domId_2);
            let chartDom3: any = document.getElementById(domId_3);
            let myChart1 = echarts.init(chartDom1);
            if (chartDom1 != null && chartDom1 != "" && chartDom1 != undefined) {
                myChart1.clear()
            }
            let myChart2 = echarts.init(chartDom2);
            if (chartDom2 != null && chartDom2 != "" && chartDom2 != undefined) {
                myChart2.clear()
            }
            let myChart3 = echarts.init(chartDom3);
            if (chartDom3 != null && chartDom3 != "" && chartDom3 != undefined) {
                myChart3.clear()
            }
            let option1 = table_lineOptions(item.gmv_trend, item.times);
            let option2 = table_lineOptions(item.spend_trend, item.times);
            let option3 = table_lineOptions(item.roi_trend, item.times);
            let listener = function () {
                if (myChart1) {
                    myChart1.resize();
                }
                if (myChart2) {
                    myChart2.resize();
                }
                if (myChart3) {
                    myChart3.resize();
                }
            };
            option1 && myChart1.setOption(option1);
            option2 && myChart2.setOption(option2);
            option3 && myChart3.setOption(option3);
            EleResize.on(chartDom1, listener);
            EleResize.on(chartDom2, listener);
            EleResize.on(chartDom3, listener);
        })
        tableDataSum.forEach((item: any) => {
            const domId_1 = item.id + '_' + 'gmv_trend'
            const domId_2 = item.id + '_' + 'spend_trend'
            const domId_3 = item.id + '_' + 'roi_trend'
            let chartDom1: any = document.getElementById(domId_1);
            let chartDom2: any = document.getElementById(domId_2);
            let chartDom3: any = document.getElementById(domId_3);
            let myChart1 = echarts.init(chartDom1);
            if (chartDom1 != null && chartDom1 != "" && chartDom1 != undefined) {
                myChart1.clear()
            }
            let myChart2 = echarts.init(chartDom2);
            if (chartDom2 != null && chartDom2 != "" && chartDom2 != undefined) {
                myChart2.clear()
            }
            let myChart3 = echarts.init(chartDom3);
            if (chartDom3 != null && chartDom3 != "" && chartDom3 != undefined) {
                myChart3.clear()
            }
            let option1 = table_lineOptions(item.gmv_trend, item.times);
            let option2 = table_lineOptions(item.spend_trend, item.times);
            let option3 = table_lineOptions(item.roi_trend, item.times);
            let listener = function () {
                if (myChart1) {
                    myChart1.resize();
                }
                if (myChart2) {
                    myChart2.resize();
                }
                if (myChart3) {
                    myChart3.resize();
                }
            };
            option1 && myChart1.setOption(option1);
            option2 && myChart2.setOption(option2);
            option3 && myChart3.setOption(option3);
            EleResize.on(chartDom1, listener);
            EleResize.on(chartDom2, listener);
            EleResize.on(chartDom3, listener);
        })
        if (tableData.length > 0 && tableDataSum.length > 0) {
            nextTick(() => {
                addScrollListener();
            });
        }
        refreshTable()
    })
})

const loadMore_plan = (res) => {
    console.log(componentTitle.value,"componentTitle.value")
    if (componentTitle.value == "计划明细") {
        console.log(propData.tableCount, '计划明细')
        if (!loadType.value && propData.tableCount > tableData.length) {
            loadType.value = true
            emit('loadMore', 'plan')
        } else {
            nomore.value = true
        }
    }
}

interface Product {
    add_to_cart_cost: string
    bid_type: string
    campaign_name: string
    gmv_trend: Array<any>
    gmv: string
    roi: number
    roi_trend: Array<any>
    spend: number
    spend_trend: Array<any>
    click_through_rate: number
    clicks: number
    conversion_rate: number
    cpc: number
    direct_roi: number
    direct_transaction_amount: number
    direct_transaction_count: number
    indirect_roi: number
    indirect_transaction_amount: number
    indirect_transaction_count: number
    // average_order_value: number
    // existing_customer_percentage: number
    // favorite_add_to_cart_rate: number
}
interface SummaryMethodProps<T = Product> {
    columns: TableColumnCtx<T>[]
    data: T[]
}

const getSummaries = (param: SummaryMethodProps) => {
    const { columns, data } = param

    const sums: any[] = []
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '合计'
            return
        }
        const values = data.map((item) => Number(item[column.property]))

        if (!values.every((value) => Number.isNaN(value))) {
            sums[index] = `${values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!Number.isNaN(value)) {
                    if (column.property == 'cost' || column.property == 'clicks' || column.property == 'direct_transaction_count' || column.property == 'indirect_transaction_count') {
                        return roundNum(Number(prev) + curr)
                    }
                    else {
                        return floatNum(Number(prev) + curr)
                    }
                } else {
                    return prev
                }
            }, 0)}`
        } else {
            sums[index] = 'N/A'
        }
    })
    return sums.map((sum, index) => {
        if (index == 3 || index == 5 || index == 12) {
            return ''
        } else {
            return sum
        }
    })
}
const generateRandomString = () => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';

    for (var i = 0; i < 15; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex]; 
    }
    randomStrings.push(result)
    return result;
}


</script>

<style lang="scss" scoped>
.table-wrapper {
    overflow-x: auto;
}

::v-deep(.echarts-tooltip) {
    padding: 0 !important;
    // position: fixed !important;
    top: 0 !important;
    left: -10px !important;
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
    height: 330px;
    padding: 10px;
    // width: 98%;
    // overflow: auto;
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