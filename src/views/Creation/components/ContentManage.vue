<script setup>
import { ref, onMounted } from 'vue'
import ArticlePanel from "./ArticlePanel.vue";
import {getArticleListAPI} from "@/apis/article.js";
import getUidFromJwt from "@/utils/parseJwt.js";
const activeName = ref('tab1')
const articleList = ref([])
// todo 创作中心->内容管理页面，根据各种条件获取文章列表的接口已经提供，是（/article/list），uid需要从token中解析
const getArticleList = async (uid, page, page_size) => {
  const res = await getArticleListAPI(uid, page, page_size)
  articleList.value = res.result.article_list
  // console.log(articleList.value)
}
const handleClick = (tab) => {
  // console.log(tab)
  if (tab.props.name === 'tab1') {
    console.log('文章')
  }
}
onMounted(() => {getArticleList(getUidFromJwt(), 1,20)})
</script>

<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
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