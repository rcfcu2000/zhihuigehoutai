/*
 * @Author: dtl darksunnydong@qq.com
 * @Date: 2024-01-22 15:52:53
 * @LastEditors: 603388675@qq.com 603388675@qq.com
 * @LastEditTime: 2024-01-26 16:21:51
 * @FilePath: \project\zhihuigehoutai\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/message-box/style/css'
import './style/element_visiable.scss'
import './style/visualization.scss'
import './style/AIdata.scss'
// import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createApp } from 'vue'
// 引入gin-vue-admin前端初始化相关内容
import './core/gin-vue-admin'
// 引入封装的router
import router from '@/router/index'
import '@/permission'
import run from '@/core/gin-vue-admin.js'
import auth from '@/directive/auth'
import { store } from '@/pinia'
import App from './App.vue'
import { initDom } from './utils/positionToCode'
import './utils/rem'

initDom()
/**
 * @description 导入加载进度条，防止首屏加载时间过长，用户等待
 *
 * */
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
Nprogress.start()

/**
 * 无需在这块结束，会在路由中间件中结束此块内容
 * */

const app = createApp(App)
app.config.productionTip = false

// 自定义指令
import directive from './utils/directive';
directive(app)
app
  .use(run)
  .use(store)
  .use(auth)
  .use(router)
  .mount('#app')

export default app
