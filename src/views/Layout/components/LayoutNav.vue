<script setup>
import {useUserStore} from "@/stores/user.js";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import Login from "@/views/Login/index.vue";

const userStore = useUserStore()

let c1 = ref()
const toLoginComponent = ()=>{
  c1.value.showLoginDialog = true
}

const loginOut = () => {
  userStore.LoginOut()
  ElMessage({type:'success', message:'退出登录成功'})
}

</script>

<template>
  <nav class="app-topnav container app-topnav-container">
    <ul class="top-left">
      <li>
        <router-link to="/">
          <el-image class="logo" src="http://sihrw5mu0.sabkt.gdipper.com/20201124032511-removebg-preview.png">
          </el-image>
        </router-link>
      </li>
      <li><router-link to="/">博客</router-link></li>
      <li><router-link to="/">下载</router-link></li>
      <li><router-link to="/">学习</router-link></li>
      <li><router-link to="/">社区</router-link></li>
      <li><router-link to="/">知道</router-link></li>
      <li><a href="https://github.com/yswang837/prettyy-web-online" target="_blank">项目Github地址</a></li>
      <li><router-link to="/">InsCode</router-link></li>
      <li><router-link to="/">会议</router-link></li>
    </ul>
    <div class="top-middle">
      <div class="search">
        <el-input class="search-input" placeholder="如何搭建redis的主从同步" type="text"></el-input>
        <el-button class="search-button"><i class="iconfont icon-sousuo"></i>搜索</el-button>
      </div>
    </div>
    <div class="top-right">
      <ul class="top-right-items">
        <!--    多模板渲染，区分登录状态和非登录状态    -->
        <!--    适配思路，登录后显示第一块，非登录显示第二块，用是否有token来判断是否登录    -->
        <template v-if="userStore.userInfo.token">
          <li class="avatar">
            <a href="#">
              <el-popover placement="bottom" :width="100" trigger="hover">
                <template #reference>
                  <el-avatar shape="circle" :size="40" :src="userStore.userInfo.user.avatar"/>
                </template>
                <div class="nick-name">{{userStore.userInfo.user.nick_name}}</div>
                <hr>
                <div class="person-data">
                  <div>
                    <router-link to="/">
                      <div class="person-data-number">301</div>
                      <div>粉丝</div>
                    </router-link>
                  </div>
                  <div>
                    <router-link to="/">
                      <div class="person-data-number">29</div>
                      <div>关注</div>
                    </router-link>
                  </div>
                  <div>
                    <router-link to="/">
                      <div class="person-data-number">155</div>
                      <div>获赞</div>
                    </router-link>
                  </div>
                </div>
                <hr>
                <ul class="func-list">
                  <li><router-link :to="{path: `user-center`}"><i class="iconfont icon-geren"></i>个人中心</router-link></li>
                  <li><router-link :to="{path: `creation-center/2-1`}"><i class="iconfont icon-wodewengao"></i>内容管理</router-link></li>
                  <li><router-link to="/"><i class="iconfont icon-xiaoyuanzhaopin"></i>我的学习</router-link></li>
                  <li><router-link to="/"><i class="iconfont icon-dingdan"></i>我的订单</router-link></li>
                  <li><router-link to="/"><i class="iconfont icon-licai"></i>我的钱包</router-link></li>
                  <li><router-link to="/"><i class="iconfont icon-yunzhineng"></i>我的云服务</router-link></li>
                  <li><router-link to="/"><i class="iconfont icon-dengji"></i>我的等级</router-link></li>
                  <li><router-link to="/"><i class="iconfont icon-liwu"></i>签到抽奖</router-link></li>
                  <li><router-link to="/" @click="loginOut"><i class="iconfont icon-tuichu"></i>退出登录</router-link></li>
                </ul>
              </el-popover>
            </a>
          </li>
          <li><a href="#">会员中心</a></li>
          <li><a href="#">消息</a></li>
          <li><a href="#">历史</a></li>
          <li><router-link to="/creation-center">创作中心</router-link></li>
          <li>
            <router-link to="/publish-article">
              <el-button class="publish-btn"><i class="iconfont icon-tianjia1"></i>发布</el-button>
            </router-link>
          </li>
        </template>
        <template v-else>
          <li>
            <el-popover placement="bottom" title="登录享更多权益：" :width="350" trigger="hover">
              <template #reference>
                <el-avatar class="to-login-avatar" @click="toLoginComponent">登录</el-avatar>
              </template>
              <ul class="main-func-list">
                <li><i class="iconfont icon-daimashili"></i>免费复制全文</li>
                <li><i class="iconfont icon-shoucang"></i>关注/点赞/评论/收藏</li>
                <li><i class="iconfont icon-xiazai"></i>下载海量资源</li>
                <li><i class="iconfont icon-bianji"></i>写文章/发动态/加入社区</li>
              </ul>
              <el-button class="to-login-btn" type="primary" @click="toLoginComponent">立即登录</el-button>
            </el-popover>
          </li>
          <li><a href="#">会员中心</a></li>

          <li><a href="#"><el-badge is-dot :offset="[5, 2]">消息</el-badge></a></li>
          <li><a href="#">历史</a></li>
          <li><a href="#">创作中心</a></li>
          <li>
            <router-link to="/publish-article">
              <el-button class="publish-btn"><i class="iconfont icon-tianjia1"></i>发布</el-button>
            </router-link>
          </li>
        </template>
      </ul>
      <Login ref="c1" />
    </div>

  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #fff;
  height: 48px;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 1px 3px rgba(118, 118, 118, 0.2); /* 下方阴影 */
}

