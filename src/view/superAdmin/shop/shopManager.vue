<template>
    <div>
        <div class="gva-table-box">
            <el-tabs type="border-card">
                <el-tab-pane label="注册申请" :key="tableData1.length">
                    <!-- <div class="gva-btn-list">
                        <el-button type="primary" icon="plus" @click="addShop('0')">新增店铺</el-button>
                    </div> -->
                    <template #label v-if="tableData1.length > 0">
                        注册申请
                        <el-badge class="mark" :value="regisNum" />
                    </template>
                    <el-table :data="tableData1" style="width: 100%" show-overflow-tooltip>
                        <el-table-column prop="shop_id" label="ID" width="80" align="center" column-key="shop_id" />
                        <el-table-column prop="nickName" label="昵称" min-width="100" align="center">
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.nickName"
                                    v-if="tableRowEditId == row.id + '_' + column.property"
                                    @keyup.enter="blurValueInput(row, column)" @blur="tableRowEditId = ''" />
                                <span v-else>{{ row.nickName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="shop_name" label="店铺名称" min-width="100" align="center">
                            <template #header>
                                <el-input v-model="regData.shop_name" style="width: 100px" placeholder="店铺名称"
                                    @keyup.enter="getShopReg" />
                            </template>
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.shop_name"
                                    v-if="tableRowEditId == row.id + '_' + column.property"
                                    @keyup.enter="blurValueInput(row, column)" />
                                <span v-else>{{ row.shop_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userName" label="用户名" min-width="100" align="center">
                            <template #header>
                                <el-input v-model="regData.username" style="width: 100px" placeholder="用户名"
                                    @keyup.enter="getShopReg" />
                            </template>
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.userName"
                                    v-if="tableRowEditId == row.id + '_' + column.property"
                                    @keyup.enter="blurValueInput(row, column)" />
                                <span v-else>{{ row.userName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="qianniuAcc" label="千牛账号" min-width="100" align="center">
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.qianniuAcc"
                                    v-if="tableRowEditId == row.id + '_' + column.property"
                                    @keyup.enter="blurValueInput(row, column)" />
                                <span v-else>{{ row.qianniuAcc }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="qianniuPwd" label="千牛密码" min-width="100" align="center">
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.qianniuPwd"
                                    v-if="tableRowEditId == row.id + '_' + column.property"
                                    @keyup.enter="blurValueInput(row, column)" />
                                <span v-else>{{ row.qianniuPwd }}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column label="关联用户" min-width="150">
                            <template #default="{ row, column }">
                                <el-select v-model="row.userList" multiple filterable placeholder="请选择用户"
                                    @visible-change="(visible: boolean) => { userChange(visible, row) }">
                                    <el-option v-for="item in userList" :key="item.value" :label="item.userName"
                                        :value="item.userName" />
                                </el-select>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="createdAt" label="申请时间" min-width="100">
                            <template #default="{ row, column }">
                                <span>{{ formatTimeToStr(row.createdAt, 'yyyy-MM-dd hh:mm:ss') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createdAt" label="状态" width="200" align="center">
                            <template #default="{ row, column, $index }">
                                <el-radio-group v-model="row.status" @change="settingShopStatus(row, $index)">
                                    <el-radio :value="0">未通过</el-radio>
                                    <el-radio :value="1">通过</el-radio>
                                </el-radio-group>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="100">
                            <template #default="scope">
                                <el-popconfirm width="220" confirm-button-text="确定" cancel-button-text="取消"
                                    :icon="InfoFilled" icon-color="#E6A23C" title="确定要删除吗?"
                                    @confirm="handleDelete(scope.$index, scope.row)">
                                    <template #reference>
                                        <el-button size="small" type="danger" text>删除</el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="绑定查询">
                    <!-- <div class="gva-btn-list">
                        <el-button type="primary" icon="plus" @click="addShop('0')">新增店铺</el-button>
                    </div> -->
                    <el-table :data="bindTable" style="width: 100%" show-overflow-tooltip>
                        <el-table-column prop="id" label="ID" min-width="100" column-key="shop_id" />
                        <el-table-column prop="shop_id" label="店铺ID" min-width="100" column-key="shop_id" />
                        <el-table-column prop="shop_name" label="店铺名称" min-width="100">
                            <template #header>
                                <el-input v-model="bindData.shop_name" style="width: 100px" placeholder="店铺名称"
                                    @keyup.enter="changeBind" @blur="changeBind" />
                            </template>
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.shop_name"
                                    v-if="tableRowEditId === row.shop_id + '*'"
                                    @keyup.enter="blurValueInput(row, column)" @blur="tableRowEditId = ''" />
                                <span v-else>{{ row.shop_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userid" label="用户ID" min-width="100" column-key="shop_id" />
                        <el-table-column prop="username" label="用户名称" min-width="100">
                            <template #header>
                                <el-input v-model="bindData.username" style="width: 100px" placeholder="用户名"
                                    @keyup.enter="changeBind" @blur="changeBind" />
                            </template>
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.username"
                                    v-if="tableRowEditId === row.shop_id + '*'"
                                    @keyup.enter="blurValueInput(row, column)" @blur="tableRowEditId = ''" />
                                <span v-else>{{ row.username }}</span>
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
                    <el-pagination :hide-on-single-page="true" :total="bindTotal" :page-size="bindData.pageSize"
                        layout="prev, pager, next, jump" @size-change="bindPageChange"
                        @current-change="bindPageChange" />
                </el-tab-pane>
                <el-tab-pane label="店铺列表">
                    <!-- <div class="gva-btn-list">
                        <el-button type="primary" icon="plus" @click="addShop('0')">新增店铺</el-button>
                    </div> -->
                    <el-table :data="bindTable" style="width: 100%" show-overflow-tooltip @cell-click="dbC">
                        <el-table-column prop="shop_id" label="ID" min-width="100" column-key="shop_id" />
                        <el-table-column prop="shop_name" label="店铺名称" min-width="100">
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.shop_name"
                                    v-if="tableRowEditId === row.shop_id" @keyup.enter="blurValueInput(row, column)"
                                    @blur="tableRowEditId = ''" />
                                <span v-else>{{ row.shop_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="shop_name" label="管理用户" min-width="100">
                            <template #default="{ row, column }">
                                <el-input :id="row.id + '_' + column.property" v-model="row.shop_name"
                                    v-if="tableRowEditId === row.shop_id" @keyup.enter="blurValueInput(row, column)"
                                    @blur="tableRowEditId = ''" />
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
                </el-tab-pane>
            </el-tabs>
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
    getUserList,
    getShopRegList,
    delShopRegist,
    setShopRegStatus,
} from '@/api/user'
import { reactive, ref, toRef } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { formatTimeToStr } from "@/utils/date";

const page = ref(1)
const total = ref(0)
const pageSize = ref(999)
const tableData = ref([])
const tableData1 = ref([] as any)
const userList = ref([] as any)
const userlistdata = ref({
    "keyword": "",
    "page": 1,
    "pageSize": 10000
})
const regData = ref({
    "shop_id": "",
    "shop_name": "",
    "userid": 0,
    "username": ""
})
const bindTable = ref([] as any)
const bindData = ref({
    "desc": true,
    "orderKey": "",
    "pageNum": 1,
    "pageSize": 5,
    "shop_name": "",
    "username": ""
})
const regisNum = ref(0)
const getAll = async () => {
    const [table, res] = [await getAllShopList(), await getUserList(userlistdata.value),]
    console.log(res, "getUserList")
    if (table.code === 0) {
        tableData.value = table.data.records
    }
    if (res.code === 0) {
        userList.value = res.data.list
    }
}
getAll()
const getShopReg = async () => {
    const table1 = await getShopRegList(regData.value)
    if (table1.code === 0) {
        tableData1.value = table1.data.records
        table1.data.records.map((item: any, index: any) => {
            if (item.status == 0) {
                regisNum.value++
            }
        })
    }
}
getShopReg()
const changeShopreg = async () => {

}
const bindTotal = ref(0)
const getBind = async () => {
    const res = await getShopUserList(bindData.value)
    if (res.code === 0) {
        bindTable.value = res.data.records
        bindTotal.value = res.data.count
    }

}
getBind()
const changeBind = async () => {
    bindData.value.pageNum = 1
    bindTable.value = []
    getBind()
}
const bindPageChange = async (value: number) => {
    bindData.value.pageNum = value
    bindTable.value = []
    getBind()
}

const addShop = (val: any) => {

}

const tableRowEditId = ref(''); // 控制可编辑的每一行
const dbC = (row: any, column: any, cell: HTMLTableCellElement, event: Event) => {
    column = { ...column }
    if (column.property === "userName" || column.property === "qianniuAcc" || column.property === "qianniuPwd" || column.property === "shop_name" || column.property === "nickName") {
        tableRowEditId.value = row.id + '_' + column.property
    }
}
const blurValueInput = (row: any, column: any) => {
    tableRowEditId.value = ''
}

const handleDelete = async (index: any, row: any) => {
    row = { ...row }
    const obj = {
        id: row.id
    }
    const res = await delShopRegist(obj)
    if (res.code == 0) {
        ElMessage({
            message: '删除成功',
            type: 'success',
        })
        await getAll()
    } else {
        ElMessage({
            message: '失败：' + res.msg,
            type: 'error',
        })
    }
}

const settingShopStatus = async (row: any, index: any) => {
    row = { ...row }
    const obj = {
        id: row.id,
        status: row.status
    }
    const res = await setShopRegStatus(obj)
    if (res.code == 0) {
        ElMessage({
            message: '修改状态成功',
            type: 'success',
        })
        await getAll()
    } else {
        ElMessage({
            message: '失败：' + res.msg,
            type: 'error',
        })
        if (row.status == 0) {
            tableData1.value[index].status = 1
        } else {
            tableData1.value[index].status = 0
        }
    }
}

const userChange = async (visible: boolean, row: any) => {
    row = { ...row }
    // await addShop2User()
    console.log(visible, row, "visible")
}
</script>