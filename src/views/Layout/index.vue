<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <LayoutNav />
    <!-- 二级路由出口 -->
    <Router-View :key="$route.fullPath"/>
  <LayoutFooter />
</template>