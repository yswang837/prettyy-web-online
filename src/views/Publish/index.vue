<script setup>
import {ref, reactive, watch, nextTick, onMounted} from 'vue'
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import {getArticleDetailAPI, publishArticleAPI} from "@/apis/article.js";
import {getColumnListByUidAPI, getColumnListByAidAPI} from "@/apis/column.js";
import UploadImg from '@/components/UploadImg/index.vue'
import getUidFromJwt from "@/utils/parseJwt.js";
import {UploadFileAPI} from "@/apis/upload.js";
// import {extractSummaryAPI} from "@/apis/article.js";
import { useScroll } from '@vueuse/core'
import Vue3Tinymce from '../../../packages/Vue3Tinymce';

const router = useRouter()
const route = useRoute()
const { y } = useScroll(window)

const columnObj = ref({})
onMounted(async () => {
  const res = await getColumnListByUidAPI(getUidFromJwt())
  // console.log('res....',res)
  columnObj.value = res.result
  // console.log('column value',columnObj.value)
  // console.log('column value',columnObj.value['AB73256199780306944'])
  // console.log('编辑文章的aid',route.params.aid)
  if (route.params.aid) {
    const res2 = await getArticleDetailAPI(route.params.aid)
    // console.log('res2.......',res2)
    form.value.title = res2.result.title
    form.value.content = res2.result.content
    form.value.cover_img = res2.result.cover_img
    form.value.summary = res2.result.summary
    form.value.visibility = res2.result.visibility
    form.value.type = res2.result.typ
    form.value.dynamicTags = res2.result.tags.split(',')
    const res3 = await getColumnListByAidAPI(route.params.aid)
    // console.log('res3....',res3.result)
    // console.log('res3333....',Object.values(res3.result))
    form.value.dynamicColumnTags = Object.values(res3.result)
  }
})

const tinymceUpload = (blobInfo) => new Promise((resolve, reject) => {
  const formData = new FormData();
  const file = blobInfo.blob()
  formData.append('file', file)
  UploadFileAPI(formData.get('file')).then(response=>{
    // console.log('response...',response)
    resolve(response.result);
  }).catch(()=>{reject('上传失败')})
  // console.log('res.......',res)

})

const stateClassic = reactive({
  disabled: false,
  setting: {
    menubar: false,
    toolbar:
        'undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
    toolbar_mode: 'warp',
    quickbars_selection_toolbar:
        'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
    plugins: 'link image media table lists fullscreen quickbars',
    fontsize_formats: '12px 14px 16px 18px',
    default_link_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: true,
    images_upload_handler: tinymceUpload,
    // 设置中文语言
    language: 'zh-Hans',
    language_url: '/tinymce/langs/zh-Hans.js',
    content_style: 'body{font-size: 14px}',
    height: 600,
    branding: false, // 是否显示“Powered by TinyMCE”
    promotion: false, //是否显示 upgrade
    statusbar: true,  //最下方的元素路径和字数统计那一栏是否显示
    paste_data_images: true, //允许粘贴图像，图片粘贴自动上传需要
    placeholder: "尽情创作吧~",
    link_default_target: "_blank",  // 超链接默认打开方式
    link_context_toolbar: true,
    quickbars_insert_toolbar: "none", // 默认快捷菜单
  },
});

// 1、表单对象
const form = ref({
  title: '',
  content: '',
  cover_img: '',
  summary: '',
  visibility: '1',
  type: '1',
  dynamicTags : [],
  dynamicColumnTags : []
})

// title字数统计
const titleLength = ref(0)
watch(()=>form.value.title, (newValue) => {
  titleLength.value = newValue.length
});

// 摘要字数统计
const summaryLength = ref(0)
watch(()=>form.value.summary, (newValue) => {
  summaryLength.value = newValue.length
});

// 正文字数统计
// const contentLength = ref(0)
// watch(()=>form.value.content, () => {
//   contentLength.value = t1.value.handleGetContent().replaceAll('\n','').length
// });

// 一键提取摘要
// const t1 = ref(null)
// const isLoading = ref(false)
// const extractSummary = async () => {
//   isLoading.value = true
//   const res = await extractSummaryAPI('提取一下这段话的一个摘要，字数在100字以下。' + t1.value.handleGetContent())
//   // console.log('摘要res', res)
//   form.value.summary = res.result
//   isLoading.value = false
// }

