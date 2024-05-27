import httpInstance from '@/utils/http'

//获取详情
export const getCheckInfoAPI=()=>{
    return httpInstance({
        url:'/member/order/pre',

    })
}