import { ref } from 'vue'
import { defineStore } from 'pinia'

// 管理用户和文章详情页的转评赞藏数据相关

export const useLikeClickedStore = defineStore('islikeclicked', () => {
  // 1、定义state
  const interactiveInfo = ref(false)
  // 2、定义action函数
  const setClickedStatus = () => {
    // 取反
    interactiveInfo.value = !interactiveInfo.value
  }
  // 3、以对象的格式，把state和action return
  return {
    interactiveInfo,
    setClickedStatus,
  }
}, {persist: true})
