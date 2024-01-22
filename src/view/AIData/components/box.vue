<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 17:06:13
 * @LastEditors: dtl darksunnydong@qq.com
 * @LastEditTime: 2024-01-22 18:02:42
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\box.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box" :style="{ height: props.datas.height }">
        <boxHead :title="props.datas.title" />
        <div id="box_body">
        </div>
    </div>
</template>
<script setup lang="ts" name="">
import boxHead from './box_head.vue'
import { ref } from 'vue'

const props = defineProps(['datas'])
console.log(props.datas, "box_props")

</script>

<style lang="scss" scoped>
#box_body{
    background-image: $echarts_bg_img2;
    background-size: 100%;
    background-repeat: no-repeat;
    height: 252px;
}
</style>