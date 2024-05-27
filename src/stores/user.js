import { defineStore } from "pinia";
import {computed,ref} from 'vue'
import {loginAPI} from '@/apis/user'
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore('user',()=>{
    const cartStore = useCartStore()
    //定义获取用户数据的state
    const userInfo =ref({})
    //定义获取接口数据的action函数
    const getUserInfo= async ({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.result
        //合并购物车
       await mergeCartAPI(cartStore.cartList.map(item=>{
            return {
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        cartStore.updateNewList()

    }
    //退出时清除用户信息
    const clearuserInfo = ()=>{
        userInfo.value={}
        cartStore.clearCart()
    }
    return{
        userInfo,
        getUserInfo,
        clearuserInfo
    }
},
{
    persist: true,
})