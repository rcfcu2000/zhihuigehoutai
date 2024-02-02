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
        <div class="title">重点指标</div>
        <div class="roduct_num">
            <div class="roduct_num_box">
                <ul class="roduct_num_box_ctn">
                    <li>
                        <span class="ctn_num">
                            {{ parseFloat((state.titleData.attachment_rate).toFixed(2)) }}
                        </span>
                        <span class="ctn_name"> 访客数 </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            {{ parseFloat((state.titleData.add_to_cart_rate * 100).toFixed(2)) }}
                            %
                        </span>
                        <span class="ctn_name"> GMV </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            {{ parseFloat((state.titleData.favorite_rate * 100).toFixed(2)) }}
                            % </span>
                        <span class="ctn_name"> 客单价 </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            {{ parseFloat((state.titleData.refund_rate * 100).toFixed(2)) }}
                            % </span>
                        <span class="ctn_name"> 支付转化率 </span>
                    </li>
                </ul>
            </div>
            <div class="roduct_num_box">
                <ul class="roduct_num_box_ctn">
                    <li>
                        <span class="ctn_num">
                            {{ parseFloat((state.titleData.refund_rate * 100).toFixed(2)) }}
                            % </span>
                        <span class="ctn_name"> 推广花费 </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            {{ parseFloat((state.titleData.refund_rate * 100).toFixed(2)) }}
                            % </span>
                        <span class="ctn_name"> 推广占比 </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            {{ parseFloat((state.titleData.refund_rate * 100).toFixed(2)) }}
                            % </span>
                        <span class="ctn_name"> 净利润率 </span>
                    </li>
                    <li>
                        <span class="ctn_num">
                            {{ parseFloat((state.titleData.refund_rate * 100).toFixed(2)) }}
                            % </span>
                        <span class="ctn_name"> 净利润 </span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="box2">
            <div class="box2_left">
                <div class="title">流量渠道</div>
                <div class="echarts_bg">
                    <div class="echarts_bg_top" id="pie1"></div>
                    <div class="echarts_bg_btn" id="pie2"></div>
                </div>
            </div>
            <div class="box2_center">
                <div class="box2_center_top">
                    <div class="box2_center_top_left">
                        <div class="echarts_title">月累GMV达成率</div>
                    </div>
                    <div class="box2_center_top_tight">
                        <div class="echarts_title">货盘GMV达成率</div>
                    </div>
                </div>
                <div class="box2_center_btn">

                </div>
            </div>
            <div class="box2_right">
                <div class="title">关键词</div>
                <div class="echarts_bg">
                    <div class="echarts_bg_top"></div>
                    <div class="echarts_bg_btn"></div>
                </div>
            </div>
        </div>
        <div class="box3">
            <div class="box3_left">
                <div class="title">货盘分析</div>
                <div class="echarts_bg" id="PalletAnalysis"></div>
            </div>
            <div class="box3_right">
                <div class="title">推广分析</div>
                <div class="echarts_bg"></div>
            </div>
        </div>

        <div class="box4">
            <div class="box3_left">
                <div class="title">店铺综合体验分</div>
                <div class="echarts_bg"></div>
            </div>
            <div class="box3_right">
                <div class="title">店铺表现</div>
                <div class="echarts_bg"></div>
            </div>
        </div>

        <goHome />
    </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import goHome from "./components/goHome.vue";
