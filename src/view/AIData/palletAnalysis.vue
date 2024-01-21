<template>
  <div
    class="main"
    v-loading.fullscreen.lock="state.loading"
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <div class="header">
      <span class="titl1_h1">货盘分析</span>
      <div class="search">
        <div class="search_left">
          <div class="search_line">
            负责人
            <el-select
              v-model="searchData.product_manager"
              class="select_width"
              placeholder="请选择"
              @change="getData2"
              size="small"
            >
              <el-option
                v-for="item in state.responsibleList"
                :key="item.responsible"
                :label="item.responsible"
                :value="item.responsible"
              />
            </el-select>
          </div>
          <div class="search_line">
            本月货盘
            <el-select
              v-model="searchData.current_inventory"
              clearable
              @change="getData2"
              class="select_width"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in state.monthPallet"
                :key="item.current_inventory"
                :label="item.current_inventory"
                :value="item.current_inventory"
              />
            </el-select>
          </div>
          <div class="search_line">
            货盘变化
            <div class="line">
              <el-radio-group
                v-model="searchData.all"
                @change="changeCheckGroup('999')"
                class="ml-4"
              >
                <el-radio :label="999" border size="small">全部</el-radio>
              </el-radio-group>
              <el-checkbox-group
                v-model="searchData.inventory_change"
                size="small"
                @change="changeCheckGroup('dx')"
              >
                <el-checkbox
                  border
                  v-for="(item, index) in cities"
                  :key="item.label"
                  :label="item.label"
                  >{{ item.value }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="search_right">
          <div class="search_line">
            请选择起止时间
            <el-date-picker
              @change="chageSearch"
              v-model="searchData.date"
              size="small"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="title">重点指标</div>
    <div class="roduct_num">
      <div class="roduct_num_box">
        <div class="roduct_num_box_title">产品效率</div>
        <ul class="roduct_num_box_ctn">
          <li>
            <span class="ctn_num">
              {{ state.titleData.attachment_rate || 0 }}
            </span>
            <span class="ctn_name"> 连带率 </span>
          </li>
          <li>
            <span class="ctn_num"> {{ state.titleData.add_to_cart_rate || 0 }}% </span>
            <span class="ctn_name"> 加购率 </span>
          </li>
          <li>
            <span class="ctn_num"> {{ state.titleData.favorite_rate || 0 }}% </span>
            <span class="ctn_name"> 收藏率 </span>
          </li>
          <li>
            <span class="ctn_num"> {{ state.titleData.refund_rate || 0 }}% </span>
            <span class="ctn_name"> 退款率 </span>
          </li>
        </ul>
      </div>
      <div class="roduct_num_box">
        <div class="roduct_num_box_title">产品质量</div>
        <ul class="roduct_num_box_ctn">
          <li>
            <span class="ctn_num">
              {{ state.titleData.returning_buyer_percentage || 0 }}%
            </span>
            <span class="ctn_name"> 老买家人数占比 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ state.titleData.returning_buyer_gmv_percentage || 0 }}%
            </span>
            <span class="ctn_name"> 老买家GWV占比 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ state.titleData.returning_buyer_average_order_value || 0 }}
            </span>
            <span class="ctn_name"> 老买家客单价 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ state.titleData.average_order_value_range || 0 }}
            </span>
            <span class="ctn_name"> 客单价 </span>
          </li>
        </ul>
      </div>
      <div class="roduct_num_box">
        <div class="roduct_num_box_title">产品竞争率</div>
        <ul class="roduct_num_box_ctn">
          <li>
            <span class="ctn_num">
              {{ state.titleData.search_visitor_count || 0 }}
            </span>
            <span class="ctn_name"> 搜索访客数 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ state.titleData.search_gmv_percentage || 0 }}%
            </span>
            <span class="ctn_name"> 搜多GMV占比 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ state.titleData.paid_traffic_percentage || 0 }}%
            </span>
            <span class="ctn_name"> 付费流量占比 </span>
          </li>
          <li>
            <span class="ctn_num"> {{ state.titleData.paid_gmv_percentage || 0 }}% </span>
            <span class="ctn_name"> 付费GMV占比 </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="title">GMV拆解</div>
    <div class="GMV">
      <div class="GMV_left">
        <div class="GMV_left_tit">最高层级{{ state.treeLevel }}</div>
        <div class="GMV_left_ctn" id="GMVDismantlingecharts"></div>
      </div>
      <div class="GMV_right">
        <div class="echarts_title">GMV对比</div>
        <div class="echarts_1" id="GMVcharts">
          <el-skeleton :rows="4" animated> </el-skeleton>
          <!-- <el-empty description="description" /> -->
        </div>
        <div class="echarts_title">访客对比</div>
        <div class="echarts_1" id="Visitorcharts">
          <el-skeleton :rows="4" animated> </el-skeleton>
          <!-- <el-empty description="description" /> -->
        </div>
      </div>
    </div>
    <div class="title">趋势对比</div>
    <div class="trend_comparison">
      <div class="trend_comparison_left flex_size">
        <div class="echarts_title">货盘趋势</div>
        <div class="trend_comparison_box" id="Palletecharts">
          <el-skeleton :rows="6" animated> </el-skeleton>
          <!-- <el-empty description="description" /> -->
        </div>
      </div>
      <div class="trend_comparison_right flex_size">
        <div class="echarts_title">新老客对比</div>
        <div class="trend_comparison_box" id="newOldecharts">
          <el-skeleton :rows="6" animated> </el-skeleton>
          <!-- <el-empty description="description" /> -->
        </div>
      </div>
    </div>
    <div class="title title_btn">
      <span> 单价趋势</span>
      <el-button class="btn" @click="getUserPrice">调整价格区间</el-button>
    </div>
    <div class="trend_comparison">
      <div class="trend_comparison_left flex_size">
        <div class="echarts_title">件单价GMV趋势</div>
        <div class="trend_comparison_box" id="unitPriceGMVcharts">
          <el-skeleton :rows="6" animated> </el-skeleton>
          <!-- <el-empty description="description" /> -->
        </div>
      </div>
      <div class="trend_comparison_right flex_size">
        <div class="echarts_title">件单价访客趋势</div>
        <div class="trend_comparison_box" id="unitPriceTrendcharts">
          <el-skeleton :rows="6" animated> </el-skeleton>
          <!-- <el-empty description="description" /> -->
        </div>
      </div>
    </div>
    <div class="table_title">商品明细</div>
    <div class="table">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="tableColumns"
            stripe
            :data="state.tableData"
            :width="width"
            :height="height"
            fixed
          >
            <template #empty>
              <div class="flex items-center justify-center h-100%">
                <el-empty />
              </div>
            </template>
          </el-table-v2>
        </template>
      </el-auto-resizer>
    </div>
    <el-dialog
      v-model="state.dialogForm.visible"
      width="600px"
      title="设置价格区间（最多6个）"
      align-center
    >
      <div class="dialog-content">
        <div class="dp-flex justify-content-space-betwee tip align-items">
          <span> 客单价(元) </span>
          <span class="dp-flex align-items cursor-pointer" @click="restore">
            <el-icon :size="20">
              <RefreshLeft />
            </el-icon>
            恢复默认
          </span>
        </div>
        <el-form ref="formRef" :model="userPriceRange">
          <div
            v-for="(item, index) in userPriceRange.priceRange"
            class="item_line dp-flex"
            :key="index"
          >
            <el-form-item
              :prop="'priceRange.' + index + '.priceMin'"
              :rules="{
                required: true,
                message: '填写价格区间',
                trigger: 'blur',
              }"
            >
              <el-input-number
                v-model="item.priceMin"
                class="input_width input_style"
                :controls="false"
                @blur="checkNum(item.priceMin, index, 'priceMin')"
              />
              -
            </el-form-item>
            <el-form-item
              :prop="'priceRange.' + index + '.priceMax'"
              :rules="{
                required: true,
                message: '填写价格区间',
                type: 'number',
                trigger: 'blur',
              }"
            >
              <el-input-number
                v-model="item.priceMax"
                class="input_width input_style"
                :controls="false"
                @blur="checkNum(item.priceMax, index, 'priceMax')"
              />
              <span style="flex: 1">元</span>
            </el-form-item>
            <el-button
              class="mt-2 btn_style position_right"
              @click.prevent="removeLine(item)"
              >-</el-button
            >
          </div>
        </el-form>
        <el-button
          class="mt-2 btn_style"
          style="width: 100%"
          @click="addDomain"
          :disabled="userPriceRange.priceRange.length === 6"
          >+添加</el-button
        >
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogForm.visible = false" class="cancellation btn"
            >取消</el-button
          >
          <el-button @click="submitForm(formRef)" class="primary btn"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import { tableColumns } from "./table";
