<script setup>
defineProps({
  articleType: String
})
</script>

<template>
<!--ta的热门文章，ta的最新文章组件-->
  <div v-if="articleType==='hot'" class="article-list-hot">
    ta的热门文章
  </div>
  <div v-if="articleType==='new'" class="article-list-new">
    ta的最新文章
  </div>
</template>

<style scoped lang="scss">
.article-list-hot {
  position: sticky;
  top: 120px;
  height: 345px;
  margin-bottom: 10px;
  background-color: white;
}
.article-list-new {
  position: sticky;
  top: 480px;
  height: 350px;
  margin-bottom: 10px;
  background-color: white;
}
</style>