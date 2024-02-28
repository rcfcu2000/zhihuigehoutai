<template>
    <div class="mian">
        this is goal
    </div>
</template>

<script setup lang="ts" name="goal" >
import {
    getPromotionGetAlldata,
    getProductGetAlldata,
    getPlanGetAlldata,
    getResponsibleList,
    getSubGmvList,
    getSearchdata,
    getProductThendListdata,
    getPlanThendListdata,
} from '@/api/AIdata'
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js"
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复

</script>