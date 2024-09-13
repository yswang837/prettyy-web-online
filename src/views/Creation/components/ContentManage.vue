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
  <div class="content-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章" name="tab1">
        <ul class="sub-tabs">
          <li>全部(100)</li>
          <li>全部可见(89)</li>
          <li>Vip可见(22)</li>
          <li>粉丝可见(48)</li>
          <li>仅我可见(2)</li>
          <li>原创(33)</li>
          <li>转载(47)</li>
          <li>翻译(11)</li>
          <li>草稿箱(23)</li>
          <li>回收站(38)</li>
        </ul>
        <ArticlePanel v-for="item in articleList" :key="item.aid" :aid="item.aid" :title="item.title" :cover-img="item.cover_img" :is-show-edit="true" :is-show-delete="true"/>
      </el-tab-pane>
      <el-tab-pane label="下载" name="tab2">下载</el-tab-pane>
      <el-tab-pane label="问答" name="tab3">问答</el-tab-pane>
      <el-tab-pane label="视频" name="tab4">视频</el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<style scoped lang="scss">
.content-container {
  padding: 10px 30px;
}
.sub-tabs {
  display: flex;
  margin-bottom: 10px;
  color: #b0b0b0;
  font-size: 13px;

}
.sub-tabs li {
  margin-right: 10px;
}


</style>