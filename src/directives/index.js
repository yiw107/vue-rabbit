import { useIntersectionObserver } from '@vueuse/core'
//定义懒加载插件
export const lazyPlugin ={
    install(app){
    //懒加载指令逻辑
    app.directive('img-lazy', {
        mounted(el,binding) {
            //el:指令把规定的那个元素
            //binding：binding.value 指令等于号后面绑定的表达式的值 图片url
            
            const {stop} = useIntersectionObserver(
                el,
                ([{ isIntersecting }]) => {
                    //进入视口区域
                  if(isIntersecting){el.src=binding.value}
                  stop()
                },
              )
        },
      })
    }
}