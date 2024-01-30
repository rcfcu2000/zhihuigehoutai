<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-23 10:19:12
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-01-30 17:39:51
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="tableHead">
        {{ componentTitle }}
    </div>
    <div class="aiData_table table" :key="count">
        <!--  v-loading="loadType" -->
        <el-table ref="planTableListRef" :id="'table' + comKey" :data="tableData" border v-loading="loadType"
            element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%;height: 280px;"
            v-el-table-infinite-scroll="loadMore" :infinite-scroll-distance="300" @filter-change="filterChange">
            <!-- <el-table-column prop="promotion_type" label="计划类型" fixed width="120" align="center" :filters="current_inventory.data"
                :filter-method="filterTag" column-key="plan_pallet"> -->
            <el-table-column prop="promotion_type" label="计划类型" fixed width="120" align="center" column-key="plan_pallet">

            </el-table-column>
            <el-table-column v-for="head, index in tableHead" :key="index" :prop="head.dataKey" :label="head.title"
                :fixed="head.fixed" :align="head.align" :width="head.width">
                <template #default="scope">
                    <!-- 推广分析页 趋势折线 -->
                    <div
                        v-if="scope.column.property == 'roi_trend' || scope.column.property == 'spend_trend' || scope.column.property == 'gmv_trend'">
                        <div :id="scope.row.plan_id + '_' + scope.column.property" style="width: 8dvw;height: 30px;">
                        </div>
                    </div>

                    <!-- <div v-else-if="scope.column.property == 'product_alias'" :title="scope.row.product_name"
                            class="text_hidden">
                            {{ scope.row.product_alias }}
                        </div> -->

                    <div v-else-if="head.unit == '%'">
                        {{ persentNum(scope.row[scope.column.property]) }}{{ head.unit }}
                    </div>

                    <div v-else-if="(typeof scope.row[scope.column.property]) != 'number'" class="text_hidden">
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
import { ref, reactive, watch, getCurrentInstance, nextTick, onMounted } from 'vue'
import { table_lineOptions } from "../echartsOptions"
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import { persentNum, floatNum, lueNum } from "@/utils/format.js"

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

const propData = defineProps(['Commodity_detail', 'comKey', 'clearData', 'current_inventory'])
const emit = defineEmits(['loadMore', 'changePallet'])
const componentTitle = ref('')
const current_inventory = reactive({
    data: []
})
tableData = propData.Commodity_detail.data
tableHead = propData.Commodity_detail.column
const filterTag = (value: string, row: User) => {
    return row.promotion_type === value
}
const filterChange = (res) => {
    const checkValue = res.plan_pallet
    emit('changePallet', checkValue)
}
let randomStrings = []
const planTableListRef = ref();

onMounted(() => {
})
watch(propData.current_inventory, (newD, oldD) => {
    current_inventory.data = newD
})
/**
     * 刷新table,防止滚动条跑到最上面
    */
const refreshTable = () => {
    let table = planTableListRef.value;
    table.doLayout()
}
watch([propData.Commodity_detail, propData.clearData], ([newD, newE], oldD) => {
    componentTitle.value = newD.componentTitle
    tableHead = newD.column
    if (newE[0]) {
        tableData = []
    }
    tableData = newD.data
    loadType.value = false
    refreshTable()
    nextTick(() => {
        newD.data.forEach((item: any) => {
            const domId_1 = item.plan_id + '_' + 'gmv_trend'
            const domId_2 = item.plan_id + '_' + 'spend_trend'
            const domId_3 = item.plan_id + '_' + 'roi_trend'
            let chartDom1: any = document.getElementById(domId_1);
            let chartDom2: any = document.getElementById(domId_2);
            let chartDom3: any = document.getElementById(domId_3);
            let myChart1 = echarts.init(chartDom1);
            if (newE[0] && chartDom1 != null && chartDom1 != "" && chartDom1 != undefined) {
                myChart1.clear()
            }
            let myChart2 = echarts.init(chartDom2);
            if (newE[0] && chartDom2 != null && chartDom2 != "" && chartDom2 != undefined) {
                myChart2.clear()
            }
            let myChart3 = echarts.init(chartDom3);
            if (newE[0] && chartDom3 != null && chartDom3 != "" && chartDom3 != undefined) {
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
        refreshTable()
    })

    setTimeout(() => {
    }, 500)
    // count.value++
})

const loadMore = (res) => {
    if (componentTitle.value == "计划明细") {
        console.log('计划明细')
        if (!loadType.value) {
            loadType.value = true
            emit('loadMore', 'plan')
        }
    }
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