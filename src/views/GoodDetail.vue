<style scoped>
.load-more {
	text-align: center;
	height: 32px;
	line-height: 32px;
	font-size: 12px;
	color: #cccccc;
}

.el-card {
	margin: 60px 0;
	padding: 50px;
}

.img {
	width: 520px;
	height: 520px;
}

.mini-pic {
	width: 120px;
	height: 120px;
	border: 1px solid #eee;
	border-radius: 4px;
}

.name {
	font-size: 40px;
	/* height: 80px; */
	/* line-height: 80px; */
	padding-bottom: 40px;
	border-bottom: 1px solid #dddddd;
}

.lnh48 {
	height: 48px;
	line-height: 48px;
}

.lnh32 {
	height: 32px;
	line-height: 32px;
}

.price {
	color: #ee7a23;
	font-size: 24px;
}

.mrg-b40 {
	margin-bottom: 40px;
}

.describe {
	font-size: 20px;
	line-height: 40px;
	margin-bottom: 40px;
}

.big-img{
    width: 100%;
}

.details .name{
    font-size: 32px;
}

.btn-area{
    margin-top: 40px;
}
</style>

<template>
    <div>
        <nav-header></nav-header>
        <!-- <nav-bread>
            <span>商品详情</span>
        </nav-bread> -->
        <nav-menu :activeIndex="'-1'"></nav-menu>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <el-card>
                    <el-row :gutter="20" class="text item">
                        <el-col :span="3">
                            <div class="pic">
                                <img class="mini-pic" v-lazy="'http://p04f9mqe1.bkt.clouddn.com/'+formData.productImage" :alt="formData.productName">
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="pic">
                                <img class="img" v-lazy="'http://p04f9mqe1.bkt.clouddn.com/'+formData.productImage" :alt="formData.productName">
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div class="main">
                                <div class="name">{{formData.productName}}</div>
                                <br>
                                <div class="price lnh48">{{formData.salePrice | currency('￥')}}</div>
                                <div class="lnh48"></div>
                                <div class="lnh48">
                                    七日无条件退换货，赠运费险
                                </div>
                                <div class="lnh32">
                                    本商品暂不支持选择配送方式
                                </div>

                                <div class="btn-area">
                                    <a href="javascript:;" class="btn btn--m" @click="addCart(formData.productId)">加入购物车</a>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>

                <el-card class="details">
                    <div class="name mrg-b40">详情介绍</div>
                    <div class="describe">
                        {{formData.describe}}
                    </div>
                    <div class="pic">
                        <img class="big-img" v-lazy="'http://p04f9mqe1.bkt.clouddn.com/'+formData.describeImg" :alt="formData.productName">
                    </div>
                </el-card>
            </div>
        </div>

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
	components: {
		NavHeader,
		NavFooter,
		NavBread,
		NavMenu
	},

	data() {
		return {
			formData: {},
			addSuc: false,
			needLogin: false,
			productId: ''
		}
	},

	mounted: function() {
		this.init()
	},

	methods: {
		init() {
			let productId = this.$route.query.productId
			axios.post('/goods/productDetail', { productId: productId }).then(res => {
				this.formData = res.data.result
			})
		},

		// 进入购物车页面
		goCart() {
			this.$router.push({ path: '/cart' })
		},

		// 关闭弹窗
		handleClose() {
			this.addSuc = false
			this.needLogin = false
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
		}
	}
}
</script>
