<template>
  <div class="editor-container">
    <editor v-model="myValue" :init="init" :enabled="enabled" :id="tinymceId"></editor>
  </div>
</template>

<script setup>
import {computed, reactive, watch, ref, nextTick, onMounted} from "vue"; //全屏
import {UploadFileAPI} from "@/apis/upload.js";
import tinymce from "tinymce/tinymce";
// import "tinymce/skins/content/default/content.css";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default/icons";
import "tinymce/models/dom"; // 一定要引入
import "tinymce/themes/silver"; // 界面UI主题
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 文字计数
import "tinymce/plugins/preview"; // 预览
import "tinymce/plugins/emoticons"; // emoji表情
import "tinymce/plugins/emoticons/js/emojis.js"; //必须引入这个文件才有表情图库
import "tinymce/plugins/code"; // 编辑源码
import "tinymce/plugins/link"; // 链接插件
import "tinymce/plugins/advlist"; //高级列表
import "tinymce/plugins/codesample"; //代码示例
import "tinymce/plugins/autoresize"; // 自动调整编辑器大小
import "tinymce/plugins/quickbars"; // 光标处快捷提示
import "tinymce/plugins/nonbreaking"; //插入不间断空格
import "tinymce/plugins/searchreplace"; //查找替换
import "tinymce/plugins/autolink"; //自动链接
import "tinymce/plugins/media" // 媒体
import "tinymce/plugins/autosave" // 自动保存
import "tinymce/plugins/pagebreak" // 分页
import "tinymce/plugins/directionality"; //文字方向
import "tinymce/plugins/visualblocks"; //显示元素范围
import "tinymce/plugins/visualchars"; //显示不可见字符
import "tinymce/plugins/charmap"; // 特殊符号
import "tinymce/plugins/nonbreaking"; //插入不间断空格
import "tinymce/plugins/insertdatetime"; //插入日期时间
import "tinymce/plugins/importcss"; //引入自定义样式的css文件
import "tinymce/plugins/accordion"; // 可折叠数据手风琴模式
import "tinymce/plugins/anchor"; //锚点
import "tinymce/plugins/fullscreen";


const emits = defineEmits(["update:modelValue", "setHtml"]);
//这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
const props = defineProps({
  value: {
    type: String,
    default: () => {
      return "";
    },
  },
  baseUrl: {
    type: String,
    default: "",
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  // 编辑器初始可编辑状态
  editable_root: {
    type: Boolean,
    default: true,
  },
  plugins: {
    type: [String, Array],
    default:
        "preview media pagebreak autosave importcss autoresize searchreplace autolink directionality code visualblocks visualchars fullscreen image link codesample table charmap nonbreaking anchor insertdatetime advlist lists wordcount charmap quickbars emoticons accordion",
  },
  knwlgId: {
    type: String,
  },
  toolbar: {
    type: [String, Array, Boolean],
    default: "fullscreen undo redo fontfamily fontsize h1 h2 h3 h4 h5 h6 alignleft aligncenter alignright alignjustify outdent indent styleselect formatselect fontselect fontsizeselect bullist numlist indent2em lineheight  restoredraft insertdatetime accordion ltr rtl  cut copy paste pastetext  forecolor backcolor bold italic underline strikethrough link anchor  table image formatpainter axupimgs blockquote subscript superscript removeformat media charmap emoticons hr pagebreak print preview fullpage code codesample searchreplace",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  minHeight: {
    type: Number,
    default: 630,
  },
});

const tinymceId = ref(
    "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "")
);

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


//定义一个对象 init初始化
const init = reactive({
  selector: "#" + tinymceId.value, //富文本编辑器的id,
  language_url: "/tinymce/langs/zh_CN.js", // 语言包的路径，具体路径看自己的项目
  language: "zh_CN",
  skin_url: "/tinymce/skins/ui/oxide", // skin路径，具体路径看自己的项目
  editable_root: props.editable_root,
  height: 600,
  branding: false, // 是否禁用“Powered by TinyMCE”
  promotion: false, //是否显示 upgrade
  statusbar: true,  //最下方的元素路径和字数统计那一栏是否显示
  menubar: false,
  paste_data_images: true, //允许粘贴图像，图片粘贴自动上传需要
  placeholder: "尽情创作吧~",
  image_dimensions: false, //去除宽高属性
  plugins: props.plugins, //这里的数据是在props里面就定义好了的
  toolbar: props.toolbar, //这里的数据是在props里面就定义好了的
  license_key: 'gpl', // 同意开源许可条款
  // 取消图片资源路径转换
  convert_urls: false,
  // table边框位0是否展示网格线
  // visual: false,
  // 超链接默认打开方式
  link_default_target: "_blank",
  link_context_toolbar: true,
  // 默认快捷菜单
  quickbars_insert_toolbar: "none",
  // 选中图片的快捷提示
  quickbars_image_toolbar: "alignleft aligncenter alignright | rotateleft rotateright | imageoptions",
  editimage_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
  // 文字样式
  font_family_formats:
      "Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;", //字体
  font_size_formats: "11px 12px 14px 16px 18px 24px 36px 48px 64px 72px", //文字大小
  image_caption: true,
  editimage_cors_hosts: ["picsum.photos"],
  noneditable_class: "mceNonEditable",
  toolbar_mode: "warp", // 工具栏模式 floating / sliding / scrolling / wrap
  // 默认样式
  content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }p {margin:3px; line-height:24px;}",
  image_advtab: true,
  importcss_append: true,
  highlight_on_focus: false, // 禁用 点击编辑区时，添加tox-edit-focus类名，导致出现边框
  paste_webkit_styles: "all",
  paste_merge_formats: true,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,
  file_picker_types: "file",
  // 选中文字的快捷提示
  quickbars_selection_toolbar:
      "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
  // 编辑器高度自适应
  autoresize_bottom_margin: 20,
  images_upload_handler: tinymceUpload,
  min_height: props.minHeight,
  content_css: "/tinymce/skins/content/default/content.css", //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  setup: function (editor) {
    editor.on('input change',function (){
      myValue.value = tinymce.activeEditor.getContent({ format: "html" })
    })
  },
});

// 外部传递进来的数据变化
const myValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

//监听富文本中的数据变化
watch(
    () => myValue.value,
    () => {
      emits(
          "setHtml",
          tinymce.activeEditor.getContent({format: "text"}),
          myValue.value
      );
    }
);

// 设置编辑器只读模式
watch(
    () => props.readonly,
    (newValue, oldValue) => {
      nextTick(() => {
        tinymce.activeEditor.mode.set(newValue ? "readonly" : "design");
        let iframeDom = document.querySelector("iframe");
        iframeDom &&
        (iframeDom.contentWindow.document.body.style.margin = newValue
            ? 0
            : "16px");
      });
    },
    {immediate: true}
);

//初始化编辑器
onMounted(() => {
  tinymce.init({});
});

// 设置值
const handleSetContent = (content) => {
  tinymce.activeEditor.setContent(content);
};

// 获取值
const handleGetContent = () => {
  return tinymce.activeEditor.getContent({ format: "text" });
};

defineExpose({
  handleSetContent,
  handleGetContent,
});
</script>

<style lang="scss" scoped>
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
.editor-container {
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