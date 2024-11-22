<script setup>

</script>

<template>
<div class="aboutus-card">
  <div class="worktime">联系我们（工作时间：8:30-22:00）</div>
  <ul class="contact">
    <li>400-820-2828</li>
    <li>kefu@ddblog.com</li>
    <li><a href="#">在线客服</a></li>
  </ul>
  <ul class="foot-nav">
    <li><a href="#">关于我们</a></li>
    <li><a href="#">招贤纳士</a></li>
    <li><a href="#">商务合作</a></li>
    <li><a href="#">寻求报道</a></li>
  </ul>
  <div class="other-info">
    <a class="backup-code" href="#">京ICP备2024096441号</a>
    <a href="#">经营性网站备案信息</a>
    <br>
    <a href="#">
      <i class="iconfont icon-jingcha"></i>
      公安备案号11010182030143
    </a>
    <a href="#">营业执照</a>
    <br>
    <a href="#">北京互联网违法和不良信息举报中心</a>
    <br>
    <a href="#">中国互联网举报中心</a>
    <a href="#">网络110报警服务</a>
    <br>
    <a href="#">账号管理规范</a>
    <a href="#">版权与免责声明</a>
    <a href="#">版权申诉</a>
    <br>
    <a href="#">出版物许可证</a>
    <a href="#">Chrome商店下载</a>
    <a href="#">家长监护</a>
    <br>
    <a href="#">©1999-2024北京量子跃迁科技有限公司</a>
  </div>
</div>
</template>

<style scoped lang="scss">
.aboutus-card {
  background-color: white;
  border: 1px solid #c9c1cc;
  padding: 20px;
  border-radius: 3px;
}
.worktime {
  text-align: center;
}
.contact {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c9c1cc;
}
.contact li {
  margin: 8px 0;
}
.foot-nav {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #c9c1cc;
}
.foot-nav li {
  border-right: 1px solid #c9c1cc;
  padding: 0 8px;
}
.foot-nav li:last-child {
  border-right: 0;
}
.backup-code {
  padding-top: 8px;
}
.other-info>a {
  margin-right: 6px;
}
.other-info {
  padding-top: 8px;
  text-align: center;
}


</style>