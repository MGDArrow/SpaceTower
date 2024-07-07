<template>
  <div
    v-if="Updates.updates['perimeter'].groups['wall'].updates['building'].lvl_max > 0"
    id="wall"
    :style="{
      top: `${Wall.y}px`,
      left: `${Wall.x}px`,
      width: `${Wall.size}px`,
      height: `${Wall.size}px`,
      background: borderStyle,
      boxShadow: shadowStyle,
    }"
  />
</template>

<script setup>
  import Wall from '@/services/eu_wall.js';
  import Updates from '@/services/m_updates';
  import { computed } from 'vue';

  const borderStyle = computed(() => {
    const color = Wall.status.value === 'ready' ? 'var(--col-turq)' : 'var(--col-bg-dis)';
    const percent =
      Wall.status.value === 'ready'
        ? Wall.s_hp.value / Wall.s_hp_max.value
        : Wall.u_building_now.value / Wall.u_building_time.value;
    return `conic-gradient(${color} ${percent * 100}%, var(--col-bg-focus) 0%)`;
  });
  const shadowStyle = computed(() => {
    const isShadow = Wall.status.value === 'ready';
    return isShadow ? `0 0 0.4dvh 0.2dvh var(--col-turq)` : '';
  });
</script>

<style lang="scss">
  #wall {
    position: absolute;
    z-index: 1;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    transition: 0.1s ease-in-out;
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(100% - 0.8dvh);
      height: calc(100% - 0.8dvh);
      background: $col-bg-main;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      content: ' ';
    }
  }
</style>
