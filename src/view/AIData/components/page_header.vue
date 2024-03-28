<!--
    AI公共头部
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 15:15:01
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-02-01 17:24:48
 * @FilePath: \zhihuigehoutai\src\view\AIData\components\page_header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="header">
        <el-row>
            <el-col :span="8">
                <div class="header_left" />
            </el-col>
            <el-col :span="8">
                <div class="h_title">
                    {{ props.title }}
                </div>
            </el-col>
            <el-col :span="8">
                <div class="header_right" />
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="AIpage_header">

const props = defineProps(['title'])

</script>
<style lang="scss" scoped>
// $header_bg: url('../images/0.png');
.header {
    background-image: $header_bg;
    background-size: 100%;
    height: 5%;
}

.h_title {
    font-size: 1.3dvw;
    font-weight: 700;
    letter-spacing: 0px;
    width: 100%;
    height: 5vh;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
}


// 组件样式修改
.el-row {
    padding: 0 !important;
}
</style>