<style>
@media only screen and (max-width: 767px) {
	.footer__wrap {
		display: none;
	}
	.price-count-wrap {
		margin-bottom: 60px;
	}
}
.price-count li {
	font-size: 16px;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}
.clearfix:after {
	clear: both;
}

.box-card {
	width: 100%;
	margin-bottom: 60px;
}

.red {
	color: brown;
	font-size: 16px;
}
</style>
<template>
    <div>
        <nav-header></nav-header>
        <!-- <nav-bread>
            <span>订单信息</span>
        </nav-bread> -->
        <nav-menu :activeIndex="'-1'"></nav-menu>
        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <symbol id="icon-add" viewBox="0 0 32 32">
                    <title>add2</title>
                    <path class="path1" d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
                </symbol>
                <symbol id="icon-ok" viewBox="0 0 39 32">
                    <title>ok</title>
                    <path class="path1" d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
                </symbol>
                <symbol id="icon-edit" viewBox="0 0 32 32">
                    <title>edit</title>
                    <path class="path1" d="M25.599 11.292l-4.892-4.892 3.825-3.825 4.892 4.892-3.825 3.825zM4.732 23.308l3.959 3.959-5.939 1.98 1.98-5.939zM10.666 26.225l-4.892-4.892 13.425-13.425 4.892 4.892-13.425 13.425zM31.687 6.713l-6.4-6.4c-0.417-0.417-1.091-0.417-1.508 0l-20.267 20.267c-0.114 0.115-0.191 0.25-0.242 0.393-0.003 0.009-0.012 0.015-0.015 0.025l-3.2 9.6c-0.128 0.383-0.029 0.806 0.257 1.091 0.203 0.204 0.476 0.313 0.754 0.313 0.112 0 0.227-0.017 0.337-0.054l9.6-3.2c0.011-0.003 0.017-0.013 0.027-0.016 0.142-0.052 0.276-0.128 0.39-0.242l20.267-20.267c0.417-0.416 0.417-1.091 0-1.508v0z"></path>
                </symbol>
                <symbol id="icon-delete" viewBox="0 0 26 32">
                    <title>delete</title>
                    <path class="path1" d="M17.723 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM7.877 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM12.8 28c0.543 0 0.985-0.448 0.985-1v-12c0-0.552-0.441-1-0.985-1s-0.984 0.448-0.984 1v12c0 0.552 0.441 1 0.984 1v0zM23.631 4h-5.908v-2c0-1.104-0.882-2-1.969-2h-5.908c-1.087 0-1.969 0.896-1.969 2v2h-5.908c-1.087 0-1.969 0.896-1.969 2v2c0 1.104 0.882 2 1.969 2v18c0 2.208 1.765 4 3.939 4h13.784c2.174 0 3.938-1.792 3.938-4v-18c1.087 0 1.969-0.896 1.969-2v-2c0-1.104-0.882-2-1.969-2v0zM9.846 3c0-0.552 0.441-1 0.984-1h3.938c0.544 0 0.985 0.448 0.985 1v1h-5.908v-1zM21.662 28c0 1.104-0.882 2-1.969 2h-13.784c-1.087 0-1.97-0.896-1.97-2v-18h17.723v18zM22.646 8h-19.692c-0.543 0-0.985-0.448-0.985-1s0.441-1 0.985-1h19.692c0.543 0 0.984 0.448 0.984 1s-0.441 1-0.984 1v0z"></path>
                </symbol>
                <symbol id="icon-clock" viewBox="0 0 32 32">
                    <title>clock</title>
                    <path class="path1" d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
                </symbol>
            </defs>
        </svg>

        <div class="container">
            <div class="checkout-order">
                <div class="page-title-normal">
                    <h2 class="page-title-h2">
                        <span>结 算</span>
                    </h2>
                </div>
                <!-- process step -->
                <div class="check-step">
                    <ul>
                        <li class="cur">
                            <span>确认</span>地址</li>
                        <li class="cur">
                            <span>核对</span>订单</li>
                        <li class="cur">
                            <span>订单</span>支付</li>
                        <li>
                            <span>下单</span>成功</li>
                    </ul>
                </div>

                <!-- order list -->
                <div class="page-title-normal checkout-title">
                    <h2>
                        <span>订单支付</span>
                    </h2>
                </div>
                <div>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix fz16">
                            <span>支付详情</span>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <div>
                                        商品总金额
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div>
                                        {{ subtotal | currency('￥')}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <div>
                                        运费
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div>
                                        {{ shipping | currency('￥')}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <div>
                                        折扣
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div>
                                        {{ discount | currency('￥')}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <div>
                                        税额
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div>
                                        {{ tax | currency('￥')}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="text item">
                            <el-row :gutter="20">
                                <el-col :span="10">
                                    <div class="fz16">
                                        实付
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="red">
                                        {{ total | currency('￥')}}
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </el-card>
                </div>

                <div class="order-foot-wrap">
                    <div class="prev-btn-wrap">
                        <button class="btn btn--m" @click="goBack">上一步</button>
                    </div>
                    <div class="next-btn-wrap">
                        <button class="btn btn--m btn--red" @click="payClick">支付</button>
                    </div>
                </div>

                <el-dialog :visible.sync='isDialogShow'>
                    <div>
                        <p>确认支付？</p>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="isDialogShow=false">再想想</el-button>
                        <el-button @click="goPayment">确定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

        <nav-footer></nav-footer>
    </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import './../assets/css/checkout.css'
import NavHeader from './../components/Header'
import NavFooter from './../components/Footer'
import NavBread from './../components/Bread'
import NavMenu from './../components/Menu'
import axios from 'axios'
export default {
	components: {
		NavHeader,
		NavFooter,
		NavBread,
		NavMenu
	},

	data() {
		return {
			isDialogShow: false,
			cartList: [],
			isDeleteDialogShow: false,
			productId: '',
			cartList: [], // 购物车中选中的商品数组
			subtotal: 0,
			shipping: 15,
			discount: 20,
			tax: 10,
			total: 0
		}
	},

	mounted() {
		this.init()
	},

	methods: {
		init() {
			axios.get('/users/cartList').then(res => {
				this.cartList = res.data.result
				this.subtotal = 0
				this.total = 0
				this.cartList.forEach(item => {
					if (item.checked === '1') {
						this.subtotal += item.salePrice * item.productNum
					}
				})
				this.total = this.subtotal + this.shipping + this.tax - this.discount
			})
		},

		goBack() {
			this.$router.go(-1)
		},

		payClick() {
            // console.log(this.cartList)
			this.isDialogShow = true
			this.cartList.forEach(item => {
				if (item.checked === '1') {
					axios
						.post('/users/cartDel', {
							productId: item.productId
						})
						.then(res => {})
				}
			})
		},

		goPayment() {
			// 把支付标志位改变就可以了 要查找订单修改
			// 同时把Goods集合中对应商品的支付计数增加1
			let orderId = this.$route.query.orderId
			axios
				.post('/users/isPay', {
					orderId: orderId,
					isPay: '1'
				})
				.then(res => {
					if (res.data.status === '0') {
						this.$router.push({
							path: '/orderSuccess',
							query: {
								orderId: orderId
							}
						})
					}
                })
            
            // console.log(this.cartList)
			this.cartList.forEach(item => {
				if (item.checked === '1') {
					axios
						.post('/goods/setPayNum', {
							productId: item.productId
						})
						.then(res => {})
				}
			})
		}
	}
}
</script>