<script setup>
import {UploadFileAPI} from "@/apis/upload.js";
import { ref } from 'vue'


const props = defineProps({
  files: {
    type:Array[String]
  },
  showDelete: {
    type:Boolean
  }
})
let myCoverImg = ref(props.coverImg)
let myFiles = ref(props.files)

const uploadSubmit = async (options) => {
  // console.log('上传文件',options['file'])
  const formData = new FormData();
  formData.append('file', options['file'])
  // console.log('formData', formData.get('file'))
  const res = await UploadFileAPI(formData.get('file'))
  // console.log('res...', res)
  // console.log('七牛',res.result)
  myCoverImg.value = res.result
  console.log('form.value.cover_img', myCoverImg)
}

</script>

<template>
  <el-upload v-model:file-list="myFiles" :http-request="uploadSubmit" :list-type="'picture'" :show-file-list="false">
    <slot name="trigger" :myCoverImg="myCoverImg"></slot>
  </el-upload>
</template>

<style scoped lang="scss">

</style>