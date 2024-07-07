<template>
  <div class="pad">
    <GamePadValuta />
    <MUpdates :mode="'Игра'" @description="(upd) => $emit('description', upd)" />
  </div>
</template>

<script setup>
  import GamePadValuta from '@/components/Game/Interface/GamePadValuta.vue';
  import MUpdates from '@/components/Mechanics/MUpdates.vue';
</script>

<style lang="scss">
  .pad {
    flex: 1;
    padding: 0.8dvh;
    background: $col-bg-main;
    border-right: 0.4dvh solid $col-basic;
    & h1 {
      margin: 0.8dvh 0;
      text-align: center;
      text-transform: uppercase;
      background: $col-orange;
      box-shadow: inset 0 0 1.2dvh 0 $col-orange;
    }
    & .item__lvl {
      font-size: 0.7em;
    }
    & .item__name {
      font-size: 1.2em;
      & span {
        line-height: calc(6dvh / 2.4);
      }
    }
  }
</style>
