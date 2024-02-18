<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-23 10:19:12
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-02-18 10:27:12
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\table.vue
 * @Description: 单品分析——每日明细 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
            v-el-table-infinite-scroll="loadMore" :infinite-scroll-distance="300" @filter-change="filterChange"
            @header-click="headerClick">
            <!-- <el-table-column prop="pallet" label="本月货盘" fixed width="120" align="center" :filters="current_inventory.data"
                :filter-method="filterTag" column-key="pallet">

            </el-table-column> -->

            <el-table-column v-for="head, index in tableHead" :key="index" :prop="head.dataKey" :label="head.title"
                :fixed="head.fixed" :align="head.align" :width="head.width">
                <template #default="scope">
                    <div>
                        {{ scope.row[scope.column.property] }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts" name="comTable">
import { ref, reactive, watch, getCurrentInstance, nextTick, onMounted, onUpdated } from 'vue'
import { persentNum, floatNum, lueNum } from "@/utils/format.js"


const count = ref(0)
const loadType = ref(false)
let tableHead = ref([
    { key: 'date', dataKey: 'date', title: '日期', align: 'center', width: 150, fixed: true },
    { key: 'name', dataKey: 'name', title: '名称', align: 'center', width: 150 },
    { key: 'address', dataKey: 'address', title: '地址', align: 'center', width: 150 }
])
let tableData = reactive([] as Array<any>)
const propData = defineProps(['Commodity_detail', 'comKey', 'clearData'])
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

onMounted(() => {

})
/**
     * 刷新table,防止滚动条跑到最上面
    */
const refreshTable = () => {
    let table = tableListRef.value;
    //强制刷新组件
    table.doLayout()
}
watch([propData.Commodity_detail, propData.clearData], ([newD, newE]) => {
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

const loadMore = (res) => {
    if (componentTitle.value == "每日明细") {
        console.log('商品明细')
        if (!loadType.value) {
            loadType.value = true
            emit('loadMore', 'day')
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