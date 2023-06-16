import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./lib/font/ali/iconfont.css"
import "amfe-flexible";

import * as echarts from 'echarts';

import "@/lib/css/base.less"
import "@/lib/css/index.scss"
import { deepCopy, getSlotData, day } from "@/lib/js/unitls"

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$deepCopy = deepCopy
Vue.prototype.$getSlotData = getSlotData
Vue.prototype.$day = day
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
