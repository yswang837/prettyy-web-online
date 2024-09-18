<script setup>
import {getArticleDetailAPI} from "@/apis/article.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
// import {useUserStore} from "@/stores/user.js";

// const userStore = useUserStore()
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
          <div class="base-info">
            文章属于谁，ta的基础信息汇总
            <!--     文章属于谁，获取谁的头像，而不是登录者的头像     -->
            <!--          <el-image class="avatar" :src="userStore.userInfo.user.avatar"></el-image>-->
          </div>
          <div class="hot-article">
            ta的热门文章
          </div>
          <div class="new-article">
            ta的最新文章，以及文章发布情况汇总
          </div>
        </div>
        <div class="article-content">
          <div class="article-content-title">
            {{articleDetail?.title}}
          </div>
          <div class="article-detail" v-html="articleDetail?.content"></div>
        </div>

        <div class="article-right">
          <div class="catelog">
            本文的目录，高度由文章目录撑开
          </div>
          <div class="person-search">
            搜索ta的文章
          </div>
          <div class="new-comment">
            ta的最新评论
          </div>

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
}
.article-left {
  flex: 1.07;
  margin-left: 123px;
}
.base-info {
  height: 308px;
  margin-bottom: 10px;
  background-color: white;
}

.hot-article {
  height: 350px;
  margin-bottom: 10px;
  background-color: white;
}
.new-article {
  height: 345px;
  background-color: white;
  margin-bottom: 10px;
}
.avatar {
  width: 50px;
  height: 50px;
}
.article-content {
  flex: 2.90;
  margin: 0 10px;
  background-color: #fcfcfc;
  height: 1000px;
}
.article-content-title {
  font-size: 27px;
  margin: 15px;
}
.article-right {
  flex: 1.07;
  margin-right: 123px;
}
.catelog {
  height: 300px;
  background-color: white;
  margin-bottom: 10px;
}
.person-search {
  height: 48px;
  margin-bottom: 10px;
  background-color: white;
}
.new-comment {
  height: 385px;

  background-color: white;
}


</style>