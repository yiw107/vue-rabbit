<script setup>
import {getCategoryFilterAPI} from '@/apis/category'
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {getSubCategoryAPI} from '@/apis/category'
import GoodsItem from '../Home/components/GoodsItem.vue'

//获取面包屑导航数据
const categoryData = ref({})
const route = useRoute()
const getCategoryData = async()=>{
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}
onMounted(()=>getCategoryData())



//获取基础列表数据渲染,从接口category.js中看其中含有四个参数
const goodList = ref([])
const reqData = ref({//使用reqData接收参数
  categoryId:route.params.id,
  page:1,
  pageSize:20,
  sortField: 'publishTime'
})
const getGoodList = async()=>{
 const res =  await getSubCategoryAPI(reqData.value)
 goodList.value = res.result.items
}
onMounted(()=>getGoodList())


//tab切换回调,捕捉点击之后的状态并重新发送网络请求展示数据
const tabChange =()=>{
  reqData.value.page=1//万一在某一个tab下已经加载了很多页了，这里将其重新初始化为1
  getGoodList()
}

const disabled=ref(false)
//加载更多
const load = async()=>{
  reqData.value.page++//将页数加一，下面获取数据
  const res = await getSubCategoryAPI(reqData.value)//获取数据了，下面进行新老数据拼接
  
  goodList.value=[...goodList.value,...res.result.items]//拼接了重新交给响应式的goodList
  //加载完毕 停止监听
  if(res.result.items.length===0){
    disabled.value=true
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{categoryData.parentName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>居家生活用品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange" >
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
         <GoodsItem v-for="good in goodList" :goods="good" :key="good.id">
        
        </GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>