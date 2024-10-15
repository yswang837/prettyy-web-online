<template>
  <div>
    <button @click="sendLike">点赞</button>
    <div v-for="msg in messages" :key="msg">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websocket: null,
      messages: []
    };
  },
  created() {
    this.setupWebSocket();
  },
  beforeUnmount() {
    this.closeWebSocket();
  },
  methods: {
    setupWebSocket() {
      this.websocket = new WebSocket("ws://localhost:8888/websocket/connection");
      this.websocket.onopen = this.onWebSocketOpen;
      this.websocket.onmessage = this.onWebSocketMessage;
      this.websocket.onclose = this.onWebSocketClose;
    },
    onWebSocketOpen() {
      console.log("WebSocket连接成功");
    },
    onWebSocketMessage(event) {
      this.messages.push(event.data);
    },
    onWebSocketClose() {
      console.log("WebSocket连接关闭");
    },
    closeWebSocket() {
      if (this.websocket) {
        this.websocket.close();
      }
    },
    sendLike() {
      fetch("http://120.26.203.121:8888/like", {
        method: "POST"
      }).then(response => response.json())
          .then(data => console.log(data));
    }
  }
};
</script>