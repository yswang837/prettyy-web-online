<template>
  <div class="nav">
    <div class="nav--container">
      <div class="nav--container--links">
        <a>笔尖</a>
        <a>资源</a>
        <a>学习</a>
        <a href="https://github.com/yswang837/prettyy-web-online" target="_blank">github</a>
      </div>
      <el-input v-model="keyword" placeholder="如何搭建redis的主从同步" :suffix-icon="Search" />
      <el-button @click="publish" v-if="userStore.userInfo.token" type="primary" class="ml-12">发布</el-button>
      <el-button v-if="!userStore.userInfo.token" @click="goLogin" type="primary" class="ml-12">登录</el-button>
      <div v-else class="ml-12">
        <el-popover placement="bottom" width="60" trigger="click">
          <template #reference>
            <el-avatar style="display: block;" shape="circle" :size="40"
              src="https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg" />
          </template>
          <el-button @click="logout" type="text" style="margin: 0 auto;display: block;">退出</el-button>
        </el-popover>

      </div>
    </div>
  </div>
  <el-dialog v-model="loginDialogShow" title="登录笔尖平台" width="360" :before-close="handleClose">
    <el-form ref="form" style="max-width: 330px" :model="loginData" :rules="rules" label-width="auto"
      class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginData.email" />
      </el-form-item>
      <el-form-item label="验证码" prop="identify_code">
        <el-input v-model="loginData.identify_code">
          <template #append>
            <el-button @click="getIdentityCode">验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="loginDialogShow = false">取消</el-button>
        <el-button type="primary" @click="loginOrRegisterByCode">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { getIdentityCodeByEmailAPI } from '@/apis/base.js';
import { ref } from 'vue';
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const userStore = useUserStore()
const router = useRouter()

const keyword = ref('')

const loginDialogShow = ref(false)

const loginData = ref({
  email: '',
  identify_code: ''
})

const goLogin = () => {
  loginDialogShow.value = true
}
const getIdentityCode = () => {
  getIdentityCodeByEmailAPI(loginData.value.email)
}

// 通过邮箱和验证码登录
const loginOrRegisterByCode = async () => {
  await userStore.loginByCodeAndSetUserInfo(loginData.value.email, loginData.value.identify_code, 1)
  ElMessage({ type: 'success', message: '登录成功' })
  // 跳转到首页
  loginDialogShow.value = false
  router.push({ path: '/' })
}

const logout = () => {
  userStore.LoginOut()
}

</script>

<style scoped lang='scss'>
@import '../../../styles/var';

.nav {
  width: 100%;
  height: 56px;
  position: fixed;
  top: 0;
  z-index: 99999;
  background: #fff;
  border-bottom: 1px solid #d6d9dc;
  border-top: 3px solid $--theme-primary;

  &--container {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    &--links {
      width: 238px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      font-family: Arial, Helvetica, sans-serif;

      a {
        cursor: pointer;
      }
    }
  }
}
</style>