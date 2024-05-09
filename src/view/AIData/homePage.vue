<template>
  <div
    class="main"
    v-loading.fullscreen.lock="state.loading"
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <page_header :title="pageTitle" @changeShop="changeShop" />
    <el-form :inline="true" :model="searchData" class="pro-from-right">
      <el-form-item label="请选择起止时间：">
        <el-date-picker
          v-model="searchData.date"
          :clearable="false"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="getData"
        />
      </el-form-item>
    </el-form>

    <div class="title">重点指标</div>
    <div class="roduct_num">
      <div class="roduct_num_box">
        <ul class="roduct_num_box_ctn">
          <li>
            <span class="ctn_num">
              {{ lueNum(state.titleData.visitors) }}
            </span>
            <span class="ctn_name"> 访客数 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ lueNum(state.titleData.gmv) }}
            </span>
            <span class="ctn_name"> GMV </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ lueNum(state.titleData.customer_unit_price) }}
            </span>
            <span class="ctn_name"> 客单价 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{
                parseFloat(
                  (state.titleData.conversion_rate_payment * 100).toFixed(2)
                )
              }}
              %
            </span>
            <span class="ctn_name"> 支付转化率 </span>
          </li>
        </ul>
      </div>
      <div class="roduct_num_box">
        <ul class="roduct_num_box_ctn">
          <li>
            <span class="ctn_num">
              {{ lueNum(state.titleData.spend) }}
            </span>
            <span class="ctn_name"> 推广花费 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{
                parseFloat(
                  (state.titleData.promotion_percentage * 100).toFixed(2)
                )
              }}%
            </span>
            <span class="ctn_name"> 推广占比 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.profit_rate * 100).toFixed(2)) }}
              %
            </span>
            <span class="ctn_name"> 净利润率 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ lueNum(state.titleData.profit) }}
            </span>
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
                  <p class="num">{{ lueNum(state.sumGMV.gmv) }}</p>
                  <p class="name">累计GMV</p>
                </div>
                <div>
                  <p class="num">{{ lueNum(state.sumGMV.target_gmv) }}</p>
                  <p class="name">GMV目标</p>
                </div>
              </div>

              <div class="box2_center_top_left_center_right">
                <div class="absu"></div>
                <div class="wenzi">
                  <div class="num">
                    {{ persentNum(state.sumGMV.target_day_rate) }}
                  </div>
                  <div class="percentage">
                    目标: {{ persentNum(state.sumGMV.target_gmv_rate) }}({{
                      floatNum(
                        (state.sumGMV.target_day_rate -
                          state.sumGMV.target_gmv_rate) *
                          100
                      )
                    }}%)
                  </div>
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
                <el-table-column label="S" width="100" align="center">
                  <template #default="scope">
                    <span>{{ scope.row.S }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="A" width="100" align="center">
                  <template #default="scope">
                    <span>{{ scope.row.A }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="B" width="100" align="center">
                  <template #default="scope">
                    <span>{{ scope.row.B }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="C" width="100" align="center">
                  <template #default="scope">
                    <span>{{ scope.row.C }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="D" width="100" align="center">
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
        <div class="box2_center_btn" id="box2center"></div>
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
        <div class="echarts_bg" style="overflow-y: auto; height: 40%">
          <div
            class="roduct_right_list"
            v-for="(ikun, index) in state.extendList"
            :key="index"
          >
            <div class="roduct_right_title">{{ ikun.scene }}</div>
            <ul class="roduct_right_ctn">
              <li class="roduct_right_ctn_data" :title="lueNum(ikun.spend)">
                <span class="ctn_num"> {{ lueNum(ikun.spend) }} </span>
                <span class="ctn_tit">推广花费</span>
              </li>
              <li
                class="roduct_right_ctn_data"
                :title="lueNum(ikun.transaction_cost)"
              >
                <span class="ctn_num">{{ lueNum(ikun.transaction_cost) }}</span>
                <span class="ctn_tit">成交成本</span>
              </li>
              <li class="roduct_right_ctn_data" :title="lueNum(ikun.gmv)">
                <span class="ctn_num">{{ lueNum(ikun.gmv) }}</span>
                <span class="ctn_tit">GMV</span>
              </li>
              <li
                class="roduct_right_ctn_data"
                :title="lueNum(ikun.scene_percentage)"
              >
                <span class="ctn_num"
                  >{{ lueNum(ikun.scene_percentage * 100) }}%</span
                >
                <span class="ctn_tit">渠道占比</span>
              </li>
              <li class="roduct_right_ctn_data" :title="lueNum(ikun.roi)">
                <span class="ctn_num">{{ lueNum(Number(ikun.roi)) }}</span>
                <span class="ctn_tit">推广ROI</span>
              </li>
              <li class="roduct_right_ctn_data" :title="lueNum(ikun.clicks)">
                <span class="ctn_num">{{ lueNum(ikun.clicks) }}</span>
                <span class="ctn_tit">点击量</span>
              </li>
              <li class="roduct_right_ctn_data">
                <span class="ctn_num">
                  {{
                    lueNum(
                      ikun.clicks_rate ? Number(ikun.clicks_rate) * 100 : 0
                    )
                  }}
                  %
                </span>
                <span class="ctn_tit">点击率</span>
              </li>
              <li class="roduct_right_ctn_data">
                <span class="ctn_num">{{ lueNum(Number(ikun.cpc)) }}</span>
                <span class="ctn_tit">CPC</span>
              </li>
              <!-- <li class="roduct_right_ctn_data">
                                <span class="ctn_num">{{ parseFloat((ikun.channel_percentage * 100).toFixed(2)) }}%</span>
                                <span class="ctn_tit">渠道占比</span>
                            </li> -->
              <li class="roduct_right_ctn_data">
                <span class="ctn_num"
                  >{{ lueNum(Number(ikun.add_to_cart_rate) * 100) }}%</span
                >
                <span class="ctn_tit">加购率</span>
              </li>
              <li class="roduct_right_ctn_data">
                <span class="ctn_num">{{ lueNum(ikun.add_to_cart_cost) }}</span>
                <span class="ctn_tit">加购成本</span>
              </li>
              <li class="roduct_right_ctn_data">
                <span class="ctn_num">{{
                  lueNum(ikun.ali_wang_wang_inquiries * 100)
                }}</span>
                <span class="ctn_tit">旺旺咨询量</span>
              </li>
            </ul>
          </div>
        </div>
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
import page_header from "./components/page_header.vue";
import {
  getSubGmvList,
  getAlldata,
  getPromotionGetAlldata,
  getExperiencedata,
  getKeyworddata,
  getTrenddata,
  getGmvVistordata,
  getTrafficdata,
  shopGetIndexdata,
  getPromotiondata,
} from "@/api/AIdata";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
import { reactive, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import "echarts-wordcloud";
import { EleResize } from "@/utils/echartsAuto.js";
import {
  pieOptionsHome,
  wordsCloud,
  lineOptions,
  lineOptionsYY,
  lineOptions1_y,
} from "./echartsOptions";
import { persentNum, floatNum, lueNum, roundNum } from "@/utils/format.js";
// import dayListTbale from './components/dayList_table.vue'
// import wordsTbale from './components/words_table.vue'
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import { useUserStore } from "@/pinia/modules/user";
const userStore = useUserStore();
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
const pageTitle = "首页";
const state = reactive({
  loading: false,
  titleData: {} as any,
  tableData: [
    {
      name: "累计达成率",
      S: 1,
      A: 1,
      B: 1,
      C: 1,
      D: 1,
    },
    {
      name: "GMV目标",
      S: 1,
      A: 1,
      B: 1,
      C: 1,
      D: 1,
    },
    {
      name: "GMV达成率",
      S: 1,
      A: 1,
      B: 1,
      C: 1,
      D: 1,
    },
  ],
  sumGMV: {
    gmv: 0,
    pallet: "",
    target_day_rate: 0,
    target_gmv: 0,
    target_gmv_rate: 0,
  },
  extendList: [] as any,
  tree: [] as any,
});
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
const searchData = reactive({
  shopId: [] as any, //
  // date: ["2024-01-01", "2024-01-25"],
  date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
  // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
  start_date: "",
  end_date: "",
  shop_name: userStore.currentShop.shop_name, //店铺名称
  shop_id: userStore.currentShop.shop_id,
});

onMounted(async () => {
  state.loading = true;
  await getData();
});

const getData = async () => {
  await getIndexdata();
  await getPromotion();
  await gettreeData();
  // await getAll();
  await pieCharts();
  await getBox4();
  await cloudEcharts();
  await getbox2Echarts();
  setTimeout(() => {
    state.loading = false;
  }, 1000);
};

const changeShop = async () => {
  state.loading = true;
  const currentShop = { ...userStore.currentShop };
  searchData.shop_name = currentShop.shop_name;
  searchData.shop_id = currentShop.shop_id;
  await getData();
};

const getIndexdata = async () => {
  let data = {
    end_date: searchData.date[1],
    start_date: searchData.date[0],
    current_inventory: [],
    product_manager: "",
    inventory_change: [],
  };
  const res = await shopGetIndexdata(data);
  if (res.code == 0) {
    state.titleData = res.data;
  }
};

const getPromotion = async () => {
  let data = {
    end_date: searchData.date[1],
    start_date: searchData.date[0],
    current_inventory: [],
    product_manager: "",
    inventory_change: [],
  };
  const res = await getPromotiondata(data);
  if (res.code == 0) {
    state.extendList = res.data.records;
  }
};

const gettreeData = async () => {
  let data = {
    end_date: searchData.date[1],
    start_date: searchData.date[0],
    current_inventory: [],
    product_manager: "",
    inventory_change: [],
  };
  const resp3 = await getSubGmvList(data);
  if (resp3.code === 0) {
    //   state.monthPallet = resp3.data.records;
    let allValue = 0;
    resp3.data.records?.forEach((i) => {
      allValue += i.payment_amount * 1;
    });
    state.tree = [
      {
        name: "GMV",
        value: parseFloat(allValue.toFixed(2)),
        lv: -1,
        key: 1,
        bfb: "100%",
        children: resp3.data.records?.map((i) => {
          return {
            name: i.current_inventory,
            key: i.key,
            value: parseFloat(i.payment_amount.toFixed(2)),
            bfb:
              parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + " %",
            children: [],
            lv: 0,
          };
        }),
      },
    ];
    GMVDismantling();
  }
};

const getAll = async () => {
  let data = {
    end_date: searchData.date[1],
    start_date: searchData.date[0],
    // product_manager: searchData.product_manager,
    // inventory_change: searchData.inventory_change,
    // current_inventory: searchData.current_inventory,
  };
  const [res1, res2] = [
    await getAlldata(data),
    await getPromotionGetAlldata(data),
  ];
  if (res1.code === 0 && res2.code === 0) {
    // state.titleData.search_visitor_count = res1.data.index.search_visitor_count;
    // state.titleData.overall_gmv = res2.data.promotionIndex1.overall_gmv;
    // state.titleData.customer_unit_price = res1.data.index.customer_unit_price;
    // state.titleData.zfzhl = 0;
    // state.titleData.promotion_cost = res2.data.promotionIndex1.promotion_cost;
    // state.titleData.cost_percentage = res2.data.promotionIndex1.cost_percentage;
    // state.titleData.jlrl = 0;
    // state.titleData.lrv = 0;

    // state.extendList = res2.data.promotionIndex2?.records;
    state.loading = false;
  }
};

const pieCharts = async () => {
  let data = searchData;
  data.start_date = data.date[0];
  data.end_date = data.date[1];
  const [res] = [await getTrafficdata(data)];
  if (res.code == 0) {
    let pie1Data = {
      data: [],
      legendData: [],
    } as any;
    let pie2Data = {
      data: [],
      legendData: [],
    } as any;
    let legendData = [] as any;
    res.data.records?.map((item: any, index: any) => {
      let p1 = {
        name: item.l3,
        value: item.visitors,
      };
      let p2 = {
        name: item.l3,
        value: item.gmv,
      };
      legendData.push(item.l3);
      pie1Data.data.push(p1);
      pie2Data.data.push(p2);
    });
    pie1Data.legendData = legendData;
    pie2Data.legendData = legendData;
    const chartDom1 = document.getElementById("pie1") as HTMLElement;
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("pie2") as HTMLElement;
    const myChart2 = echarts.init(chartDom2);

    const option1 = pieOptionsHome(pie1Data, "访客数");
    const option2 = pieOptionsHome(pie2Data, "GMV");

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
};

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
                `{b|${lueNum(param.value)} }` +
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
  myChart.off("click");
  myChart.on("click", function (params: any) {
    // state.treeLevel = params.data.name
    let data = {
      end_date: searchData.date[1],
      start_date: searchData.date[0],
      product_manager: "",
      inventory_change: [],
      current_inventory: [params.data.name],
      primary_category: "",
      secondary_category: "",
      tertiary_category: "",
      leve: 0,
    };
    if (params.data.lv === 0) {
      data.leve = 0;
      getSubGmvList(data).then((res) => {
        if (res.code === 0) {
          const childs = res.data.records?.map((i) => {
            return {
              name: i.primary_category,
              value: i.payment_amount,
              key: i.key,
              bfb:
                parseFloat((i.payment_amount_percentage * 100).toFixed(0)) +
                " %",
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
      data.leve = 1;
      getSubGmvList(data).then((res) => {
        if (res.code === 0) {
          if (res.data.records) {
            const childs = res.data.records?.map((i) => {
              return {
                name: i.secondary_category,
                current: params.data.current,
                value: i.payment_amount,
                key: i.key,
                bfb:
                  parseFloat((i.payment_amount_percentage * 100).toFixed(0)) +
                  " %",
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
      data.leve = 2;
      getSubGmvList(data).then((res) => {
        if (res.code === 0) {
          if (res.data.records) {
            const childs = res.data.records?.map((i) => {
              return {
                name: i.tertiary_category,
                value: i.payment_amount,
                current: params.data.current,
                key: i.key,
                bfb:
                  parseFloat((i.payment_amount_percentage * 100).toFixed(0)) +
                  " %",
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
      data.leve = 3;
      getSubGmvList(data).then((res) => {
        if (res.code === 0) {
          if (res.data.records) {
            const childs = res.data.records?.map((i) => {
              return {
                name: i.tertiary_category,
                value: i.payment_amount,
                children: [],
                key: i.key,
                bfb:
                  parseFloat((i.payment_amount_percentage * 100).toFixed(0)) +
                  " %",
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

const addDataToTree = (root: any, targetId: any, newData: any) => {
  if (!root || !targetId) return;

  if (root.key === targetId) {
    // root.lv = 999;
    root.children = newData;
    return;
  } else {
    for (let child of root.children) {
      addDataToTree(child, targetId, newData);
    }
  }
};
Math.floor(Math.random() * (1 - 100) + 100); //1~100的随机数
let data = Array.from(new Array(30), (x, i) =>
  Math.floor(Math.random() * (1 - 100) + 100)
);

const cloudEcharts = async () => {
  let data = searchData;
  data.start_date = data.date[0];
  data.end_date = data.date[1];
  const [res] = [await getKeyworddata(data)];
  if (res.code == 0) {
    const chartDom1 = document.getElementById("cloudWord1") as HTMLElement;
    const myChart1 = echarts.init(chartDom1);

    const chartDom2 = document.getElementById("cloudWord2") as HTMLElement;
    const myChart2 = echarts.init(chartDom2);

    let arr1 = res.data.search_records
      ? res.data.search_records.map((item: any, index: any) => {
          item.name = item.keyword;
          item.value = item.visitors;
          return item;
        })
      : [];
    let arr2 = res.data.ztc_records
      ? res.data.ztc_records.map((item: any, index: any) => {
          item.name = item.keyword;
          item.value = item.visitors;
          return item;
        })
      : [];

    const option1 = wordsCloud(arr1, "手淘搜索Top30");
    option1 && myChart1.setOption(option1);

    const option2 = wordsCloud(arr2, "直通车Top30");
    option2 && myChart2.setOption(option2);

    window.addEventListener("resize", () => {
      myChart1.resize();
      myChart2.resize();
    });
  }
};

const getbox2Echarts = async () => {
  let data = searchData;
  data.start_date = data.date[0];
  data.end_date = data.date[1];
  const [res, res1] = [await getGmvVistordata(data), await getTrenddata(data)];
  if (res.code == 0) {
    let arr = [
      { name: "累计GMV" },
      { name: "GMV目标" },
      { name: "GMV达成率" },
    ] as any;
    res.data.records?.map((item: any, index: any) => {
      if (item.pallet == "S") {
        arr[0].S = lueNum(item.gmv);
        arr[1].S = lueNum(item.target_gmv);
        arr[2].S = persentNum(item.target_gmv_rate) + "%";
      }
      if (item.pallet == "A") {
        arr[0].A = lueNum(item.gmv);
        arr[1].A = lueNum(item.target_gmv);
        arr[2].A = persentNum(item.target_gmv_rate) + "%";
      }
      if (item.pallet == "B") {
        arr[0].B = lueNum(item.gmv);
        arr[1].B = lueNum(item.target_gmv);
        arr[2].B = persentNum(item.target_gmv_rate) + "%";
      }
      if (item.pallet == "C") {
        arr[0].C = lueNum(item.gmv);
        arr[1].C = lueNum(item.target_gmv);
        arr[2].C = persentNum(item.target_gmv_rate) + "%";
      }
      if (item.pallet == "D") {
        arr[0].D = lueNum(item.gmv);
        arr[1].D = lueNum(item.target_gmv);
        arr[2].D = persentNum(item.target_gmv_rate) + "%";
      }
    });
    state.tableData = arr;
    state.sumGMV = res.data.sum ? res.data.sum : "";
  }
  if (res1.code == 0) {
    let gmv_date = [] as any;
    let gmv_data = [
      {
        name: "访客数",
        yAxisIndex: 0,
        data: [],
      },
      {
        name: "GMV",
        yAxisIndex: 1,
        data: [],
      },
    ] as any;
    res1.data.records?.map((item: any, index: any) => {
      gmv_date.push(item.date);
      gmv_data[0].data.push(item.visitors);
      gmv_data[1].data.push(item.gmv);
    });
    const chartDom1 = document.getElementById("box2center") as HTMLElement;
    const myChart1 = echarts.init(chartDom1);
    const option1 = lineOptionsYY(gmv_data, gmv_date, false, "");
    option1 && myChart1.setOption(option1);

    let listener1 = function () {
      if (myChart1) {
        myChart1.resize();
      }
    };
    EleResize.on(chartDom1, listener1);
  }
};

const getBox4 = async () => {
  let data = searchData;
  data.start_date = data.date[0];
  data.end_date = data.date[1];
  const [res] = [await getExperiencedata(data)];
  if (res.code == 0) {
    if (res.data.records.length > 0) {
      let arr1 = [
        {
          name: "综合体验分",
          data: [],
        },
      ];
      let arr2 = [
        {
          name: "物流体验",
          data: [] as any,
        },
        {
          name: "商品体验",
          data: [] as any,
        },
        {
          name: "服务体验",
          data: [] as any,
        },
      ];
      let timeX = [] as any;
      res.data.records?.map((item: any, index: any) => {
        arr1[0].data.push(floatNum(item.overall_experience_score));
        arr2[0].data.push(floatNum(item.logistics_experience_score));
        arr2[1].data.push(floatNum(item.product_experience_score));
        arr2[2].data.push(floatNum(item.service_experience_score));
        timeX.push(item.date);
      });
      const chartDom1 = document.getElementById("box4Left") as HTMLElement;
      const myChart1 = echarts.init(chartDom1);

      const chartDom2 = document.getElementById("box4Right") as HTMLElement;
      const myChart2 = echarts.init(chartDom2);

      let arr1Min = arr1[0].data.reduce((min, item) => {
        return item < min ? item : min;
      });
      arr1[0].name = arr1[0].name + ":" + arr1Min;
      arr1[0].data = arr1[0].data.map((item: any, index: any) => {
        return item - arr1Min;
      });
      let arr2Min1 = arr2[0].data.reduce((min, item) => {
        return item < min ? item : min;
      });
      arr2[0].name = arr2[0].name + ":" + arr2Min1;
      arr2[0].data = arr2[0].data.map((item: any, index: any) => {
        return item - arr2Min1;
      });
      let arr2Min2 = arr2[1].data.reduce((min, item) => {
        return item < min ? item : min;
      });
      arr2[1].name = arr2[1].name + ":" + arr2Min2;
      arr2[1].data = arr2[1].data.map((item: any, index: any) => {
        return item - arr2Min2;
      });
      let arr2Min3 = arr2[2].data.reduce((min, item) => {
        return item < min ? item : min;
      });
      arr2[2].name = arr2[2].name + ":" + arr2Min3;
      arr2[2].data = arr2[2].data.map((item: any, index: any) => {
        return item - arr2Min3;
      });
      const option1 = lineOptions(arr1, timeX, false, "");
      option1 && myChart1.setOption(option1);

      const option2 = lineOptions(arr2, timeX, false, "");
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
  }
};
</script>

<style lang="scss" scoped>
$echarts_bg_img: url("./images/_2.png");

.pro-from-right {
  text-align: right;
  position: absolute;
  right: 7.5vw;
  top: 2.5vh;
  z-index: 100;
}

.pro-from-left {
  text-align: left;
  position: absolute;
  left: 1.5vw;
  top: 2.5vh;
  z-index: 100;
}

::v-deep(.el-form-item__label) {
  color: #999 !important;
  font-size: 14px !important;
  padding: 0;
}

::v-deep(.el-select__wrapper) {
  background: transparent !important;
  box-shadow: 0 0 0 1px rgba(1, 229, 255, 1) inset;
}

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
        justify-content: space-around;
      }

      .search_right {
        display: flex;
        justify-content: space-around;
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
        overflow: auto;

        > div {
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
        height: 40%;
        width: 100%;
        display: flex;
        justify-content: space-between;

        > div {
          flex: 0.49;
          overflow: auto;

          .box2_center_top_left_center {
            display: flex;
            justify-content: space-between;
            height: calc(100% - 60px);
            margin: 5px 10px;

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
          }
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
        display: flex;
        flex-direction: column;

        > div {
          flex: 0.48;
        }
      }
    }
  }

  .box3 {
    height: 40%;
    display: flex;
    justify-content: space-between;

    > div {
      flex: 0.48;
      display: flex;
      flex-direction: column;

      .echarts_bg {
        flex: 1;
        background-image: $echarts_bg_img;
        background-size: 100% 100%;

        .roduct_right_list {
          display: flex;
          flex-direction: column;
          padding: 10px 10px;
        }

        .roduct_right_title {
          text-align: center;
          color: rgba(255, 120, 2, 1);
          font-size: 18px;
        }

        .roduct_right_ctn {
          display: flex;
          justify-content: space-between;

          .roduct_right_ctn_data {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 120px;

            .ctn_num {
              font-size: 24px;
              color: rgba(1, 217, 255, 1);
            }
          }
        }
      }
    }
  }

  .box4 {
    height: 30%;
    display: flex;
    justify-content: space-between;

    > div {
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

::v-deep(.el-input__wrapper, .el-date-editor) {
  background: transparent !important;
  box-shadow: none;
  border-radius: 5px;
  border: 1px solid rgba(1, 229, 255, 1);
  width: 200px;

  .el-range-input {
    color: #777777;
  }
}

::v-deep(.el-radio-button__inner) {
  color: #777777 !important;
}

::v-deep(.el-input__inner) {
  color: #777777;
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
