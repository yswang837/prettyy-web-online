<script setup>

</script>

<template>
  <div class="home-nav">
    <!--  todo 默认显示一行，当鼠标移入到该div中时，像csdn的这个页面(https://blog.csdn.net/?spm=1031.2273.3001.4477)一样，悬浮展示剩下的分类  -->
    <!--  todo 哪个按钮被激活了，那么该按钮显示颜色为：$bjColor  -->
    <span><a href="#" style="color: #e96140">推荐</a></span>
    <span><a href="#">关注</a></span>
    <span><a href="#">后端</a></span>
    <span><a href="#">前端</a></span>
    <span><a href="#">移动开发</a></span>
    <span><a href="#">编程语言</a></span>
    <span><a href="#">java</a></span>
    <span><a href="#">python</a></span>
    <span><a href="#">golang</a></span>
    <span><a href="#">人工智能</a></span>
    <span><a href="#">AIGC</a></span>
    <span><a href="#">大数据</a></span>
    <span><a href="#">数据库</a></span>
    <span><a href="#">数据结构与算法</a></span>
    <span><a href="#">云计算</a></span>
    <span><a href="#">云原生</a></span>
    <span><a href="#">云平台</a></span>
    <span><a href="#">小程序</a></span>
    <span><a href="#">开源</a></span>
    <span><a href="#">harmonyOS</a></span>
    <span><a href="#">区块链</a></span>
    <span><a href="#">开发工具</a></span>
    <span><a href="#">游戏</a></span>
    <span><a href="#">数学</a></span>
    <span><a href="#">3C硬件</a></span>
    <span><a href="#">咨讯</a></span>
  </div>
</template>

<style scoped lang="scss">
.home-nav {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  background-color: #fafafa;

}

.home-nav span {
  font-size: 16px;
  margin: 5px 18px;
}
</style>