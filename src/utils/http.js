import axios from 'axios'
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user.js";
import router from '@/router/index.js'
import {useCaptchaStore} from "@/stores/captcha.js";
import makeSign from "@/utils/makeSign.js";

// 创建axios实例
const http = axios.create({
  // baseURL: 'http://120.26.203.121:8888',
  baseURL: 'http://127.0.0.1:6677',
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
  // 在请求中，统一带上调用方标识caller=web，统一带上验签字段sign
  if (config.method === 'get') {
    config.params = Object.assign({}, config.params, { caller: 'web' })
    config.params = Object.assign({}, config.params, {sign: makeSign(config.params)})
  }
  if (config.method === 'post') {
    if (config.url !== '/file/upload') {
      // 上传文件用的header是 multipart/form-data
      config.headers["Content-Type"] = 'application/x-www-form-urlencoded'
    }
    config.data = Object.assign({}, config.data, { caller: 'web' })
    config.data = Object.assign({}, config.data, {sign: makeSign(config.data)})
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