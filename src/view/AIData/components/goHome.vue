<template>
    <el-tooltip effect="dark" content="回到首页" placement="bottom">
        <div class="goHome" @click="goHome">
        </div>
    </el-tooltip>
</template>
<script setup lang="ts" name="goHome">
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
    router.push('/layout/dashboard')
}
</script>
<style lang="scss" scoped>
.goHome {
    position: fixed;
    width: 50px;
    height: 50px;
    top: 10px;
    right: 20px;
    z-index: 9;
    background-image: url('../images/gohome.png');
    background-size: 100% 100%;
    cursor: pointer;
}
</style>