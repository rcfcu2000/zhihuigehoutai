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
                        <div class="box2_center_top_left_center">
                            <div class="box2_center_top_left_center_left">
                                <div>
                                    <p class="num">3144451</p>
                                    <p class="name">累计GMV</p>
                                </div>
                                <div>
                                    <p class="num">3144451</p>
                                    <p class="name">GMV目标</p>
                                </div>
                            </div>

                            <div class="box2_center_top_left_center_right">
                                <div class="absu">

                                </div>
                                <div class="wenzi">
                                    <div class="num">98.89%</div>
                                    <div class="percentage">目标: 100.00%(-1.11%)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box2_center_top_tight">
                        <div class="echarts_title">货盘GMV达成率</div>
                        <div class="aiData_table table">
                            <el-table :data="state.tableData">
                                <el-table-column label="" width="100">
                                    <template #default="scope">
                                        <span>{{ scope.row.name }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="S">
                                    <template #default="scope">
                                        <span>{{ scope.row.S }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="A">
                                    <template #default="scope">
                                        <span>{{ scope.row.A }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="B">
                                    <template #default="scope">
                                        <span>{{ scope.row.B }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="C">
                                    <template #default="scope">
                                        <span>{{ scope.row.C }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="D">
                                    <template #default="scope">
                                        <span>{{ scope.row.D }}</span>
                                    </template>
                                </el-table-column>
                                <template #empty>
                                    <div class="flex items-center justify-center h-100%">
                                        <el-empty />
                                    </div>
                                </template>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="box2_center_btn" id="box2center">

                </div>
            </div>
            <div class="box2_right">
                <div class="title">关键词</div>
                <div class="echarts_bg">
                    <div class="echarts_bg_top" id="cloudWord1"></div>
                    <div class="echarts_bg_btn" id="cloudWord2"></div>
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
            <div class="box4_left">
                <div class="title">店铺综合体验分</div>
                <div class="echarts_bg" id="box4Left"></div>
            </div>
            <div class="box4_right">
                <div class="title">店铺表现</div>
                <div class="echarts_bg" id="box4Right"></div>
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
import { EleResize } from "@/utils/echartsAuto.js"; //公共组件，支持echarts自适应，多文件调用不会重复
import { pieOptionsHome, wordsCloud, lineOptions } from "./echartsOptions";
// import dayListTbale from './components/dayList_table.vue'
// import wordsTbale from './components/words_table.vue'
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
    tableData: [
        {
            name: '累计达成率',
            S: 1,
            A: 1,
            B: 1,
            C: 1,
            D: 1,
        },
        {
            name: 'GMV目标',
            S: 1,
            A: 1,
            B: 1,
            C: 1,
            D: 1,
        },
        {
            name: 'GMV达成率',
            S: 1,
            A: 1,
            B: 1,
            C: 1,
            D: 1,
        },
    ],
    tree: [] as any,

});
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
const searchData = reactive({
    shopId: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
    // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
    start_date: '',
    end_date: '',
});

onMounted(async () => {
    await gettreeData()
    await pieCharts()
    await getBox4()
    await cloudEcharts()
    await getbox2Echarts()
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
    let listener1 = function () {
        if (myChart1) {
            myChart1.resize();
        }
    };
    let listener2 = function () {
        if (myChart2) {
            myChart2.resize();
        }
    };
    EleResize.on(chartDom1, listener1);
    EleResize.on(chartDom2, listener2);
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
Math.floor(Math.random() * (1 - 100) + 100); //1~100的随机数
let data = Array.from(new Array(30), (x, i) =>
    Math.floor(Math.random() * (1 - 100) + 100)
);

const clouddata = [
    {
        name: '花鸟市场',
        value: 1446,
    },
    {
        name: '汽车',
        value: 928,
    },
    {
        name: '视频',
        value: 906,
    },
    {
        name: '电视',
        value: 825,
    },
    {
        name: 'Lover Boy 88',
        value: 514,
    },
    {
        name: '动漫',
        value: 486,
    },
    {
        name: '音乐',
        value: 53,
    },
    {
        name: '直播',
        value: 163,
    },
    {
        name: '广播电台',
        value: 86,
    },
    {
        name: '戏曲曲艺',
        value: 17,
    },
    {
        name: '演出票务',
        value: 6,
    },
    {
        name: '给陌生的你听',
        value: 1,
    },
    {
        name: '资讯',
        value: 1437,
    },
    {
        name: '商业财经',
        value: 422,
    },
    {
        name: '娱乐八卦',
        value: 353,
    },
    {
        name: '军事',
        value: 331,
    },
    {
        name: '科技资讯',
        value: 313,
    },
    {
        name: '社会时政',
        value: 307,
    },
    {
        name: '时尚',
        value: 43,
    },
    {
        name: '网络奇闻',
        value: 15,
    },
    {
        name: '旅游出行',
        value: 438,
    },
    {
        name: '景点类型',
        value: 957,
    },
    {
        name: '国内游',
        value: 927,
    },
    {
        name: '远途出行方式',
        value: 908,
    },
    {
        name: '酒店',
        value: 693,
    },
    {
        name: '关注景点',
        value: 611,
    },
    {
        name: '旅游网站偏好',
        value: 512,
    },
    {
        name: '出国游',
        value: 382,
    },
    {
        name: '交通票务',
        value: 312,
    },
    {
        name: '旅游方式',
        value: 187,
    },
    {
        name: '旅游主题',
        value: 163,
    },
    {
        name: '港澳台',
        value: 104,
    },
    {
        name: '本地周边游',
        value: 3,
    },
    {
        name: '小卖家',
        value: 1331,
    },
    {
        name: '全日制学校',
        value: 941,
    },
    {
        name: '基础教育科目',
        value: 585,
    },
    {
        name: '考试培训',
        value: 473,
    },
    {
        name: '语言学习',
        value: 358,
    },
    {
        name: '留学',
        value: 246,
    },
    {
        name: 'K12课程培训',
        value: 207,
    },
    {
        name: '艺术培训',
        value: 194,
    },
    {
        name: '技能培训',
        value: 104,
    },
    {
        name: 'IT培训',
        value: 87,
    },
    {
        name: '高等教育专业',
        value: 63,
    },
    {
        name: '家教',
        value: 48,
    },
    {
        name: '体育培训',
        value: 23,
    },
    {
        name: '职场培训',
        value: 5,
    },
    {
        name: '金融财经',
        value: 1328,
    },
    {
        name: '银行',
        value: 765,
    },
    {
        name: '股票',
        value: 452,
    },
    {
        name: '保险',
        value: 415,
    },
    {
        name: '贷款',
        value: 253,
    },
    {
        name: '基金',
        value: 211,
    },
    {
        name: '信用卡',
        value: 180,
    },
    {
        name: '外汇',
        value: 138,
    },
    {
        name: 'P2P',
        value: 116,
    },
    {
        name: '贵金属',
        value: 98,
    },
    {
        name: '债券',
        value: 93,
    },
    {
        name: '网络理财',
        value: 92,
    },
    {
        name: '信托',
        value: 90,
    },
    {
        name: '征信',
        value: 76,
    },
    {
        name: '期货',
        value: 76,
    },
    {
        name: '公积金',
        value: 40,
    },
    {
        name: '银行理财',
        value: 36,
    },
    {
        name: '银行业务',
        value: 30,
    },
    {
        name: '典当',
        value: 7,
    },
    {
        name: '海外置业',
        value: 1,
    },
    {
        name: '汽车',
        value: 1309,
    },
    {
        name: '汽车档次',
        value: 965,
    },
    {
        name: '汽车品牌',
        value: 900,
    },
    {
        name: '汽车车型',
        value: 727,
    },
    {
        name: '购车阶段',
        value: 461,
    },
    {
        name: '二手车',
        value: 309,
    },
    {
        name: '汽车美容',
        value: 260,
    },
    {
        name: '新能源汽车',
        value: 173,
    },
    {
        name: '汽车维修',
        value: 155,
    },
    {
        name: '租车服务',
        value: 136,
    },
    {
        name: '车展',
        value: 121,
    },
    {
        name: '违章查询',
        value: 76,
    },
    {
        name: '汽车改装',
        value: 62,
    },
    {
        name: '汽车用品',
        value: 37,
    },
    {
        name: '路况查询',
        value: 32,
    },
    {
        name: '汽车保险',
        value: 28,
    },
    {
        name: '陪驾代驾',
        value: 4,
    },
    {
        name: '网络购物',
        value: 1275,
    },
    {
        name: '做我的猫',
        value: 1088,
    },
    {
        name: '只想要你知道',
        value: 907,
    },
    {
        name: '团购',
        value: 837,
    },
    {
        name: '比价',
        value: 201,
    },
    {
        name: '海淘',
        value: 195,
    },
    {
        name: '移动APP购物',
        value: 179,
    },
    {
        name: '支付方式',
        value: 119,
    },
    {
        name: '代购',
        value: 43,
    },
    {
        name: '体育健身',
        value: 1234,
    },
    {
        name: '体育赛事项目',
        value: 802,
    },
    {
        name: '运动项目',
        value: 405,
    },
    {
        name: '体育类赛事',
        value: 337,
    },
    {
        name: '健身项目',
        value: 199,
    },
    {
        name: '健身房健身',
        value: 78,
    }
]

const cloudEcharts = () => {
    const chartDom1 = document.getElementById("cloudWord1") as HTMLElement;
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("cloudWord2") as HTMLElement;
    const myChart2 = echarts.init(chartDom2);


    let arr1 = clouddata
    let arr2 = clouddata

    const option1 = wordsCloud(arr1, '手淘搜索Top30');
    option1 && myChart1.setOption(option1);

    const option2 = wordsCloud(arr2, '直通车Top30');
    option2 && myChart2.setOption(option2);

    window.addEventListener("resize", () => {
        myChart1.resize();
        myChart2.resize();
    });
}

const getbox2Echarts = () => {
    const chartDom1 = document.getElementById("box2center") as HTMLElement;
    const myChart1 = echarts.init(chartDom1);

    let arr1 = [
        {
            name: "访客数",
            data: data,
        },
        {
            name: "GMV",
            data: data,
        },
    ];
    const option1 = lineOptions(arr1);
    option1 && myChart1.setOption(option1);

    let listener1 = function () {
        if (myChart1) {
            myChart1.resize();
        }
    };
    EleResize.on(chartDom1, listener1);
}

const getBox4 = () => {
    const chartDom1 = document.getElementById("box4Left") as HTMLElement;
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("box4Right") as HTMLElement;
    const myChart2 = echarts.init(chartDom2);


    let arr1 = [
        {
            name: "店铺GMV",
            data: data,
        },
    ];
    let arr2 = [
        {
            name: "商品体验",
            data: data,
        },
        {
            name: "物流体验",
            data: data,
        },
        {
            name: "服务体验",
            data: data,
        },
    ];

    const option1 = lineOptions(arr1);
    option1 && myChart1.setOption(option1);

    const option2 = lineOptions(arr2);
    option2 && myChart2.setOption(option2);

    let listener1 = function () {
        if (myChart1) {
            myChart1.resize();
        }
    };
    let listener2 = function () {
        if (myChart2) {
            myChart2.resize();
        }
    };
    EleResize.on(chartDom1, listener1);
    EleResize.on(chartDom2, listener2);
}

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
        margin: 10px 0 10px 0;
        width: 220px;
        height: 28px;
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
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .box2_center_top {
                height: 50%;
                width: 100%;
                display: flex;
                justify-content: space-between;

                >div {
                    flex: 0.49;
                    overflow: auto;

                    .box2_center_top_left_center {
                        display: flex;
                        justify-content: space-between;
                        height: calc(100% - 50px);

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
                                background-image: url('./images/nnnn.png');
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
                    }
                }
            }

            .box2_center_btn {
                height: 50%;
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
                display: flex;
                flex-direction: column;

                >div {
                    flex: 0.48;
                }
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

::v-deep(.echarts-tooltip) {
    padding: 0 !important;
    // position: fixed !important;
    top: 0 !important;
    left: -10px !important;
}

::v-deep(.el-table) {
    .el-table__cell {
        padding: 1% 0;
    }

    .el-table__header {
        border-bottom: 1px solid rgb(16, 97, 197);

        tr {
            color: rgb(255, 153, 0);
        }
    }

    .el-table__row .el-table_1_column_1 {
        border-right: 1px solid rgb(16, 97, 197);
    }
}
</style>
  