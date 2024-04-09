<template>
    <div>
        <div class="gva-table-box">
            <div class="gva-btn-list">
                <el-button type="primary" icon="plus" @click="addShop('0')">新增店铺</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" show-overflow-tooltip>
                <el-table-column prop="shop_id" label="ID" min-width="100" />
                <el-table-column prop="shop_name" label="店铺名称" min-width="100" />
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
<script setup>
import {
    getShopUserList,
    addShop2User,
    delShopUser,
    getAllShopList,
    getMyShopList
} from '@/api/user'
import { reactive, ref } from 'vue'
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

const addShop = (val) => {

}


</script>