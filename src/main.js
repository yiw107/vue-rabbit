
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引用初始化的样式文件
import '@/styles/common.scss'
//引入懒加载指令插件并且注册
import {lazyPlugin} from '@/directives'
import { componentPlugin } from './components'

//测试接口函数
// import {getCategory} from '@/apis/testAPI'
// getCategory().then(res=>{
//     console.log(res)
// })
// import {getDetailAPI} from '@/apis/detail'
// getDetailAPI().then(res=>{
//     console.log(res)
// })
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(componentPlugin)
app.mount('#app')

//注册插件
app.use(lazyPlugin)

