<template>
<div class="nav">
  <div class="nav--container">
    <div class="nav--container--links">
      <a>笔尖</a>
      <a>资源</a>
      <a>学习</a>
      <a href="https://github.com/yswang837/prettyy-web-online" target="_blank">github</a>
    </div>
    <el-input
      v-model="keyword"
      placeholder="如何搭建redis的主从同步"
      :suffix-icon="Search"
    />
    <el-button type="primary" class="ml-4">登录</el-button>
  </div>
</div>
</template>

<script setup>
import {  Search } from '@element-plus/icons-vue'
import { ref } from 'vue';
const keyword = ref('')
</script>

<style scoped lang='scss'>
@import '../../../styles/var'; 

.nav{
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #d6d9dc;
  border-top: 3px solid $--theme-primary;
  &--container{
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    &--links{
      width: 238px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      font-family:Arial, Helvetica, sans-serif;
      a {
        cursor: pointer;
      }
    }
  }
}
</style>