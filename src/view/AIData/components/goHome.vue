
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
                        :command="{ path: item.path }" class="dropItem">{{ item.meta.title }}</el-dropdown-item>
                    <el-dropdown-item :key="'0101'"
                        :command="{ path: '/layout/dashboard' }">
                        <el-button type="primary" plain>
                            返回系统
                        </el-button>
                        </el-dropdown-item>
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

.dropItem:hover{
    background-color: aqua !important;
}
</style>