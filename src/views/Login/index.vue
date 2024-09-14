<script setup>
import LoginComp from "@/views/Login/components/LoginComp.vue";
import {ref,onMounted} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
let c1 = ref()
onMounted(() => {
  if (route.params.test === 'normal') {
    c1.value.showLoginDialog = true
  }
})
</script>

<template>
  <div class="normal">
    <LoginComp :normal="true" ref="c1"/>
  </div>
</template>

<style scoped lang="scss">
.normal {
  width: 100%;
  height: 80vh;
  background-image: url("@/assets/images/login-background.jpg");
}
.normal:deep(.el-dialog) {
  top: 35px;
  right: -400px
}
</style>