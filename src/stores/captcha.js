import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getIdentityCodeAPI } from '@/apis/base.js';

// 管理用户数据相关

export const useCaptchaStore = defineStore('captcha', () => {
    // 1、定义管理验证码数据的state
    const captchaInfo = ref({})
    // 2、定义获取接口数据的action函数
    const getIdentityCode = async () => {
        const res = await getIdentityCodeAPI()
        captchaInfo.value = res.result
        // console.log('验证码',picPath.value)
    }
    const clearCaptchaInfo = () => {
        captchaInfo.value = {}
    }

    // 3、以对象的格式，把state和action return
    return {
        captchaInfo,
        getIdentityCode,
        clearCaptchaInfo
    }
})
