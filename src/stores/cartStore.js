//封装购物车模块
import {defineStore} from 'pinia'
import { computed, ref } from 'vue'
import {useUserStore} from './user'
import { insertCartAPI,findNewCartListAPI,delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart',()=>{
    const userStore = useCartStore()
    const isLogin = computed(()=>userStore.userInfo.token)//islogin的值为true或者false，token表示是否是登陆状态
    //1.定义state-cartlist
    const cartList = ref([])
    //2.定义action-addcart
    const addCart =async(goods)=>{
        const {skuId,count}=goods
        if(isLogin.value){
            //登录之后的加入购物车逻辑
            await insertCartAPI({skuId,count})//加入购物车接口调用
            const res = await findNewCartListAPI()//获取最新的购物车列表
            cartList.value=res.result//覆盖本地的购物车列表
        }else{
            //本地逻辑
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
        
    }
    //删除购物车
    const delCart =async(skuId) =>{
        if(isLogin.value){
            //调用接口实现接口购物车中的删除功能
            await delCartAPI([skuId])
            const res = await findNewCartListAPI()//获取最新的购物车列表
            cartList.value=res.result//覆盖本地的购物车列表
        }else{
            //思路
        //1.找到要删除项的下标值-splice
        //2.使用数组的过滤方法-filter
        const idx = cartList.value.findIndex((item)=>skuId===item.skuId)
        cartList.value.splice('idx',1)
        }
        
    }

    //获取最新的购物车列表action
    // const updateNewList =async()=>{
    //     const res = await findNewCartListAPI()//获取最新的购物车列表
    //     cartList.value=res.result//覆盖本地的购物车列表
    // }
    //单选功能
    const singleCheck =(skuId,selected)=>{
        //通过skuId找到要修改的那一项，然后把它的selected修改为传过来的selected
        const item = cartList.value.find((item)=>item.skuId===skuId)//判断id是否发生匹配
        item.selected = selected
    }
    //全选功能
    const allCheck=(selected)=>{
        //把cartlist中的每一项的selectes都设置成当前的全选框状态
        cartList.value.forEach(item=>item.selected=selected)
    }
    //计算属性-购物车结算1.总数量（所有项的count之和，a：每次累加完交给a,c每一项
    const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))//总的数量
    //2.总价钱（所有项的count*price之和
    const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))//总的价钱

    //是否全选
    //比对每个框是否选中，computed返回是否都选中
    const isAll = computed(()=>cartList.value.every((item)=>item.selected))

    //已选择数量
    const selectedCount = computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
    const selectedPrice = computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice
    }

},
{
    persist: true,
})