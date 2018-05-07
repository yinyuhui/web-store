<style scoped>
.load-more {
	text-align: center;
	height: 32px;
	line-height: 32px;
	font-size: 12px;
	color: #cccccc;
}
</style>

<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>商品详情</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                
                <div class="accessory-result">
                    <!-- filter -->
                    

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item in goodsList" :key="item.productId">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice | currency('￥')}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
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
            goodsList: [],
            addSuc: false,
            needLogin: false,
		}
	},

	mounted: function() {
		this.init()
	},

	methods: {
		init(flag) {
			this.loading = true
			this.noMore = false
			axios.get('/goods/list', { params: this.params }).then(res => {
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
        
        // 进入购物车页面
          goCart(){
            this.$router.push({path:'/cart'})
          },

          // 关闭弹窗
          handleClose(){
            this.addSuc = false 
            this.needLogin = false 
          },

          
          // 加入购物车
          addCart(productId){
            axios.post('/goods/addCart',{
              productId: productId
            }).then((res) => {
              // console.log(res)
              if(res.data.status === '0'){
                this.addSuc = true 
              }
              else{
                this.needLogin = true 
              }
            })
          },
	}
}
</script>
