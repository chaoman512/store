<template>
   <div>
   	<nav-header></nav-header>
    <nav-bread>
    	<span>home_list</span>
    </nav-bread>
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
            goodsList:[]
    	}
    },
    mouted:function(){
       this.getGoodsList()
    },
    methods:{
    	getGoodsList(){
        axios.get("/goods").then((result)=>{
          this.goodsList=result.data.result
        })
    	}
    }
 }
</script>


<style>

</style>