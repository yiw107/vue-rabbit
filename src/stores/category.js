import { ref} from 'vue'
import { defineStore } from 'pinia'
import {getCategoryAPI} from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  //导航列表的数据管理应该服务于两个组件，1.LayoutHeader  2.LayoutFixed
  //state导航列表数据
  const categorylist = ref([])
  //action 获取导航数据的方法
  const getCategory = async()=>{
  const res = await getCategoryAPI()
  categorylist.value = res.result
}
return{
    categorylist,getCategory
}
})
