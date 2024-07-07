<template>
  <div class="hud" :class="{ 'hud--close': closeHud }">
    <div class="hud__close-button" @click="closeHud = !closeHud">
      <VIcon :name="'angle-left'" />
    </div>
    <GameHudTower @info="(e) => $emit('info', e)" />
    <GameHudHP />
    <GameHudWaves @info="(e) => $emit('info', e)" />
    <GameHudBuff @description="(e) => $emit('description', e)" />
    <GameHudBoss />
    <GameHudPlayer />
  </div>
</template>

<script setup>
  import GameHudTower from '@/components/Game/Interface/Hud/GameHudTower.vue';
  import GameHudHP from '@/components/Game/Interface/Hud/GameHudHP.vue';
  import GameHudWaves from '@/components/Game/Interface/Hud/GameHudWaves.vue';
  import GameHudBuff from '@/components/Game/Interface/Hud/GameHudBuff.vue';
  import GameHudBoss from '@/components/Game/Interface/Hud/GameHudBoss.vue';
  import GameHudPlayer from '@/components/Game/Interface/Hud/GameHudPlayer.vue';
  import { ref } from 'vue';

  const closeHud = ref(false);
</script>

<style lang="scss">
  .hud {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: 0.3s ease-in-out;
    &__close-button {
      position: absolute;
      right: 50%;
      bottom: 18.5dvh;
      z-index: 6;
      width: 10dvh;
      height: 3dvh;
      color: $col-bg-dis;
      font-size: 1.3em;
      text-align: center;
      background: $col-bg-main;
      border: 0.03dvh solid $col-bg-dis;
      border-radius: 3dvh;
      transform: translateX(50%);
      cursor: pointer;
      opacity: 0.1;
      transition: 0.3s ease-in-out;
      &:hover {
        box-shadow: 0 0 0.8dvh 0 $col-bg-dis;
        opacity: 1;
      }
      & svg {
        transition: 0.3s ease-in-out;
        rotate: -90deg;
      }
    }
    &--close {
      bottom: -50dvh;
      & .hud__close-button {
        bottom: 50.8dvh;
        & svg {
          rotate: 90deg;
        }
      }
    }
  }
</style>
