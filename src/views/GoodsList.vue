<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>商品列表</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序方式：</span>
            <a href="javascript:void(0)" class="default cur">默认排序</a>
            <a href="javascript:void(0)" class="price">价格 ↓ <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                      <a href="#"><img :src="'static/'+item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.prodcutPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
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
                }
              ],
              priceChecked: 'all',
              filterBy: false,
              overLayFlag: false
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
          getGoodsList() {
            axios.get('http://localhost:8080/static/goods.json').then(res=>{
              let data = res.data;
              this.goodsList = data.result
            })
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

          // 点击价格 filter 某一项时的操作
          setPriceFilter(id){
            this.priceChecked = id
            this.closePop()
          }
        }
    }
</script>
