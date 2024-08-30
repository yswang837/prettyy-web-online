<script setup>
import {getArticleDetailAPI} from "@/apis/article.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
const route = useRoute()
const articleDetail = ref(null)
const getArticleDetail = async () => {
  console.log(route.params.aid)
  const res = await getArticleDetailAPI(route.params.aid)
  console.log('article....res',res)
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
          <el-image class="avatar" :src="userStore.userInfo.user.avatar"></el-image>
        </div>
      </div>
      <div class="article-content">
        <div class="article-content-title">
          {{articleDetail?.title}}
        </div>
        <div class="article-detail" v-html="articleDetail?.content"></div>
      </div>
      <div class="article-right">
        right
      </div>
    </div>
</template>

<style scoped lang="scss">
@import "src/styles/tinymce-custom-editor.css";
.article-detail-container {
  display: flex;
  margin-top: 10px;
}
.article-left,  {
  flex: 1;
  margin-left: 110px;
  background-color: #e5e4e2;
}
.avatar {
  width: 50px;
  height: 50px;
}

.article-right {
  flex: 1;
  margin-right: 110px;
  background-color: #e5e4e2;
}
.article-content {
  flex: 3;
  margin: 0 10px;
  background-color: #fcfcfc;
}
.article-content-title {
  font-size: 27px;
  margin: 15px;
}

</style>