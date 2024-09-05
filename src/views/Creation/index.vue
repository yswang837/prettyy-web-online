<script setup>
import {ref, onMounted} from 'vue'
import Default from "@/views/Creation/components/Default.vue";
import ContentManage from "@/views/Creation/components/ContentManage.vue";
import CommentManage from "@/views/Creation/components/CommentManage.vue";
import ColumnManage from "@/views/Creation/components/ColumnManage.vue";
import WorkData from "@/views/Creation/components/WorkData.vue";
import IncomeData from "@/views/Creation/components/IncomeData.vue";
import FansData from "@/views/Creation/components/FansData.vue";
import WeekendSummary from "@/views/Creation/components/WeekendSummary.vue";
import ActivityList from "@/views/Creation/components/ActivityList.vue";
import ContributeManage from "@/views/Creation/components/ContributeManage.vue";
import GradeEquity from "@/views/Creation/components/GradeEquity.vue";
import FlowManage from "@/views/Creation/components/FlowManage.vue";
import BlogReward from "@/views/Creation/components/BlogReward.vue";
import ResourceRealization from "@/views/Creation/components/ResourceRealization.vue";
import {useRoute} from "vue-router";

const route = useRoute()

let activeIndex = ref('1')
const handleSelect = (key) => {
  // console.log('select',key)
  activeIndex.value = key
}

onMounted(() => {
  // console.log('aaa',route.params.index)
  if (route.params.index !== '') {
    activeIndex.value = route.params.index
  }
})


</script>

<template>
  <div class="create-center-container container">
    <div class="left-menu">
      <el-menu active-text-color="#ffd04b" background-color="#f1f0f0" class="el-menu-vertical-demo" :default-active="activeIndex" text-color="#000" @select="handleSelect">
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
      <ContentManage v-if="activeIndex==='2-1'"/>
      <CommentManage v-if="activeIndex==='2-2'"/>
      <ColumnManage v-if="activeIndex==='2-3'"/>
      <WorkData v-if="activeIndex==='3-1'"/>
      <IncomeData v-if="activeIndex==='3-2'"/>
      <FansData v-if="activeIndex==='3-3'"/>
      <WeekendSummary v-if="activeIndex==='3-4'"/>
      <ActivityList v-if="activeIndex==='4-1'"/>
      <ContributeManage v-if="activeIndex==='4-2'"/>
      <GradeEquity v-if="activeIndex==='4-3'"/>
      <FlowManage v-if="activeIndex==='4-4'"/>
      <BlogReward v-if="activeIndex==='4-5'"/>
      <ResourceRealization v-if="activeIndex==='4-6'"/>
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
}
.right-content {
  flex: 5;
  margin-right: 150px;
  background-color: #f6f6f6;
}
.iconfont {
  margin-left: 20px;
  margin-right: 10px;
}
.sub-menu-item {
  margin-left: 40px;
}

</style>