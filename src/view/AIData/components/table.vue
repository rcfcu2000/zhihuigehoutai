<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-23 10:19:12
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-13 12:18:47
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="tableHead">
        {{ componentTitle }}
    </div>
    <div class="aiData_table table" :key="count">
        <el-table :id="'table' + comKey" :data="tableData" border style="width: 100%;height: 280px;"
            v-vTablescroll="loadMore">
            <el-table-column v-for="head, index in        tableHead       " :key="index" :prop="head.dataKey"
                :label="head.title" :fixed="head.fixed" :align="head.align" :width="head.width" :filters="head.filters"
                :filter-method="filterTag">
                <template #default="scope">
                    <!-- 推广分析页 趋势折线 -->
                    <div v-if="componentTitle == '商品明细'">
                        <div v-if="scope.column.property == 'gmv_trend' || scope.column.property == 'cost_trend'">
                            <!-- <div :id="scope.row.product_id" style="width: 10dvw;height: 30px;"> -->
                            <div :ref="generateRandomString()" style="width: 10dvw;height: 30px;">
                            </div>
                            <!-- <script setup>
                                import { watchEffect } from 'vue';
                                      watchEffect(() => {
                                        const chart = echarts.init(chartContainer);
                                        // 根据row数据生成相关配置
                                        const options = table_lineOptions(lineData());
                                        // 将配置选项设置到图表上
                                        chart.setOption(options);
                                      });
                            </script> -->
                        </div>

                        <div v-else-if="scope.column.property == 'product_alias'" :title="scope.row.product_name"
                            class="text_hidden">
                            {{ scope.row.product_alias }}
                        </div>

                        <div v-else-if="head.unit == '%'">
                            <!-- {{ persentNum(scope.row) }} -->
                            {{ persentNum(scope.row[scope.column.property]) }}{{ head.unit }}
                        </div>

                        <div v-else-if="(typeof scope.row[scope.column.property]) != 'number'">
                            {{ scope.row[scope.column.property] }}
                        </div>

                        <div v-else>
                            {{ floatNum(scope.row[scope.column.property]) }}
                        </div>
                    </div>
                    <div v-if="componentTitle == '计划明细'">
                        <div v-if="scope.column.property == 'roi_trend' || scope.column.property == 'spend_trend'">
                            <!-- <div :id="scope.row.plan_id" style="width: 10dvw;height: 30px;"> -->
                            <div :ref="generateRandomString()" style="width: 10dvw;height: 30px;">
                            </div>
                            <!-- <script setup>
                                import { watchEffect } from 'vue';
                                      watchEffect(() => {
                                        const chart = echarts.init(chartContainer);
                                        // 根据row数据生成相关配置
                                        const options = table_lineOptions(lineData());
                                        // 将配置选项设置到图表上
                                        chart.setOption(options);
                                      });
                            </script> -->
                        </div>

                        <!-- <div v-else-if="scope.column.property == 'product_alias'" :title="scope.row.product_name"
                            class="text_hidden">
                            {{ scope.row.product_alias }}
                        </div> -->

                        <div v-else-if="head.unit == '%'">
                            <!-- {{ persentNum(scope.row) }} -->
                            {{ persentNum(scope.row[scope.column.property]) }}{{ head.unit }}
                        </div>

                        <div v-else-if="(typeof scope.row[scope.column.property]) != 'number'" class="text_hidden">
                            {{ scope.row[scope.column.property] }}
                        </div>

                        <div v-else>
                            {{ floatNum(scope.row[scope.column.property]) }}
                        </div>
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
import { persentNum, floatNum } from "@/utils/format.js"

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
    return arr
}

const propData = defineProps(['Commodity_detail', 'comKey'])
const emit = defineEmits(['loadMore'])
const componentTitle = ref('')
tableData = propData.Commodity_detail.data
tableHead = propData.Commodity_detail.column
const filterTag = (value: string, row: User) => {
    return row.pallet === value
}
let randomStrings = []

onMounted(() => {
})

watch(propData.Commodity_detail, (newD, oldD) => {
    componentTitle.value = newD.componentTitle
    // console.log(newD, newD, "watch")
    tableHead = newD.column
    tableData = newD.data

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
    nextTick(() => {

        let table = document.getElementById('table' + propData.comKey)
        console.log(table, "tab")
        table.addEventListener(
            "scroll",
            (res) => {
                loadMore(res)
            },
            true
        );

        randomStrings.forEach((element, index) => {
            let dom: any
            // if (element.product_id) {
            //     dom = element.product_id
            // } else if (element.plan_id) {
            //     dom = element.plan_id
            // }
            // console.log(typeof element, element, index, "dommmmmmmmmmmmmmmmmmm")
            // let chartDom = document.getElementById(`${element}`);
            // console.log(chartDom, "dommmmmmmmmmmmmmmmmmm")
            // let myChart = echarts.init(chartDom);
            // let option = table_lineOptions(lineData());
            // option && myChart.setOption(option);
            // let listener = function () {
            //     if (myChart) {
            //         myChart.resize();
            //     }
            // };
            // option && myChart.setOption(option);
            // EleResize.on(chartDom, listener);
            count.value++
        });
        const instance = getCurrentInstance();
        instance?.proxy?.$forceUpdate()
    })
})

const loadMore = (res) => {
    console.log(componentTitle.value,(res.target.scrollTop + res.target.clientHeight), (res.target.scrollHeight - 20), res.target.scrollTop, "ressssssssss")
    if (res.target.scrollTop && ((res.target.scrollHeight - 100) <= (res.target.scrollTop + res.target.clientHeight))) {
        if (componentTitle.value == "商品明细") {
            console.log('商品明细')
            emit('loadMore', 'product')
        }
        if (componentTitle.value == "计划明细") {
            console.log('计划明细')
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