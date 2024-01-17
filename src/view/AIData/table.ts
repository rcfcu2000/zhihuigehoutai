import { ref } from 'vue'


export const tableColumns = ref(
    [
        { title: '商品ID', width: 100, dataKey: 'column_1', key: 'column_1', align: 'center', },
        { title: '商品简介', width: 100, dataKey: 'column_2', key: 'column_2', align: 'center' },
        { title: 'GMV', dataKey: 'column_3', key: 'column_3', width: 150, align: 'center', sortable: true, },
        { title: '净利润率', dataKey: 'column_4', key: 'column_4', width: 150, align: 'center' },
        { title: '产品分类', dataKey: 'column_5', key: 'column_5', width: 150, align: 'center' },
        { title: '搜索访客占比', dataKey: 'column_6', key: 'column_6', width: 150, align: 'center' },
        { title: '搜索GMV占比', dataKey: 'column_7', key: 'column_7', width: 150, align: 'center' },
        { title: '老客占比', dataKey: 'column_8', key: 'column_8', width: 150, align: 'center' },
        { title: '商品简介', width: 100, dataKey: 'column_9', key: 'column_9', align: 'center' },
        { title: 'GMV', dataKey: 'column_10', key: 'column_10', width: 150, align: 'center' },
        { title: '净利润率', dataKey: 'column_11', key: 'column_11', width: 150, align: 'center' },
        { title: '产品分类', dataKey: 'column_12', key: 'column_12', width: 150, align: 'center' },
        { title: '搜索访客占比', dataKey: 'column_13', key: 'column_13', width: 150, align: 'center' },
        { title: '搜索GMV占比', dataKey: 'column_14', key: 'column_14', width: 150, align: 'center' },
        { title: '老客占比', dataKey: 'column_15', key: 'column_15', width: 150, align: 'center' },
        { title: '本月货盘', width: 100, dataKey: 'column_16', key: 'column_16', align: 'center' },
        { title: '上月货盘', dataKey: 'column_17', key: 'column_17', width: 150, align: 'center' },
        { title: '盘货变化', dataKey: 'column_18', key: 'column_18', width: 150, align: 'center' },
        { title: '客单价', dataKey: 'column_19', key: 'column_19', width: 150, align: 'center' },
        { title: '预估毛利率', dataKey: 'column_20', key: 'column_20', width: 150, align: 'center' },
        { title: '支付转化率', dataKey: 'column_21', key: 'column_21', width: 150, align: 'center' },
        { title: '收藏率', dataKey: 'column_22', key: 'column_22', width: 150, align: 'center' },
        { title: '加购率', width: 100, dataKey: 'column_23', key: 'column_23', align: 'center' },
        { title: '连带率', dataKey: 'column_24', key: 'column_24', width: 150, align: 'center' },
        { title: '三级类目', dataKey: 'column_25', key: 'column_25', width: 150, align: 'center' },

    ]
)