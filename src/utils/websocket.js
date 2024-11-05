// webSocket.js
// 自定义组合式函数，用于管理 WebSocket 连接

import { ref, onMounted, onBeforeUnmount } from "vue";

const useWebSocket = (url, reconnectInterval = 10000, maxReconnectAttempts = 5) => {
    // 创建一个响应式引用来存储 WebSocket 实例
    const socket = ref(null);
    // 标记组件是否已挂载
    const isMounted = ref(true);
    // 消息
    const messages = ref([])
    // 标记 WebSocket 是否已连接
    const isConnected = ref(false);
    // 记录重连尝试次数
    let reconnectAttempts = 0;

    // 连接 WebSocket 的函数
    const connect = () => {
        // 如果已存在 WebSocket 实例，则先关闭它
        if (socket.value) {
            socket.value.close();
        }

        // import.meta.env.VITE_PROXY_TARGET  // 根据环境引入地址

        // 创建新的 WebSocket 实例
        socket.value = new WebSocket(url);
        // url 页面中传过来的

        // 监听 WebSocket 打开事件
        socket.value.addEventListener("open", () => {
            console.log("WebSocket连接已打开");
            isConnected.value = true; // 更新连接状态
        });

        // 监听 WebSocket 消息事件
        socket.value.addEventListener("message", (event) => {
            messages.value = event.data;
        });

        // 监听 WebSocket 关闭事件
        socket.value.addEventListener("close", () => {
            console.log("WebSocket连接已关闭");
            isConnected.value = false; // 更新连接状态

            // 如果组件仍挂载且未达到最大重连尝试次数，则尝试重新连接
            if (isMounted.value && reconnectAttempts < maxReconnectAttempts) {
                // 使用递增的延迟来避免频繁重连
                setTimeout(connect, reconnectInterval * (reconnectAttempts + 1));
                reconnectAttempts++; // 增加重连尝试次数
            }
        });

        // 监听 WebSocket 错误事件
        socket.value.addEventListener("error", (error) => {
            console.error("WebSocket发生错误:", error);
            // 如果组件仍挂载，并且希望处理错误后重连，可以在这里添加逻辑
        });
    };

    // 发送消息到 WebSocket
    const sendMessage = (message) => {
        if (socket.value && socket.value.readyState === WebSocket.OPEN) {
            socket.value.send(message);
        }
    };

    // 组件挂载时执行
    onMounted(() => {
        isMounted.value = true;
        connect(); // 尝试建立连接
    });

    // 组件卸载前执行
    onBeforeUnmount(() => {
        isMounted.value = false;
        if (socket.value) {
            socket.value.close(); // 关闭 WebSocket 连接
        }
    });

    // 返回对象，包含 WebSocket 实例、连接状态和发送消息的函数
    return {
        socket,
        messages,
        isConnected,
        sendMessage,
    };
};

export default useWebSocket;