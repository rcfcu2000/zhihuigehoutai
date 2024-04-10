<!--
 * @Author: dtl 603388675@.com
 * @Date: 2024-04-09 10:41:43
 * @LastEditors: dtl 603388675@.com
 * @LastEditTime: 2024-04-10 14:46:25
 * @FilePath: \zhihuigehoutai\src\view\superAdmin\shop\shopManager.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="gva-table-box">
            <div class="gva-btn-list">
                <el-button type="primary" icon="plus" @click="addShop('0')">新增店铺</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" show-overflow-tooltip @cell-click="dbC">
                <el-table-column prop="shop_id" label="ID" min-width="100" column-key="shop_id" />
                <el-table-column prop="shop_name" label="店铺名称" min-width="100">
                    <template #default="{ row, column }">
                        <el-input :ref="setRef" v-model="row.shop_name" v-if="tableRowEditId === row.shop_id"
                            @keyup.enter="blurValueInput(row, column)" @blur="tableRowEditId = null" />
                        <span v-else>{{ row.shop_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shop_name" label="管理用户" min-width="100">
                    <template #default="{ row, column }">
                        <el-input :ref="setRef" v-model="row.shop_name" v-if="tableRowEditId === row.shop_id"
                            @keyup.enter="blurValueInput(row, column)" @blur="tableRowEditId = null" />
                        <span v-else>{{ row.shop_name }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作" min-width="100">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
</el-table-column> -->
            </el-table>
        </div>
    </div>

</template>
<script setup lang="ts">
import {
    getShopUserList,
    addShop2User,
    delShopUser,
    getAllShopList,
    getMyShopList,
    getUserList
} from '@/api/user'
import { reactive, ref, toRef } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const page = ref(1)
const total = ref(0)
const pageSize = ref(999)
const tableData = ref([])

const getAll = async () => {
    const table = await getAllShopList()
    if (table.code === 0) {
        tableData.value = table.data.records
    }
}
getAll()

const addShop = (val: any) => {

}

const tableRowEditId = ref(null); // 控制可编辑的每一行
const shop_name_input = ref([] as Array<any>)
const setRef = (el: any) => {
    if (el) {
        shop_name_input.value.push(el);
    }
};
const dbC = (row: any, column: any, cell: HTMLTableCellElement, event: Event) => {
    tableRowEditId.value = row.shop_id
}
const blurValueInput = (row: any, column: any) => {
    console.log(row, column, shop_name_input.value[0], "row: any, column: any")
    shop_name_input.value[0].blur()
    tableRowEditId.value = null
}
</script>