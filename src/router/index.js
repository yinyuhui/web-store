import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList.vue'
import Cart from '@/views/Cart.vue'
import Address from '@/views/Address.vue'
import AddressList from '@/views/AddressList.vue'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
import OrderList from '@/views/OrderList'
import GoodDetail from '@/views/GoodDetail'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'GoodsList',
        component: GoodsList
    }, {
        path: '/cart',
        name: 'Cart',
        component: Cart
    }, {
        path: '/address',
        name: 'Address',
        component: Address
    }, {
        path: '/addressList',
        name: 'AddressList',
        component: AddressList
    }, {
        path: '/orderConfirm',
        name: 'OrderConfirm',
        component: OrderConfirm
    }, {
        path: '/orderSuccess',
        name: 'OrderSuccess',
        component: OrderSuccess
    }, {
        path: '/goodDetail',
        name: 'GoodDetail',
        component: GoodDetail
    }, {
        path: '/orderList',
        name: 'OrderList',
        component: OrderList
    }]
})