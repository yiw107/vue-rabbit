//封装购物车模块
import {defineStore} from 'pinia'
import { ref } from 'vue'
export const useCartStore = defineStore('cart',()=>{
    //1.定义state-cartlist
    const cartList = ref([])
    //2.定义action-addcart
    const addCart =()=>{
        //添加购物车操作
        //已添加 则count+1
        //没有添加 直接push
        //思路 通过匹配传递过来的商品
        const item =cartList.value.find((item)=>goods.skuId===item.skuId)
        if(item){
            //找到了
            item.count++
        }else{
            //没找到
            cartList.value.push(goods)
        }
    }
    return {
        cartList,
        addCart
    }

},
{
    persist: true,
})