<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-23 10:19:12
 * @LastEditors: dtl darksunnydong@qq.com
 * @LastEditTime: 2024-01-23 18:00:53
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="tableHead">
        {{ }}
    </div>
    <div class="table">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2 header-class="tableHeadClass" :data="tableData" :columns="tableHead" :stripe="false"
                    :width="width" :height="height" :row-height="20" />
            </template>
        </el-auto-resizer>
    </div>

    <!-- <el-table-column v-for="(item, index) in tableHead" :key="index" :prop="item.prop" :label="item.name">
            <template #default="scope">
                <div>
                    {{ scope.row[item.prop] }}
                </div>
            </template>
        </el-table-column> -->
</template>

<script setup lang="ts" name="comTable">
import { ref } from 'vue'
const tableHead = ref([
    { key: 'date', dataKey: 'date', title: '日期', align: 'center', width: 150, fixed: true },
    { key: 'name', dataKey: 'name', title: '名称', align: 'center', width: 150 },
    { key: 'address', dataKey: 'address', title: '地址', align: 'center', width: 150 }
])
const tableData = [
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
]

const propData = defineProps([''])

</script>

<style lang="scss" scoped>
.tableHead {
    background-image: $table_bg_Title;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 43px;
    width: 100%;
    font-size: 24px;
    padding-left: 5%;
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