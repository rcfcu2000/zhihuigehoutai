<!--
    关键词分析
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 14:35:35
 * @LastEditors: dtl darksunnydong@qq.com
 * @LastEditTime: 2024-01-22 18:21:55
 * @FilePath: \zhihuigehoutai\src\view\AIData\wordsAnalysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="wordsAnalysis">
        <page_header :title="pageTitle" />
        <div class="page_words">
            <el-row>
                <el-col :span="12" v-for="item in boxData">
                    <box :datas="item" />
                </el-col>
            </el-row>
            {{ userid.id }} 123123
        </div>
    </div>
</template>
<script setup lang="ts" name="wordsAnalysis">
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import page_header from './components/page_header.vue'
import box from './components/box.vue'
import { useUserStore } from "@/pinia/modules/user";
import { ref } from "vue";
const pageTitle = "关键词分析"
const userStore = useUserStore();
const userid = {
    id: userStore.userInfo.nickName
};

const boxData = ref([
    { title: '无界词', height: '320px', chartsData: [] },
    { title: '生参付费词', height: '320px', chartsData: [] },
    { title: '生参免费词', height: '320px', chartsData: [] },
    { title: '生参行业词', height: '320px', chartsData: [] },
])
console.log(userStore.userInfo.nickName, "userinfoID")
</script>
<style lang="scss" scoped>
.wordsAnalysis {
    background-image: $page_bg;
    background-size: 100%;
    height: 100vh;
    color: rgba(255, 255, 255, 1);
}
.page_words{
    padding: 0 0 0 5vm;
}
</style>