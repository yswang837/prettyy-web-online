<script setup>
import {getArticleDetailAPI} from "@/apis/article.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useArticleUserStore} from "@/stores/articleuser.js";
import BaseInfo from "./components/BaseInfo.vue";
import ArticleList from "./components/ArticleList.vue";
import CateLog from "./components/CateLog.vue";
import NewComment from "./components/NewComment.vue";
import Column from "./components/Column.vue";

const route = useRoute()

const tags = ref(['vue.js','golang','博客系统'])
const articleUserStore = useArticleUserStore()
const articleDetail = ref(null)
const getArticleDetail = async () => {
  // console.log(route.params.aid)
  const res = await getArticleDetailAPI(route.params.aid)
  // console.log('article....res',res)
  articleDetail.value = res.result
  // console.log('aaaa',articleDetail.value)
  articleDetail.value.create_time = articleDetail.value.create_time.replace("T", " ").replace("Z", "")
  articleDetail.value.update_time = articleDetail.value.update_time.replace("T", " ").replace("Z", "")
}

const isShowCopyRight = ref(false)
const showCopyRight = () => {
  isShowCopyRight.value = !isShowCopyRight.value
}

onMounted(() => {
  getArticleDetail()
  articleUserStore.getUserInfoByAid(route.params.aid)
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
            <div class="detail-info">
              <div>
                <span>{{articleUserStore.articleUserInfo.nick_name}}</span>
                <i v-if="articleDetail?.create_time===articleDetail?.update_time" class="iconfont icon-shizhongfill">发布于{{articleDetail?.create_time}}</i>
                <i v-if="articleDetail?.create_time!==articleDetail?.update_time" class="iconfont icon-shizhongfill">修改于{{articleDetail?.update_time}}</i>
                <span><i class="iconfont icon-yuedushu">阅读量573</i></span>
                <span><i class="iconfont icon-shoucangshu-yishoucang">收藏11</i></span>
                <span><i class="iconfont icon-dianzan_kuai">点赞数28</i></span>
              </div>
              <div class="article-tags">
                文章标签
                <el-tag class="tag" v-for="(tag,index) in tags" :key="index"  :disable-transitions="false">
                  {{tag}}
                </el-tag>
              </div>
            </div>
            <div class="copy-right" @click="showCopyRight">版权</div>
          </div>
          <div v-if="isShowCopyRight">展示版权</div>
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
      display: flex;
      justify-content: space-between;
      background-color: #f8f8f8;
      width: 100%;
      height: 60px;
      padding: 10px;
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