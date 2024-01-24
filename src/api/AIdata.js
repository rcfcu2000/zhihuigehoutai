/*
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 15:52:53
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-01-24 14:40:49
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
