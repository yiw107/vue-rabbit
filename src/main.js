
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引用初始化的样式文件
import '@/styles/common.scss'
import { useIntersectionObserver } from '@vueuse/core'


//测试接口函数
// import {getCategory} from '@/apis/testAPI'
// getCategory().then(res=>{
//     console.log(res)
// })
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//定义全局指令
app.directive('img-lazy', {
    mounted(el,binding) {
        //el:指令把规定的那个元素
        //binding：binding.value 指令等于号后面绑定的表达式的值 图片url
        console.log(el,binding)
        useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                //进入视口区域
              if(isIntersecting){el.src=binding.value}
            },
          )
    },
  })
