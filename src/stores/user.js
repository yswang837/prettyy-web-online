import { ref } from 'vue'
import { defineStore } from 'pinia'
import {loginOrRegisterByCodeAPI, loginOrRegisterByPwdAPI} from '@/apis/base.js';
import {loginOutAPI} from "@/apis/user.js";
import {useRouter} from "vue-router";


// 管理用户数据相关

export const useUserStore = defineStore('user', () => {
  // 1、定义管理用户数据的state
  const userInfo = ref({})
  // 2、定义获取接口数据的action函数
  const loginByCodeAndSetUserInfo = async (email, identifyCode1, activeName) => {
    const res = await loginOrRegisterByCodeAPI(email, identifyCode1, activeName)
    userInfo.value = res.result
  }

  const loginByPwdAndSetUserInfo = async (email, password, activeName, identify_id, identify_code) => {
    const res = await loginOrRegisterByPwdAPI(email, password, activeName, identify_id, identify_code)
    userInfo.value = res.result
  }

  const LoginOut = async () => {
    await loginOutAPI()
    userInfo.value = {}
    const router = useRouter()
    await router.push({path: '/'})
  }

  const clearUserInfo = () => {
    userInfo.value = {}
  }

  const setNickName = (nickName) => {
    userInfo.value.user.nick_name = nickName
  }

  const setGender = (gender) => {
    userInfo.value.user.gender = gender
  }

  const setSummary = (summary) => {
    userInfo.value.user.summary = summary
  }

  const setProvinceCity = (provinceCity) => {
    userInfo.value.user.province_city = provinceCity
  }

  const setBirthday = (birthday) => {
    userInfo.value.user.birthday = birthday
  }

  // 3、以对象的格式，把state和action return
  return {
    userInfo,
    loginByCodeAndSetUserInfo,
    loginByPwdAndSetUserInfo,
    LoginOut,
    clearUserInfo,
    setNickName,
    setGender,
    setSummary,
    setProvinceCity,
    setBirthday
  }
}, {persist: true})
