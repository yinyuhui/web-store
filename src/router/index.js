import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList.vue'
import Cart from '@/views/Cart.vue'
import Address from '@/views/Address.vue'
import AddressList from '@/views/AddressList.vue'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
import OrderList from '@/views/OrderList'
import OrderDetail from '@/views/OrderDetail'
import GoodDetail from '@/views/GoodDetail'
import AddProduct from '@/views/AddProduct'
import ViewProductList from '@/views/ViewProductList'
import EditProduct from '@/views/EditProduct'
import OrderPay from '@/views/OrderPay'
import Statistics from '@/views/Statistics'


Vue.use(Router)

export default new Router({
    routes: [{
        // 根目录  商品列表 首页列表
        path: '/',
        name: 'GoodsList',
        component: GoodsList
    }, {
        // 购物车    
        path: '/cart',
        name: 'Cart',
        component: Cart
    }, {
        // 下单时确认地址
        path: '/address',
        name: 'Address',
        component: Address
    }, {
        // 管理地址 列表 可编辑    
        path: '/addressList',
        name: 'AddressList',
        component: AddressList
    }, {
        // 下单时核对订单    
        path: '/orderConfirm',
        name: 'OrderConfirm',
        component: OrderConfirm
    }, {
        // 下单成功    
        path: '/orderSuccess',
        name: 'OrderSuccess',
        component: OrderSuccess
    }, {
        // 商品详情    
        path: '/goodDetail',
        name: 'GoodDetail',
        component: GoodDetail
    }, {
        // 订单列表    
        path: '/orderList',
        name: 'OrderList',
        component: OrderList
    }, {
        // 订单详情    
        path: '/orderDetail',
        name: 'OrderDetail',
        component: OrderDetail
    }, {
        // 新增商品 管理人员    
        path: '/addProduct',
        name: 'AddProduct',
        component: AddProduct
    }, {
        // 查看商品列表 可管理 管理人员  
        path: '/editProduct',
        name: 'ViewProductList',
        component: ViewProductList
    }, {
        // 编辑商品详情    
        path: '/editGood',
        name: 'EditProduct',
        component: EditProduct
    }, {
        // 订单支付    
        path: '/orderPay',
        name: 'OrderPay',
        component: OrderPay
    }, {
        // 数据统计    
        path: '/statistics',
        name: 'Statistics',
        component: Statistics
    }]
})