<template>
  <div class="TheMenu">
    <MenuBackground :openInfo="openInfo" />
    <MenuPlayer @openInfo="(e) => (openInfo = e)" />
    <MenuGame :openInfo="openInfo" @openInfo="(e) => (openInfo = e)" />
    <MenuUpgrates :openInfo="openInfo" @openInfo="(e) => (openInfo = e)" />
    <MenuInfo :openInfo="openInfo" @openInfo="(e) => (openInfo = e)" @description="(e) => (description = e)" />
    <VDescription :description="description" />
  </div>
</template>

<script setup>
  import MenuPlayer from '@/components/Menu/MenuPlayer.vue';
  import MenuBackground from '@/components/Menu/MenuBackground.vue';
  import MenuGame from '@/components/Menu/MenuGame.vue';
  import MenuUpgrates from '@/components/Menu/MenuUpgrates.vue';
  import MenuInfo from '@/components/Menu/MenuInfo.vue';
  import VDescription from '@/components/VDescription.vue';
  import { ref } from 'vue';

  const openInfo = ref(false);
  const description = ref(false);
</script>

<style lang="scss">
  .TheMenu {
    position: absolute;
    width: 100vw;
    height: 100dvh;
    & h1 {
      position: absolute;
      top: 5dvh;
      left: 50%;
      z-index: 5;
      width: max-content;
      color: $col-basic;
      font-size: 6em;
      text-align: center;
      text-transform: uppercase;
      text-shadow: 0 0 1.5dvh $col-basic;
      transform: translateX(-50%);
      transition: 0.3s ease-in-out;
    }
  }
</style>
