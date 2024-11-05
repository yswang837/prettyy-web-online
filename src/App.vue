<script setup>
import useWebSocket from "@/utils/websocket.js";
const ws = useWebSocket('ws://127.0.0.1:6677/chat?caller=web&user=bbb&sign=b3835dfe4f7b8892d6d0506b5077e50b&authorization=bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOjEwMDA3LCJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzMwNTQ0NTk4LCJpYXQiOjE3MzA0NTgxOTh9fQ.z1gETLqJQtDbWecW53dCMpPGhGdm6wWGiI3cAJ_FHtM')
const like = () => {
  ws.sendMessage('{"toUser":"user456","content":"hello"}')
}
</script>

<template>
  <el-button @click="like">websocket点赞测试</el-button>
  <div>来自服务器的消息：{{ws.messages}}</div>
<!-- 一级路由出口组件，对应layout组件 -->
 <RouterView />
</template>

<style scoped lang="scss">

</style>
