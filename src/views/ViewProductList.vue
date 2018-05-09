<style>
@media only screen and (max-width: 767px) {
	.cart-foot-wrap .item-total {
		font-size: 1.4rem;
		margin: 0 8px 0 0;
	}

	.item-list-wrap {
		margin-bottom: 66px;
	}
}

.cart-foot-wrap .item-total .total-price {
	display: inline;
}

.cart-foot-wrap .btn {
	font-family: 'akkurat', sans-serif;
	font-size: 16px;
}
</style>

<style scoped>
.input-sub,
.input-add {
	min-width: 40px;
	height: 100%;
	border: 0;
	color: #605f5f;
	text-align: center;
	font-size: 16px;
	overflow: hidden;
	display: inline-block;
	background: #f0f0f0;
}
.item-quantity .select-self-area {
	background: none;
	border: 1px solid #f0f0f0;
}
.item-quantity .select-self-area .select-ipt {
	display: inline-block;
	padding: 0 3px;
	width: 30px;
	min-width: 30px;
	text-align: center;
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
	width: 400px;
	margin-right: 12px;
	margin-bottom: 12px;
	display: inline-block;
}

.icons {
	font-size: 1.5rem;
}

/* .el-card__body {
	padding: 20px 0;
} */

.pic img{
	width: 120px;
	height: 120px;
	position: relative;
    top: -20px;
}

.ceee{
	color: #999;
}
</style>

<template>
	<div>
		<nav-header></nav-header>
		<!-- <nav-bread>
            <span>订单列表</span>
        </nav-bread> -->
		<nav-menu :activeIndex="'2-2'"></nav-menu>

		<div class="line"></div>

		<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<defs>
				<symbol id="icon-add" viewBox="0 0 32 32">
					<title>add2</title>
					<path class="path1" d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
				</symbol>
				<symbol id="icon-ok" viewBox="0 0 32 32">
					<title>ok</title>
					<path class="path1" d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
				</symbol>
				<symbol id="icon-edit" viewBox="0 0 32 32">
					<title>edit</title>
					<path class="path1" d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
				</symbol>
				<symbol id="icon-del" viewBox="0 0 32 32">
					<title>delete</title>
					<path class="path1" d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
					<path class="path2" d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
					<path class="path3" d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
					<path class="path4" d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
				</symbol>
				<symbol id="icon-clock" viewBox="0 0 32 32">
					<title>clock</title>
					<path class="path1" fill="#605f5f" d="M16 29c-7.168 0-13-5.831-13-13s5.832-13 13-13c7.168 0 13 5.832 13 13s-5.832 13-13 13zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
					<path class="path2" fill="#605f5f" d="M23.958 21.837l-6.958-6.489v-6.282c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.934c0 0.414 0.174 0.814 0.477 1.098l7.435 6.934c0.279 0.259 0.642 0.402 1.023 0.402 0.415 0 0.814-0.174 1.096-0.477 0.564-0.605 0.532-1.555-0.073-2.12z"></path>
				</symbol>
			</defs>
		</svg>
		<div class="container">
			<div class="cart">
				<div class="page-title-normal">
					<h2 class="page-title-h2">
						<span>编辑商品</span>
					</h2>
				</div>
				<div class="item-list-wrap">
					<el-card class="box-card" shadow="hover" v-for="item in goodsList" :key="item.productId">
						<div slot="header" class="clearfix fz16">
							<span>商品 ID： {{item.productId}}</span>
							<el-button type="danger" icon="el-icon-delete" circle style="float: right; padding: 5px;" @click="deleteOrder(item.productId) "></el-button>
							<el-button type="primary" icon="el-icon-edit" circle  style="float: right; padding: 5px; margin:0 10px" @click="goOrderDetail(item.productId) "></el-button>
						</div>
						<div class="text item">
							<div class="fleft marginr16">
								<div class="pic">
									<img :src="'http://p04f9mqe1.bkt.clouddn.com/' + item.productImage" alt="">
								</div>

							</div>
							<div class="fleft">
								<p class="text item">{{item.productName}}</p>
								<p class="text item ceee">{{item.salePrice | currency('￥')}}</p>
								<!-- <p class="text item">{{item.describe}}</p> -->
							</div>

						</div>
					</el-card>
				</div>

			</div>
			<el-dialog :visible.sync='isDeleteDialogShow'>
				<div>
					<p>你确定要删除这件商品吗？</p>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="onSubmitDelete">确 定</el-button>
					<el-button @click="onCancelDelete">取 消</el-button>
				</div>
			</el-dialog>
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
			goodsList: [],
			isDeleteDialogShow: false,
			productId: ''
		}
	},

	mounted() {
		this.init()
	},

	methods: {
		// 页面初始化
		init() {
			axios.get('/goods//productList').then(res => {
				this.goodsList = res.data.result
			})
		},

		// 删除按钮
		deleteOrder(productId) {
			this.productId = productId
			this.isDeleteDialogShow = true
		},

		// 取消删除商品
		onCancelDelete() {
			this.isDeleteDialogShow = false
		},

		// 确认删除商品
		onSubmitDelete() {
			axios
				.post('/goods/productDel', {
					productId: this.productId
				})
				.then(res => {
					if (res.data.status === '0') {
						this.isDeleteDialogShow = false
						this.init()
					}
				})
		},

		// 查看商品详情
		goOrderDetail(productId) {
			// console.log(productId)
			this.$router.push({
				path: '/editGood',
				query: {
					productId: productId
				}
			})
		},
	}
}
</script>
