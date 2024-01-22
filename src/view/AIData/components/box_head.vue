<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 17:06:13
 * @LastEditors: dtl darksunnydong@qq.com
 * @LastEditTime: 2024-01-22 17:39:59
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\box.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box_head">
        {{ props.title }}
    </div>
</template>
<script setup lang="ts" name="">
import { ref } from 'vue'

const props = defineProps(['title'])

</script>

<style lang="scss" scoped>
.box_head{
    background-repeat: no-repeat;
    background-image: $box_head_bg_img;
    font-size: 24px;
    font-weight: 700;
    color: rgba(255,255,255,1);
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 0 0 4.5vw;
}
</style>