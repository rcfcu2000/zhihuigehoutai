import { ref } from 'vue'


export const tableColumns = ref(
    [
        { title: '商品ID', width: 100, dataKey: 'product_id', key: 'product_id', align: 'center', },
        { title: '商品简称', width: 100, dataKey: 'product_abbreviation', key: 'product_abbreviation', align: 'center' },
        { title: 'GMV', dataKey: 'gmv', key: 'gmv', width: 150, align: 'center', sortable: true, },
        {
            title: '净利润率', dataKey: 'net_profit_margin', key: 'net_profit_margin', width: 150, align: 'center',
        },
        { title: '产品分类', dataKey: 'product_category', key: 'product_category', width: 150, align: 'center' },
        { title: '搜索访客占比', dataKey: 'search_visitor_ratio', key: 'search_visitor_ratio', width: 150, align: 'center' },
        { title: '搜索GMV占比', dataKey: 'search_gmv_ratio', key: 'search_gmv_ratio', width: 150, align: 'center' },
        { title: '老客占比', dataKey: 'returning_customer_ratio', key: 'returning_customer_ratio', width: 150, align: 'center' },
        { title: '本月货盘', width: 100, dataKey: 'current_inventory', key: 'current_inventory', align: 'center' },
        { title: '上月货盘', dataKey: 'last_period_stockpile', key: 'last_period_stockpile', width: 150, align: 'center' },
        { title: '盘货变化', dataKey: 'stockpile_change', key: 'stockpile_change', width: 150, align: 'center' },
        { title: '客单价', dataKey: 'unit_price', key: 'unit_price', width: 150, align: 'center' },
        { title: '预估毛利率', dataKey: 'estimated_gross_profit_margin', key: 'estimated_gross_profit_margin', width: 150, align: 'center' },
        { title: '支付转化率', dataKey: 'payment_conversion_rate', key: 'payment_conversion_rate', width: 150, align: 'center' },
        { title: '收藏率', dataKey: 'collection_rate', key: 'collection_rate', width: 150, align: 'center' },
        { title: '加购率', width: 100, dataKey: 'add_to_cart_rate', key: 'add_to_cart_rate', align: 'center' },
        { title: '连带率', dataKey: 'attachment_rate', key: 'attachment_rate', width: 150, align: 'center' },
        { title: '三级类目', dataKey: 'tertiary_category', key: 'tertiary_category', width: 150, align: 'center' },
    ]
)