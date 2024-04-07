
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