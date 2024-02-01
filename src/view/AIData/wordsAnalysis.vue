<!--
    关键词分析
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 14:35:35
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-01-31 16:43:11
 * @FilePath: \zhihuigehoutai\src\view\AIData\wordsAnalysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="wordsAnalysis">
        <page_header :title="pageTitle" />
        <div class="page_words">
            <el-row :gutter="30" class="wordsRow">
                <el-col :span="12" v-for="item in boxData">
                    <box :datas="item" />
                </el-col>
            </el-row>
        </div>
        <div class="wordsTable">
            <comtable :Commodity_detail="allData"></comtable>
            {{ userid.id }} 123123
        </div>
    </div>
</template>
<script setup lang="ts" name="wordsAnalysis">
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import page_header from './components/page_header.vue'
import box from './components/box.vue'
import comtable from './components/table.vue'
import { useUserStore } from "@/pinia/modules/user";
import { reactive, ref } from "vue";
const pageTitle = "关键词分析"
const userStore = useUserStore();
const userid = {
    id: userStore.userInfo.nickName
};
const allData = reactive({
    componentTitle: '商品明细',
    data: [],
    column: [
        { title: '分类', width: '', align: 'center', dataKey: 'pallet', key: 'pallet', fixed: true, unit: '' },
        { title: '无界点击量', width: '', align: 'center', dataKey: 'product_name', key: 'product_name', unit: '' },
        { title: '无界点击率', width: '', align: 'center', dataKey: 'gmv', key: 'gmv', unit: '' },
        { title: '搜索访客', width: '', align: 'center', dataKey: 'gmv_percentage', key: 'gmv_percentage', unit: '%' },
        { title: '搜索转化率', width: '', align: 'center', dataKey: 'gmv_trend', key: 'gmv_trend', unit: '' },
        { title: '付费访客', width: '', align: 'center', dataKey: 'cost', key: 'cost', unit: '' },
        { title: '付费转化率', width: '', align: 'center', dataKey: 'cost_percentage', key: 'cost_percentage', unit: '%' },
        { title: '行业访客', width: '', align: 'center', dataKey: 'cost_trend', key: 'cost_trend', unit: '' },
        { title: '行业转化率', width: '', align: 'center', dataKey: 'roi', key: 'roi', unit: '' },
    ]
})

// 词云图数据
const boxData = ref([
    { title: '无界词', chartsData: [] },
    { title: '生参付费词', chartsData: [] },
    { title: '生参免费词', chartsData: [] },
    { title: '生参行业词', chartsData: [] },
])
console.log(userStore.userInfo.nickName, "userinfoID")
</script>
<style lang="scss" scoped>
.wordsAnalysis {
    background-image: $page_bg;
    background-size: 100% 100%;
    height: 100vh;
    color: rgba(255, 255, 255, 1);
}

.page_words {
    padding: 0 0 0 5vm;
}

// 修改element样式

.wordsRow {
    padding: 1vw;
}
</style>