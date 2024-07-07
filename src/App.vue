<template>
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup></script>

<style lang="scss">
  .slide-enter-active,
  .slide-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.5s ease-in-out;
  }
  .slide-enter-from {
    transform: translate(100%);
  }
  .slide-enter-to {
    transform: translate(0);
  }
  .slide-leave-from {
    transform: translate(0);
  }
  .slide-leave-to {
    transform: translate(-100%);
  }
</style>
