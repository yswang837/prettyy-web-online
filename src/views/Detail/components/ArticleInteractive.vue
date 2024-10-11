<script setup>
import {useLikeClickedStore} from "@/stores/articleinteracitve.js";
import {ref} from "vue";
import {clickLikeOrCollectAPI} from "@/apis/article.js";
import getUidFromJwt from "@/utils/parseJwt.js";

const props = defineProps({
  articleUserInfo: Object,
  articleDetail: Object
})

const likeClickedStore = useLikeClickedStore()

const likeOrCollect = ref(null)
const likeFunc = async () => {
  likeClickedStore.setClickedStatus(props.articleDetail?.aid) // 用于区分该客户端给哪篇文章点赞了
  // console.log('muid',props.articleUserInfo.uid, 'suid',getUidFromJwt(), 'aid',props.articleDetail.aid,)
  const res = await clickLikeOrCollectAPI(props.articleUserInfo.uid, getUidFromJwt(), props.articleDetail.aid, '4')
  // console.log('res',res)
  likeOrCollect.value = res.result
}
</script>

<template>
  <div class="left">
    <el-avatar class="avatar" shape="circle" :size="40" :src="articleUserInfo?.avatar"/>
    <span class="username">{{articleUserInfo?.nick_name}}</span>
    <el-button class="base-btn">关注</el-button>
  </div>
  <div class="right">
    <i @click="likeFunc" class="iconfont icon-dianzan_kuai" :class="likeClickedStore.getClickStatus(props.articleDetail?.aid)?'like-active':''">
      <span v-if="likeOrCollect?.like_num" class="number">{{likeOrCollect?.like_num}}</span>
      <span v-else class="number">{{articleDetail?.like_num}}</span>
    </i>
    <i class="iconfont icon-shoucangshu-yishoucang"><span class="number">{{articleDetail?.collect_num}}</span></i>
    <i class="iconfont icon-pinglun1"><span class="number">{{articleDetail?.comment_num}}</span></i>
    <i class="iconfont icon-fenxiang"></i>
  </div>
</template>

<style scoped lang="scss">
.left {
  display: flex;
  align-items: center;
  .username {
    font-size: 16px;
    font-weight: bold;
    padding: 0 14px;
  }
  .base-btn {
    width: 55px;
    border-radius: 20px;
    font-weight: normal;
    &:hover {
      border: 1px solid black;
      background-color: white;
      color: #606266;
    }
  }
}
.right {
  display: flex;
  align-items: center;
  .icon-dianzan_kuai, .icon-shoucangshu-yishoucang, .icon-pinglun1, .icon-fenxiang {
    margin: 0 12px;
    color: #82838e;
    font-size: 17px;
    cursor: pointer;
    .number {
      margin-left: 6px;
    }
  }
  .like-active {
    color: #e96140;
  }
  .icon-fenxiang {
    padding-left: 20px;
    border-left: 1px solid #f0f0f2;
  }
}
</style>