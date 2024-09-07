<template>
  <LayoutNav />
  <div class="container">
    <h1>{{ article.title }}</h1>
    <div v-html="article.body"></div>
  </div>
</template>

<script setup>
import LayoutNav from "../Layout/components/LayoutNav.vue";
import { getArticleDetailAPI } from "@/apis/article.js";
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
import { marked } from "marked";

marked.use({
  // 开启异步渲染
  async: true,
  pedantic: false,
  gfm: true,
  mangle: false,
  headerIds: false,
});

const article = ref({
  body: "",
  title: "",
});

const init = async () => {
  const { result } = await getArticleDetailAPI(route.query.aid);
  console.log("--->", result);
  article.value.title = result.title;

  marked.parse(result.content, { async: true }).then((html) => {
    article.value.body = html;
  });
};

init();
</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  padding: 88px 24px;
  border: 1px solid #e2e2e2;
}
</style>
