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
import ArticleInteractive from "./components/ArticleInteractive.vue";

const route = useRoute()

const fullPath = ref('')

const tags = ref([])
const articleUserStore = useArticleUserStore()
const articleDetail = ref(null)
const getArticleDetail = async () => {
  // console.log(route.params.aid)
  const res = await getArticleDetailAPI(route.params.aid)
  // console.log('article....res',res)
  articleDetail.value = res.result
  // console.log('aaaa',articleDetail.value)
  articleDetail.value.create_time = articleDetail.value.create_time.replace("T", " ").replace("Z", "").replace("+08:00","")
  articleDetail.value.update_time = articleDetail.value.update_time.replace("T", " ").replace("Z", "").replace("+08:00","")
  tags.value = articleDetail.value.tags.split(",")
}

const isShowCopyRight = ref(false)
const showCopyRight = () => {
  isShowCopyRight.value = !isShowCopyRight.value
}

onMounted(() => {
  getArticleDetail()
  articleUserStore.getUserInfoByAid(route.params.aid)
  fullPath.value = route.fullPath
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
        <div class="article-content-container">
          <div class="article-content">
            <div class="article-content-title">
              {{articleDetail?.title}}
            </div>
            <div class="sample-desc">
              <img class="article-type" src="@/assets/images/original.png" alt="">
              <div class="detail-info">
                <div>
                  <span class="username">{{articleUserStore.articleUserInfo.nick_name}}</span>
                  <i v-if="articleDetail?.create_time===articleDetail?.update_time" class="iconfont icon-shizhongfill"><span class="detail-info-item">发布于{{articleDetail?.create_time}}</span></i>
                  <i v-if="articleDetail?.create_time!==articleDetail?.update_time" class="iconfont icon-shizhongfill"><span class="detail-info-item">修改于{{articleDetail?.update_time}}</span></i>
                  <i class="iconfont icon-yuedushu"><span class="detail-info-item">阅读量{{articleDetail?.read_num}}</span></i>
                  <i class="iconfont icon-shoucangshu-yishoucang"><span class="detail-info-item">收藏{{articleDetail?.collect_num}}</span></i>
                  <i class="iconfont icon-dianzan_kuai"><span class="detail-info-item">点赞数{{articleDetail?.like_num}}</span></i>
                </div>
                <div class="article-tags">
                  文章标签
                  <el-tag class="tag" v-for="(tag,index) in tags" :key="index"  :disable-transitions="false">{{tag}}</el-tag>
                </div>
              </div>
              <div class="copy-right" @click="showCopyRight">版权</div>
            </div>
            <div v-if="isShowCopyRight" class="copy-right-detail">
              <div>版权声明：本文为博主原创文章，遵循 <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">CC 4.0 BY-SA</a> 版权协议，转载请附上原文出处链接和本声明。</div>
              <div style="margin-top: 5px">本文链接：http://wys837.cn{{fullPath}}</div>
            </div>
            <div class="article-detail" v-html="articleDetail?.content"></div>
            <div class="knowledge-tree">
              知识树
            </div>
            <div class="article-interactive">
              <ArticleInteractive :article-detail="articleDetail" :article-user-info="articleUserStore.articleUserInfo" />
            </div>
          </div>
          <div class="detail-article-list">
            文章详情页，文章列表区域
          </div>
        </div>

        <div class="article-right">
          <Column />
          <CateLog />
          <NewComment />
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
  user-select: text;
  .article-left {
    flex: 1.07;
    margin-left: 123px;
    .person-search {
      position: sticky;
      top: 60px;
      height: 48px;
      margin-bottom: 10px;
      background-color: white;
    }
  }
  .article-content-container {
    flex: 2.90;
    margin: 0 10px;
    .article-content {
      background-color: white;
      padding: 20px 30px 0 30px;
      .article-content-title {
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .sample-desc {
        display: flex;
        justify-content: space-between;
        background-color: #f8f8f8;
        width: 100%;
        height: 66px;
        padding: 10px;
        .article-type {
          width: 36px;
          height: 32px;
        }
        .detail-info {
          .username {
            margin-right: 20px;
            color: #555665;
            font-size: 14px;
          }
          .icon-shizhongfill,.icon-yuedushu, .icon-shoucangshu-yishoucang, .icon-dianzan_kuai {
            margin-right: 20px;
            color: #999aa9;
            font-size: 14px;
          }
          .article-tags {
            margin: 8px 0 3px 0;
            color: #999aa9;
            .tag {
              margin: -3px 8px 0 8px;
              cursor: pointer;
            }
          }
          .detail-info-item {
            margin-left: 4px;
          }
        }
        .copy-right {
          color: #9eb5ca;
          cursor: pointer;
        }
      }
      .copy-right-detail {
        margin-top: 20px;
        color: #9a9aab;
      }
      .article-detail {
        margin: 40px 0;
      }
      .knowledge-tree {
        width: 100%;
        height: 100px;
        border-top: 1px solid #f0f0f2;
      }
      .article-interactive {
        position: sticky;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        box-shadow: 0 -2px 5px -5px rgba(0, 0, 0, 0.7);
        padding: 5px 20px;
        margin-top: 20px;
        background-color: white;
        width: 100%;
        height: 65px;
      }
    }
    .detail-article-list {
      height: 800px;
      margin: 10px 0;
      background-color: white;
    }
  }
  .article-right {
    flex: 1.07;
    margin-right: 123px;
  }

}
</style>