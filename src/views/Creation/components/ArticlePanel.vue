<script setup>
import {useUserStore} from "@/stores/user.js";
import {delArticleAPI} from "@/apis/article.js";
import {ElMessage} from "element-plus";

const userStore = useUserStore()

defineProps({
  title: {
    type:String
  },
  coverImg: {
    type:String
  },
  aid: {
    type:String
  },
  isShowEdit: {
    type:Boolean
  },
  isShowDelete: {
    type:Boolean
  },
})
const toDelete = async (aid, uid) => {
  console.log('click del')
  await delArticleAPI(aid, uid)
  ElMessage({type:"success", message:"删除成功"})
  window.location.reload()
}
</script>


<template>
  <div class="article-panel">
    <router-link :to="{path:`/article/detail/${aid}`}">
      <el-image class="cover-image" :src="coverImg" lazy alt=""></el-image>
    </router-link>
    <div class="panel-data">
      <router-link :to="{path:`/article/detail/${aid}`}">
        <div class="title">{{ title }}</div>
      </router-link>
      <div class="panel-data-detail">
        <div class="panel-data-detail-part1">
          <span><a href="#"><i class="iconfont icon-dianzan"></i>482</a></span>
          <span><a href="#"><i class="iconfont icon-pinglun"></i>7</a></span>
          <span><a href="#"><i class="iconfont icon-shoucang1"></i>22</a></span>
        </div>
        <div class="panel-data-detail-part2">
          <i v-if="isShowEdit"   class="iconfont icon-bianji2">编辑</i>
          <i v-if="isShowDelete" @click="toDelete(aid, userStore.userInfo.user.uid)" class="iconfont icon-shanchu">删除</i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>

.article-panel {
  position: relative;
  background-color: #fcfcfc;
  display: flex;
  height: 140px;
  align-items: center;
  border-radius: 3px;
  border-bottom: 1px solid #c9c1cc;
  margin-bottom: 8px;
  transition: all .3s;
}

.article-panel:hover {
  background-color: #f6f5f5;
  top: -1px;
}

.cover-image {
  width: 180px;
  height: 100px;
  margin: 0 25px;
}

.title {
  font-size: 21px;
  margin-bottom: 18px;
}

.title:hover {
  text-decoration: underline;
}


.summary {
  margin-bottom: 15px;
  margin-right: 50px;
  text-indent: 2em;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制在两行内 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.panel-data-detail {
  display: flex;
}
</style>