import {
  getAlldata,
  getPriceRangedata,
  getUserPriceRange,
  setUserPriceRange,
  getResponsibleList,
  getCategoriesList,
} from "@/api/AIdata";
import { getMonthFinalDay } from "@/utils/getDate";
import { useUserStore } from "@/pinia/modules/user";
import { reactive, onMounted, onUnmounted, ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { lineOptions, barOptions, lineOptions1 } from "./echartsOptions";
const userStore = useUserStore();
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
const formRef = ref<FormInstance>();
const cities = [
  {
    label: -1,
    value: "上升",
  },
  {
    label: 0,
    value: "持平",
  },
  {
    label: 1,
    value: "下降",
  },
];
const state = reactive({
  tree: [] as any,
  tableData: [],
  titleData: {} as any,
  dialogForm: {
    visible: false,
    records: [] as DomainItem[],
  },
  loading: true,
  treeLevel: 0,
  gmvPrductList: [] as any,
  priceRangedata: [] as any,
  responsibleList: [] as any,
  monthPallet: [] as any,
});

const searchData = reactive({
  product_manager: "", //	string 商品负责人 - 负责该商品的人员或团队名称
  current_inventory: "", // string 当期货盘
  inventory_change: [],
  all: 999 as any,
  date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
});

// 调整价格区间data
const userPriceRange = reactive<{
  priceRange: DomainItem[];
}>({
  priceRange: [],
});

interface DomainItem {
  priceMin: number;
  priceMax: number;
  uid: string;
}

const removeLine = (item: DomainItem) => {
  const index = userPriceRange.priceRange.indexOf(item);
  if (index !== -1) {
    userPriceRange.priceRange.splice(index, 1);
  }
};

const restore = () => {};

const addDomain = () => {
  userPriceRange.priceRange.push({
    priceMin: 0,
    priceMax: 0,
    uid: userStore.userInfo.ID,
  });
};

const checkNum = (val, ind, str) => {
  // console.log(val, ind, str);
  if (!/^\d+$/.test(val)) {
    ElMessage.warning("输入格式错误或者输入为空");
    userPriceRange.priceRange[ind][str] = "";
    return;
  }
  let s = false;
  userPriceRange.priceRange.forEach((item, index) => {
    if (
      Number(item.priceMin) < Number(val) &&
      Number(val) < Number(item.priceMax) &&
      index !== ind
    ) {
      s = true;
      return;
    }
  });
  if (s) {
    ElMessage.warning("输入价格与其他区间价格冲突");
    userPriceRange.priceRange[ind][str] = "";
    return;
  }
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const data = {
        records: userPriceRange.priceRange,
        uid: userStore.userInfo.ID,
      };
      const res = await setUserPriceRange(data);
      if (res.code === 0) {
        ElMessage.success("设置成功");
        state.dialogForm.visible = false;
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

onMounted(async () => {
  await getData();
});

const getUserPrice = async () => {
  state.loading = true;
  const res = await getUserPriceRange({
    id: userStore.userInfo.ID,
  });
  if (res.code === 0) {
    state.loading = false;
    userPriceRange.priceRange = res.data.records;
    state.dialogForm.records = res.data.records;
    state.dialogForm.visible = true;
  }
};

const chageSearch = () => {
  // console.log(searchData);
};

const changeCheckGroup = (type: string) => {
  if (type === "999") {
    searchData.inventory_change = [];
  } else {
    searchData.all = null;
  }
  getData2();
};

const getData = async () => {
  // console.log(userStore.userInfo.ID)
  const [resp1, resp2] = [await getResponsibleList(), await getCategoriesList()];
  if (resp1.code === 0 && resp2.code === 0) {
    state.responsibleList = resp1.data.records;
    searchData.product_manager = resp1.data.records[0].responsible;
    state.tree = resp2.data.records;
    // state.treeLevel = getLevel(state.tree)
    await getData2();
  }
};

const getData2 = async () => {
  state.loading = true;
  let data = {
    end_date: searchData.date[1],
    start_date: searchData.date[0],
    product_manager: searchData.product_manager,
    inventory_change: searchData.all ? [searchData.all] : searchData.inventory_change,
    current_inventory: [searchData.current_inventory],
  };
  const [res, res2] = [await getAlldata(data), await getPriceRangedata(data)];
  if (res.code === 0 && res2.code === 0) {
    state.tableData = res.data.prductInfoList.records || [];
    state.titleData = res.data.index;
    state.monthPallet = res.data.gmvList.records;
    state.gmvPrductList = res.data.gmvPrductList.records;
    state.priceRangedata = res2.data.records;
    getEchartsData();
    state.loading = false;
  }
};

const getEchartsData = () => {
  contrastGMV();
  contrastVisitor();
  palletTrend();
  newOldContrast();
  unitPriceGMV();
  unitPriceTrend();
  GMVDismantling();
};

Math.floor(Math.random() * (1 - 100) + 100); //1~100的随机数
let data = Array.from(new Array(30), (x, i) =>
  Math.floor(Math.random() * (1 - 100) + 100)
);
const contrastGMV = () => {
  const chartDom = document.getElementById("GMVcharts") as HTMLElement;
  const myChart = echarts.init(chartDom);

  let arr = [
    {
      name: "店铺GMV",
      data: data,
    },
    {
      name: "行业交易金额",
      data: data,
    },
  ];
  const option = lineOptions(arr);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const contrastVisitor = () => {
  const chartDom = document.getElementById("Visitorcharts") as HTMLElement;
  const myChart = echarts.init(chartDom);

  let arr = [
    {
      name: "店铺访客数",
      data: data,
    },
    {
      name: "行业访问人数",
      data: data,
    },
  ];
  const option = lineOptions(arr);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const palletTrend = () => {
  const chartDom = document.getElementById("Palletecharts") as HTMLElement;
  const myChart = echarts.init(chartDom);
  console.log(state.gmvPrductList);
  const arr = state.gmvPrductList.map((i) => {
    return {
      name: i.class,
      date: i.data.map((j) => j.date),
      data: i.data.map((j) => j.store_gmv),
    };
  });
  const option = lineOptions1(arr);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const newOldContrast = () => {
  const chartDom = document.getElementById("newOldecharts") as HTMLElement;
  const myChart = echarts.init(chartDom);

  let arr = [
    {
      name: "支付卖家数",
      data: data,
    },
    {
      name: "支付新卖家数",
      data: data,
    },
    {
      name: "支付老买家数",
      data: data,
    },
  ];
  const option = lineOptions(arr);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const unitPriceGMV = () => {
  const chartDom = document.getElementById("unitPriceGMVcharts") as HTMLElement;
  const myChart = echarts.init(chartDom);
  const arr = state.priceRangedata.map((i) => {
    return {
      name: i.price_range,
      date: i.records.map((j) => j.date),
      data: i.records.map((j) => j.gmv),
    };
  });
  const option = barOptions(arr);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const unitPriceTrend = () => {
  const chartDom = document.getElementById("unitPriceTrendcharts") as HTMLElement;
  const myChart = echarts.init(chartDom);
  const arr = state.priceRangedata.map((i) => {
    return {
      name: i.price_range,
      date: i.records.map((j) => j.date),
      data: i.records.map((j) => j.visitor_count),
    };
  });
  const option = barOptions(arr);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};

const GMVDismantling = () => {
  const chartDom = document.getElementById("GMVDismantlingecharts") as HTMLElement;
  const myChart = echarts.init(chartDom);
  state.tree = [
    {
      name: "GMV",
      value: 2402195,
      id: "1",
      children: [
        {
          name: "S",
          value: 1772471,
          id: "1-1",
          children: [
            {
              name: "住宅家具",
              id: "1-4-1",
              value: 1772471,
              children: [{ name: "床垫类", value: 1772471, id: "1-4-1-1" }],
            },
          ],
        },
        {
          name: "A",
          id: "1-2",
          value: 839184,
          children: [
            { name: "床上用品", value: 250797, id: "1-2-1" },
            {
              name: "住宅家具",
              value: 588388,
              id: "1-2-1-1",
              children: [{ name: "床垫类", value: 588388, id: "1-2-1-1-1" }],
            },
          ],
        },
        {
          name: "B",
          id: "1-3",
          value: 442476,
          children: [
            { name: "(空白)", value: 4848, id: "1-3-1" },
            { name: "床上用品", value: 6470, id: "1-3-2" },
            {
              name: "住宅家具",
              value: 431158,
              id: "1-3-2-1",
              children: [{ name: "床垫类", value: 431158, id: "1-3-2-1-1" }],
            },
          ],
        },
        {
          name: "C",
          id: "1-4",
          value: 13085,
          children: [
            {
              name: "住宅家具",
              value: 13085,
              id: "1-4-1",
              children: [{ name: "床垫类", value: 13085, id: "1-4-1-1" }],
            },
          ],
        },
        {
          name: "D",
          id: "1-5",
          value: 6731,
          children: [
            { name: "(空白)", value: 127, id: "1-5-1" },
            { name: "床上用品", value: 1547, id: "1-5-2" },
            {
              name: "住宅家具",
              value: 5057,
              id: "1-5-3",
              children: [{ name: "床垫类", value: 5057, id: "1-5-3-1" }],
            },
          ],
        },
      ],
    },
  ];
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
          // color: "#fff",
          // width: 100,
          // height: 20,
          // lineHeight: -70,
          // borderWidth: 0.5,  // 边框宽度
          // borderRadius: 20,  // 边框圆角
          // borderColor: "#B034FF",   // 文字块的边框色
          // backgroundColor: "#ccc",  // 文字块的背景色

          rich: {
            a: {
              color: "#FECD04",
              lineHeight: 60,
              fontSize: 18,
            },
            b: {
              backgroundColor: {
                image:
                  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F25%2F20200525121206_tujpk.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1707983711&t=8d8e6381a1d8f8f95e3fdcb4e7349dc9",
              },
              height: 20,
              width: 100,
            },
          },
          // formatter: [
          //     '{a|这段文本采用样式a}',
          //     '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
          // ].join('\n'),

          formatter: function (param) {
            // return (
            //     param.name + '     ' + param.value + 'b'
            // )
            // return  [
            //     param.name + '     ' + param.value + 'b'
            // ]
            return [
              `{a|${param.name}    ${param.value}}`,
              // '{b|}'
            ].join("\n");
          },
        },
        // leaves: { // 叶子节点的特殊配置，如上面的树图实例中，叶子节点和非叶子节点的标签位置不同。
        //     label: { // 描述了叶子节点所对应的文本标签的样式。
        //         position: 'right',
        //         verticalAlign: 'middle',
        //         align: 'center',
        //         color: '#B034FF',
        //         width: 100,
        //         height: 40,
        //         lineHeight: 40,
        //         borderWidth: 0.5,  // 边框宽度
        //         borderRadius: 20,  // 边框圆角
        //         borderColor: "#B034FF",   // 文字块的边框色
        //         backgroundColor: "#fff",  // 文字块的背景色
        //         rich: {
        //             img1: {
        //                 // backgroundColor: {
        //                 //     image: Showers,
        //                 // },
        //                 height: 40
        //             }
        //         },
        //         formatter: function (param) {
        //             var res = "";
        //             res += param.name + '{img1|}';
        //             return res;
        //         },
        //     }
        // },
        roam: true,
        initialTreeDepth: 1, // 树图初始展开的层级（深度）
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
  myChart.on("click", function (params) {
    console.log(myChart);
  });
  window.addEventListener("resize", () => {
    myChart.resize();
  });
};

const getLevel = (arr) => {
  let maxLevel = 0;
  (function callBack(arr, level) {
    ++level;
    maxLevel = Math.max(level, maxLevel);
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item.children && item.children.length > 0) {
        callBack(item.children, level);
      } else {
        delete item.children;
      }
    }
  })(arr, 0);
  return maxLevel;
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
  overflow: auto;

  ::v-deep(.el-checkbox) {
    margin: 0 10px;
    color: #fff;
  }

  ::v-deep(.el-radio) {
    margin: 0 10px;
    color: #fff;
  }

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
        justify-content: space-between;

        .search_line:last-child {
          width: 400px;
          display: flex;
          align-items: center;
        }
      }

      .search_right {
        display: flex;
        flex: 0.3;
        justify-content: space-between;
      }

      .search_line {
        .line {
          display: flex;
        }

        .select_width {
          width: 100px;
        }

        .search_radio {
          ::v-deep(.el-radio) {
            color: #fff;
          }
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

  .title_btn {
    display: flex;
    justify-content: space-between;

    .btn {
      margin-top: 24px;
      padding: 0 20px;
      height: 40px;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 700;
      border: none;

      color: #fff;
      background: linear-gradient(
        180deg,
        rgba(0, 72, 92, 1) 0%,
        rgba(1, 190, 226, 1) 100%
      );
    }
  }

  .roduct_num {
    display: flex;
    height: 112px;
    justify-content: space-around;

    .roduct_num_box {
      flex: 0.3;
      background-image: url("./images/image-3.png");
      background-size: 100% 100%;
      padding: 10px;

      .roduct_num_box_title {
        text-align: center;
        color: #ff7802;
        font-size: 18px;
        height: 36px;
      }

      .roduct_num_box_ctn {
        display: flex;
        justify-content: space-around;

        li {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          .ctn_num {
            font-size: 18px;
            color: rgba(1, 217, 255, 1);
          }
        }
      }
    }
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

  .GMV {
    display: flex;
    justify-content: space-around;

    .GMV_left {
      flex: 0.4;

      // background-color: pink;
      .GMV_left_tit {
        height: 66px;
        line-height: 66px;
        text-align: center;
        color: #ff7802;
        font-size: 18px;
        font-weight: 600;
        background: rgb(3, 37, 93, 0.5);
      }

      .GMV_left_ctn {
        // background-color: rgb(34, 87, 157, 0.8);
        background: url("./images/_13.png") no-repeat;
        // background-image: url('./images/_13.png');
        // background-size: 100% 100%;
        background-position: center;
        margin: 20px 20px;
        height: 400px;
      }
    }

    .GMV_right {
      flex: 0.56;
    }

    .echarts_1 {
      height: 193px;
      padding: 10px 20px;
      box-sizing: border-box;
      width: 100%;
      background-image: $echarts_bg_img;
      background-size: 100% 100%;
    }
  }

  .trend_comparison {
    display: flex;
    justify-content: space-around;

    .flex_size {
      flex: 0.48;
    }

    .trend_comparison_box {
      padding: 10px 20px;
      height: 252px;
      background-image: $echarts_bg_img;
      background-size: 100% 100%;
    }
  }

  .table_title {
    margin-top: 20px;
    width: 98%;
    height: 43px;
    line-height: 43px;
    font-size: 24px;
    padding-left: 60px;
    font-weight: 700;
    background-image: url("./images/table_title.png");
    // background: linear-gradient(90deg, #008CC2 0%, #008CC2 100%);
    background-size: 100% 100%;
    margin-left: 20px;
    box-sizing: border-box;
  }

  .table {
    height: 432px;
    padding: 10px;
    width: 98%;
    overflow: auto;
    margin-bottom: 10px;
    margin-top: 4px;
    // border: 1px solid #fff;

    ::v-deep(.el-auto-resizer) {
      .el-table-v2 {
        .el-table-v2__main {
          background: none;

          .el-table-v2__header {
            //表格头部
            .el-table-v2__header-row {
              .el-table-v2__header-cell {
                background: none;
              }
            }
          }

          .el-table-v2__body {
            // 表格主体内容
            .el-table-v2__row:nth-child(2n) {
              background-color: rgba(124, 145, 170, 0.5);
            }

            .el-table-v2__row:hover {
              background-color: rgb(32, 96, 169);
            }
          }
        }
      }
    }
  }

  ::v-deep(.el-overlay) {
    .el-overlay-dialog {
      .el-dialog {
        background: linear-gradient(
          116.95deg,
          rgba(0, 13, 36, 1) 0%,
          rgba(0, 82, 117, 1) 100%
        );

        .el-dialog__header {
          border-bottom: 2px solid rgba(6, 132, 188, 1);

          .el-dialog__title {
            color: #fff;
          }
        }

        .dialog-content {
          color: #fff;

          .item_line {
            position: relative;

            .position_right {
              position: absolute;
              right: 20px;
            }
          }

          .tip {
            margin: 10px 0;
            font-size: 16px;
          }

          .input_width {
            width: 140px;
            margin: 0 10px;
          }

          .input_style {
            .el-input__wrapper {
              background: transparent;

              .el-input__inner {
                color: #fff;
              }
            }
          }

          .btn_style {
            background: transparent;
            color: #fff;
            border: 1px solid #fff;
          }
        }

        .dialog-footer {
          .btn {
            border: none;
            padding: 8px 18px;
            margin: 0 10px;
            color: #fff;
            background: transparent;
          }

          .cancellation {
            border: 1px solid #fff;
          }

          .primary {
            border: 1px solid rgb(7, 95, 154);
            background: rgb(7, 95, 154);
          }
        }
      }
    }
  }
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
