<script setup>
defineProps({
  title: {
    type: String
  },
  subTitle: {
    type: String
  },
  authDataList: {
    type: Array
  }
})
</script>

<template>
  <div class="card-panel">
    <div class="auth-panel">
      <template v-if="!subTitle">
        <div class="title">{{title}}</div>
      </template>
      <template v-else>
        <div class="title">
          <span>{{title}}</span>
          <a href="#"><span class="official-account-in">{{subTitle}}</span></a>
        </div>
      </template>
      <ul class="auth-list">
          <li v-for="(item, index) in authDataList" :key="index">
            <el-avatar shape="circle" :size="40" :src="item.avatar"/>
            <div class="person">
              <div class="nick-name">{{item.nickName}}</div>
              <div class="desc">{{item.desc}}</div>
            </div>
            <el-tag round style="cursor: pointer">关注</el-tag>
          </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.card-panel {
  border: 1px solid #c9c1cc;
  background-color: white;
  border-radius: 3px;
}

.auth-panel {
  padding: 20px;
}

.title {
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c9c1cc;
}

.auth-list {
  padding-top: 10px;
}

.auth-list li {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  align-items: center;
}

.auth-list li:last-child {
  padding-bottom: 0;
}

.desc {
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 限制在两行内 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
}

.official-account-in {
  font-size: 14px;
  margin-left:125px;
  color: #4848da;
}

</style>