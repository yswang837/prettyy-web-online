<script setup>
defineProps({
  articleUserInfo: Object,
  articleDetail: Object
})
</script>

<template>
  <div class="left">
    <el-avatar class="avatar" shape="circle" :size="40" :src="articleUserInfo?.avatar"/>
    <span class="username">{{articleUserInfo?.nick_name}}</span>
    <el-button class="base-btn">关注</el-button>
  </div>
  <div class="right">
    <i class="iconfont icon-dianzan_kuai"><span class="number">{{articleDetail?.like_num}}</span></i>
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
    &:hover {
      color: #de9393;
    }
  }
  .icon-fenxiang {
    padding-left: 20px;
    border-left: 1px solid #f0f0f2;
  }
}
</style>