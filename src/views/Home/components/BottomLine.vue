<script setup>
defineProps({
  disabled: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div v-if="disabled" class="bottom-box">
    <span class="bottom-word">我也是有底线的</span>
  </div>
</template>

<style scoped lang="scss">

.bottom-box {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; // 防止文本自动换行
  margin: 30px 0;
}

.bottom-box::after {
  background: linear-gradient(90deg, transparent 0%, #bab9b9 10%);
}
.bottom-box::before,
.bottom-box::after {
  content: '';
  width: 50%;
  height: 1px;
}
.bottom-box::before {
  background: linear-gradient(270deg, transparent 0%, #bab9b9 10%);
}

.bottom-word {
  color: #898989;
  padding: 0 0.5em;
}
</style>