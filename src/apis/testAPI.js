import httpInstance from "@/utils/http";
export function getCategory(){
    return httpInstance({//返回一个promise对象可以使用.then获取其结果
        url:'home/category/head'
    })
}