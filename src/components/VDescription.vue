<template>
  <transition name="description">
    <div v-show="description" class="description">
      {{ description.description }}
    </div>
  </transition>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['description']);
</script>

<style lang="scss">
  .description {
    position: absolute;
    top: 0.8dvh;
    left: 50%;
    z-index: 5;
    max-width: calc(50dvh);
    max-height: calc(12dvh);
    padding: 1.2dvh;
    font-weight: 400;
    text-align: center;
    background: $col-bg-main;
    border: 0.03dvh solid $col-turq;
    border-radius: 0.8dvh;
    box-shadow: 0 0 1dvh 0 $col-turq;
    transform: translateX(-50%);
    &-enter-from,
    &-leave-to {
      top: 0;
      background: $col-bg-dark;
      opacity: 0;
    }
    &-enter-active,
    &-leave-active {
      transition: 0.2s ease-in-out;
    }
  }
</style>
