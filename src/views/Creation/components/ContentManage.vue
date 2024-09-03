<script setup>
import { ref } from 'vue'
const activeName = ref('tab1')

const handleClick = (tab) => {
  // console.log(tab)
  if (tab.props.name === 'tab1') {
    console.log('文章')
  }
}
</script>

<template>
<div>
  <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
    <el-tab-pane label="文章" name="tab1">文章</el-tab-pane>
    <el-tab-pane label="下载" name="tab2">下载</el-tab-pane>
    <el-tab-pane label="问答" name="tab3">问答</el-tab-pane>
    <el-tab-pane label="视频" name="tab4">视频</el-tab-pane>
  </el-tabs>
</div>
</template>

<style scoped lang="scss">

</style>