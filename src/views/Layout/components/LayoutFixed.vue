<script setup>
import {useUserStore} from "@/stores/user.js";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import Login from "@/views/Login/index.vue";
import { useScroll } from '@vueuse/core'

const userStore = useUserStore()
const { y } = useScroll(window)
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
  <nav class="app-topnav" :class="{show: y > 45}">
    <div class="container app-topnav-container">
      <ul>
        <li><router-link to="/">logo</router-link></li>
        <li><router-link to="/">下载资源</router-link></li>
        <li><router-link to="/">学习</router-link></li>
        <li><router-link to="/">社区</router-link></li>
        <li><router-link to="/">才知道</router-link></li>
      </ul>
      <div class="search">
        <el-input class="search-input" placeholder="如何搭建redis的主从同步" type="text"></el-input>
        <el-button class="search-button">站内搜索</el-button>
      </div>

      <ul>
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
                      <div>301</div>
                      <div>粉丝</div>
                    </router-link>
                  </div>
                  <div>
                    <router-link to="/">
                      <div>29</div>
                      <div>关注</div>
                    </router-link>
                  </div>
                  <div>
                    <router-link to="/">
                      <div>155</div>
                      <div>获赞</div>
                    </router-link>
                  </div>
                </div>
                <hr>
                <ul class="func-list">
                  <li><router-link :to="{path: `user-center`}"><i class="iconfont icon-geren"></i>个人中心</router-link></li>
                  <li><router-link to="/"><i class="iconfont icon-wodewengao"></i>内容管理</router-link></li>
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
          <li><a href="#">创作中心</a></li>
          <li> <router-link to="/publish-article">发布</router-link> </li>
        </template>
        <template v-else>
          <li>
              <el-popover placement="bottom" title="登录享更多权益：" :width="350" trigger="hover" content="this is content">
                <template #reference>
                  <el-button @click="toLoginComponent">登录</el-button>
                </template>
                <ul class="main-func-list">
                  <li><i class="iconfont icon-daimashili"></i>免费复制全文</li>
                  <li><i class="iconfont icon-shoucang"></i>关注/点赞/评论/收藏</li>
                  <li><i class="iconfont icon-xiazai"></i>下载海量资源</li>
                  <li><i class="iconfont icon-bianji"></i>写文章/发动态/加入社区</li>
                </ul>
                <el-button class="btn" type="primary" @click="toLoginComponent">立即登录</el-button>
              </el-popover>
          </li>
          <li><a href="#">帮助中心</a></li>
          <li><a href="#">关于我们</a></li>
        </template>
      </ul>
      <Login ref="c1" />
    </div>
  </nav>
</template>


<style scoped lang="scss">

.app-topnav {
  position: fixed;
  width: 100%;
  z-index: 999;
  background: #43341b;
  height: 50px;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
}

.app-topnav-container {
  display: flex;
  justify-content: space-between;
}

.app-topnav-container ul {
  display: flex;
  line-height: 50px;
}

.app-topnav-container ul li {
  padding: 0 10px;
}

.app-topnav-container ul .avatar {
  margin-top: 5px;
}

.app-topnav-container ul li:last-child {
  padding-right: 0;
}

.app-topnav-container ul li:first-child {
  padding-left: 0;
}

.app-topnav-container ul li:hover a {
  color: #ffa200;
}

.app-topnav-container ul li a {
  color: white;
}

.search {
  display: flex;
  margin-top: 9px;
}

.search-input {
  width: 500px;
  height: 33px;
}

.search-button {
  height: 33px;
  font-size: 14px;
  width: 66px;
}

.nick-name {
  font-size: 16px;
  text-align: center;
  color: #43341b;
}

.person-data {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.func-list li {
  padding: 5px;
}

.func-list li:hover {
  background-color: #cecece;
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

.btn {
  margin-top: 10px;
  margin-left: 12px;
}
</style>