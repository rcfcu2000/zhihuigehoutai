const columnData = [
  {
    title: "类型",
    width: 100,
    align: "center",
    dataKey: "pallet",
    key: "pallet",
    fixed: true,
    unit: "",
    children: [
      {
        title: "流量来源",
        width: 100,
        align: "center",
        dataKey: "keyword",
        key: "keyword",
        unit: "",
      },
    ],
  },
  {
    title: "手淘搜索",
    width: 100,
    align: "center",
    dataKey: "pallet",
    key: "pallet",
    unit: "",
    children: [
      {
        title: "访客数",
        width: 80,
        align: "center",
        dataKey: "search_visitor_count",
        key: "search_visitor_count",
        unit: "",
      },
      {
        title: "加购率",
        width: 80,
        align: "center",
        dataKey: "search_add_to_cart_rate",
        key: "search_add_to_cart_rate",
        unit: "%",
      },
      {
        title: "转化率",
        width: 80,
        align: "center",
        dataKey: "search_conversion_rate",
        key: "search_conversion_rate",
        unit: "%",
      },
      {
        title: "粉丝支付买家数",
        width: 125,
        align: "center",
        dataKey: "search_fans_paid_buyers_count",
        key: "search_fans_paid_buyers_count",
        unit: "",
      },
      {
        title: "直接支付买家数",
        width: 125,
        align: "center",
        dataKey: "search_direct_paid_buyers_count",
        key: "search_direct_paid_buyers_count",
        unit: "",
      },
    ],
  },
  {
    title: "直通车",
    width: 100,
    align: "center",
    dataKey: "pallet",
    key: "pallet",
    unit: "",
    children: [
      {
        title: "访客数",
        width: 80,
        align: "center",
        dataKey: "ztc_visitor_count",
        key: "ztc_visitor_count",
        unit: "",
      },
      {
        title: "加购率",
        width: 80,
        align: "center",
        dataKey: "ztc_add_to_cart_rate",
        key: "ztc_add_to_cart_rate",
        unit: "%",
      },
      {
        title: "转化率",
        width: 80,
        align: "center",
        dataKey: "ztc_conversion_rate",
        key: "ztc_conversion_rate",
        unit: "%",
      },
      {
        title: "粉丝支付买家数",
        width: 125,
        align: "center",
        dataKey: "ztc_fans_paid_buyers_count",
        key: "ztc_fans_paid_buyers_count",
        unit: "",
      },
      {
        title: "直接支付买家数",
        width: 125,
        align: "center",
        dataKey: "ztc_direct_paid_buyers_count",
        key: "ztc_direct_paid_buyers_count",
        unit: "",
      },
    ],
  },
  {
    title: "总计",
    width: 100,
    align: "center",
    dataKey: "pallet",
    key: "pallet",
    unit: "",
    children: [
      {
        title: "访客数",
        width: 80,
        align: "center",
        dataKey: "zj_visitor_count",
        key: "zj_visitor_count",
        unit: "",
      },
      {
        title: "加购率",
        width: 80,
        align: "center",
        dataKey: "zj_add_to_cart_rate",
        key: "zj_add_to_cart_rate",
        unit: "%",
      },
      {
        title: "转化率",
        width: 80,
        align: "center",
        dataKey: "zj_conversion_rate",
        key: "zj_conversion_rate",
        unit: "%",
      },
      {
        title: "粉丝支付买家数",
        width: 125,
        align: "center",
        dataKey: "zj_fans_paid_buyers_count",
        key: "zj_fans_paid_buyers_count",
        unit: "",
      },
      {
        title: "直接支付买家数",
        width: 125,
        align: "center",
        dataKey: "zj_direct_paid_buyers_count",
        key: "zj_direct_paid_buyers_count",
        unit: "",
      },
    ],
  },
];

export { columnData };
