<style>
@media only screen and (max-width: 767px) {
	.footer__wrap {
		display: none;
	}
	.order-create {
		margin-bottom: 60px;
	}
}
</style>
<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>下单成功</span>
        </nav-bread>

        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2">
                    <span>结 算</span>
                </h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
                <ul>
                    <li class="cur">
                        <span>确认</span>地址</li>
                    <li class="cur">
                        <span>核对</span>订单</li>
                    <li class="cur">
                        <span>订单</span>支付</li>
                    <li class="cur">
                        <span>下单</span>成功</li>
                </ul>
            </div>

            <div class="order-create">
                <div class="order-create-pic"><img src="../../static/ok-2.png" alt=""></div>
                <div class="order-create-main">
                    <h3>下单成功！<br>您的订单正在处理</h3>
                    <p>
                        <span>订单 ID：{{orderId}}</span>
                        <span>订单金额：{{orderTotal | currency('￥')}}</span>
                    </p>
                    <div class="order-create-btn-wrap">
                        <div class="btn-l-wrap">
                            <a href="javascript:;" class="btn btn--m" @click="goCart">去购物车</a>
                        </div>
                        <div class="btn-r-wrap">
                            <a href="javascript:;" class="btn btn--m" @click="goGoodsList">商品列表</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import './../assets/css/checkout.css'
import NavHeader from './Header'
import NavFooter from './Footer'
import NavBread from './Bread'
import axios from 'axios'

export default {
	components: {
		NavHeader,
		NavFooter,
		NavBread
	},

	data() {
		return {
			orderId: '',
			orderTotal: ''
		}
	},

	mounted() {
        let orderId = this.$route.query.orderId
        // console.log(orderId)
		if (!orderId) {
			return
		}
		axios.get('/users/orderDetail', { params: { orderId: orderId } }).then(res => {
			if (res.data.status === '0') {
				this.orderId = orderId
				this.orderTotal = res.data.result.orderTotal
			}
		})
    },
    
    methods: {
        goCart(){
            this.$router.push('/cart')
        },

        goGoodsList(){
            this.$router.push('/')
        }
    }
}
</script>

