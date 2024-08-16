<script setup>
import {UploadFileAPI} from "@/apis/upload.js";
import { ref } from 'vue'


const props = defineProps({
  coverImg: {
    type:String
  },
  files: {
    type:Array[String]
  },
  showDelete: {
    type:Boolean
  }
})
let myCoverImg = ref(props.coverImg)
const myFiles = ref(props.files)
const uploadRef = ref()
const handleChange = (uploadFile, uploadFiles) => {
  console.log('handleChange', uploadFile, uploadFiles)
}

const uploadSubmit = async (options) => {
  // console.log('上传文件',options['file'])
  const formData = new FormData();
  formData.append('file', options['file'])
  // console.log('formData', formData.get('file'))
  const res = await UploadFileAPI(formData.get('file'))
  // console.log('res...', res)
  // console.log('七牛',res.result)
  myCoverImg.value = res.result
  console.log('form.value.cover_img', props.coverImg)
}
const remove = () => {
  myFiles.value.splice(0, 1)
  myCoverImg.value = ''
}
</script>

<template>
  <el-upload ref="uploadRef" v-model:file-list="myFiles" :http-request="uploadSubmit" :list-type="'picture'"
             :on-change="handleChange" :show-file-list="false">
    <slot name="trigger" :myCoverImg="myCoverImg"></slot>
    <div class="preview-container2" v-if="myCoverImg">
      <el-image v-for="(file, index) of myFiles" :key="index" class="cover-img" :src="file.url" fit="cover"></el-image>
      <i v-if="props.showDelete" class="iconfont icon-shanchuguanbicha del-img" @click="remove" style="cursor: pointer"></i>
    </div>
  </el-upload>
</template>

<style scoped lang="scss">
.preview-container2 {
  height: 120px;
  width: 200px;
  background-color: #eaeaea;
  margin-top: -30px;
}
.cover-img {
  height: 120px;
  width: 200px;
  position: absolute;
}

.del-img {
  position: relative;
  top: -7px;
  left: 183px;
}
</style>