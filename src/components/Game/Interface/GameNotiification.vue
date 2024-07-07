<template>
  <TransitionGroup name="notification" tag="div" class="notification">
    <div v-for="message in Messages.messages.value" :key="message" :style="{ color: `var(--col-${message.color})` }">
      {{ message.text }} <VIcon :name="message?.icon" />
    </div>
  </TransitionGroup>
</template>

<script setup>
  import Messages from '@/services/s_message.js';
</script>

<style lang="scss">
  .notification {
    position: relative;
    top: 0.8dvh;
    left: 0.8dvh;
    z-index: 5;
    margin-top: 0.8dvh;
    & div {
      width: calc(5 * 3.5dvh + 4 * 0.8dvh);
    }
    &-move,
    &-enter-active,
    &-leave-active {
      transition: all 0.2s;
    }
    &-enter-from {
      opacity: 0;
    }
    &-leave-to {
      transform: translateX(-15dvh);
      opacity: 0;
    }
    &-leave-active {
      position: absolute;
    }
  }
</style>
