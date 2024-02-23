<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-23 10:19:12
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-02-23 11:09:22
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\table.vue
 * @Description: 单品分析——关键词分析 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="tableHead">
        {{ componentTitle }}
    </div>
    <!-- <div id="echarts" style="width: 10dvw;height: 30px;">
    </div> -->
    <div class="aiData_table table" :key="count">
        <!--  v-loading="loadType" -->
        <el-table ref="tableListRefs" :id="'table' + comKey" :data="tableData" border v-loading="loadType"
            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%;height: 320px;"
            v-el-table-infinite-scroll="loadMore_words" :infinite-scroll-distance="300" @filter-change="filterChange"
            @header-click="headerClick" show-summary :summary-method="getSummaries">
            <!-- <el-table-column prop="pallet" label="本月货盘" fixed width="120" align="center" :filters="current_inventory.data"
                :filter-method="filterTag" column-key="pallet">

            </el-table-column> -->

            <el-table-column v-for="head, index in tableHead" :key="index" :prop="head.dataKey" :label="head.title"
                :fixed="head.fixed" :align="head.align" :width="head.width">
                <el-table-column v-for="item, idx in head.children" :key="idx" :prop="item.dataKey" :label="item.title"
                    :align="item.align" :width="item.width">
                    <template #default="scope">
                        <div
                            v-if="scope.column.property == 'add_to_cart_rate' || scope.column.property == 'conversion_rate'">
                            {{ persentNum(scope.row[scope.column.property]) }} {{ head.unit }}
                        </div>
                        <div v-else>
                            {{ scope.row[scope.column.property] }}
                        </div>
                    </template>
                </el-table-column>
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
import { table_lineOptions } from "../echartsOptions"
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import { persentNum, floatNum, lueNum } from "@/utils/format.js"
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
// mock趋势折线数据
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
const componentTitle = ref('')
const current_inventory = reactive({
    data: []
})
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
const tableListRefs = ref();
const nomore = ref(false)

onMounted(() => {

})
/**
     * 刷新table,防止滚动条跑到最上面
    */
const refreshTable = () => {
    let table = tableListRefs.value;
    //强制刷新组件
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

const loadMore_words = (res) => {
    console.log(componentTitle.value,"componentTitle.value")
    if (componentTitle.value == "关键词分析") {
        console.log('关键词')
        if (!loadType.value && propData.tableCount > tableData.length) {
            loadType.value = true
            emit('loadMore', 'product')
        } else {
            nomore.value = true
        }
    }
}

interface Product {
    visitor_count: string
    add_to_cart_rate: string
    conversion_rate: string
    fans_paid_buyers_count: Array<any>
    direct_paid_buyers_count: string
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
                    if (column.property == 'add_to_cart_rate' || column.property == 'conversion_rate') {
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
        if (index == 2 || index == 3 || index == 7 || index == 8 || index == 13 || index == 12) {
            if (sum) {
                return (sum * 100).toFixed(2) + '%'
            }else{
                return 'N/A'
            }
        } else {
            return sum
        }
    })
}

// 不重复随机数
/**
 * @description: 
 * @param {*} min 最小数
 * @param {*} max 最大数
 * @param {*} count 生成数量
 * @return {*}
 * 调用函数生成长度为10的随机字符串
 * console.log(generateRandomString(10));
 */
const generateRandomString = () => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 包含所有大小写字母和数字的字符集合
    var result = '';

    for (var i = 0; i < 15; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length); // 获取随机索引值
        result += characters[randomIndex]; // 根据索引从字符集合中选择对应位置的字符并添加到结果字符串中
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


::v-deep(.el-table--border th.el-table__cell) {
    border-bottom: 1px solid rgb(16, 97, 197);
}

::v-deep(.el-table--border .el-table__cell) {
    border-right: 1px solid rgb(16, 97, 197);
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