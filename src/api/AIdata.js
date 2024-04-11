
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

// 获取推广分析四个图标信息
export const proGetPalletListdata = (data) => {
    return service({
        url: '/promotion/getPalletListdata',
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

// 首页-重点指标
export const shopGetIndexdata = (data) => {
    return service({
        url: '/shophome/getIndexdata',
        method: 'post',
        data
    })
}

// 首页-推广分析
export const getPromotiondata = (data) => {
    return service({
        url: '/shophome/getPromotiondata',
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

// 流量分析-渠道分布信息
export const getChanneldata = (data) => {
    return service({
        url: '/traffic/getChanneldata',
        method: 'post',
        data
    })
}

// 流量分析-渠道访客趋势
export const getGmvVistorTrenddata = (data) => {
    return service({
        url: '/traffic/getGmvVistorTrenddata',
        method: 'post',
        data
    })
}


// 流量分析-货盘数据
export const getPalletCountdata = (data) => {
    return service({
        url: '/traffic/getPalletCountdata',
        method: 'post',
        data
    })
}

// 流量分析-流量分析
export const getTrafficListdata = (data) => {
    return service({
        url: '/traffic/getTrafficListdata',
        method: 'post',
        data
    })
}

// 流量分析-商品数据
export const getProductListdata_traffic = (data) => {
    return service({
        url: '/traffic/getProductListdata',
        method: 'post',
        data
    })
}

// 流量分析-新老客户分析 
export const getNewOldCustomerListdata = (data) => {
    return service({
        url: '/traffic/getNewOldCustomerListdata',
        method: 'post',
        data
    })
}

// 流量分析-流量渠道列表  
export const getTrafficChannelsdata = (data) => {
    return service({
        url: '/traffic/getTrafficChannelsdata',
        method: 'post',
        data
    })
}

// 关键词分析-行业关键词信息  
export const getIndustrywordListdata = (data) => {
    return service({
        url: '/keywordsa/getIndustrywordListdata',
        method: 'post',
        data
    })
}

// 关键词分析-无界词  
export const getKeywordListdata = (data) => {
    return service({
        url: '/keywordsa/getKeywordListdata',
        method: 'post',
        data
    })
}

// 关键词分析-关键词明细信息  
export const getKeywordMuList = (data) => {
    return service({
        url: '/keywordsa/getKeywordMuList',
        method: 'post',
        data
    })
}

// 关键词分析-关键词趋势信息  
export const getKeywordTrendList = (data) => {
    return service({
        url: '/keywordsa/getKeywordTrendList',
        method: 'post',
        data
    })
}

// 关键词分析-生意参谋关键词信息  
export const getScKeywordListdata = (data) => {
    return service({
        url: '/keywordsa/getScKeywordListdata',
        method: 'post',
        data
    })
}

// 人群分析-人群流量来源Top20  
export const getCrowdGmv20Listdata = (data) => {
    return service({
        url: '/Crowdsa/getCrowdGmv20Listdata',
        method: 'post',
        data
    })
}

// 人群分析-人群GMV数据列表  
export const getCrowdGmvListdata = (data) => {
    return service({
        url: '/Crowdsa/getCrowdGmvListdata',
        method: 'post',
        data
    })
}

// 人群分析-人群GMV趋势数据列表  
export const getCrowdGmvTrenddata = (data) => {
    return service({
        url: '/Crowdsa/getCrowdGmvTrenddata',
        method: 'post',
        data
    })
}

// 人群分析-人群流量来源  
export const getCrowdSrcListdata = (data) => {
    return service({
        url: '/Crowdsa/getCrowdSrcListdata',
        method: 'post',
        data
    })
}

// 人群分析-商品crowd分类10  
export const getProductCrowd10Listdata = (data) => {
    return service({
        url: '/Crowdsa/getProductCrowd10Listdata',
        method: 'post',
        data
    })
}

// 人群分析-某一商品按人群分类数据  
export const getProductCrowdsListdata = (data) => {
    return service({
        url: '/Crowdsa/getProductCrowdsListdata',
        method: 'post',
        data
    })
}

// 人群分析-某一商品按人群分类趋势数据  
export const getProductCrowdsTrendListdata = (data) => {
    return service({
        url: '/Crowdsa/getProductCrowdsTrendListdata',
        method: 'post',
        data
    })
}

// 人群分析-商品流量来源  
export const getProductSrcListdata = (data) => {
    return service({
        url: '/Crowdsa/getProductSrcListdata',
        method: 'post',
        data
    })
}

// 市场分析-类目明细列表  
export const getCategoryGmvDetailList = (data) => {
    return service({
        url: '/industry/getCategoryGmvDetailList',
        method: 'post',
        data
    })
}

// 市场分析-类目GMV列表 
export const getCategoryGmvList = (data) => {
    return service({
        url: '/industry/getCategoryGmvList',
        method: 'post',
        data
    })
}

// 市场分析-类目GMV趋势  
export const getCategoryGmvTreadData = (data) => {
    return service({
        url: '/industry/getCategoryGmvTreadData',
        method: 'post',
        data
    })
}

// 市场分析-店铺行业数据  
export const getShopIndustryList = (data) => {
    return service({
        url: '/industry/getShopIndustryList',
        method: 'post',
        data
    })
}

// 通用
export const postUrl = (url, data) => {
    return service({
        url: url,
        method: 'post',
        data
    })
}

// 目标达成-获取货盘目标列表  
export const getPalletTargetList = (data) => {
    return service({
        url: '/targetmanager/getPalletTargetList',
        method: 'post',
        data
    })
}

// 目标达成-更新货盘目标
export const updatePalletTarget = (data) => {
    return service({
        url: '/targetmanager/updatePalletTarget',
        method: 'post',
        data
    })
}

// 目标达成-删除货盘目标
export const delPalletTarget = (data) => {
    return service({
        url: '/targetmanager/delPalletTarget',
        method: 'post',
        data
    })
}

// 目标达成-添加货盘目标
export const addPalletTarget = (data) => {
    return service({
        url: '/targetmanager/addPalletTarget',
        method: 'post',
        data
    })
}

// 目标达成-获取产品目标列表
export const getProductTargetList = (data) => {
    return service({
        url: '/targetmanager/getProductTargetList',
        method: 'post',
        data
    })
}

// 目标达成-更新货盘目标
export const updateProductTarget = (data) => {
    return service({
        url: '/targetmanager/updateProductTarget',
        method: 'post',
        data
    })
}

// 目标达成-删除货盘目标
export const delProductTarget = (data) => {
    return service({
        url: '/targetmanager/delProductTarget',
        method: 'post',
        data
    })
}

// 目标达成-添加货盘目标
export const addProductTarget = (data) => {
    return service({
        url: '/targetmanager/addProductTarget',
        method: 'post',
        data
    })
}




