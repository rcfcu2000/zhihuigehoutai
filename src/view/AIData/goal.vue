<template>
    <div class="gola pageBG">
        <page_header :title="pageTitle" />
        <el-form :inline="true" :model="searchData" class="goal-from">
            <el-form-item label="请选择起止时间">
                <el-date-picker v-model="searchData.date" @change="getData" :clearable="false" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange" start-placeholder="开始时间"
                    end-placeholder="结束时间" style="
            width: 220px;
            background: transparent;
            border-color: rgba(0, 98, 147, 0.5);
          " />
            </el-form-item>
        </el-form>

        <el-row :gutter="20">
            <el-col :span="10">
                <div class="box">
                    <boxHead title="访客分布" />

                    <div class="roduct_num_box">
                        <ul class="roduct_num_box_ctn">
                            <li :title="lueNum(indexData.data.gmv)">
                                <span class="ctn_num"> {{ lueNum(indexData.data.gmv) }} </span>
                                <span class="ctn_name"> GMV </span>
                            </li>
                            <li :title="lueNum(indexData.data.gmv)">
                                <span class="ctn_num"> {{ lueNum(indexData.data.profit) }} </span>
                                <span class="ctn_name"> 净利润 </span>
                            </li>
                            <li :title="lueNum(indexData.data.gmv)">
                                <span class="ctn_num"> {{ lueNum(indexData.data.spend) }} </span>
                                <span class="ctn_name"> 推广花费 </span>
                            </li>
                            <li>
                                <span class="ctn_num"> {{ lueNum(indexData.data.promotion_percentage*100) }}% </span>
                                <span class="ctn_name"> 推广占比 </span>
                            </li>
                            <li :title="lueNum(indexData.data.gmv)">
                                <span class="ctn_num"> {{ lueNum(indexData.data.profit_rate*100) }}% </span>
                                <span class="ctn_name"> 净利润率 </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="boxHead1">
                    月累GMV达成率
                </div>
                <div class="monthGmv">
                    <div class="box2_center_top_left_center_left">
                        <div>
                            <p class="num">{{ lueNum(indexData.data.month_gmv) }}</p>
                            <p class="name">累计GMV</p>
                        </div>
                        <div>
                            <p class="num">{{ lueNum(indexData.data.target_gmv) }}</p>
                            <p class="name">GMV目标</p>
                        </div>
                    </div>

                    <div class="box2_center_top_left_center_right">
                        <div class="absu"></div>
                        <div class="wenzi">
                            <div class="num">
                                {{ persentNum(indexData.data.target_day_rate) }}%
                            </div>
                            <div class="percentage">
                                目标: {{ persentNum(indexData.data.target_gmv_rate) }}%({{ persentNum(indexData.data.target_day_rate-indexData.data.target_gmv_rate) }}%)
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="boxHead1">
                    货盘GMV达成率
                </div>
                <div class="palletGmv">
                    <el-table :data="palletGmvData.tableData" border v-loading="palletGmvload" class="palletGmv"
                        element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%; height: 120px">
                        <el-table-column v-for="item, index in palletGmvData.table_head" :key="index"
                            :prop="item.dataKey" :label="item.title" :width="item.width" :align="item.align"
                            :fixed="item.fixed">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="box">
                    <boxHead title="GMV趋势" />
                    <div id="gmvTrend" class="body_center">

                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="box">
                    <boxHead title="责任人分析" />
                </div>
            </el-col>
            <el-col :span="7">
                <div class="box">
                    <boxHead title="类目分析" />
                </div>
            </el-col>
        </el-row>
    </div>
    <goHome />
</template>

<script setup lang="ts" name="goal">
import { reactive, onMounted, ref } from "vue";
import goHome from "./components/goHome.vue";
import page_header from "./components/page_header.vue";
import boxHead from "./components/box_head.vue";
import {
    lineOptions,
} from "./echartsOptions";
import {
    GetGmvTargetdata,
    GetGmvTrenddata,
    getCategoryAlysisdata,
    getIndexdata_target,
    getManagerAlysisdata,
    getPalletListdata,
} from "@/api/AIdata";
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js";
import * as echarts from "echarts";
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复

