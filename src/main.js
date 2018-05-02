// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ // 创建一个新实例
    el: '#app', // 应用元素
    router, // 路由
    template: '<App/>', // 模板
    components: { App } // 组件
})