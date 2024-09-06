<script setup>
import { ref, onMounted } from 'vue'
import ArticlePanel from "./ArticlePanel.vue";
import {useUserStore} from "@/stores/user.js";
import {getArticleListAPI} from "@/apis/article.js";
const userStore = useUserStore()
const activeName = ref('tab1')
const articleList = ref([])
const getArticleList = async (uid, page, page_size) => {
  const res = await getArticleListAPI(uid, page, page_size)
  articleList.value = res.result
  // console.log(articleList.value)
}
const handleClick = (tab) => {
  // console.log(tab)
  if (tab.props.name === 'tab1') {
    console.log('文章')
  }
}
onMounted(() => {getArticleList(userStore.userInfo.user.uid, 1,10)})
</script>

<template>
<div>
  <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
    <el-tab-pane label="文章" name="tab1">
      <ArticlePanel v-for="item in articleList" :key="item.aid" :aid="item.aid" :title="item.title" :cover-img="item.cover_img" :is-show-edit="true" :is-show-delete="true"/>
    </el-tab-pane>
    <el-tab-pane label="下载" name="tab2">下载</el-tab-pane>
    <el-tab-pane label="问答" name="tab3">问答</el-tab-pane>
    <el-tab-pane label="视频" name="tab4">视频</el-tab-pane>
  </el-tabs>

</div>
</template>

<style scoped lang="scss">

</style>