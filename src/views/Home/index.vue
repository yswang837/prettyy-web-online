<script setup>
import ArticlePanel from "@/views/Home/components/ArticlePanel.vue";
import RightCard from '@/views/Home/components/RightCard.vue'
import FeedBack from "@/views/Home/components/FeedBack.vue";
import AboutUs from "@/views/Home/components/AboutUs.vue";
import BottomLine from "@/views/Home/components/BottomLine.vue";
import HomeNav from "@/views/Home/components/HomeNav.vue";
import {getArticleListAPI} from "@/apis/article.js";
import {ref, onMounted} from "vue";

const articleList = ref([])
const getArticleList = async (page, page_size) => {
  // 主页获取文章列表，不需要传递uid，获取所有文章列表
  const res = await getArticleListAPI(0, page, page_size)
  articleList.value = res.result.article_list
  // console.log('article list', articleList.value)
}

onMounted(() => getArticleList(page.value, pageSize))

const authDataList = ref([
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },
  {
    avatar: 'https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg',
    nickName: '博文视点',
    desc: 'IT出版旗舰品牌，由电子工业出版社主导，成立时间为1999年8月17日，发布了书万本销量过亿的图书'
  },

])

let page = ref(1)
const pageSize = 10
let disabled = ref(false)
const load = async () => {
  // console.log('准备加载更多数据..')
  page.value++
  const res = await getArticleListAPI(0, page.value, pageSize)
  articleList.value=[...articleList.value,...res.result.article_list]
  // 加载完毕，停止监听
  if (res.result.length !== pageSize) {
    disabled.value = true
  }
}

</script>

<template>
  <div class="container">
    <div class="main-content">
      <div class="home-nav">
        <HomeNav />
      </div>
      <div class="home-content">
        <div class="article-section" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
          <ArticlePanel v-for="article in articleList" :key="article.aid"
                        :title="article.title" :summary="article.summary"
                        :cover-img="article.cover_img" :aid="article.aid"/>
          <BottomLine :disabled="disabled"/>
        </div>
        <div class="right-side">
          <div class="auth">
            <RightCard title="优秀作者" :auth-data-list="authDataList"/>
          </div>
          <div class="official-blog">
            <RightCard title="官方博客" :auth-data-list="authDataList"/>
<!--            <RightCard title="官方博客" :auth-data-list="authDataList" sub-title="官方账号入住"/>-->
          </div>
          <div class="feedback">
            <FeedBack />
          </div>
          <div class="aboutus">
            <AboutUs />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  display: flex;
  flex-direction: column;
}
.home-content {
  display: flex;
}
.home-nav {
  flex: 4;
  margin: 20px 55px;
}
.article-section {
  flex: 3;
  margin-left: 110px;
}
.right-side {
  flex: 1;
  margin-right: 110px;
  margin-left: 20px;
}
.right-side .official-blog {
  position: sticky;
  top: -200px;
}

.right-side .feedback {
  position: sticky;
  top: 380px;
}

.right-side .aboutus {
  position: sticky;
  top: 519px;
}

</style>






