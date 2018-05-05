// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueInfiniteScroll)
Vue.use(ElementUI)
Vue.use(VueLazyLoad, {
    loading: '/static/loading-svg/loading-bars.svg'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ // 创建一个新实例
    el: '#app', // 应用元素
    router, // 路由
    template: '<App/>', // 模板
    components: { App } // 组件
})