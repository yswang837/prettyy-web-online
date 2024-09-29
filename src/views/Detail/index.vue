<script setup>
import {getArticleDetailAPI} from "@/apis/article.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import BaseInfo from "./components/BaseInfo.vue";
import ArticleList from "./components/ArticleList.vue";
import CateLog from "./components/CateLog.vue";
import NewComment from "./components/NewComment.vue";
import Column from "./components/Column.vue";

const route = useRoute()

const articleDetail = ref(null)
const getArticleDetail = async () => {
  // console.log(route.params.aid)
  const res = await getArticleDetailAPI(route.params.aid)
  // console.log('article....res',res)
  articleDetail.value = res.result
  // console.log(articleDetail.value.title)
}

onMounted(() => {
  getArticleDetail()
})

</script>

<template>
    <div class="container article-detail-container">
        <div class="article-left">
          <BaseInfo />
          <div class="person-search">
            搜索ta的文章
          </div>
          <ArticleList article-type="hot"/>
          <ArticleList article-type="new"/>
        </div>
        <div class="article-content">
          <div class="article-content-title">
            {{articleDetail?.title}}
          </div>
          <div class="sample-desc">
            <img class="article-type" src="@/assets/images/original.png" alt="">
          </div>
          <div class="article-detail" v-html="articleDetail?.content"></div>
        </div>
        <div class="article-right">
          <CateLog />
          <NewComment />
          <Column />
        </div>
      </div>
</template>

<style scoped lang="scss">
@import "src/styles/tinymce-custom-editor.css";
.article-detail-container {
  display: flex;
  padding-top: 10px;
  background-image: url("@/assets/images/background-detail.gif");
  background-repeat: repeat;
  .article-left {
    flex: 1.07;
    margin-left: 123px;
    .person-search {
      height: 48px;
      margin-bottom: 10px;
      background-color: white;
    }
  }
  .article-content {
    flex: 2.90;
    margin: 0 10px;
    padding: 20px 30px;
    background-color: white;
    .article-content-title {
      font-size: 27px;
    }
    .sample-desc {
      background-color: #f8f8f8;
      width: 100%;
      height: 60px;
      margin: 10px 0;
      .article-type {
        width: 36px;
        height: 32px;
      }
    }
  }
  .article-right {
    flex: 1.07;
    margin-right: 123px;
  }

}
</style>