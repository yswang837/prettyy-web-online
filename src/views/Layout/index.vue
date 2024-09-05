<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <LayoutNav />
    <!-- 二级路由出口，也就是Home 和 Category组件 -->
    <Router-View />
  <LayoutFooter />
</template>