import axios from 'axios'
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user.js";
import router from '@/router/index.js'
import {useCaptchaStore} from "@/stores/captcha.js";

// 创建axios实例
const http = axios.create({
  baseURL: 'http://127.0.0.1:8888',
  timeout: 2000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  // 在请求header中统一带上token
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({type: 'warning', message: e.response.data.message})
  const userStore = useUserStore()
  // 401token失效处理
  if (e.response.status === 401){
    userStore.clearUserInfo()
    router.push({path: '/'})
  }
  // 40000010 验证码错误
  if (e.response.data.code === 40000010) {
    const captchaStore = useCaptchaStore()
    captchaStore.getIdentityCode()
  }
  return Promise.reject(e)
})

export default http