// todo 支持切换到markdown编辑器的功能

function findAidByTitle(title, dictionary) {
  // console.log('findAidByTitle', title, dictionary.value)
  for (const aid in dictionary.value) {
    // console.log('findAidByTitle', aid, title, dictionary.value[aid])
    if (dictionary.value[aid] === title) {
      return aid;
    }
  }
  return '';
}
function concatenateAids(titles, dictionary) {
  return titles.map(title => {
    // 使用辅助函数查找每个标题对应的 aid
    const aid = findAidByTitle(title, dictionary);
    // 拼接字符串，格式为 "aid,title"
    return `${aid},${title}`;
  }).join(','); // 使用逗号和空格连接每个拼接好的字符串
}
const submit = async () => {
  // console.log('aid.....',route.params.aid)
  // aid为空则是发布文章，否则是编辑文章
  await publishArticleAPI(route.params.aid, form.value.title, form.value.content, form.value.cover_img, form.value.summary, form.value.visibility, form.value.dynamicTags.join(','), form.value.type, concatenateAids(form.value.dynamicColumnTags, columnObj), getUidFromJwt())
  ElMessage({type:'success', message: '文章添加成功'})
  await router.push('/')
}

const files = ref([])

// 文章标签逻辑
const handleClose = (tag) => {
  form.value.dynamicTags.splice(form.value.dynamicTags.indexOf(tag), 1)
}
const inputVisible = ref(false)
const inputValue = ref('')
const InputRef = ref(null)
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    form.value.dynamicTags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

// 分类专栏逻辑
const handleColumnClose = (tag) => {
  form.value.dynamicColumnTags.splice(form.value.dynamicColumnTags.indexOf(tag), 1)
}
const inputColumnVisible = ref(false)
const inputColumnValue = ref('')
const InputColumnRef = ref(null)
const showColumnInput = async () => {
  inputColumnVisible.value = true
  nextTick(() => {
    InputColumnRef.value.input.focus()
  })
  const res = await getColumnListByUidAPI(getUidFromJwt())
  // console.log('new res123....',res)
  columnObj.value = res.result
}
const handleColumnInputConfirm = () => {
  if (inputColumnValue.value) {
    if (!form.value.dynamicColumnTags.includes(inputColumnValue.value)) {
      form.value.dynamicColumnTags.push(inputColumnValue.value)
    }else {
      ElMessage({type:'warning', message:'专栏已存在'})
    }
  }
  inputColumnVisible.value = false
  inputColumnValue.value = ''
}

const backTop = () => {
  let top = document.documentElement.scrollTop//获取点击时页面的滚动条纵坐标位置
  const timeTop = setInterval(() => {
    document.documentElement.scrollTop = top -= 50//一次减50往上滑动
    if (top <= 0) {
      clearInterval(timeTop)
    }
  }, 5)//定时调用函数使其更顺滑
}
const backBottom = () => {
  let top = document.documentElement.scrollTop//获取点击时页面的滚动条纵坐标位置
  const timeTop = setInterval(() => {
    document.documentElement.scrollTop = top += 50//一次减50往上滑动
    if (top >= 700) {
      clearInterval(timeTop)
    }
  }, 5)//定时调用函数使其更顺滑
}

</script>

<template>
  <div class="container">
    <div class="toolbar-bacc"></div>
    <div class="publish-article-container">
      <div class="left">
        目录
        <!--   todo tinymec有付费插件支持自动目录的功能，目前未考虑付费，需要实现该功能，想支持h1,h2,h3,h4的自动目录   -->
        <br>
        <span style="font-size: 13px">为文内增加标题，这里将生成目录</span>
      </div>
      <div class="right">
        <el-form :model="form">
          <el-form-item>
            <div class="title-container">
              <input class="article-title" v-model="form.title" placeholder="请输入文章标题（5～100个字）" maxlength="100"/>
              <div class="word-count">
                <span class="title-desc" v-if="titleLength<5">还需输入 {{ 5-titleLength }} 个字</span>
                <span v-else>{{titleLength}} / 100</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
