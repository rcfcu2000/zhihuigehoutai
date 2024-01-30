<template>
  <div class="main" v-loading.fullscreen.lock="state.loading" element-loading-background="rgba(122, 122, 122, 0.8)">
    <el-affix :offset="0">
      <div class="header">
        <span class="titl1_h1">货盘分析</span>
        <div class="search">
          <div class="search_left">
            <div class="search_line">
              负责人
              <el-select v-model="searchData.product_manager" class="select_width" placeholder="请选择" @change="getData2"
                size="small">
                <el-option v-for="item in state.responsibleList" :key="item.responsible" :label="item.responsible"
                  :value="item.responsible" />
              </el-select>
            </div>
            <div class="search_line">
              本月货盘
              <el-select v-model="searchData.current_inventory" clearable multiple @change="getData2" class="select_width"
                placeholder="全部" size="small">
                <el-option v-for="item in state.monthPallet" :key="item.current_inventory" :label="item.current_inventory"
                  :value="item.current_inventory" />
              </el-select>
            </div>
            <div class="search_line">
              货盘变化
              <el-select v-model="searchData.inventory_change" clearable multiple @change="getData2" class="select_width"
                placeholder="全部" size="small">
                <el-option v-for="(item, index) in cities" :key="index" :label="item.value" :value="item.label">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="search_right">
            <div class="search_line">
              请选择起止时间
              <el-date-picker @change="getData2" v-model="searchData.date" :clearable="false" size="small"
                format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" type="daterange"
                start-placeholder="开始时间" end-placeholder="结束时间" />
            </div>
          </div>
        </div>
      </div>
    </el-affix>

    <div class="title">重点指标</div>
    <div class="roduct_num">
      <div class="roduct_num_box">
        <div class="roduct_num_box_title">产品效率</div>
        <ul class="roduct_num_box_ctn">
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.attachment_rate).toFixed(2)) }}
            </span>
            <span class="ctn_name"> 连带率 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.add_to_cart_rate * 100).toFixed(2)) }}
              %
            </span>
            <span class="ctn_name"> 加购率 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.favorite_rate * 100).toFixed(2)) }}
              % </span>
            <span class="ctn_name"> 收藏率 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.refund_rate * 100).toFixed(2)) }}
              % </span>
            <span class="ctn_name"> 退款率 </span>
          </li>
        </ul>
      </div>
      <div class="roduct_num_box">
        <div class="roduct_num_box_title">产品质量</div>
        <ul class="roduct_num_box_ctn">
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.returning_buyer_percentage * 100).toFixed(2)) }}
              %
            </span>
            <span class="ctn_name"> 老买家人数占比 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.returning_buyer_gmv_percentage * 100).toFixed(2)) }}
              %
            </span>
            <span class="ctn_name"> 老买家GWV占比 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat(state.titleData.returning_buyer_average_order_value?.toFixed(2)) }}
            </span>
            <span class="ctn_name"> 老买家客单价 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat(state.titleData.customer_unit_price?.toFixed(2)) }}
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
              {{ parseFloat(state.titleData.search_visitor_count?.toFixed(2)) }}
            </span>
            <span class="ctn_name"> 搜索访客数 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.search_gmv_percentage * 100).toFixed(2)) }}
              %
            </span>
            <span class="ctn_name"> 搜索GMV占比 </span>
          </li>
          <li>
            <span class="ctn_num">
              {{ parseFloat((state.titleData.paid_traffic_percentage * 100).toFixed(2)) }}
              %
            </span>
            <span class="ctn_name"> 付费流量占比 </span>
          </li>
          <li>
            <span class="ctn_num"> {{ parseFloat((state.titleData.paid_gmv_percentage * 100).toFixed(2)) }}% </span>
            <span class="ctn_name"> 付费GMV占比 </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="title">GMV拆解</div>
    <div class="GMV">
      <div class="GMV_left">
        <div class="GMV_left_tit">{{ state.treeLevel ? state.treeLevel : '全部' }}</div>
        <div class="GMV_left_ctn" id="GMVDismantlingecharts"></div>
      </div>
      <div class="GMV_right">
        <div class="echarts_title">GMV对比</div>
        <div class="echarts_1" id="GMVcharts">
          <el-skeleton :rows="4" animated> </el-skeleton>
        </div>
        <div class="echarts_title">访客对比</div>
        <div class="echarts_1" id="Visitorcharts">
          <el-skeleton :rows="4" animated> </el-skeleton>
        </div>
      </div>
    </div>
    <div class="title">趋势对比</div>
    <div class="trend_comparison">
      <div class="trend_comparison_left flex_size">
        <div class="echarts_title">货盘趋势</div>
        <div class="trend_comparison_box" id="Palletecharts">
          <el-skeleton :rows="5" animated> </el-skeleton>
        </div>
      </div>
      <div class="trend_comparison_right flex_size">
        <div class="echarts_title">新老客对比</div>
        <div class="trend_comparison_box" id="newOldecharts">
          <el-skeleton :rows="5" animated> </el-skeleton>
        </div>
      </div>
    </div>
    <div class="title title_btn">
      <span> 客单价趋势</span>
      <el-button class="btn" @click="getUserPrice">调整客单价区间</el-button>
    </div>
    <div class="trend_comparison">
      <div class="trend_comparison_left flex_size">
        <div class="echarts_title">客单价GMV趋势</div>
        <div class="trend_comparison_box" id="unitPriceGMVcharts">
          <el-skeleton :rows="5" animated> </el-skeleton>
        </div>
      </div>
      <div class="trend_comparison_right flex_size">
        <div class="echarts_title">客单价访客趋势</div>
        <div class="trend_comparison_box" id="unitPriceTrendcharts">
          <el-skeleton :rows="5" animated> </el-skeleton>
        </div>
      </div>
    </div>
    <div class="table_title"><span>商品明细</span>
      <span style="cursor: pointer;" @click="state.tableDialogType = true" class="dp-flex align-items">
        <el-tooltip effect="dark" content="放大" placement="bottom">
          <el-icon :size="30" color="#409EFF">
            <FullScreen />
          </el-icon>
        </el-tooltip>
      </span>
    </div>
    <div class="aiData_table table">
      <el-table :data="state.tableData" max-height="450">
        <el-table-column label="商品ID" width="150">
          <template #default="scope">
            <span>{{ scope.row.product_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品简称" show-overflow-tooltip width="200">
          <template #default="scope">
            <span>{{ scope.row.product_abbreviation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="GMV" sortable :sort-method="(a, b) => sortList(a, b, 'gmv')" width="150" align="center">
          <template #default="scope">
            <span> {{ parseFloat((scope.row.gmv).toFixed(0)) }} </span>
          </template>
        </el-table-column>
        <el-table-column label="净利润率" sortable :sort-method="(a, b) => sortList(a, b, 'net_profit_margin')" width="150"
          align="center">
          <template #default="scope">
            <div class="alcenter">
              <el-icon size="15" color="#03FF91" v-if="scope.row.net_profit_margin > 0.2">
                <Top />
              </el-icon>
              <el-icon size="15" color="#FECD04"
                v-if="scope.row.net_profit_margin < 0.2 && scope.row.net_profit_margin > -0.5">
                <Right />
              </el-icon>
              <el-icon size="15" color="red" v-if="scope.row.net_profit_margin < -0.5">
                <Bottom />
              </el-icon>
              <span> {{ parseFloat((scope.row.net_profit_margin * 100).toFixed(2)) }} %</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品分类" width="150" align="center">
          <template #default="scope">
            <span>{{ scope.row.product_category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="搜索访客占比" sortable :sort-method="(a, b) => sortList(a, b, 'search_visitor_ratio')"
          width="150" align="center">
          <template #default="scope">
            <div :class="scope.row.search_visitor_ratio > 0.3 ? 'backgroundBlue' : ''"> {{
              parseFloat((scope.row.search_visitor_ratio * 100).toFixed(2)) }} %</div>
          </template>
        </el-table-column>
        <el-table-column label="搜索GMV占比" sortable :sort-method="(a, b) => sortList(a, b, 'search_gmv_ratio')" width="150"
          align="center">
          <template #default="scope">
            <span> {{ parseFloat((scope.row.search_gmv_ratio * 100).toFixed(2)) }}%</span>
          </template>
        </el-table-column>
        <el-table-column label="老客占比" sortable :sort-method="(a, b) => sortList(a, b, 'returning_customer_ratio')"
          width="130" align="center">
          <template #default="scope">
            <span> {{ parseFloat((scope.row.returning_customer_ratio * 100).toFixed(2)) }}%</span>
          </template>
        </el-table-column>
        <el-table-column label="本月货盘" align="center">
          <template #default="scope">
            <span>{{ scope.row.current_inventory }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上月货盘" align="center">
          <template #default="scope">
            <span>{{ scope.row.last_period_stockpile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="盘货变化" align="center">
          <template #default="scope">
            <div v-if="scope.row.stockpile_change === 1" style="width: 100%; background-color: #01E5FF;">上升</div>
            <div v-else-if="scope.row.stockpile_change === -1" style="background-color: red;">下降</div>
            <div v-else>持平</div>
          </template>
        </el-table-column>
        <el-table-column label="客单价" sortable :sort-method="(a, b) => sortList(a, b, 'unit_price')" width="100"
          align="center">
          <template #default="scope">
            <span>{{ parseFloat((scope.row.unit_price).toFixed(2)) }} </span>
          </template>
        </el-table-column>
        <el-table-column label="预估毛利率" sortable :sort-method="(a, b) => sortList(a, b, 'estimated_gross_profit_margin')"
          width="140" align="center">
          <template #default="scope">
            <span> {{ parseFloat((scope.row.estimated_gross_profit_margin * 100).toFixed(2)) }}%</span>
          </template>
        </el-table-column>
        <el-table-column label="支付转化率" sortable :sort-method="(a, b) => sortList(a, b, 'payment_conversion_rate')"
          width="140" align="center">
          <template #default="scope">
            <span>{{ parseFloat((scope.row.payment_conversion_rate * 100).toFixed(2)) }} %</span>
          </template>
        </el-table-column>
        <el-table-column label="收藏率" sortable :sort-method="(a, b) => sortList(a, b, 'collection_rate')" width="100"
          align="center">
          <template #default="scope">
            <span> {{ parseFloat((scope.row.collection_rate * 100).toFixed(2)) }} %</span>
          </template>
        </el-table-column>
        <el-table-column label="加购率" sortable :sort-method="(a, b) => sortList(a, b, 'add_to_cart_rate')" width="100"
          align="center">
          <template #default="scope">
            <span> {{ parseFloat((scope.row.add_to_cart_rate * 100).toFixed(2)) }}%</span>
          </template>
        </el-table-column>
        <el-table-column label="连带率" sortable :sort-method="(a, b) => sortList(a, b, 'attachment_rate')" width="100"
          align="center">
          <template #default="scope">
            <span> {{ parseFloat((scope.row.attachment_rate).toFixed(2)) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="三级类目" width="200">
          <template #default="scope">
            <span>{{ scope.row.tertiary_category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" show-overflow-tooltip width="200">
          <template #default="scope">
            <span>{{ scope.row.product_name }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <div class="flex items-center justify-center h-100%">
            <el-empty />
          </div>
        </template>
      </el-table>
    </div>
    <el-dialog v-model="state.dialogForm.visible" width="600px" title="设置客单价区间（最多6个）" align-center>
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
          <div v-for="(item, index) in userPriceRange.priceRange" class="item_line dp-flex" :key="index">
            <el-form-item :prop="'priceRange.' + index + '.priceMin'" :rules="{
              required: true,
              message: '填写价格区间',
              trigger: 'blur',
            }">
              <el-input-number v-model="item.priceMin" class="input_width input_style" :controls="false"
                @blur="checkNum(item.priceMin, index, 'priceMin')" />
              -
            </el-form-item>
            <el-form-item :prop="'priceRange.' + index + '.priceMax'" :rules="{
              required: true,
              message: '填写价格区间',
              type: 'number',
              trigger: 'blur',
            }">
              <el-input-number v-model="item.priceMax" class="input_width input_style" :controls="false"
                @blur="checkNum(item.priceMax, index, 'priceMax')" />
              <span style="flex: 1">元</span>
            </el-form-item>
            <el-button class="mt-2 btn_style position_right" @click.prevent="removeLine(item)">-</el-button>
          </div>
        </el-form>
        <el-button class="mt-2 btn_style" style="width: 100%" @click="addDomain"
          :disabled="userPriceRange.priceRange?.length >= 6">+添加</el-button>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogForm.visible = false" class="cancellation btn">取消</el-button>
          <el-button @click="submitForm(formRef)" class="primary btn"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="state.tableDialogType" width="100%" title="商品明细" align-center>
      <div class="dialog-content">
        <div class="aiData_table" style="height:600px; overflow: hidden;">
          <el-table :data="state.tableData" max-height="600">
            <el-table-column label="商品ID" width="150">
              <template #default="scope">
                <span>{{ scope.row.product_id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品简称" show-overflow-tooltip width="200">
              <template #default="scope">
                <span>{{ scope.row.product_abbreviation }}</span>
              </template>
            </el-table-column>
            <el-table-column label="GMV" sortable :sort-method="(a, b) => sortList(a, b, 'gmv')" width="150"
              align="center">
              <template #default="scope">
                <span> {{ parseFloat((scope.row.gmv).toFixed(0)) }} </span>
              </template>
            </el-table-column>
            <el-table-column label="净利润率" sortable :sort-method="(a, b) => sortList(a, b, 'net_profit_margin')"
              width="150" align="center">
              <template #default="scope">
                <div class="alcenter">
                  <el-icon size="15" color="#03FF91" v-if="scope.row.net_profit_margin > 0.2">
                    <Top />
                  </el-icon>
                  <el-icon size="15" color="#FECD04"
                    v-if="scope.row.net_profit_margin < 0.2 && scope.row.net_profit_margin > -0.5">
                    <Right />
                  </el-icon>
                  <el-icon size="15" color="red" v-if="scope.row.net_profit_margin < -0.5">
                    <Bottom />
                  </el-icon>
                  <span> {{ parseFloat((scope.row.net_profit_margin * 100).toFixed(2)) }} %</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品分类" width="150" align="center">
              <template #default="scope">
                <span>{{ scope.row.product_category }}</span>
              </template>
            </el-table-column>
            <el-table-column label="搜索访客占比" sortable :sort-method="(a, b) => sortList(a, b, 'search_visitor_ratio')"
              width="150" align="center">
              <template #default="scope">
                <div :class="scope.row.search_visitor_ratio > 0.3 ? 'backgroundBlue' : ''"> {{
                  parseFloat((scope.row.search_visitor_ratio * 100).toFixed(2)) }} %</div>
              </template>
            </el-table-column>
            <el-table-column label="搜索GMV占比" sortable :sort-method="(a, b) => sortList(a, b, 'search_gmv_ratio')"
              width="150" align="center">
              <template #default="scope">
                <span> {{ parseFloat((scope.row.search_gmv_ratio * 100).toFixed(2)) }}%</span>
              </template>
            </el-table-column>
            <el-table-column label="老客占比" sortable :sort-method="(a, b) => sortList(a, b, 'returning_customer_ratio')"
              width="130" align="center">
              <template #default="scope">
                <span> {{ parseFloat((scope.row.returning_customer_ratio * 100).toFixed(2)) }}%</span>
              </template>
            </el-table-column>
            <el-table-column label="本月货盘" align="center">
              <template #default="scope">
                <span>{{ scope.row.current_inventory }}</span>
              </template>
            </el-table-column>
            <el-table-column label="上月货盘" align="center">
              <template #default="scope">
                <span>{{ scope.row.last_period_stockpile }}</span>
              </template>
            </el-table-column>
            <el-table-column label="盘货变化" align="center">
              <template #default="scope">
                <div v-if="scope.row.stockpile_change === 1" style="width: 100%; background-color: #01E5FF;">上升</div>
                <div v-else-if="scope.row.stockpile_change === -1" style="background-color: red;">下降</div>
                <div v-else>持平</div>
              </template>
            </el-table-column>
            <el-table-column label="客单价" sortable :sort-method="(a, b) => sortList(a, b, 'unit_price')" width="100"
              align="center">
              <template #default="scope">
                <span>{{ parseFloat((scope.row.unit_price).toFixed(2)) }} </span>
              </template>
            </el-table-column>
            <el-table-column label="预估毛利率" sortable
              :sort-method="(a, b) => sortList(a, b, 'estimated_gross_profit_margin')" width="140" align="center">
              <template #default="scope">
                <span> {{ parseFloat((scope.row.estimated_gross_profit_margin * 100).toFixed(2)) }}%</span>
              </template>
            </el-table-column>
            <el-table-column label="支付转化率" sortable :sort-method="(a, b) => sortList(a, b, 'payment_conversion_rate')"
              width="140" align="center">
              <template #default="scope">
                <span>{{ parseFloat((scope.row.payment_conversion_rate * 100).toFixed(2)) }} %</span>
              </template>
            </el-table-column>
            <el-table-column label="收藏率" sortable :sort-method="(a, b) => sortList(a, b, 'collection_rate')" width="100"
              align="center">
              <template #default="scope">
                <span> {{ parseFloat((scope.row.collection_rate * 100).toFixed(2)) }} %</span>
              </template>
            </el-table-column>
            <el-table-column label="加购率" sortable :sort-method="(a, b) => sortList(a, b, 'add_to_cart_rate')" width="100"
              align="center">
              <template #default="scope">
                <span> {{ parseFloat((scope.row.add_to_cart_rate * 100).toFixed(2)) }}%</span>
              </template>
            </el-table-column>
            <el-table-column label="连带率" sortable :sort-method="(a, b) => sortList(a, b, 'attachment_rate')" width="100"
              align="center">
              <template #default="scope">
                <span> {{ parseFloat((scope.row.attachment_rate).toFixed(2)) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="三级类目" width="200">
              <template #default="scope">
                <span>{{ scope.row.tertiary_category }}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" show-overflow-tooltip width="200">
              <template #default="scope">
                <span>{{ scope.row.product_name }}</span>
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
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.tableDialogType = false" class="cancellation btn">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <goHome />
  </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import { tableColumns } from "./table";
import goHome from "./components/goHome.vue";
import {
  getAlldata,
  getPriceRangedata,
  getUserPriceRange,
  setUserPriceRange,
  getResponsibleList,
  getCategoriesList,
  getSubGmvList,
} from "@/api/AIdata";
import { getMonthFinalDay, weaklast } from "@/utils/getDate";
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
  {
    label: 100,
    value: "其他",
  },
];
const state = reactive({
  tree: [] as any,
  tableData: [],
  tableDialogType: false,
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
  dialogForm: {
    visible: false,
    records: [] as any,
  },
  loading: true,
  treeLevel: 0,
  gmvPrductList: [] as any,
  priceRangedata: [] as any,
  responsibleList: [] as any,
  monthPallet: [] as any,
  oldNewList: [] as any,
});
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
const searchData = reactive({
  product_manager: [] as any, //	string 商品负责人 - 负责该商品的人员或团队名称w
  current_inventory: [], // string 当期货盘
  inventory_change: [],
  all: 999 as any,
  // date: [getMonthFinalDay("7").beginDate, getMonthFinalDay("7").endDate],
  date: [getMonthFinalDay("6").beginDate, weaklast(-8)[0]],
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

const restore = () => {
  userPriceRange.priceRange = JSON.parse(state.dialogForm.records);
};

const addDomain = () => {
  userPriceRange.priceRange.push({
    priceMin: 0,
    priceMax: 0,
    uid: userStore.userInfo.ID,
  });
};

const checkNum = (val, ind, str) => {
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
        let obj = {
          end_date: searchData.date[1],
          start_date: searchData.date[0],
          product_manager: searchData.product_manager,
          inventory_change: searchData.inventory_change,
          current_inventory: searchData.current_inventory,
          price_range_list: userPriceRange.priceRange,
        }
        getPriceRangedatas(obj)
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
    uid: userStore.userInfo.ID,
  });
  if (res.code === 0) {
    state.loading = false;
    state.dialogForm.records = JSON.stringify(res.data.records ? res.data.records : []);
    userPriceRange.priceRange = res.data.records ? res.data.records : [];
    state.dialogForm.visible = true;
  }
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
  const [resp1, resp2] = [await getResponsibleList(), await getCategoriesList()];
  if (resp1.code === 0 && resp2.code === 0) {
    state.responsibleList = resp1.data.records;
    // console.log([resp1.data.records[0].responsible])
    searchData.product_manager = resp1.data.records[0].responsible;
    let data = {
      end_date: searchData.date[1],
      start_date: searchData.date[0],
      current_inventory: [],
      product_manager: searchData.product_manager,
      inventory_change: searchData.inventory_change,
    };
    const resp3 = await getSubGmvList(data);
    if (resp3.code === 0) {
      state.monthPallet = resp3.data.records;
      let allValue = 0;
      resp3.data.records?.forEach((i) => {
        allValue += (i.payment_amount * 1);
      });
      state.tree = [
        {
          name: "GMV",
          value: parseFloat(allValue.toFixed(2)),
          lv: -1,
          bfb: '100%',
          children: resp3.data.records?.map((i) => {
            return {
              name: i.current_inventory,
              value: parseFloat(i.payment_amount.toFixed(2)),
              bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
              children: [],
              lv: 0,
            };
          }),
        },
      ];
      await getData2();
    }
  }
};

const getData2 = async () => {
  state.loading = true;
  let data = {
    end_date: searchData.date[1],
    start_date: searchData.date[0],
    product_manager: searchData.product_manager,
    inventory_change: searchData.inventory_change,
    current_inventory: searchData.current_inventory,
  };
  const [res, res2] = [await getAlldata(data), await getPriceRangedata(data)];
  if (res.code === 0 && res2.code === 0) {
    state.tableData = res.data.prductInfoList.records || [];
    state.titleData = res.data.index;
    state.gmvPrductList = res.data.gmvPrductList.records;
    state.oldNewList = res.data.oldNewList.records;

    state.priceRangedata = res2.data.records;
    getEchartsData();
    state.loading = false;
  }
};

const getPriceRangedatas = async (data) => {
  const res = await getPriceRangedata(data)
  if (res.code === 0) {
    state.priceRangedata = res.data.records;
    unitPriceGMV();
    unitPriceTrend();
    state.dialogForm.visible = false;

  }
}

const getData2Copy = async (data: any) => {
  state.loading = true;
  const [res, res2] = [await getAlldata(data), await getPriceRangedata(data)];
  if (res.code === 0 && res2.code === 0) {
    state.tableData = res.data.prductInfoList.records || [];
    state.titleData = res.data.index;
    state.gmvPrductList = res.data.gmvPrductList.records;
    state.priceRangedata = res2.data.records;
    getEchartsData2();
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

const getEchartsData2 = () => {
  contrastGMV();
  contrastVisitor();
  palletTrend();
  newOldContrast();
  unitPriceGMV();
  unitPriceTrend();
  // GMVDismantling();
};

const sortList = (obj1, obj2, name: string) => {
  let val1 = obj1[name]
  let val2 = obj2[name]
  return val1 - val2
}


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
  myChart.hideLoading();
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
  myChart.hideLoading();
  option && myChart.setOption(option);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const palletTrend = () => {
  const chartDom = document.getElementById("Palletecharts") as HTMLElement;
  const myChart = echarts.init(chartDom);

  const arr = state.gmvPrductList?.map((i) => {
    return {
      name: i.class,
      date: i.data?.map((j) => j.date),
      data: i.data?.map((j) => j.store_gmv),
    };
  });
  if (arr) {
    const date = arr[0]?.date
    const option = lineOptions1(arr, date);
    option && myChart.setOption(option);
  }
  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const newOldContrast = () => {
  const chartDom = document.getElementById("newOldecharts") as HTMLElement;
  const myChart = echarts.init(chartDom);
  const date = state.oldNewList?.map(i => i.date)
  let arr = [
    {
      name: "支付卖家数",
      data: state.oldNewList?.map(i => i.paid_buyers_count),
    },
    {
      name: "支付新卖家数",
      data: state.oldNewList?.map(i => i.new_paid_buyers_count),
    },
    {
      name: "支付老买家数",
      data: state.oldNewList?.map(i => i.returning_paid_buyers_count),
    },
  ];
  const option = lineOptions1(arr, date);
  myChart.hideLoading();
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const backColor = ['#01E5FF', '#C2FDF4', '#03FF91', '#FECD04', '#FD89EE']
const unitPriceGMV = () => {
  const chartDom = document.getElementById("unitPriceGMVcharts") as HTMLElement;
  chartDom.removeAttribute('_echarts_instance_')
  const myChart = echarts.init(chartDom);
  const arr = state.priceRangedata?.map((i, index) => {
    return {
      type: 'bar',
      stack: 'Total',
      itemStyle: {
        color: backColor[index],
      },
      name: i.price_range,
      numIndex: index,
      date: i.records?.map((j) => j.date),
      data: i.records?.map((j) => parseFloat((j.gmv).toFixed(2))),
    };
  });
  const date = arr?.map(i => i.date)
  const option = barOptions(arr, date[0]);
  option && myChart.setOption(option);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
const unitPriceTrend = () => {
  const chartDom = document.getElementById("unitPriceTrendcharts") as HTMLElement;
  chartDom.removeAttribute('_echarts_instance_')
  const myChart = echarts.init(chartDom);
  const arr = state.priceRangedata?.map((i, index) => {
    return {
      type: 'bar',
      stack: 'Total',
      itemStyle: {
        color: backColor[index],
      },
      name: i.price_range,
      numIndex: index,
      date: i.records?.map((j) => j.date),
      data: i.records?.map((j) => parseFloat((j.visitor_count).toFixed(2))),
    };
  });
  const date = arr?.map(i => i.date)
  const option = barOptions(arr, date[0]);
  option && myChart.setOption(option);
  option && myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};

const GMVDismantling = () => {
  const chartDom = document.getElementById("GMVDismantlingecharts") as HTMLElement;
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
    state.treeLevel = params.data.name
    let data = {
      end_date: searchData.date[1],
      start_date: searchData.date[0],
      product_manager: searchData.product_manager,
      inventory_change: searchData.inventory_change,
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
              bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
              children: [],
              current: params.data.name,
              lv: 1,
            };
          });
          addDataToTree(state.tree[0], params.data.name, childs);
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
                bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
                children: [],
                primary: params.data.name,
                lv: 2,
              };
            });
            addDataToTree(state.tree[0], params.data.name, childs);
            myChart.setOption(option);
          } else {
            addDataToTree(state.tree[0], params.data.name, []);
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
                bfb: parseFloat((i.payment_amount_percentage * 100).toFixed(0)) + ' %',
                children: [],
                primary: params.data.primary,
                secondary: params.data.name,
                lv: 3,
              };
            });
            addDataToTree(state.tree[0], params.data.name, childs);
            myChart.setOption(option);
          } else {
            addDataToTree(state.tree[0], params.data.name, []);
          }
        }
      });
    }
    getData2Copy(data)
    // else if (params.data.lv === 3) {
    //   data.current_inventory = [params.data.current];
    //   data.primary_category = params.data.primary;
    //   data.secondary_category = params.data.secondary;
    //   data.tertiary_category = params.data.name;
    //   data.leve = 2
    //   getSubGmvList(data).then((res) => {
    //     if (res.code === 0) {
    //       if (res.data.records) {
    //         const childs = res.data.records?.map((i) => {
    //           return {
    //             name: i.tertiary_category,
    //             value: i.payment_amount,
    //             children: [],
    //             primary: params.data.primary,
    //             secondary: params.data.secondary,
    //             tertiary: params.data.name,
    //             lv: 4,
    //           };
    //         });
    //         addDataToTree(state.tree[0], params.data.name, childs);
    //         myChart.setOption(option);
    //       } else {
    //         addDataToTree(state.tree[0], params.data.name, []);
    //       }
    //     }
    //   });
    // }
  });
  window.addEventListener("resize", () => {
    myChart.resize();
  });
};
// 添加数据到树形结构的函数
const addDataToTree = (root: any, targetId: any, newData: any) => {
  if (!root || !targetId) return; // 确保根节点不为空且目标ID有效

  if (root.name === targetId) {
    root.lv = 999;
    root.children = newData; // 若当前节点与目标ID匹配，则直接在该节点上添加新数据
    return;
  } else {
    for (let child of root.children) {
      addDataToTree(child, targetId, newData); // 递归调用自身处理子节点
    }
  }
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
  overflow-y: auto;
  overflow-x: hidden;

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
        // justify-content: space-between;

      }

      .search_right {
        display: flex;
        flex: 0.3;
        justify-content: space-between;
      }

      .search_line {
        margin: 0 10px;

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
      background: linear-gradient(180deg,
          rgba(0, 72, 92, 1) 0%,
          rgba(1, 190, 226, 1) 100%);
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
      flex: 0.48;

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
      flex: 0.48;
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
      height: 200px;
      background-image: $echarts_bg_img;
      background-size: 100% 100%;
      position: relative;

      .eharts_empty {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
      }
    }
  }

  .table_title {
    margin-top: 20px;
    width: 98%;
    height: 43px;
    line-height: 43px;
    font-size: 24px;
    padding: 0 60px;
    font-weight: 700;
    background-image: url("./images/table_title.png");
    // background: linear-gradient(90deg, #008CC2 0%, #008CC2 100%);
    background-size: 100% 100%;
    margin-left: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .table {
    height: 470px;
    padding: 10px;
    width: 98%;
    box-sizing: border-box;
    overflow: auto;
    margin-bottom: 10px;
    margin-top: 4px;
    overflow-x: hidden;

    .backgroundBlue {
      width: 100%;
      background-color: #01E5FF;
    }

    .alcenter {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    // border: 1px solid #fff;

  }

  ::v-deep(.el-overlay) {
    .el-overlay-dialog {
      .el-dialog {
        background: linear-gradient(116.95deg,
            rgba(0, 13, 36, 1) 0%,
            rgba(0, 82, 117, 1) 100%);

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

::v-deep(.el-table__row--striped) {
  background-color: rgb(7, 35, 82, 1);
}

::v-deep(.el-table-fixed-column--left) {
  border-right: 1px solid rgb(16, 97, 197);
  background-color: rgb(26, 46, 161);
}

::v-deep(.el-popper).is-light {
  background-color: rgb(0, 98, 147);
  border: 1px solid rgb(0, 98, 147);
}

::v-deep(.el-select-dropdown__item).hover {
  background-color: rgb(0, 0, 0, 0.3);
}

::v-deep(.el-select-dropdown__item) {
  :hover {
    background-color: rgb(0, 0, 0, 0.3);
  }
}

::v-deep(.el-select-dropdown__item).selected {
  background-color: rgb(0, 0, 0, 0.1);
}

::v-deep(.el-select-dropdown__item) {
  color: #fff;
}

::v-deep(.el-select__tags) {
  .el-tag--info {
    background-color: rgba(0, 98, 147, 0.5);
  }
}

::v-deep(.el-select__tags) {
  .el-tag--info span {
    color: #fff;
  }
}
</style>
