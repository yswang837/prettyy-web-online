<template>
  <div class="container">
    <div id="main-bar">
      <el-tabs v-model="articleMode" class="demo-tabs">
        <el-tab-pane label="推荐" name="suggest"></el-tab-pane>
        <el-tab-pane label="最新" name="new"></el-tab-pane>
      </el-tabs>
      <ul class="article">
        <li v-for="article in articleList" :key="article.id">
          <div class="text">
            <h3 class="text-title">{{ article.title }}</h3>
            <span v-html="article.summary"></span>
          </div>
          <img :src="article.cover_img" />
        </li>
      </ul>
    </div>
    <div id="side-bar">
      <div class="authors">
        <h3>优秀作者</h3>
        <el-divider />
        <ul>
          <li>
            曹雪芹
          </li>
          <li>
            施耐庵
          </li>
          <li>
            吴承恩
          </li>
          <li>
            唐家三少
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getArticleListAPI } from "@/apis/article.js";
const articleMode = ref('suggest')
const articleList = ref([])
const pageParam = ref({
  page: 1,
  pageSize: 10
})

const getArticleList = async () => {
  const { result } = await getArticleListAPI(pageParam.value.page, pageParam.value.pageSize)
  articleList.value = [...articleList.value, ...result]
}

getArticleList()


</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  padding: 12px;
  height: 100%;
  margin: 0 auto;
  display: flex;

  #main-bar {
    flex: 1;

    .article {
      li {
        border-bottom: 1px solid #e5e6eb;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text {
          span {
            color: #8f8f8f;
          }

          &-title {
            margin-bottom: 8px;
          }
        }

        img {
          width: 180px;
          height: 100px;
        }
      }
    }
  }

  #side-bar {
    margin-left: 12px;

    .authors {
      padding: 12px;
      width: 320px;
      height: 500px;
      border: 1px solid #e2e2e2;
      border-radius: 5px;
    }
  }
}

::v-deep .el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 12px 0;
}
</style>