<script setup>
import {onMounted, ref} from "vue";
import {getUserInfoByAidAPI} from "@/apis/article.js";
import {useRoute} from "vue-router";

const route = useRoute()
const userInfo = ref(null)
const getUserInfoByAid = async () => {
  const res = await getUserInfoByAidAPI(route.params.aid)
  userInfo.value = res.result
  // console.log('aa',userInfo.value)
}
onMounted(() => {
  getUserInfoByAid()
})
</script>

<template>
  <div class="base-info">
    <div class="part1-container">
      <!--       这里的相关信息均是文章所属者的       -->
      <el-avatar class="avatar" shape="circle" :size="48" :src="userInfo?.avatar"/>
      <div>
        <div class="username">{{userInfo?.nick_name}}</div>
        <div>
          <span class="code-age">码龄 1733 天</span>
          <span class="auth"><i class="iconfont icon-daV"></i>暂无认证</span>
        </div>
      </div>
    </div>
    <div class="part2-container">
      <dl>
        <dt>76</dt>
        <dd>原创</dd>
      </dl>
      <dl>
        <dt>30万+</dt>
        <dd>周排名</dd>
      </dl>
      <dl>
        <dt>5万+</dt>
        <dd>总排名</dd>
      </dl>
      <dl>
        <dt>2万+</dt>
        <dd>访问量</dd>
      </dl>
      <dl>
        <dt>4</dt>
        <dd>等级</dd>
      </dl>
    </div>
    <div class="part3-container">
      <dl>
        <dt>827</dt>
        <dd>积分</dd>
      </dl>
      <dl>
        <dt>45</dt>
        <dd>粉丝数</dd>
      </dl>
      <dl>
        <dt>61</dt>
        <dd>获赞数</dd>
      </dl>
      <dl>
        <dt>9</dt>
        <dd>评论数</dd>
      </dl>
      <dl>
        <dt>59</dt>
        <dd>收藏</dd>
      </dl>
    </div>
    <div class="part4-container">
      <img class="polygon-image" src="http://sihrw5mu0.sabkt.gdipper.com/qixiebiaobing4%40240.png" title="勤写标兵" alt />
      <img class="polygon-image" src="http://sihrw5mu0.sabkt.gdipper.com/chizhiyiheng%40240.png" title="持之以恒" alt />
      <img class="polygon-image" src="http://sihrw5mu0.sabkt.gdipper.com/xinxiu%40240.png" title="创作新秀" alt />
    </div>
    <div class="part5-container">
      <el-button class="base-btn">私信</el-button>
      <el-button class="base-btn">关注</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-info {
  height: 308px;
  margin-bottom: 10px;
  background-color: white;
  .part1-container {
    display: flex;
    padding: 16px 16px 6px 16px; // 上右下左
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .username {
      font-size: 15px;
      margin-bottom: 2px;
    }
    .code-age {
      color: #999aa9;
      margin-right: 25px;
    }
    .auth {
      color: #848594;
      .icon-daV {
        margin-right: 5px;
      }
    }
  }
  .part2-container, .part3-container {
    display: flex;
    padding: 10px;
    justify-content: space-around;
  }
  .part2-container dl, .part3-container dl {
    text-align: center;
  }
  .part2-container dt, .part3-container dt {
    margin-bottom: 6px;
  }
  .part2-container {
    border-bottom: 1px solid #f5f6f7;
  }
  .part3-container dd {
    color: #999aa9;
  }
  .part4-container {
    padding: 5px 16px;
    .polygon-image {
      margin-right: 5px;
      width: 36px; /* 设置图片的宽度 */
      height: 36px; /* 设置图片的高度，根据六边形的比例计算 */
      cursor: pointer;
    }
  }
  .part5-container {
    display: flex;
    justify-content: space-between;
    margin: 8px 16px 10px 16px;
    .base-btn {
      width: 124px;
      border-radius: 20px;
      font-weight: normal;
      &:hover {
        border: 1px solid black;
        background-color: white;
        color: #606266;
      }
    }
  }
}
</style>