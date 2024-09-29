import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getUserInfoByAidAPI} from "@/apis/article.js";



// 管理文章用户数据相关

export const useArticleUserStore = defineStore('articleuser', () => {
    // 1、定义管理用户数据的state
    const articleUserInfo = ref({})
    // 2、定义获取接口数据的action函数
    const getUserInfoByAid = async (aid) => {
        const res = await getUserInfoByAidAPI(aid)
        articleUserInfo.value = res.result
    }

    // 3、以对象的格式，把state和action return
    return {
        articleUserInfo,
        getUserInfoByAid,
    }
})