.app-topnav-container {
  display: flex;
  padding: 0 24px;
}
//
.app-topnav-container .top-left {
  display: flex;
  line-height: 48px;
}
.app-topnav-container .top-left .logo {
  width: 80px;
  height: 44px;
}
.app-topnav-container .top-left li {
  padding: 0 10px;
}
.top-left li:hover {
  background-color: #f0f0f5;
}
.top-left li:first-child:hover {
  background-color: white;
}
.top-middle {
  padding: 0 32px;
  width: 580px;
}
.search {
  display: flex;
  margin-top: 8px;
}
.search-button, .search-input:deep(.el-input__wrapper) {
  border-radius: 0;
}
.search-input:deep(.el-input__wrapper) {
  border-top-left-radius: 20px; /* 右上角圆角 */
  border-bottom-left-radius: 20px; /* 右下角圆角 */
}
.search-button {
  background-color: $bjColor;
  color: white;
  border-top-right-radius: 20px; /* 右上角圆角 */
  border-bottom-right-radius: 20px; /* 右下角圆角 */
  border: 1px solid $bjColor;
}
.search-button:hover {
  background-color: #e73a4b;
  color: white;
  border: 1px solid #e73a4b;
}
.icon-sousuo {
  margin-right: 5px;
}
.top-right-items {
  display: flex;
  align-items: center;
}
.top-right-items .avatar {
  margin-top: 4px;
  margin-left: 15px;
  margin-right: 45px;
  width: 40px;
  height: 40px;
  position: relative;
  transition: all .3s;
}
.top-right-items .avatar:hover {
  top: 2px;
}
.top-right-items li {
  margin-top: 3px;
  padding: 0 10px;
}
.publish-btn {
  background-color: $bjColor;
  color: white;
  border-radius: 20px;
  margin-left: 13px;
}
.icon-tianjia1 {
  padding: 0 5px;
}

.person-data {
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.person-data-number {
  font-weight: bold;
  font-size: 16px;
}
.nick-name {
  font-size: 16px;
  text-align: center;
  color: #43341b;
}
.func-list li {
  padding: 5px;
}
.func-list li:hover {
  background-color: #f0f0f5;
}
.func-list li i {
  padding-right: 12px;
}
.main-func-list {
  display: flex;
  flex-wrap: wrap;
}
.main-func-list li {
  padding: 8px 12px;
}
.main-func-list i {
  margin-right: 3px;
}
.to-login-avatar {
  cursor: pointer;
  color: #222226;
  background-color: #e8e8ed;
  margin-top: 2px;
  margin-left: 10px;
  margin-right: 30px;
}
.to-login-btn {
  margin-top: 10px;
}
</style>