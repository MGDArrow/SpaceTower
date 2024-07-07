<template>
  <div
    id="tower"
    :style="{
      top: `${Tower.y}px`,
      left: `${Tower.x}px`,
      width: `${Tower.size}px`,
      height: `${Tower.size}px`,
    }"
  />
</template>

<script setup>
  import Tower from '@/services/e_tower.js';
</script>

<style lang="scss">
  #tower {
    position: absolute;
    z-index: 5;
    background: $col-bg-dark;
    border: 0.6dvh solid $col-basic;
    border-radius: 100%;
    box-shadow: 0 0 1.2dvh 0.3dvh $col-basic;
    transform: translate(-50%, -50%);
  }
</style>
