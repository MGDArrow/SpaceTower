<template>
  <div
    id="perimeter"
    :style="[
      {
        top: `${Perimeter.y}px`,
        left: `${Perimeter.x}px`,
        width: `${Perimeter.size.value}px`,
        height: `${Perimeter.size.value}px`,
      },
      revivalBuff,
    ]"
  />
</template>

<script setup>
  import Perimeter from '@/services/e_perimeter.js';
  import Tower from '@/services/e_tower';
  import { computed } from 'vue';

  const revivalBuff = computed(() => {
    if (Tower.u_revival.value > 0)
      return `box-shadow: 0 0 2dvh 0 var(--col-basic); border: 0.3dvh solid var(--col-basic);`;
    return `border: 0.3dvh solid var(--col-bg-dis);`;
  });
</script>

<style lang="scss">
  #perimeter {
    position: absolute;
    z-index: 1;
    background: $col-bg-main;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    transition: 0.1s ease-in-out;
  }
</style>
