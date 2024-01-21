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