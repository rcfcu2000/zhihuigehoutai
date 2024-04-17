<template>
    <el-affix :offset="0">
        <div>
            <el-row class="header">
                <el-col :span="8">
                    <div class="header_left" />
                </el-col>
                <el-col :span="8" style="text-align: center;">
                    <el-dropdown @command="pathGo">
                        <div style="width: 200px;">
                            <div class="h_title">
                                {{ props.title }}
                            </div>
                            <div class="shopname">
                                {{ currentShop.shop_name }}
                            </div>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item, index in list" :key="index" :command="item">{{
        item.shop_name
                                    }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
                <el-col :span="8">
                    <div class="header_right" />
                </el-col>
            </el-row>
        </div>
    </el-affix>
</template>

<script setup lang="ts" name="AIpage_header">
import { useUserStore } from '@/pinia/modules/user'
import { ref, onMounted } from 'vue'

const userStore = useUserStore()
const list = userStore.userShop
const currentShop = ref({} as any)
const init = () => {
    currentShop.value = userStore.currentShop
}
onMounted(() => {
    init()
})
const props = defineProps(['title'])
const emit = defineEmits(['changeShop'])
const pathGo = (params: any) => {
    params = { ...params }
    userStore.setCurrentShop(params)
    emit('changeShop', params)
    init()
}
</script>
<style lang="scss" scoped>
// $header_bg: url('../images/0.png');
// ::v-deep(.el-affix--fixed) {
//     background-image: $header_bg;
//     background-size: 100%;
// }

.header {
    background-image: $header_bg;
    background-size: 100%;
    height: 5%;
    background-color: rgb(1, 17, 40);
}

.h_title {
    font-size: 1.3dvw;
    font-weight: 700;
    letter-spacing: 0px;
    width: 100%;
    height: 5vh;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
}

.shopname {
    width: 120px;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0%);
    color: #fff;
}

// 组件样式修改
.el-row {
    padding: 0 !important;
}
</style>