const pageTitle = "目标达成";

// 指数信息
const indexData = reactive({
    data: {} as any
})
const searchData = reactive({
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    loading: false,
    date: ["2024-01-01", "2024-01-25"],
    lv3: "",
    product_id: "",
    start_date: "",
    end_date: "",
    shop_name: "蜡笔派家居旗舰店", //店铺名称
});
// 货盘GMV达成率
const palletGmvData = reactive({
    table_head: [
        {
            title: "",
            width: '',
            align: "center",
            dataKey: "name",
            key: "name",
            fixed: true,
            unit: "",
        },
        {
            title: "S",
            width: '',
            align: "center",
            dataKey: "S",
            key: "S",
            unit: "",
        },
        {
            title: "A",
            width: '',
            align: "center",
            dataKey: "A",
            key: "A",
            unit: "",
        },
        {
            title: "B",
            width: '',
            align: "center",
            dataKey: "B",
            key: "B",
            unit: "",
        },
        {
            title: "C",
            width: '',
            align: "center",
            dataKey: "C",
            key: "C",
            unit: "",
        },
        {
            title: "D",
            width: '',
            align: "center",
            dataKey: "D",
            key: "D",
            unit: "",
        },
    ],
    tableData: [],
});
const palletGmvload = ref(true);
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
};

const getData = async () => {
    await getIndexData();
    await getGmvTarget();
    await getGmvTrend();
 };

const remoteMethod = async () => { };

onMounted(async () => {
    await getData()
});

// 指数信息
const getIndexData = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await getIndexdata_target(data)];
    console.log(res, "getIndexdata_target");
    if (res.code == 0) {
        indexData.data = res.data ? res.data : {}
    }
}

// 货盘GMV达成率
const getGmvTarget = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await GetGmvTargetdata(data)];
    if (res.code == 0) {
        let arr = [
            { name: "累计GMV" },
            { name: "GMV目标" },
            { name: "GMV达成率" },
        ] as any;
        res.data.records?.map((item: any, index: any) => {
            if (item.pallet == "S") {
                arr[0].S = lueNum(item.month_gmv);
                arr[1].S = lueNum(item.target_gmv);
                arr[2].S = persentNum(item.target_gmv_rate) + "%";
            }
            if (item.pallet == "A") {
                arr[0].A = lueNum(item.month_gmv);
                arr[1].A = lueNum(item.target_gmv);
                arr[2].A = persentNum(item.target_gmv_rate) + "%";
            }
            if (item.pallet == "B") {
                arr[0].B = lueNum(item.month_gmv);
                arr[1].B = lueNum(item.target_gmv);
                arr[2].B = persentNum(item.target_gmv_rate) + "%";
            }
            if (item.pallet == "C") {
                arr[0].C = lueNum(item.month_gmv);
                arr[1].C = lueNum(item.target_gmv);
                arr[2].C = persentNum(item.target_gmv_rate) + "%";
            }
            if (item.pallet == "D") {
                arr[0].D = lueNum(item.month_gmv);
                arr[1].D = lueNum(item.target_gmv);
                arr[2].D = persentNum(item.target_gmv_rate) + "%";
            }
        });
        palletGmvData.tableData = arr;
        palletGmvload.value = false;
    }
};

// gmv趋势
const getGmvTrend = async () => {
    let data = searchData;
    data.start_date = data.date[0];
    data.end_date = data.date[1];
    const [res] = [await GetGmvTrenddata(data)];

    if (res.code == 0) {
        let arr2 = [
            {
                name: "GMV",
                data: [] as any,
            },
            {
                name: "推广GMV",
                data: [] as any,
            },
            {
                name: "推广花费",
                data: [] as any,
            },
        ];
        let timeX = [] as any
        res.data.records?.map((item: any, index: any) => {
            arr2[0].data.push(floatNum(item.gmv))
            arr2[1].data.push(floatNum(item.promotion_gmv))
            arr2[2].data.push(floatNum(item.spend))
            timeX.push(item.date)
        })

        const chartDom1 = document.getElementById("gmvTrend") as HTMLElement;
        const myChart1 = echarts.init(chartDom1);
        const option1 = lineOptions(arr2, timeX, false, '');
        option1 && myChart1.setOption(option1);
        let listener1 = function () {
            if (myChart1) {
                myChart1.resize();
            }
        };
        EleResize.on(chartDom1, listener1);
    }

}

