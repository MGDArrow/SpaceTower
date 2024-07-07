<template>
  <div class="menu__upgrates" :class="{ 'menu__upgrates--act': openInfo }">
    <div class="bsh-orange" @click="$emit('openInfo', 'Улучшения')"><VIcon :name="'tools'" /></div>
    <div class="bsh-turq" @click="$emit('openInfo', 'Карты')"><VIcon :name="'cards'" /></div>
    <div class="bsh-red" @click="$emit('openInfo', 'Модули')"><VIcon :name="'mod'" /></div>
    <div class="bsh-purple" @click="$emit('openInfo', 'Ультимейты')"><VIcon :name="'ultimate'" /></div>
    <div class="bsh-basic" @click="$emit('openInfo', 'Лаборатория')"><VIcon :name="'lab'" /></div>
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['openInfo']);
</script>

<style lang="scss">
  .menu__upgrates {
    position: absolute;
    bottom: 1.5dvh;
    left: 50%;
    display: flex;
    justify-content: space-between;
    width: 55vw;
    height: 25dvh;
    font-size: 8em;
    transform: translate(-50%);
    transition: 0.3s ease-in-out;
    &--act {
      left: 1.5dvh;
      transform: translate(0);
    }
    & div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% / 5 - 2vw);
      height: 100%;
      cursor: pointer;
    }
  }
</style>
