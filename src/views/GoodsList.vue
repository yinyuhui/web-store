<style scoped>
  .load-more{
    text-align: center;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #cccccc
  }
</style>

<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>商品列表</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <!-- <span class="sortby">排序方式：</span> -->
            <a href="javascript:void(0)" class="default" :class="{'cur': defaultFlag}" @click="defaultSort">综合排序</a>
            <a href="javascript:void(0)" class="price" :class="{'cur': !defaultFlag}" @click="sortGoods">
              价格 <span v-if="sortFlag">↑</span><span v-else>↓</span>
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
                <dd  @click="setPriceFilter('all')">
                  <a href="javascript:void(0)"  :class="{'cur':priceChecked === 'all'}"  @click="priceChecked='all'">全部</a>
                </dd>
                <dd  v-for="item in priceFilter" :key="item.id" @click="setPriceFilter(item.id)">
                  <a href="javascript:void(0)" :class="{'cur':priceChecked === item.id}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

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
                <div class='load-more' v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img src="../../static/loading-svg/loading-spinning-bubbles.svg" alt="loading"  v-show='loading'>
                  <p v-if='noMore'>别滑了，没有啦~</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>

      <!-- 未登录添加购物车的弹窗 -->
      <el-dialog
        title="请先登录"
        :visible.sync="needLogin"
        width="320px"
        :before-close="handleClose">
        <span>当前未登录，请先登录再加入购物车！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="needLogin = false">取 消</el-button>
          <el-button type="primary" @click="needLogin = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 登录添加购物车的弹窗 -->
      <el-dialog
        title="添加成功"
        :visible.sync="addSuc"
        width="320px"
        :before-close="handleClose">
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

    export default{
        data() {
            return {
                           
              goodsList: [],

              // 价格区间
              priceFilter: [  
                {
                  id: '0',
                  startPrice: '0.00',
                  endPrice: '100.00'
                },{
                  id: '1',
                  startPrice: '100.00',
                  endPrice: '500.00'
                },{
                  id: '2',
                  startPrice: '500.00',
                  endPrice: '1000.00'
                },{
                  id: '3',
                  startPrice: '1000.00',
                  endPrice: '2000.00'
                },{
                  id: '4',
                  startPrice: '2000.00',
                  endPrice: '5000.00'
                }
              ],

              priceChecked: 'all',   // 价格筛选字段
              filterBy: false,       // 
              overLayFlag: false,
              sortFlag: true,
              params: {
                page: 1,
                pageSize: 8,
              },
              defaultFlag: true,
              busy: false,
              loading: false,
              noMore: false,
              needLogin: false,              
              addSuc: false,
            }
        },

        components: {
          NavHeader,
          NavFooter,
          NavBread
        },

        mounted: function() {
          this.getGoodsList()
        },

        methods: {

          // 获得商品列表信息
          getGoodsList(flag) {    
            this.loading = true  
            this.noMore = false      
            axios.get('/goods/list', {params: this.params}).then(res=>{
              this.loading = false
              if(res.data.status === '0'){
                if(flag) {
                  this.goodsList = this.goodsList.concat(res.data.result.list)
                  this.busy = res.data.result.count === 0 ? true : false
                  this.noMore = res.data.result.count === 0 ? true : false
                }
                else {
                  this.goodsList = res.data.result.list
                  this.busy = false
                }
              }
              else {
                this.goodsList = []
              }
            })
            // console.log( this.busy)
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

          // 排序
          sortGoods() {
            this.defaultFlag = false
            this.sortFlag = !this.sortFlag
            this.params.page = 1
            this.params.sort = this.sortFlag ? 1 : -1
            this.getGoodsList()
          },

          // 默认排序
          defaultSort(){
            this.defaultFlag = true
            this.params = {
              page: 1,
              pageSize: 8,
            }
            this.getGoodsList()
            this.sortFlag = true
          },

          // 加载更多  懒加载时调用
          loadMore(){
            this.busy = true
            setTimeout(() => {
              this.params.page++
              this.getGoodsList(true)
              // this.busy = false     
            }, 500);
          },

          // 价格区间筛选
          setPriceFilter(index){
            this.priceChecked = index
            this.params.priceLevel = index
            this.params.page = 1 
            this.getGoodsList()
            this.closePop()
          },

          // 较窄时点击显示价格 filer 选项
          showFilterPop(){
            this.filterBy = true,
            this.overLayFlag = true
          },

          // 关闭价格 filter 选项
          closePop(){
            this.filterBy = false,
            this.overLayFlag = false
          },

          // 进入购物车页面
          goCart(){
            this.$router.push({path:'/cart'})
          },

          // 关闭弹窗
          handleClose(){
            this.addSuc = false 
            this.needLogin = false 
          }
        }
    }
</script>
