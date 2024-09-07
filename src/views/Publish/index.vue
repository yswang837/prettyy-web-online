<template>
  <div class="head">
    <el-input
      v-model="formData.title"
      placeholder="请输入文章标题..."
      size="large"
    ></el-input>
    <el-button @click="() => router.go(-1)" class="ml-12" style="height: 40px"
      >返回</el-button
    >
    <el-button @click="submit" type="primary" style="height: 40px" class="ml-12"
      >提交</el-button
    >
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
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const userStore = useUserStore();
const router = useRouter();

const VDITOR = ref(null);

const formData = ref({
  title: "",
  summary: "",
  content: "",
  cover_img:
    "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a02a4aadb33d429999e0cbf706ddf9b0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1080&h=568&s=106478&e=webp&b=1a2437",
  tags: "tag",
});

const submit = async () => {
  formData.value.content = VDITOR.value.getValue();
  await publishArticleAPI({
    ...formData.value,
    uid: userStore.userInfo.user.uid,
  });
  ElMessage({ type: "success", message: "提交成功" });
  router.go(-1);
};

onMounted(() => {
  VDITOR.value = new Vditor("vditor", {
    height: 600,
    mode: "sv",
    // 其他配置...
  });
  setTimeout(() => {
    VDITOR.value.setValue("");
  }, 200);
});
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  padding: 12px;
}
.container {
  width: 100%;
  padding: 12px;
  margin: 0 auto;
}
</style>
