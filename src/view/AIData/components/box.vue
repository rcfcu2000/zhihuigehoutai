<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 17:06:13
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-14 16:21:02
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\box.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="box">
        <boxHead :title="props.datas.title" />
        <div :id="props.idx" class="box_body">
        </div>
    </div>
</template>

<script setup lang="ts" name="box">
import boxHead from './box_head.vue'
import { ref, watch, onMounted, nextTick } from 'vue'
import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import 'echarts-wordcloud';
import { wordsCloud } from "../echartsOptions";

onMounted(async () => {
})
const props = defineProps(['datas', 'idx'])
watch([props.datas, props.idx], ([newD, newE]) => {
    nextTick(() => {
        const chartDom = document.getElementById(props.idx) as HTMLElement;
        const myChart = echarts.init(chartDom);
        const option = wordsCloud(props.datas.chartsData, '');
        option && myChart.setOption(option);
        let listener = function () {
            if (myChart) {
                myChart.resize();
            }
        };
        EleResize.on(chartDom, listener);

    })
}, { deep: true, immediate: true })



</script>

<style lang="scss" scoped>
.box_body {
    background-image: $echarts_bg_img2;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 268px;
}
</style>