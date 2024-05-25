import { defineStore } from "pinia";
import {computed,ref} from 'vue'
import {loginAPI} from '@/apis/user'

export const useUserStore = defineStore('user',()=>{
    //定义获取用户数据的state
    const userInfo =ref({})
    //定义获取接口数据的action函数
    const getUserInfo= async ({account,password})=>{
        const res = await loginAPI({account,password})
        userInfo.value = res.result
    }
    //退出时清除用户信息
    const clearuserInfo = ()=>{
        userInfo.value={}
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