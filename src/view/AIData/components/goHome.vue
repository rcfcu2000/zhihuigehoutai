<!--
 * @Author: dtl 603388675@.com
 * @Date: 2024-03-25 12:26:52
 * @LastEditors: dtl 603388675@.com
 * @LastEditTime: 2024-04-02 14:23:43
 * @FilePath: \zhihuigehoutai\src\view\AIData\components\goHome.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-tooltip effect="dark" content="回到首页" placement="bottom">
        <!-- <div class="goHome" @click="goHome">
        </div> -->
        <el-dropdown @command="pathGo">
            <el-button text class="goHome">
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item, index in pathList" :key="index"
                        :command="{ path: item.path }">{{ item.meta.title }}</el-dropdown-item>
                    <el-dropdown-item :key="'0101'"
                        :command="{ path: '/layout/dashboard' }">返回系统</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-tooltip>
</template>
<script setup lang="ts" name="goHome">
import { useRouter } from 'vue-router'
import { useRouterStore } from '@/pinia/modules/router'
const routerStore = useRouterStore()
const router = useRouter()
const goHome = () => {
    router.push('/layout/dashboard')
}
let pathList = routerStore.routeMap.AIData.children

const pathGo = (params: any) => {
    console.log(params, "pathGo")
    router.push(params.path)
}
</script>
<style lang="scss" scoped>
.goHome {
    position: fixed;
    width: 50px;
    height: 50px;
    top: 10px;
    right: 20px;
    z-index: 999;
    background-image: url('../images/gohome.png');
    background-size: 100% 100%;
    cursor: pointer;
}
</style>