<script setup>

</script>

<template>
<div class="feedback">
  <div class="title">您愿意向朋友推荐"笔尖博客"吗？</div>
  <ul class="feedback-svg">
    <li>
      <i class="iconfont icon-feichangbumanyi"></i>
      <span>很不推荐</span>
    </li>
    <li>
      <i class="iconfont icon-bumanyi11"></i>
      <span>不推荐</span>
    </li>
    <li>
      <i class="iconfont icon-yiban"></i>
      <span>一般</span>
    </li>
    <li>
      <i class="iconfont icon-manyidu"></i>
      <span>推荐</span>
    </li>
    <li>
      <i class="iconfont icon-feichangmanyi"></i>
      <span>强烈推荐</span>
    </li>
  </ul>
</div>
</template>

<style scoped lang="scss">
.feedback {
  border: 1px solid #c9c1cc;
  background-color: white;
  border-radius: 3px;
}

.title {
  text-align: center;
  font-size: 16px;
  margin-top: 16px;
}

.feedback-svg {
  display: flex;
  justify-content: space-between;
}

.feedback-svg li {
  display: flex;
  flex-direction: column;
  padding: 10px;
  cursor: pointer;
}

.feedback-svg li i {
  font-size: 30px;
  margin-top: 12px;
  margin-bottom: 6px;
}

.feedback-svg li i, .feedback-svg li span {
  text-align: center;
}

</style>