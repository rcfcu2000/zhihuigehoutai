
<template>
    <div class="tableHead">
        {{ componentTitle }}
    </div>
    <!-- <div id="echarts" style="width: 10dvw;height: 30px;">
    </div> -->
    <div class="aiData_table table" :key="count">
        <!--  v-loading="loadType" -->
        <el-table ref="tableListRef" :id="'table' + comKey" :data="tableData" v-loading="loadType"
            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%;height: 320px;"
            v-el-table-infinite-scroll="loadMore_day" :infinite-scroll-distance="300"
            @header-click="headerClick" show-summary :summary-method="getSummaries">
            <!-- <el-table-column prop="pallet" label="本月货盘" fixed width="120" align="center" :filters="current_inventory.data"
                :filter-method="filterTag" column-key="pallet">

            </el-table-column> -->

            <el-table-column v-for="head, index in tableHead" :key="index" :prop="head.dataKey" :label="head.title"
                :fixed="head.fixed" :align="head.align" :width="head.width">
                <template #default="scope">
                    <div
                        v-if="scope.column.property == 'payment_conversion_rate' || scope.column.property == 'refund_rate' || scope.column.property == 'free_search_click_through_rate' || scope.column.property == 'repeat_purchase_rate' || scope.column.property == 'search_gmv_ratio' || scope.column.property == 'returning_customer_ratio' || scope.column.property == 'search_visitor_ratio' || scope.column.property == 'promotion_roi'">
                        {{ floatNum(scope.row[scope.column.property]*100) }} {{ head.unit }}
                    </div>
                    <div v-else-if="scope.column.property == 'gmv'">
                        {{ lueNum(scope.row[scope.column.property]) }}
                    </div>
                    <div
                        v-else-if="scope.column.property == 'promotion_cost' || scope.column.property == 'product_visitor_count'">
                        {{ roundNum(scope.row[scope.column.property]) }}
                    </div>
                    <div v-else>
                        {{ scope.row[scope.column.property] }}
                    </div>
                </template>
            </el-table-column>
            <template #append v-if="nomore">
                <div style="height: 40px;width: 50%;display: flex;align-items: center;justify-content: center;">
                    <el-icon>
                        <MagicStick />
                    </el-icon> <span>没有更多了</span>
                </div>
            </template>
        </el-table>
    </div>
</template>

<script setup lang="ts" name="comTable">
import { ref, reactive, watch, getCurrentInstance, nextTick, onMounted, onUpdated } from 'vue'
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js"
import type { TableColumnCtx } from 'element-plus'


const count = ref(0)
const loadType = ref(false)
let tableHead = ref([
    { key: 'date', dataKey: 'date', title: '日期', align: 'center', width: 150, fixed: true },
    { key: 'name', dataKey: 'name', title: '名称', align: 'center', width: 150 },
    { key: 'address', dataKey: 'address', title: '地址', align: 'center', width: 150 }
])
let tableData = reactive([] as Array<any>)
const propData = defineProps(['Commodity_detail', 'comKey', 'clearData', 'tableCount'])
const emit = defineEmits(['loadMore', 'changePallet'])
const componentTitle = ref('')
tableData = propData.Commodity_detail.data
tableHead = propData.Commodity_detail.column
const countModel = defineModel({
    type: Number, default: 0
})
const filterTag = (value: string, row: User, column: object) => {
    return row.pallet === value
}

const filterChange = (res) => {
    const checkValue = res.pallet
    emit('changePallet', checkValue)
}
let randomStrings = [] as Array<any>
const tableListRef = ref();
const nomore = ref(false)

onMounted(() => {

})

const refreshTable = () => {
    let table = tableListRef.value;
    table.doLayout()
}
watch([propData.Commodity_detail, propData.clearData, propData.tableCount], ([newD, newE]) => {
    console.log(newD, newE, "newE")
    componentTitle.value = newD.componentTitle
    tableHead = newD.column
    if (newE[0]) {
        tableData = []
    }
    tableData = tableData.concat(newD.data)
    countModel.value = tableData.length
    loadType.value = false
    refreshTable()
    nextTick(() => {
        refreshTable()
    })
}, { deep: true })

const loadMore_day = (res) => {
    if (componentTitle.value == "每日明细") {
        console.log('商品明细')
        if (!loadType.value && propData.tableCount > tableData.length) {
            loadType.value = true
            emit('loadMore', 'day')
        } else {
            nomore.value = true
        }
    }
}

interface Product {
    product_visitor_count: string
    gmv: string
    payment_conversion_rate: string
    search_visitor_ratio: string
    returning_customer_ratio: string
    search_gmv_ratio: string
    refund_rate: string
    price_power_stars: string
    price_power_extra_exposure: string
    free_search_click_through_rate: string
    associated_purchase_subcategory_width: string
    repeat_purchase_rate: string
    promotion_cost: string
    promotion_roi: string
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
                    if (column.property == 'payment_conversion_rate' || column.property == 'refund_rate' || column.property == 'free_search_click_through_rate' || column.property == 'repeat_purchase_rate' || column.property == 'search_visitor_ratio' || column.property == 'returning_customer_ratio' || column.property == 'search_gmv_ratio') {
                        return floatNum(Number(prev) + curr)
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
        if (index == 3 || index == 4 || index == 5 || index == 6 || index == 7 || index == 10 || index == 12 || index == 14) {
            return (Number(sum) * 100).toFixed(2) + '%'
        }
        else if (index == 0) {
            return sum
        }
        else {
            return lueNum(roundNum(Number(sum)))
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

const headerClick = () => {

}

</script>

<style lang="scss" scoped>
::v-deep(.echarts-tooltip) {
    padding: 0 !important;
    // position: fixed !important;
    top: 0 !important;
    left: -10px !important;
}

.tableHead {
    background-image: $table_bg_Title;
    background-size: 100% 60%;
    background-position: 50%;
    background-repeat: no-repeat;
    height: 70px;
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
    height: 320px;
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