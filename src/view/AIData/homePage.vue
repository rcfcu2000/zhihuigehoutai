<template>
    <div class="main" element-loading-background="rgba(122, 122, 122, 0.8)">
        <el-affix :offset="0">
            <div class="header">
                <span class="titl1_h1">首页</span>
                <div class="search">
                    <div class="search_left">
                    </div>
                    <div class="search_right">

                        <div class="search_line">
                            请选择起止时间
                            <el-date-picker v-model="searchData.date" :clearable="false" size="small" format="YYYY/MM/DD"
                                value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange"
                                start-placeholder="开始时间" end-placeholder="结束时间" />
                        </div>
                    </div>
                </div>
            </div>
        </el-affix>
        <goHome />
    </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import goHome from "./components/goHome.vue";
import {

} from "@/api/AIdata";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { useUserStore } from "@/pinia/modules/user";
import { reactive, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import 'echarts-wordcloud'
import { lineOptionsNum, XYlineOptions, barOptionsY, wordsCloud } from "./echartsOptions";
import dayListTbale from './components/dayList_table.vue'
import wordsTbale from './components/words_table.vue'
const userStore = useUserStore();
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
const state = reactive({

});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const searchData = reactive({
    shopId: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, weaklast(-8)[0]],
    start_date: '',
    end_date: '',
});

onMounted(async () => {


})



</script>
<style lang="scss" scoped>
$echarts_bg_img: url("./images/_2.png");

.main {
    height: 100%;
    width: 100%;
    background-image: url("./images/bc.jpg");
    background-size: 100% 100%;
    color: #fff;
    overflow-y: auto;
    overflow-x: hidden;

    .header {
        height: 63px;
        width: 100%;
        background-image: url("./images/0.png");
        background-size: 100% 100%;
        position: relative;

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

        .titl1_h1 {
            position: absolute;
            width: 120px;
            line-height: 40px;
            font-size: 30px;
            font-weight: 700;
            inset: 0;
            margin: 0 auto;
        }
    }

 
}

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

::v-deep(.el-form-item__label) {
    color: rgba(1, 229, 255, 1);
    font-size: 16px;
    font-weight: 400;
    padding-right: 0;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
    width: 6px;
    /* 横向滚动条宽度 */
}

::-webkit-scrollbar-track {
    background-color: #00053f;
    /* 滚动条背景色 */
}

::-webkit-scrollbar-thumb {
    background-color: rgb(33, 90, 169);
    /* 滑块颜色 */
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgb(33, 183, 206);
    /* 滑块悬停状态颜色 */
}
</style>
  