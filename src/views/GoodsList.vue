<style scoped>
.load-more {
	text-align: center;
	height: 32px;
	line-height: 32px;
	font-size: 12px;
	color: #cccccc;
}

.time {
	font-size: 13px;
	color: #999;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}

.clearfix:after {
	clear: both;
}

.list li {
	width: 310px;
	display: inline-block;
	margin: 0 20px 20px 0;
}

.marginr8 {
	margin-right: 8px;
}

.filter-nav {
	position: relative;
	top: 0;
	left: 0;
}

.el-dropdown {
	position: absolute;
	top: 0;
	left: 192px;
}

.el-input {
	width: 150px;
	position: absolute;
	top: 0;
	left: 20px;
}
</style>

<template>
	<div>
		<nav-header></nav-header>
		<nav-menu :activeIndex="'1'"></nav-menu>

		<div class="accessory-result-page accessory-page">
			<div class="container">
				<div class="filter-nav">

					<el-dropdown @command="handleCommand" class='marginr8'>
						<span class="el-dropdown-link">
							{{selectClassify}}
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="all">全部分类</el-dropdown-item>
							<el-dropdown-item command="phone">手机</el-dropdown-item>
							<el-dropdown-item command="computer">笔记本</el-dropdown-item>
							<el-dropdown-item command="headset">耳机</el-dropdown-item>
							<el-dropdown-item command="soundBox">音箱</el-dropdown-item>
							<el-dropdown-item command="other">其他</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

					<el-input placeholder="输入后回车搜索" prefix-icon="el-icon-search" v-model="params.name" size="small" @keyup.enter.native="searchName">
					</el-input>

					<a href="javascript:void(0)" class="default" :class="{'cur': defaultFlag}" @click="defaultSort">综合排序</a>
					<a href="javascript:void(0)" class="price" :class="{'cur': !defaultFlag}" @click="sortGoods">
						价格
						<span v-if="sortFlag">↑</span>
						<span v-else>↓</span>
						<svg class="icon icon-arrow-short">
							<use xlink:href="#icon-arrow-short"></use>
						</svg>
					</a>
					<a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">筛选</a>
				</div>
				<div class="accessory-result">
					<!-- filter -->
					<div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
						<dl class="filter-price">
							<dt>价格:</dt>
							<dd @click="setPriceFilter('all')">
								<a href="javascript:void(0)" :class="{'cur':priceChecked === 'all'}" @click="priceChecked='all'">全部</a>
							</dd>
							<dd v-for="item in priceFilter" :key="item.id" @click="setPriceFilter(item.id)">
								<a href="javascript:void(0)" :class="{'cur':priceChecked === item.id}">{{item.startPrice}} - {{item.endPrice}}</a>
							</dd>
						</dl>
					</div>

					<!-- search result accessories list -->
					<div class="accessory-list-wrap">
						<!-- <div class="accessory-list col-4"> -->
						<div class="list">
							<ul>
								<li v-for="item in goodsList" :key="item.productId">
									<el-card :body-style="{ padding: '0px' }" shadow="hover">
										<img v-lazy="'http://p04f9mqe1.bkt.clouddn.com/'+item.productImage" alt="" class="image">
										<div style="padding: 14px; border-top:1px solid #eee">
											<a href="javascript:;" class="button" @click="addCart(item.productId)">
												<svg class="navbar-cart-logo">
													<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
												</svg>
											</a>
											<span>{{item.productName}}</span>
											<div class="bottom clearfix">
												<time class="time">{{item.salePrice | currency('￥')}}</time>

											</div>
										</div>
									</el-card>
								</li>
							</ul>
							<div class='load-more' v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
								<img src="../../static/loading-svg/loading-spinning-bubbles.svg" alt="loading" v-show='loading'>
								<p v-if='noMore'>别滑了，没有啦~</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>

		<!-- 未登录添加购物车的弹窗 -->
		<el-dialog title="请先登录" :visible.sync="needLogin" width="320px" :before-close="handleClose">
			<span>当前未登录，请先登录再加入购物车！</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="needLogin = false">取 消</el-button>
				<el-button type="primary" @click="needLogin = false">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 登录添加购物车的弹窗 -->
		<el-dialog title="添加成功" :visible.sync="addSuc" width="320px" :before-close="handleClose">
			<span>宝贝已经添加到购物车中啦，现在你想要？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addSuc = false">继续购物</el-button>
				<el-button type="primary" @click="goCart">去购物车</el-button>
			</span>
		</el-dialog>

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
	data() {
		return {
			goodsList: [],

			// 价格区间
			priceFilter: [
				{
					id: '0',
					startPrice: '0.00',
					endPrice: '100.00'
				},
				{
					id: '1',
					startPrice: '100.00',
					endPrice: '500.00'
				},
				{
					id: '2',
					startPrice: '500.00',
					endPrice: '1000.00'
				},
				{
					id: '3',
					startPrice: '1000.00',
					endPrice: '2000.00'
				},
				{
					id: '4',
					startPrice: '2000.00',
					endPrice: '5000.00'
				}
			],

			priceChecked: 'all', // 价格筛选字段
			filterBy: false, //
			overLayFlag: false,
			sortFlag: true,
			params: {
				page: 1,
				pageSize: 6,
				classify: 'all',
				name: ''
			},
			defaultFlag: true,
			busy: false,
			loading: false,
			noMore: false,
			needLogin: false,
			addSuc: false,
			selectClassify: '全部分类',
			classify: 'all'
			// index:''
		}
	},

	components: {
		NavHeader,
		NavFooter,
		NavBread,
		NavMenu
	},

	mounted() {
		this.getGoodsList()
	},

	methods: {
		// 商品分类标题赋值
		setClassify(classify) {
			switch (classify) {
				case 'phone': {
					this.selectClassify = '手机'
					break
				}
				case 'computer': {
					this.selectClassify = '笔记本'
					break
				}
				case 'headset': {
					this.selectClassify = '耳机'
					break
				}
				case 'soundBox': {
					this.selectClassify = '音箱'
					break
				}
				case 'other': {
					this.selectClassify = '其他'
					break
				}
				case 'all': {
					this.selectClassify = '全部分类'
					break
				}
			}
		},

		// 输入商品名 点击时触发
		searchName() {
			this.setClassify('all')
			this.params.priceLevel = this.priceChecked
			this.params.page = 1
			this.params.classify = 'all'
			this.params.sort = this.defaultFlag ? '' : this.sortFlag ? '1' : '-1'
			// console.log(this.params)
			this.getGoodsList()
		},

		// 选择商品分类时触发
		handleCommand(classify) {
			// console.log(classify)
			this.setClassify(classify)
			this.classify = classify
			this.params = {
				name: '',
				page: 1,
				pageSize: 6,
				classify: this.classify,
				sort: this.defaultFlag ? '' : this.sortFlag ? '1' : '-1',
				priceLevel: this.priceChecked
			}
			this.getGoodsList()
		},

		// 获得商品列表信息
		getGoodsList(flag) {
			this.loading = true
			this.noMore = false
			axios.post('/goods/list', this.params).then(res => {
				this.loading = false
				if (res.data.status === '0') {
					if (flag) {
						this.goodsList = this.goodsList.concat(res.data.result.list)
						this.busy = res.data.result.count === 0 ? true : false
						this.noMore = res.data.result.count === 0 ? true : false
					} else {
						this.goodsList = res.data.result.list
						this.busy = false
					}
				} else {
					this.goodsList = []
				}
			})
			// console.log( this.busy)
		},

		// 加入购物车
		addCart(productId) {
			axios
				.post('/goods/addCart', {
					productId: productId
				})
				.then(res => {
					// console.log(res)
					if (res.data.status === '0') {
						this.addSuc = true
					} else {
						this.needLogin = true
					}
				})
		},

		// 排序
		sortGoods() {
			this.defaultFlag = false
			this.sortFlag = !this.sortFlag
			this.params.page = 1
			this.params.classify = this.classify
			this.params.sort = this.sortFlag ? '1' : '-1'
			this.params.priceLevel = this.priceChecked
			this.getGoodsList()
		},

		// 默认排序
		defaultSort() {
			this.defaultFlag = true
			this.params = {
				page: 1,
				pageSize: 6,
				classify: this.classify,
				priceLevel: this.priceChecked
			}
			this.getGoodsList()
			this.sortFlag = true
		},

		// 加载更多  懒加载时调用
		loadMore() {
			this.busy = true
			setTimeout(() => {
				this.params.page++
				this.getGoodsList(true)
				// this.busy = false
			}, 500)
		},

		// 价格区间筛选
		setPriceFilter(index) {
			this.priceChecked = index
			this.params.priceLevel = index
			this.params.page = 1
			this.params.classify = this.classify
			this.params.sort = this.defaultFlag ? '' : this.sortFlag ? '1' : '-1'
			this.getGoodsList()
			this.closePop()
		},

		// 较窄时点击显示价格 filer 选项
		showFilterPop() {
			;(this.filterBy = true), (this.overLayFlag = true)
		},

		// 关闭价格 filter 选项
		closePop() {
			;(this.filterBy = false), (this.overLayFlag = false)
		},

		// 进入购物车页面
		goCart() {
			this.$router.push({ path: '/cart' })
		},

		// 关闭弹窗
		handleClose() {
			this.addSuc = false
			this.needLogin = false
		}
	}
}
</script>
