import { ref } from 'vue'
import { defineStore } from 'pinia'

// 管理用户和文章详情页的转评赞藏数据相关

export const useLikeCollectClickedStore = defineStore('islikecollectclicked', () => {
  // 1、定义state
  const interactiveInfo = ref([])
  // 2、定义action函数
  const setClickedStatus = (aid) => {
    // 在则删除，不在则添加
    if (interactiveInfo.value.includes(aid)) {
      interactiveInfo.value.splice(interactiveInfo.value.indexOf(aid), 1)
    }else {
      interactiveInfo.value.push(aid)
    }
  }
  const getClickStatus = (aid) => {
    return interactiveInfo.value.includes(aid);
  }
  // 3、以对象的格式，把state和action return
  return {
    interactiveInfo, // 外部未直接使用该数组，可以不暴露
    setClickedStatus,
    getClickStatus
  }
}, {persist: true})
