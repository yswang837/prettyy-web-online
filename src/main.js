import '@/styles/common.scss'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)

// 设置日历中文
app.use(ElementPlus, {locale: zhCn})

app.mount('#app')
