
<template>
    <div class="box">
        <boxHead :title="props.datas.title" />
        <div :id="props.idx" class="box_body">
            <el-skeleton :rows="4" animated> </el-skeleton>
        </div>
    </div>
</template>

<script setup lang="ts" name="box">
import boxHead from './box_head.vue'
import { ref, watch, onMounted, nextTick } from 'vue'
import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js";
import 'echarts-wordcloud';
import { wordsCloud } from "../echartsOptions";

onMounted(async () => {
})
const props = defineProps(['datas', 'idx'])
const emit = defineEmits(['wordsClick'])
watch([props.datas, props.idx], ([newD, newE]) => {
    nextTick(() => {
        const chartDom = document.getElementById(props.idx) as HTMLElement;
        const myChart = echarts.init(chartDom);
        if (chartDom != null && chartDom !== "" && chartDom != undefined) {
            myChart.clear()
        }
        const option = wordsCloud(props.datas.chartsData, '');
        window.requestAnimationFrame(() => {
            option && myChart.setOption(option);
        })
        let listener = function () {
            if (myChart) {
                myChart.resize();
            }
        };
        EleResize.on(chartDom, listener);
        myChart.off('click');
        myChart.on("click", function (params: any) {
            myChart.dispatchAction({
                type: 'unselect',
                seriesIndex: 'all',
                dataIndex: 'all'
            });
            myChart.dispatchAction({
                type: 'select',
                // seriesName: params.name,
                dataIndex: params.dataIndex
            });
            emit('wordsClick', params)
        })

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