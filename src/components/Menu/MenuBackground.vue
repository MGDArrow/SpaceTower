<template>
  <div class="menu-background" :class="{ 'menu-background--act': openInfo }">
    <h1>Space Tower</h1>
    <div class="menu-background__perimeter" />
    <div class="menu-background__tower" />
  </div>
</template>

<script setup>
  const props = defineProps(['openInfo']);
</script>

<style lang="scss">
  .menu-background {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 75dvh;
    height: 75dvh;
    transform: translate(-50%, -30%);
    transition: 0.3s ease-in-out;
    &--act {
      top: 25%;
      left: 40%;
    }
    &__tower {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5dvh;
      height: 5dvh;
      background: $col-bg-dark;
      border: 0.6dvh solid $col-basic;
      border-radius: 100%;
      box-shadow: 0 0 1.2dvh 0.3dvh $col-basic;
      transform: translate(-50%, -50%);
    }
    &__perimeter {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: $col-bg-main;
      border: 0.6dvh solid $col-bg-focus;
      border-radius: 100%;
      transform: translate(-50%, -50%);
    }
  }
</style>
