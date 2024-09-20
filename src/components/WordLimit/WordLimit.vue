<script setup>

import { ref, toRefs,watch } from 'vue'

const props = defineProps({
  maxLengthProp: {
    type:Number
  },
  inputTextProp: {
    type:String
  },
})
const isOverLimit = ref(false)
defineExpose({isOverLimit})
const refProps = toRefs(props)
const inputText = refProps.inputTextProp; // 创建一个响应式变量来存储输入的文本
const wordCount = ref(0); // 创建一个响应式变量来存储字数统计
const maxLength = refProps.maxLengthProp


// 监听 inputText 的变化，并更新字数统计
watch(inputText, (newValue) => {
  // console.log('inputText2',inputText.value)
  // console.log('wordCount2',wordCount.value)
  wordCount.value = newValue.length; // 更新字数统计
  isOverLimit.value = wordCount.value >= maxLength.value;
  console.log('isOverLimit', isOverLimit.value)
});

</script>

<template>
<div></div>
</template>

<style scoped lang="scss">

</style>