import {
    getSubGmvList,
} from "@/api/AIdata";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { reactive, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import 'echarts-wordcloud'
import { pieOptionsHome, wordsCloud } from "./echartsOptions";
import dayListTbale from './components/dayList_table.vue'
import wordsTbale from './components/words_table.vue'
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
const state = reactive({
    titleData: {
        attachment_rate: 0,
        add_to_cart_rate: 0,
        favorite_rate: 0,
        refund_rate: 0,
        returning_buyer_percentage: 0,
        returning_buyer_gmv_percentage: 0,
        returning_buyer_average_order_value: 0,
        customer_unit_price: 0,
        search_visitor_count: 0,
        search_gmv_percentage: 0,
        paid_traffic_percentage: 0,
        paid_gmv_percentage: 0,
    } as any,
    tree: [] as any,

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
    await gettreeData()
    await pieCharts()
})

const gettreeData = async () => {
    let data = {
        end_date: searchData.date[1],
        start_date: searchData.date[0],
        current_inventory: [],
        product_manager: '',
        inventory_change: [],
    };
    const resp3 = await getSubGmvList(data);
    if (resp3.code === 0) {
        //   state.monthPallet = resp3.data.records;
        let allValue = 0;
        resp3.data.records?.forEach((i) => {
            allValue += (i.payment_amount * 1);
        });
        state.tree = [
            {
                name: "GMV",
                value: parseFloat(allValue.toFixed(2)),
                lv: -1,
                key: 1,
                bfb: '100%',
                children: resp3.data.records?.map((i) => {
                    return {
                        name: i.current_inventory,
                        key: i.key,
                        value: parseFloat(i.payment_amount.toFixed(2)),
                        bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
                        children: [],
                        lv: 0,
                    };
                }),
            },
        ];
        GMVDismantling()
    }
};

const pieCharts = async () => {
    const chartDom1 = document.getElementById("pie1") as HTMLElement;
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("pie2") as HTMLElement;
    const myChart2 = echarts.init(chartDom2);

    const option1 = pieOptionsHome([]);
    const option2 = pieOptionsHome([]);

    option1 && myChart1.setOption(option1);
    option2 && myChart2.setOption(option2);

    window.addEventListener("resize", () => {
        myChart1.resize();
        myChart2.resize();

    });

}

const GMVDismantling = () => {
    const chartDom = document.getElementById("PalletAnalysis") as HTMLElement;
    const myChart = echarts.init(chartDom);

    const option = {
        tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
        },

        series: [
            {
                type: "tree",
                id: 0,
                name: "tree1",
                data: state.tree,
                top: "10%",
                left: "8%",
                bottom: "22%",
                right: "20%",
                //   symbol: spirit,  // 1
                //   symbolSize: 20,
                lineStyle: {
                    width: 2, // 线的宽度
                    color: "#FECD04",
                },

                label: {
                    position: "center",
                    rich: {
                        a: {
                            color: "#fff",
                            lineHeight: 50,
                            fontSize: 18,
                            // width:140,
                        },
                        b: {
                            color: "#03FF91",
                            lineHeight: 50,
                            fontSize: 14,
                            top: 20,
                        },
                        c: {
                            color: "#FD89EE",
                            lineHeight: 50,
                            fontSize: 14,
                            top: 20,
                        },
                        // b: {
                        //   backgroundColor: {
                        //     image:
                        //       "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F25%2F20200525121206_tujpk.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707983711&t=8d8e6381a1d8f8f95e3fdcb4e7349dc9",
                        //   },
                        //   height: 20,
                        //   width: 100,
                        // },
                    },

                    formatter: function (param) {
                        return [
                            `{a|${param.name} }` +
                            `{b|${param.value} }` +
                            `{c|${param.data.bfb}}`,

                        ].join("\n");
                    },
                },
                roam: true,
                initialTreeDepth: 5, // 树图初始展开的层级（深度）
                expandAndCollapse: true, // 子树折叠和展开的交互，默认打开
                emphasis: {
                    focus: "descendant",
                },
                animationDuration: 550,
                animationDurationUpdate: 750,
            },
        ],
    };

    option && myChart.setOption(option);
    myChart.on("click", function (params: any) {
        // state.treeLevel = params.data.name
        let data = {
            end_date: searchData.date[1],
            start_date: searchData.date[0],
            product_manager: '',
            inventory_change: [],
            current_inventory: [params.data.name],
            primary_category: "",
            secondary_category: "",
            tertiary_category: "",
            leve: 0,
        };
        if (params.data.lv === 0) {
            data.leve = 0
            getSubGmvList(data).then((res) => {
                if (res.code === 0) {
                    const childs = res.data.records?.map((i) => {
                        return {
                            name: i.primary_category,
                            value: i.payment_amount,
                            key: i.key,
                            bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
                            children: [],
                            current: params.data.name,
                            lv: 1,
                        };
                    });
                    addDataToTree(state.tree[0], params.data.key, childs);
                    myChart.setOption(option);
                }
            });
        } else if (params.data.lv === 1) {
            data.current_inventory = [params.data.current];
            data.primary_category = params.data.name;
            data.leve = 1
            getSubGmvList(data).then((res) => {
                if (res.code === 0) {
                    if (res.data.records) {
                        const childs = res.data.records?.map((i) => {
                            return {
                                name: i.secondary_category,
                                current: params.data.current,
                                value: i.payment_amount,
                                key: i.key,
                                bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
                                children: [],
                                primary: params.data.name,
                                lv: 2,
                            };
                        });
                        addDataToTree(state.tree[0], params.data.key, childs);
                        myChart.setOption(option);
                    } else {
                        addDataToTree(state.tree[0], params.data.key, []);
                    }
                }
            });
        } else if (params.data.lv === 2) {
            data.current_inventory = [params.data.current];
            data.primary_category = params.data.primary;
            data.secondary_category = params.data.name;
            data.leve = 2
            getSubGmvList(data).then((res) => {
                if (res.code === 0) {
                    if (res.data.records) {
                        const childs = res.data.records?.map((i) => {
                            return {
                                name: i.tertiary_category,
                                value: i.payment_amount,
                                current: params.data.current,
                                key: i.key,
                                bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
                                children: [],
                                primary: params.data.primary,
                                secondary: params.data.name,
                                lv: 3,
                            };
                        });
                        addDataToTree(state.tree[0], params.data.key, childs);
                        myChart.setOption(option);
                    } else {
                        addDataToTree(state.tree[0], params.data.key, []);
                    }
                }
            });
        } else if (params.data.lv === 3) {
            data.current_inventory = [params.data.current];
            data.primary_category = params.data.primary;
            data.secondary_category = params.data.secondary;
            data.tertiary_category = params.data.name;
            data.leve = 3
            getSubGmvList(data).then((res) => {
                if (res.code === 0) {
                    if (res.data.records) {
                        const childs = res.data.records?.map((i) => {
                            return {
                                name: i.tertiary_category,
                                value: i.payment_amount,
                                children: [],
                                key: i.key,
                                bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
                                primary: params.data.primary,
                                secondary: params.data.secondary,
                                tertiary: params.data.name,
                                lv: 4,
                            };
                        });
                        addDataToTree(state.tree[0], params.data.key, childs);
                        myChart.setOption(option);
                    } else {
                        addDataToTree(state.tree[0], params.data.key, []);
                    }
                }
            });
        }
        // getData2Copy(data)
    });
    window.addEventListener("resize", () => {
        myChart.resize();
    });
};
// 添加数据到树形结构的函数
const addDataToTree = (root: any, targetId: any, newData: any) => {
    if (!root || !targetId) return; // 确保根节点不为空且目标ID有效

    if (root.key === targetId) {
        // root.lv = 999;
        root.children = newData; // 若当前节点与目标ID匹配，则直接在该节点上添加新数据
        return;
    } else {
        for (let child of root.children) {
            addDataToTree(child, targetId, newData); // 递归调用自身处理子节点
        }
    }
};


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

    .roduct_num {
        height: 100px;
        width: 100%;
        // margin: 0 2%;
        display: flex;
        justify-content: space-around;

        .roduct_num_box {
            // width: 100%;
            // height: 100%;
            flex: 0.48;
            box-sizing: border-box;
            background-image: url("./images/image-3@3x.png");
            background-size: 100% 100%;
            padding: 10px;

            .roduct_num_box_ctn {
                height: 100%;
                display: flex;
                justify-content: space-around;

                li {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .ctn_num {
                        font-size: 24px;
                        color: rgba(1, 217, 255, 1);
                    }
                }
            }
        }
    }

    .box2 {
        height: 40%;
        display: flex;
        justify-content: space-between;

        .box2_left {
            flex: 0.28;
            display: flex;
            flex-direction: column;

            .echarts_bg {
                flex: 1;
                background-image: $echarts_bg_img;
                background-size: 100% 100%;
                display: flex;
                flex-direction: column;

                >div {
                    flex: 0.5;
                }
            }
        }

        .box2_center {
            flex: 0.45;

            .box2_center_top {
                height: 38%;
                width: 100%;
                display: flex;
                justify-content: space-between;

                >div {
                    flex: 0.48;
                }
            }

            .box2_center_btn {
                height: 60%;
                width: 100%;
                background-image: $echarts_bg_img;
                background-size: 100% 100%;
            }
        }

        .box2_right {
            flex: 0.25;
            display: flex;
            flex-direction: column;

            .echarts_bg {
                flex: 1;
                background-image: $echarts_bg_img;
                background-size: 100% 100%;
            }
        }
    }

    .box3 {
        height: 40%;
        display: flex;
        justify-content: space-between;

        >div {
            flex: 0.48;
            display: flex;
            flex-direction: column;

            .echarts_bg {
                flex: 1;
                background-image: $echarts_bg_img;
                background-size: 100% 100%;
            }
        }
    }

    .box4 {
        height: 30%;
        display: flex;
        justify-content: space-between;

        >div {
            flex: 0.48;
            display: flex;
            flex-direction: column;

            .echarts_bg {
                flex: 1;
                background-image: $echarts_bg_img;
                background-size: 100% 100%;
            }
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
  