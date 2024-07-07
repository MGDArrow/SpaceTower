<template>
  <div class="connect">
    <div>FPS: {{ Settings.fps_now }}</div>
    <div>PING: -- ms</div>
    <div>enemies: {{ Enemies.enemies.value.length }}</div>
    <div>bullets: {{ Bullets.bullets.value.length }}</div>
  </div>
</template>

<script setup>
  import Bullets from '@/services/e_bullets.js';
  import Enemies from '@/services/e_enemies';
  import Settings from '@/services/t_settings';
</script>

<style lang="scss">
  .connect {
    position: absolute;
    top: 0.8dvh;
    left: calc(5 * 3.5dvh + 6 * 0.8dvh);
    width: max-content;
    color: $col-bg-dis;
    font-size: 0.7em;
  }
</style>
