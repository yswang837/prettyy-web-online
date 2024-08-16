<script setup>
defineProps({
  title: {
    type:String
  },
  summary: {
    type:String
  },
  coverImg: {
    type:String
  },
  aid: {
    type:String
  }
})
</script>


<template>
    <div class="article-panel">
      <router-link :to="{path:`article/detail/${aid}`}">
        <el-image class="cover-image" :src="coverImg" lazy alt=""></el-image>
      </router-link>
      <div class="panel-data">
        <router-link :to="{path:`article/detail/${aid}`}">
        <div class="title">{{ title }}</div>
        <div class="summary">{{ summary }}</div>
        </router-link>
        <div class="panel-data-detail">
          <span><a href="#"><i class="iconfont icon-dianzan"></i>482</a></span>
          <span><a href="#"><i class="iconfont icon-pinglun"></i>7</a></span>
          <span><a href="#"><i class="iconfont icon-shoucang1"></i>22</a></span>
          <span><a href="#"><i class="iconfont icon-geren1"></i>转让半包辣条</a></span>
          <span><a href="#"><i class="iconfont icon-gengduo"></i>更多</a></span>
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

.panel-data-detail span {
  margin: 0 12px;
}
.panel-data-detail span i {
  margin-right: 5px;
}

</style>