<!--            <div>{{form.content}}</div>-->
            <section class="section">
              <vue3-tinymce v-model="form.content" :setting="stateClassic.setting"/>
            </section>
          </el-form-item>
          <!--     为了遮住无法去掉的横线的空的div条     -->
          <div class="empty-div"></div>
          <el-form-item class="setting-label" label="文章标签">
            <div class="tags-container">
              <el-tag class="tag" v-for="tag in form.dynamicTags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
                {{ tag }}
              </el-tag>
              <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small" style="width: 100px;" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"/>
              <!--       最多只能添加7个标签       -->
              <el-button v-else :class="form.dynamicTags.length >= 7?'hidden-add-tags':''" size="small" @click="showInput">+ 添加文章标签</el-button>
            </div>
          </el-form-item>
          <el-form-item class="setting-label" label="上传封面">
            <UploadImg class="cover-container" :showDelete="true" :files="files">
              <template v-slot:trigger="slotProps">
                <div class="preview-container" v-if="form.cover_img">
                  <el-image :src="form.cover_img"></el-image>
                </div>
                <div v-else>
                  <div class="preview-container" v-if="!slotProps.myCoverImg">
                    <i class="iconfont icon-tianjia" style="cursor: pointer"></i>
                    <div>添加文章封面</div>
                  </div>
                  <div class="preview-container" v-else>
                    <el-image :src="form.cover_img=slotProps?.myCoverImg?slotProps.myCoverImg:''" fit="cover"></el-image>
                  </div>
                </div>
              </template>
            </UploadImg>
          </el-form-item>
          <el-form-item class="setting-label" label="文章摘要">
            <textarea class="summary" placeholder="摘要：会在推荐、列表等场景外露，帮助读者快速了解内容，支持一键AI提取摘要到本文本框" v-model="form.summary" maxlength="256"></textarea>
            <div class="summary-detail">
              <span class="summary-count">{{summaryLength}} / 256</span>
              <el-button class="btn-extract" @click="extractSummary" :disabled="isLoading">
                <span v-if="!isLoading">一键提取</span>
                <img class="load-img" v-else src="/src/assets/images/loading.gif" alt="">
              </el-button>
            </div>
          </el-form-item>
          <el-form-item class="setting-label" label="分类专栏">
            <div class="tags-container">
              <el-tag class="tag" v-for="tag in form.dynamicColumnTags" :key="tag" closable :disable-transitions="false" @close="handleColumnClose(tag)">
                {{ tag }}
              </el-tag>
              <el-input v-if="inputColumnVisible" ref="InputColumnRef" v-model="inputColumnValue" size="small" style="width: 100px;" @keyup.enter="handleColumnInputConfirm" @blur="handleColumnInputConfirm"/>
              <el-popover v-if="form.dynamicColumnTags.length<3" placement="bottom" :width="400" trigger="click">
                <template #reference>
                  <el-button :class="form.dynamicColumnTags.length >= 3?'hidden-add-tags':''" size="small" @click="showColumnInput">+ 添加文章专栏</el-button>
                </template>
                <el-checkbox-group v-model="form.dynamicColumnTags">
                  <el-checkbox v-for="(title,cid ) in columnObj" :key="cid" :value="title">{{title}}</el-checkbox>
                </el-checkbox-group>
              </el-popover>
            </div>
          </el-form-item>
          <el-form-item class="setting-label" label="文章类型">
            <div class="article-type">
              <input v-model="form.type" type="radio" value="1" name="type" checked>原创
              <input v-model="form.type" type="radio" value="2" name="type">转载
              <input v-model="form.type" type="radio" value="3" name="type">翻译
            </div>
          </el-form-item>
          <el-form-item class="setting-label" label="可见范围">
            <div class="visibility-container">
              <input v-model="form.visibility" type="radio" value="1" name="visibility" checked>全部可见
              <input v-model="form.visibility" type="radio" value="2" name="visibility">仅我可见
              <input v-model="form.visibility" type="radio" value="3" name="visibility">粉丝可见
              <input v-model="form.visibility" type="radio" value="4" name="visibility">VIP可见
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--     占位，避免”可见范围“离底部太近     -->
    <div style="width: 100%;height: 80px;background-color: #f5f6f7;"></div>
    <div class="footer-container">
      <div class="content">
        <div class="desc">
          <span class="word-count">正文共{{contentLength}}字</span>
          <span v-if="y>400" style="cursor: pointer" @click="backTop">回到顶部<i class="iconfont icon-jiankuohaoshang"></i></span>
          <span v-else style="cursor: pointer" @click="backBottom">发文设置<i class="iconfont icon-jiankuohaoshang-copy"></i></span>
        </div>
        <div class="buttons">
