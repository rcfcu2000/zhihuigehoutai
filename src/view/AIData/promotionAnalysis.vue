<template>
    <div class="main">
        <div class="header">
            <span class="titl1_h1">推广分析</span>
            <div class="search">
                <div class="search_left">
                    <div class="search_line">
                        负责人
                        <el-select v-model="searchData.name" class="select_width" placeholder="请选择" size="small">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="search_line">
                        本月货盘
                        <el-select v-model="searchData.monthData" class="select_width" placeholder="请选择" size="small">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                    <div class="search_line">
                        货盘变化
                        <el-radio-group v-model="searchData.palletChange" size="small">
                            <el-radio-button label="场景推广" />
                            <el-radio-button label="精准人群推广" />
                            <el-radio-button label="关键词推广" />
                        </el-radio-group>
                    </div>
                </div>
                <div class="search_right">
                    <div class="search_line">
                        年月
                        <el-radio-group v-model="searchData.palletChange" style="color: #fff;" class="search_radio"
                            size="small">
                            <el-radio label="202309" />
                            <el-radio label="202310" />
                        </el-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="title">
            重点指标
        </div>
        <div class="roduct">
            <div class="roduct_left">
                <div class="roduct_num_box">
                    <ul class="roduct_num_box_ctn">
                        <li>
                            <span class="ctn_num">
                                151239
                            </span>
                            <span class="ctn_name">
                                推广花费
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                510938
                            </span>
                            <span class="ctn_name">
                                推广GMV
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                3073947
                            </span>
                            <span class="ctn_name">
                                店铺GMV
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                4.92%
                            </span>
                            <span class="ctn_name">
                                花费占比
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                16.92%
                            </span>
                            <span class="ctn_name">
                                推广GMV占比
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="roduct_num_box">
                    <ul class="roduct_num_box_ctn">
                        <li>
                            <span class="ctn_num">
                                7.97%
                            </span>
                            <span class="ctn_name">
                                推广加购率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                5.84%
                            </span>
                            <span class="ctn_name">
                                全店加购率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                1.12%
                            </span>
                            <span class="ctn_name">
                                推广转化率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                1.25%
                            </span>
                            <span class="ctn_name">
                                全店转化率
                            </span>
                        </li>
                        <li>
                            <span class="ctn_num">
                                3.38
                            </span>
                            <span class="ctn_name">
                                推广ROI
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="roduct_right">
                <div class="roduct_right_title"> 精准人群推广</div>
                <ul class="roduct_right_ctn">
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">151239</span>
                        <span class="ctn_tit">花费</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">204.38</span>
                        <span class="ctn_tit">成交成本</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">510938</span>
                        <span class="ctn_tit">GMV</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">24.10%</span>
                        <span class="ctn_tit">GMV占比</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">3.38</span>
                        <span class="ctn_tit">推广ROI</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">54821</span>
                        <span class="ctn_tit">点击量</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">0.84%</span>
                        <span class="ctn_tit">点击率</span>
                    </li>
                    <li class="roduct_right_ctn_data">
                        <span class="ctn_num">2.76</span>
                        <span class="ctn_tit">CPC</span>
                    </li>

                </ul>
            </div>
        </div>
        <div class="echarts_ctn">
            <div class="echarts_box">
                <div class="echarts_title">
                    重点指标
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    重点指标
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    重点指标
                </div>
                <div class="echarts_size">
                </div>
            </div>
            <div class="echarts_box">
                <div class="echarts_title">
                    重点指标
                </div>
                <div class="echarts_size">
                </div>
            </div>
        </div>
        <div class="table_title">
            商品明细
        </div>
        <div class="table">

        </div>
        <div class="table_title">
            计划明细
        </div>
        <div class="table">

        </div>
    </div>
</template>
<script setup lang="ts" name="palletLinkAnalysis">
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]

const searchData = reactive({
    name: '',
    monthData: '',
    palletChange: '上升',
    principle: '',
    originalPrice: '',
    listedMonth: '',
    years: ''

})

onMounted(() => {

})
</script>

<style lang="scss" scoped>
$echarts_bg_img1: url('./images/chrats_size.png');
$echarts_bg_img2: url('./images/_2.png');

.main {
    height: 100%;
    width: 100%;
    background-image: url('./images/bc.jpg');
    background-size: 100% 100%;
    color: #fff;
    overflow: auto;

    .header {
        height: 63px;
        width: 100%;
        background-image: url('./images/0.png');
        background-size: 100% 100%;
        position: relative;

        .search {
            padding-top: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;

            .search_left {
                display: flex;
                flex: 0.4;
            }

            .search_right {
                display: flex;
                flex: 0.3;
                justify-content: space-between;

            }

            .search_line {
                margin: 0 12px;

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
        background-image: url('./images/image-2.png');
        background-size: 100% 100%;
    }

    .roduct {
        display: flex;
        justify-content: space-between;
        height: 260px;

        .roduct_left {
            display: flex;
            flex: 0.38;
            justify-content: space-between;
            flex-direction: column;

            .roduct_num_box {
                height: 88px;
                background-image: url('./images/image-3.png');
                background-size: 100% 100%;
                padding: 10px;


                .roduct_num_box_ctn {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;

                    li {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .ctn_num {
                            font-size: 18px;
                            line-height: 50px;

                            color: rgba(1, 217, 255, 1.00);
                        }
                    }
                }
            }
        }

        .roduct_right {
            flex: 0.56;
            background-image: url('./images/lr.png');
            background-size: 100% 100%;

            .roduct_right_title {
                text-align: center;
                color: rgba(255, 120, 2, 1);
                font-size: 18px;
            }

            .roduct_right_ctn {
                height: 80px;
                display: flex;
                padding: 6% 10%;
                justify-content: space-between;

                .roduct_right_ctn_data {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .ctn_num {
                        font-size: 24px;
                        color: rgba(1, 217, 255, 1);
                    }
                }
            }
        }
    }

    .echarts_ctn {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 400px;

        .echarts_box {
            flex: 0.24;

            .echarts_size {
                width: 100%;
                height:360px;
                background-image: $echarts_bg_img1;
                object-fit: cover;
                background-size: 100% 100%;
            }
        }
    }

    .echarts_title {
        margin: 10px 0 16px 0;
        width: 340px;
        height: 32px;
        padding-left: 50px;
        background-image: url('./images/11.png');
        background-size: 100% 100%;
        font-size: 24px;
    }


    .table_title {
        margin-top: 40px;
        width: 98%;
        height: 43px;
        line-height: 43px;
        font-size: 24px;
        padding-left: 5%;
        font-weight: 700;
        background-image: url('./images/table_title.png');
        background-size: 100% 100%;
        margin-left: 20px;
        box-sizing: border-box;
    }

    .table {
        height: 432px;
        width: 98%;
        overflow: auto;
        margin-top: 4px;
        border: 1px solid #fff;
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