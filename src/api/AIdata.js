/*
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 15:52:53
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-03-05 12:05:29
 * @FilePath: \project\zhihuigehoutai\src\api\AIdata.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from '@/utils/request'


// 货盘分析获取所有数据
export const getAlldata = (data) => {
    return service({
        url: '/inventory/getAlldata',
        method: 'post',
        data
    })
}

// 获取根据客单价GMV和访客对比
export const inventorygetProductThendListdata = (data) => {
    return service({
        url: '/inventory/getProductThendListdata',
        method: 'post',
        data
    })
}



// 获取根据客单价GMV和访客趋势
export const getPriceRangedata = (data) => {
    return service({
        url: '/inventory/getPriceRangedata',
        method: 'post',
        data
    })
}

// 获取用户价格区间定义
export const getUserPriceRange = (data) => {
    return service({
        url: '/inventory/getUserPriceRange',
        method: 'post',
        data
    })
}

// 设置用户价格区间定义
export const setUserPriceRange = (data) => {
    return service({
        url: '/inventory/setUserPriceRange',
        method: 'post',
        data
    })
}

// 获取分类信息
export const getCategoriesList = (data) => {
    return service({
        url: '/inventory/getCategoriesList',
        method: 'post',
        data
    })
}

// 获取负责人列表
export const getResponsibleList = (data) => {
    return service({
        url: '/inventory/getResponsibleList',
        method: 'post',
        data
    })
}



// 获取推广分析所有数据
export const getPromotionGetAlldata = (data) => {
    return service({
        url: '/promotion/getAlldata',
        method: 'post',
        data
    })
}
// 获取推广分析商品明细
export const getProductGetAlldata = (data) => {
    return service({
        url: '/promotion/getProductListdata',
        method: 'post',
        data
    })
}
// 获取推广分析计划明细
export const getPlanGetAlldata = (data) => {
    return service({
        url: '/promotion/getPlanListdata',
        method: 'post',
        data
    })
}

// 获取推广分析四个图标信息
export const getSearchdata = (data) => {
    return service({
        url: '/promotion/getSearchdata',
        method: 'post',
        data
    })
}


// 获取下一级GMV拆分 //货盘list
export const getSubGmvList = (data) => {
    return service({
        url: '/inventory/getSubGmvList',
        method: 'post',
        data
    })
}


// 获取商品趋势数据
export const getProductThendListdata = (data) => {
    return service({
        url: '/promotion/getProductThendListdata',
        method: 'post',
        data
    })
}


// 获取计划趋势数据
export const getPlanThendListdata = (data) => {
    return service({
        url: '/promotion/getPlanThendListdata',
        method: 'post',
        data
    })
}

// 单品分析-关键词分析
export const getKeywordList = (data) => {
    return service({
        url: '/product/getKeywordList',
        method: 'post',
        data
    })
}

// 单品分析-每日明细
export const getProductDayList = (data) => {
    return service({
        url: '/product/getProductDayList',
        method: 'post',
        data
    })
}

// 单品分析-3个图表数据
export const getChart3data = (data) => {
    return service({
        url: '/product/getChart3data',
        method: 'post',
        data
    })
}


// 单品分析-指标趋势数据
export const getIndexTrend = (data) => {
    return service({
        url: '/product/getIndexTrend',
        method: 'post',
        data
    })
}


// 单品分析-重要指标
export const getIndexdata = (data) => {
    return service({
        url: '/product/getIndexdata',
        method: 'post',
        data
    })
}

// 单品分析-商品列表
export const getProductlist = (data) => {
    return service({
        url: '/product/getProductlist',
        method: 'post',
        data
    })
}

// 店铺分析-所有数据
export const shopGetAlldata = (data) => {
    return service({
        url: '/shop/getAlldata',
        method: 'post',
        data
    })
}


// 店铺分析-所有趋势数据
export const getAllTrenddata = (data) => {
    return service({
        url: '/shop/getAllTrenddata',
        method: 'post',
        data
    })
}


// 首页-体验分数据
export const getExperiencedata = (data) => {
    return service({
        url: '/shophome/getExperiencedata',
        method: 'post',
        data
    })
}


// 首页-关键词数据
export const getKeyworddata = (data) => {
    return service({
        url: '/shophome/getKeyworddata',
        method: 'post',
        data
    })
}


// 首页-gmv访客汇总趋势
export const getTrenddata = (data) => {
    return service({
        url: '/shophome/getTrenddata',
        method: 'post',
        data
    })
}


// 首页-gmv访客对比数据
export const getGmvVistordata = (data) => {
    return service({
        url: '/shophome/getGmvVistordata',
        method: 'post',
        data
    })
}


// 首页-流量数据
export const getTrafficdata = (data) => {
    return service({
        url: '/shophome/getTrafficdata',
        method: 'post',
        data
    })
}


// 目标达成-指数信息
export const GetGmvTargetdata = (data) => {
    return service({
        url: '/target/getGmvTargetdata',
        method: 'post',
        data
    })
}


// 目标达成-Gmv趋势
export const GetGmvTrenddata = (data) => {
    return service({
        url: '/target/getGmvTrenddata',
        method: 'post',
        data
    })
}


// 目标达成-分类分析
export const getCategoryAlysisdata = (data) => {
    return service({
        url: '/target/getCategoryAlysisdata',
        method: 'post',
        data
    })
}


// 目标达成-指数信息
export const getIndexdata_target = (data) => {
    return service({
        url: '/target/getIndexdata',
        method: 'post',
        data
    })
}


// 目标达成-负责人分析
export const getManagerAlysisdata = (data) => {
    return service({
        url: '/target/getManagerAlysisdata',
        method: 'post',
        data
    })
}


// 目标达成-货盘详情
export const getPalletListdata = (data) => {
    return service({
        url: '/target/getPalletListdata',
        method: 'post',
        data
    })
}


// 目标达成-商品详情
export const getProductListdata = (data) => {
    return service({
        url: '/target/getProductListdata',
        method: 'post',
        data
    })
}


