<template>
  <button :class="{ 'button--basic': color === 'basic', 'button--red': color === 'red' }"><slot /></button>
</template>

<script setup>
  const props = defineProps({
    color: {
      type: String,
      default: 'basic',
    },
  });
</script>

<style lang="scss">
  button {
    width: 100%;
    height: 5dvh;
    margin-top: 2dvh;
    color: $col-text;
    font-size: 1.2em;
    text-transform: uppercase;
    background: $col-bg-focus;
    border: 0.3dvh solid $col-basic;
    box-shadow: 0 0 1.2dvh 0 $col-basic;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &.button--basic {
      border: 0.3dvh solid $col-basic;
      box-shadow: 0 0 1.2dvh 0 $col-basic;
      &:hover {
        background: $col-basic;
      }
    }
    &.button--red {
      border: 0.3dvh solid $col-red;
      box-shadow: 0 0 1.2dvh 0 $col-red;
      &:hover {
        background: $col-red;
      }
    }
  }
</style>
