<!--
 * @Author: 603388675@qq.com 603388675@qq.com
 * @Date: 2024-01-31 16:15:30
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-02-01 17:26:55
 * @FilePath: \project\zhihuigehoutai\src\view\AIData\storeAnalysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="storeAnalysis pageBG">
        <page_header :title="pageTitle" />
    </div>

    <!-- 头部的查询条件，追加进page_header组件 -->
    <Teleport to=".header_right">

        <div class="search">
            <div class="search_right">
                <label>请选择起止时间</label>
                <el-date-picker v-model="searchData.date" :clearable="false" size="small" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange" start-placeholder="开始时间"
                    end-placeholder="结束时间" />
            </div>
        </div>
    </Teleport>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import page_header from './components/page_header.vue'

const pageTitle = "店铺分析"
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const pageSize = ref(20)
const searchData = reactive({
    shopId: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, weaklast(-8)[0]],

    page_num: 0,
    page_size: pageSize,
    product_id: '',
    start_date: '',
    end_date: '',
});
</script>
<style lang="scss" scoped>
::v-deep(.el-input__wrapper) {
    background: transparent !important;
    box-shadow: none;
    border-radius: 0;
    border: 1px solid rgba(1, 229, 255, 1);
    width: 200px;

    .el-range-input {
        color: #fff;
    }
}

.search {
    padding-top: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .search_left {
        display: flex;
        flex: 0.35;
        // justify-content: space-between;

    }

    .search_right {
        display: flex;
        flex: 0.35;
    }

    .search_line {
        margin: 0 10px;

        .line {
            display: flex;
        }

        .select_width {
            width: 100px;
        }

    }
}
</style>