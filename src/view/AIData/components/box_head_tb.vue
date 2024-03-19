<!--
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 17:06:13
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-15 16:17:23
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\components\box.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="tableHead">
        {{ props.title }}
    </div>
</template>
<script setup lang="ts" name="">
import { ref } from 'vue'

const props = defineProps(['title'])

</script>

<style lang="scss" scoped>
.tableHead {
    background-image: $table_bg_Title;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 43px;
    width: 100%;
    font-size: 24px;
    padding-left: 2.5vw;
    font-weight: 700;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 1);
}
</style>