<template>
  <transition name="info">
    <div
      v-show="info"
      class="info"
      :class="{
        info__tower: info === 'Башня',
        info__enemies: info === 'Враги',
        info__statistic: info === 'Статистика',
        gi__rules: info === 'Правила',
        gi__lvls: info === 'Уровни',
        gi__shop: info === 'Магазин',
        gi__settings: info === 'Настройки',
      }"
    >
      <GameInfoTower v-if="info === 'Башня'" />
      <GameInfoEnemies v-if="info === 'Враги'" />
      <GameInfoStatistic v-if="info === 'Статистика'" />
      <IRules v-if="info === 'Правила'" />
      <ILvls v-if="info === 'Уровни'" />
      <IShop v-if="info === 'Магазин'" />
      <ISettings v-if="info === 'Настройки'" />
    </div>
  </transition>
</template>

<script setup>
  import GameInfoTower from '@/components/Game/Interface/Info/GameInfoTower.vue';
  import GameInfoEnemies from '@/components/Game/Interface/Info/GameInfoEnemies.vue';
  import GameInfoStatistic from '@/components/Game/Interface/Info/GameInfoStatistic.vue';
  import IRules from '@/components/Info/IRules.vue';
  import ILvls from '@/components/Info/ILvls.vue';
  import IShop from '@/components/Info/IShop.vue';
  import ISettings from '@/components/Info/ISettings.vue';
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['info']);
</script>

<style lang="scss">
  .info {
    position: absolute;
    top: 0.8dvh;
    right: 0.8dvh;
    z-index: 5;
    width: 20vw;
    height: 74.4dvh;
    padding: 1dvh;
    overflow: hidden auto;
    background: $col-bg-main;
    border: 0.03dvh solid $col-bg-focus;
    border-radius: 1dvh;
    cursor: pointer;
    opacity: 1;
    transition: border 0.2s ease-in-out;
    & h2 {
      font-size: 1.2em;
    }
    &__preview {
      position: relative;
      width: 10vw;
      height: 10vw;
      margin: 1dvh auto;
    }
    &__text {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      & h3 {
        width: 100%;
        text-align: center;
      }
      &--one {
        width: 50%;
        padding-right: 0.3dvh;
        text-align: right;
      }
      &--two {
        width: 50%;
        padding-left: 0.3dvh;
        font-weight: 400;
      }
    }
    &-enter-from,
    &-leave-to {
      right: -100%;
      opacity: 0;
    }
    &-enter-active,
    &-leave-active {
      transition: 0.3s ease-in-out;
    }
  }
  .gi {
    &__shop {
      &:hover {
        border-color: $col-yellow;
        box-shadow: 0 0 1.2dvh 0 $col-yellow;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-yellow;
      }
      & .shop {
        font-size: 1.5em;
      }
    }

    // &__events {
    //   &:hover {
    //     border-color: $col-green;
    //     box-shadow: 0 0 1.2dvh 0 $col-green;
    //   }
    //   &::-webkit-scrollbar-thumb,
    //   & h2 {
    //     background-color: $col-green;
    //   }
    // }
    &__lvls {
      &:hover {
        border-color: $col-bg-dis;
        box-shadow: 0 0 1.2dvh 0 $col-bg-dis;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-bg-dis;
      }
    }
    &__rules {
      &:hover {
        border-color: $col-orange;
        box-shadow: 0 0 1.2dvh 0 $col-orange;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-orange;
      }
    }

    // &__cards {
    //   &:hover {
    //     border-color: $col-turq;
    //     box-shadow: 0 0 1.2dvh 0 $col-turq;
    //   }
    //   &::-webkit-scrollbar-thumb,
    //   & h2 {
    //     background-color: $col-turq;
    //   }
    // }
    // &__modules {
    //   &:hover {
    //     border-color: $col-red;
    //     box-shadow: 0 0 1.2dvh 0 $col-red;
    //   }
    //   &::-webkit-scrollbar-thumb,
    //   & h2 {
    //     background-color: $col-red;
    //   }
    // }
    // &__ultimates {
    //   &:hover {
    //     border-color: $col-purple;
    //     box-shadow: 0 0 1.2dvh 0 $col-purple;
    //   }
    //   &::-webkit-scrollbar-thumb,
    //   & h2 {
    //     background-color: $col-purple;
    //   }
    // }
    &__settings {
      &:hover {
        border-color: $col-basic;
        box-shadow: 0 0 1.2dvh 0 $col-basic;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-basic;
      }
    }
  }
</style>
