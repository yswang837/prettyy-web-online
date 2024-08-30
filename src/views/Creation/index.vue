<script setup>
import {ref} from 'vue'
import Default from "@/views/Creation/components/Default.vue";
import ContenManage from "@/views/Creation/components/ContenManage.vue";

let activeIndex = ref('1')
const handleSelect = (key) => {
  // console.log('select',key)
  activeIndex.value = key
}

</script>

<template>
  <div class="create-center-container container">
    <div class="left-menu">

      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" :default-active="activeIndex" text-color="#fff" @select="handleSelect">
        <el-menu-item index="1">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <i class="iconfont icon-neirongguanli"></i>
            <span>管理</span>
          </template>
            <el-menu-item class="sub-menu-item" index="2-1">内容管理</el-menu-item>
            <el-menu-item class="sub-menu-item" index="2-2">评论管理</el-menu-item>
            <el-menu-item class="sub-menu-item" index="2-3">专栏管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <i class="iconfont icon-shuju"></i>
            <span>数据</span>
          </template>
          <el-menu-item class="sub-menu-item" index="3-1">作品数据</el-menu-item>
          <el-menu-item class="sub-menu-item" index="3-2">收益数据</el-menu-item>
          <el-menu-item class="sub-menu-item" index="3-3">粉丝数据</el-menu-item>
          <el-menu-item class="sub-menu-item" index="3-4">一周小结</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <i class="iconfont icon-chuangzuo"></i>
            <span>创作</span>
          </template>
          <el-menu-item class="sub-menu-item" index="4-1">活动列表</el-menu-item>
          <el-menu-item class="sub-menu-item" index="4-2">投稿管理</el-menu-item>
          <el-menu-item class="sub-menu-item" index="4-3">等级权益</el-menu-item>
          <el-menu-item class="sub-menu-item" index="4-4">流量券管理</el-menu-item>
          <el-menu-item class="sub-menu-item" index="4-5">博文打赏</el-menu-item>
          <el-menu-item class="sub-menu-item" index="4-6">资源变现</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="right-content">
      <Default v-if="activeIndex==='1'"/>
      <ContenManage v-if="activeIndex==='2-1'"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-center-container {
  display: flex;
}
.left-menu {
  flex: 1;
  margin-left: 150px;
  background-color: #d3d3d3;
}
.right-content {
  flex: 5;
  margin-right: 150px;
  background-color: #9d9b9b;
}
.iconfont {
  margin-left: 20px;
  margin-right: 10px;
}
.sub-menu-item {
  margin-left: 40px;
}

</style>