// 

// 
</script>

<style lang="scss" scoped>
$echarts_bg_img: url("./images/_2.png");

.monthGmv {
    display: flex;
    justify-content: space-between;
    height: 120px;
}

.boxHead1 {
    background-repeat: no-repeat;
    background-image: $box_head_bg_img1;
    background-position-y: 50%;
    font-size: 24px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 0 0 1.5vw;
}

.box2_center_top_left_center_left {
    flex: 0.3;
    vertical-align: top;
    letter-spacing: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .num {
        font-size: 24px;
        font-weight: 400;

        color: rgba(1, 217, 255, 1);
        text-align: left;
    }

    .name {
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 87, 51, 1);
        text-align: left;
        vertical-align: top;
    }
}

.box2_center_top_left_center_right {
    flex: 0.6;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .absu {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: url("./images/nnnn.png");
        background-size: 100% 100%;
    }

    .wenzi {
        position: relative;
        z-index: 1;

        .num {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: 0px;
            color: rgba(255, 0, 0, 1);
        }

        .percentage {
            font-size: 18px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }
    }
}

.body_center {
    background-image: $echarts_bg_img;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 400px;
}

.goal-from {
    text-align: right;
}

::v-deep(.el-form-item__label) {
    color: #fff !important;
}

.storeAnalysis {
    overflow-y: auto;
    overflow-x: hidden;
}

.echarts_title {
    margin: 10px 0 16px 0;
    width: 340px;
    height: 32px;
    padding-left: 50px;
    background-image: url("./images/11.png");
    background-size: 100% 100%;
    font-size: 24px;
}

.roduct_num_box {
    height: 120px;
    background-image: url("./images/image-3.png");
    background-size: 100% 100%;
    padding: 10px;
    display: flex;
    align-items: center;

    .roduct_num_box_ctn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;

        li {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .ctn_num {
                font-size: 18px;
                line-height: 50px;

                color: rgba(1, 217, 255, 1);
            }
        }
    }
}


::v-deep(.el-table) {
    background: transparent;
}

::v-deep(.el-table-fixed-column--left) {
    background: transparent !important;
}

::v-deep(.el-table tr) {
    background: transparent;

}

::v-deep(.el-table.is-scrolling-left th.el-table-fixed-column--left) {
    background: transparent;
}

::v-deep(.el-table th.el-table__cell) {
    background: transparent;
}

::v-deep(.el-table-v2__row) {
    border-bottom: none;
    border-right: 1px solid rgb(16, 97, 197);
}

::v-deep(.el-table-v2__header-cell) {
    background: transparent;
}

::v-deep(.el-table-v2__left) {
    background: transparent;

}

::v-deep(.el-table-v2__row) {
    border-bottom: none;
    border-right: 1px solid rgb(16, 97, 197);
}

::v-deep(.el-table th.el-table__cell.is-leaf, .el-table td.el-table__cell) {
    border-bottom-color: rgb(16, 97, 197);
}

::v-deep(.el-table) {
    color: rgba(255, 255, 255, 1)
}

::v-deep(.el-table td.el-table__cell) {
    border: none;
}

::v-deep(.el-table__inner-wrapper::before) {
    background-color: rgb(16, 97, 197);
}

::v-deep(.el-table--border .el-table__cell) {
    border-right: rgba(1, 217, 255, 1);
}

::v-deep(.hover-row) {
    background-color: rgba(#fff, 0.2) !important;
}

::v-deep(.el-table__body tr.hover-row>td.el-table__cell) {
    background-color: rgba(#fff, 0.2) !important;
}
::v-deep(.palletGmv .el-table__body tr td.el-table__cell) {
    padding: 2px 0 !important;
}
</style>