<template>
  <transition name="popup">
    <div v-if="modelValue || popup" class="popup">
      <div class="popup__bg" @click="$emit('update:modelValue', false)" />
      <div class="popup__content">
        <div v-if="!popup" class="popup__content--close" @click="$emit('update:modelValue', false)">
          <VIcon :name="'xmark'" />
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    modelValue: {
      default: false,
    },
    popup: {
      default: false,
    },
  });
</script>

<style lang="scss">
  .popup {
    &__bg {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99998;
      width: 100vw;
      height: 100dvh;
      background: $col-bg-dark;
      opacity: 0.9;
    }
    &__content {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 99999;
      min-width: 50vw;

      //   min-height: 20dvh;
      padding: 20px 5%;
      background: $col-bg-main;
      border: 0.5dvh solid $col-basic;
      box-shadow: 0 0 2dvh 0 $col-basic;
      transform: translate(-50%, -50%);
      & h1 {
        width: 100%;
        text-align: center;
      }
      &--close {
        position: absolute;
        top: 0.3dvh;
        right: 0.3dvh;
        width: 2dvw;
        height: 1.5dvw;
        line-height: 1.5dvw;
        text-align: center;
        background: $col-bg-focus;
        border: 0.1dvh solid $col-bg-dis;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        & svg {
          color: $col-bg-dis;
          transition: 0.2s ease-in-out;
        }
        &:hover {
          background: $col-basic;
          border: 0.1dvh solid $col-basic;
          box-shadow: 0 0 10px 0 $col-basic;
          & svg {
            color: $col-text;
          }
        }
      }
    }
  }
  .popup-enter-active,
  .popup-leave-active {
    position: relative;
    z-index: 9999;
    transition: opacity 0.2s ease-in-out;
  }
  .popup-enter-from,
  .popup-leave-to {
    opacity: 0;
  }
</style>
