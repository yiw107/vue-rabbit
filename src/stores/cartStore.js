//封装购物车模块
import {defineStore} from 'pinia'
import { computed, ref } from 'vue'
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
    //删除购物车
    const delCart =(skuId) =>{
        //思路
        //1.找到要删除项的下标值-splice
        //2.使用数组的过滤方法-filter
        const idx = cartList.value.findIndex((item)=>skuId===item.skuId)
        cartList.value.splice('idx',1)
    }
    //单选功能
    const singleCheck =(skuId,selected)=>{
        //通过skuId找到要修改的那一项，然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item)=>item.skuId===skuId)//判断id是否发生匹配
        item.selected = selected
    }
    //计算属性-购物车结算1.总数量（所有项的count之和，a：每次累加完交给a,c每一项
    const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))//总的数量
    //2.总价钱（所有项的count*price之和
    const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))//总的价钱
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck
    }

},
{
    persist: true,
})