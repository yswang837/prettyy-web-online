<template>
  <div class="head">
    <el-input
      v-model="formData.title"
      placeholder="请输入文章标题..."
      size="large"
    ></el-input>
    <el-button @click="submit" type="primary" class="ml-12">提交</el-button>
  </div>
  <div class="container">
    <div id="vditor"></div>
    <div class="flex mt-16">
      <label class="mr-16">文字摘要</label>
      <el-input
        v-model="formData.summary"
        type="textarea"
        style="width: 340px"
      />
    </div>
  </div>
</template>

<script setup>
import Vditor from "vditor";
import { onMounted, ref } from "vue";
import { publishArticleAPI } from "@/apis/article.js";

const VDITOR = ref(null);

const formData = ref({
  title: "",
  summary: "",
  content: "",
  cover_img: "",
});

const submit = () => {
  console.log("--->", VDITOR.value.getValue());
  formData.value.content = VDITOR.value.getValue();
  formData.value.cover_img = "aaa";
  publishArticleAPI(formData.value);
};

onMounted(() => {
  VDITOR.value = new Vditor("vditor", {
    height: 600,
    mode: "sv",
    // 其他配置...
  });
});
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  padding: 12px;
}
.container {
  width: 100%;
  border: 1px solid red;
  padding: 12px;
  margin: 0 auto;
}
</style>
