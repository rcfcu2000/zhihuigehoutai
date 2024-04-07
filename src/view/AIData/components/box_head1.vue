
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
    background-image: $box_head_bg_img1;
    background-position-y: center;
    font-size: 24px;
    font-weight: 700;
    color: rgba(255,255,255,1);
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 0 0 2vw;
}
</style>