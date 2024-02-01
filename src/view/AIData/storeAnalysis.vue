<!--
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-01-31 16:15:30
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-02-01 10:19:01
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\storeAnalysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="storeAnalysis pageBG">
        <page_header :title="pageTitle" />
    </div>

    <!-- 头部的查询条件，追加进page_header组件 -->
    <Teleport to=".header_left">
        <div style="height: 300px; width: 200px;">
            123123
        </div>
    </Teleport>
</template>
<script setup lang="ts">
import page_header from './components/page_header.vue'

const pageTitle = "店铺分析"
</script>
<style lang="scss" scoped>



</style>