<!--          <el-button class="btn">保存草稿</el-button>-->
<!--          <el-button class="btn">定时发布</el-button>-->
          <el-button class="btn" @click="submit" type="primary">发布文章</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar-bacc {
  position: fixed;
  top: 44px;
  width: 100%;
  height: 90px;
  background-color: #f5f6f7;
  z-index: 300;
  border-bottom: 1px solid #d7d6d6;
}
.publish-article-container {
  display: flex;
  padding-top: 120px;
  background-color: #f5f6f7;
  .left {
    position: sticky;
    top: 140px;
    flex: 1;
    margin-left: 50px;
    height: 610px;
    margin-right: 35px;
    background-color: #fff;
  }
  .right {
    flex: 5;
    margin-left: 40px;
    margin-right: 330px;
    background-color: #ffffff;
    .title-container {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #e8e7e8;
      .article-title {
        flex: 10;
        border: none; /* 移除边框 */
        padding: 15px 15px 15px 35px;
        outline: none; /* 移除聚焦时的轮廓 */
        font-family: Arial, sans-serif; /* 设置字体 */
        font-size: 20px; /* 设置字号 */
        font-weight: bold;
        line-height: 1.5; /* 设置行高 */
        min-width: 100px; /* 设置最小宽度，防止输入框过窄 */
        &::placeholder {
          color: #c1c4cb;
        }
      }
      .word-count {
        flex: 1.3;
        color: #364354;
        font-size: 12px;
        .title-desc {
          margin-right: 20px
        }
      }
    }
    .empty-div {
      width: 100%;
      height: 20px;
      background-color: #f5f6f7;
      position: relative;
      top: -30px
    }
    .article-type, .visibility-container {
      margin-left: 40px;
      input {
        margin-left: 30px;
      }
      &:first-child {
        margin-left: 10px;
      }
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      margin-left: 40px;
      .tag {
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 8px;
      }
      .hidden-add-tags {
        display: none;
      }
    }
    .summary {
      width: 85%;
      height: 80px;
      margin-left: 40px;
      resize: none;
      border: 1px solid #d6d6d8;
      &::placeholder {
        color: #c1c4cb;
      }
    }
    .summary-detail {
      margin-left: 396px;
      .summary-count {
        font-size: 11px;
        margin-right: 8px;
      }
      .btn-extract {
        font-size: 11px;
        border-radius: 20px;
        width: 60px;
        height: 22px;
        .load-img {
          width: 16px;
        }
      }
    }

  }
}
.footer-container {
  position: fixed;
  display: flex;
  bottom: 0;
  background-color: white;
  height: 45px;
  width: 100%;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px;
    .word-count {
      color: #787984;
      margin-right: 20px;
    }
    .back-to-top {
      top: 0;
    }
    .btn {
      border-radius: 20px;
      font-size: 13px;
      font-weight: normal;
    }
  }
}
.cover-container {
  margin-left: 40px;
}
.preview-container {
  height: 120px;
  width: 200px;
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cover-img {
  height: 120px;
  width: 200px;
  position: absolute;
}
.setting-label {
  margin: 0 200px 20px 200px;
  display: flex;
  align-items: center;
}
:deep(.tox-tinymce) {
  border: none;
  .tox-statusbar {
    display: none;
  }
}
:deep(.tox-toolbar__group .tox-tbtn),:deep(.tox-toolbar__group) {
  background-color: #f5f6f7;
  color: #555665;
}
:deep(.tox-editor-header) {
  position: fixed;
  top: 54px;
  left: 288px;
  padding: 0 !important;
  width: 1120px;
  box-shadow: none !important;
  z-index: 400 !important;
}
.section {
  border: none; /* 移除边框 */
  background: transparent; /* 透明背景 */
  padding: 0 4px; /* 轻微的内边距，模仿 span 的默认样式 */
  margin: 0; /* 无外边距 */
  outline: none; /* 移除聚焦时的轮廓 */
  box-shadow: none; /* 无阴影 */
  font-family: Arial, sans-serif; /* 设置字体 */
  font-size: 22px; /* 设置字号 */
  line-height: 1.5; /* 设置行高 */
  white-space: nowrap; /* 文本不换行 */
  border-bottom: 1px solid #43341b;
  cursor: text; /* 显示文本光标 */
  min-width: 100px; /* 设置最小宽度，防止输入框过窄 */
  width: 100%;
}
</style>
