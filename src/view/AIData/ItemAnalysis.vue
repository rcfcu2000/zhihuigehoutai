<template>
    <div class="main" element-loading-background="rgba(122, 122, 122, 0.8)">
        <el-affix :offset="0">
            <div class="header">
                <span class="titl1_h1">单品分析</span>
                <div class="search">
                    <div class="search_left">

                    </div>
                    <div class="search_right">
                        <div class="search_line">
                            商品选择
                            <el-select v-model="searchData.shopId" class="select_width" placeholder="请选择" size="small">
                                <el-option v-for="item in state.shopList" :key="item.responsible" :label="item.responsible"
                                    :value="item.responsible" />
                            </el-select>
                        </div>

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

        <div class="box">
            <div class="child" style="flex: 0.58;">
                <div class="title">单品重点指标</div>
                <div class="box_container">
                    <div class="roduct_num"></div>
                    <div class="roduct_num"></div>
                </div>
            </div>
            <div class="child" style="flex: 0.38;">
                <div class="title">单品重点指标</div>
                <div class="box_container bg_img">
                </div>
            </div>
        </div>


        <div class="box">
            <div class="child">
                <div class="title">SKU占比分析</div>
                <div class="box_container bg_img">
                </div>
            </div>
            <div class="child">
                <div class="title">评价分析</div>
                <div class="box_container bg_img">
                </div>
            </div>
        </div>

        <div class="box">
            <div class="child">
                <div class="table_title">关键词分析</div>
                <div class="box_container table">
                </div>
            </div>
            <div class="child">
                <div class="table_title">每日明细</div>
                <div class="box_container table">
                </div>
            </div>
        </div>
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
import type { FormInstance } from "element-plus";
import { lineOptions, barOptions, lineOptions1 } from "./echartsOptions";
const userStore = useUserStore();
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
const state = reactive({
    shopList: [] as any,
});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const searchData = reactive({
    shopId: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("6").beginDate, weaklast(-8)[0]],
});

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

    .box {
        display: flex;
        justify-content: space-around;

        .child {
            height: 100%;
            flex: 0.48;

            .box_container {
                height: 300px;
               

                .roduct_num {
                    height: 148px;
                    margin: 1px 0;
                    background-image: url("./images/image-3.png");
                    background-size: 100% 100%;
                }
            }

            .table {
                border: 1px solid #ccc;
                height: 360px;
                padding: 10px;
                width: 98%;
                box-sizing: border-box;
                overflow: auto;
                margin-bottom: 10px;
                margin-top: 4px;
                overflow-x: hidden;
            }

            .bg_img {
                background-image: $echarts_bg_img;
                background-size: 100% 100%;
            }
        }
    }

    .title {
        height: 70px;
        line-height: 60px;
        padding-left: 80px;
        font-size: 24px;
        font-weight: 700;
        width: 462px;
        background-image: url("./images/image-2.png");
        background-size: 100% 100%;
    }

    .echarts_title {
        margin: 10px 0 16px 0;
        width: 220px;
        height: 32px;
        padding-left: 40px;
        background-image: url("./images/11.png");
        background-size: 100% 100%;
        font-size: 24px;
    }




    .table_title {
        margin-top: 20px;
        width: 98%;
        height: 43px;
        line-height: 43px;
        font-size: 24px;
        padding: 0 40px;
        font-weight: 700;
        background-image: url("./images/table_title.png");
        // background: linear-gradient(90deg, #008CC2 0%, #008CC2 100%);
        background-size: 100% 100%;
        // margin-left: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
  