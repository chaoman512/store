<template>
   <div>
   	<nav-header></nav-header>
    <nav-bread>
    	<span>home_list</span>
    </nav-bread>

  <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
          </div>  
      <div class="accessory-result">
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

             <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'static/'+item.productImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice }}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
   
            </div>
  </div>
<div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
   	<nav-footer></nav-footer>
   </div>
</template>


<script>
import './../assets/base.css'
import './../assets/product.css'
import NavHeader from "../components/NavHeader.vue"
import NavBread from "../components/NavBread.vue"
import NavFooter from "../components/NavFooter.vue"
import axios from "axios"
export default {
    components:{
         NavHeader,
         NavBread,
         NavFooter
    },
    data(){
    	return{
            goodsList:[],
            priceFilter:[
                  {
                      startPrice:'0.00',
                      endPrice:'100.00'
                  },
                  {
                    startPrice:'100.00',
                    endPrice:'500.00'
                  },
                  {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                  },
                  {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                  }
                ],
                priceChecked:'all',
                filterBy:false,
                overLayFlag:false,
                sortFlag:true,
    	}
    },
    mounted:function(){
       this.getGoodsList()
    },
    methods:{
    	getGoodsList(){
        axios.get("/goods").then((result)=>{
          var res=result.data
          
          this.goodsList=res.data.result
          // console.log(this.goodsList)
        })
    	},
      sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
      showFilterPop(){
              this.filterBy=true;
              this.overLayFlag=true;
            },
            setPriceFilter(index){
              this.priceChecked = index;
              this.page = 1;
              this.getGoodsList();
            },
            closePop(){
              this.filterBy=false;
              this.overLayFlag=false;
              this.mdShowCart = false;
            },
      addCart(productId){
                axios.post("/goods/addCart",{
                  productId:productId
                }).then((res)=>{
                    var res = res.data;
                    if(res.status==0){
                        this.mdShowCart = true;
                        this.$store.commit("updateCartCount",1);
                    }else{
                        this.mdShow = true;
                    }
                });
            },
    }
 }
</script>


<style>

</style>