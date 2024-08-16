<script setup>
import {ref} from "vue";
import Profile from "@/views/User/components/Profile.vue";
import Account from "@/views/User/components/Account.vue";
import Secret from "@/views/User/components/Secret.vue";
import Auth from "@/views/User/components/Auth.vue";
import Collection from "@/views/User/components/Collection.vue";
import History from "@/views/User/components/History.vue";

const defaultActive = ref('1')
const handleSelect = (key) => {
  defaultActive.value = key
}
</script>

<template>
  <div class="container">
    <div class="main-content">
      <div class="left">
        <el-menu background-color="#41352c"  text-color="#ffffff" active-text-color="#ffd04b" :default-active="defaultActive" @select="handleSelect">
          <el-menu-item index="1"><i class="iconfont icon-moban">&nbsp;&nbsp;&nbsp;个人资料</i></el-menu-item>
          <el-menu-item index="2"><i class="iconfont icon-zhanghaoshezhi">&nbsp;&nbsp;&nbsp;账号设置</i></el-menu-item>
          <el-menu-item index="3"><i class="iconfont icon-yinsishezhi">&nbsp;&nbsp;&nbsp;隐私设置</i></el-menu-item>
          <el-menu-item index="4"><i class="iconfont icon-xinxirenzheng">&nbsp;&nbsp;&nbsp;信息认证</i></el-menu-item>
          <el-menu-item index="5"><i class="iconfont icon-shoucang2">&nbsp;&nbsp;&nbsp;我的收藏</i></el-menu-item>
          <el-menu-item index="6"><i class="iconfont icon-liulanlishi">&nbsp;&nbsp;&nbsp;浏览历史</i></el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <Profile v-if="defaultActive === '1'"/>
        <Account v-if="defaultActive === '2'"/>
        <Secret v-if="defaultActive === '3'"/>
        <Auth v-if="defaultActive === '4'"/>
        <Collection v-if="defaultActive === '5'"/>
        <History v-if="defaultActive === '6'"/>
      </div>
    </div>
    <div class="footer">
      footer
    </div>
  </div>


</template>

<style scoped lang="scss">
.main-content {
  display: flex;
  margin-top: 10px;
}
.left {
  flex: 1;
  margin-left: 210px;
}
.iconfont {
  margin-left: 42px;
}
.right {
  flex: 4;
  margin-left: 10px;
  margin-right: 210px;
  background-color: #ebebeb;
}
</style>