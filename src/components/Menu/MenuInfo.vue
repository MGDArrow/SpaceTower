<template>
  <transition name="menu-info">
    <div
      v-show="openInfo"
      class="menu-info"
      :class="{
        mi__shop: openInfo === 'Магазин',
        mi__events: openInfo === 'События',
        mi__lvls: openInfo === 'Уровни',
        mi__updates: openInfo === 'Улучшения',
        mi__cards: openInfo === 'Карты',
        mi__modules: openInfo === 'Модули',
        mi__ultimates: openInfo === 'Ультимейты',
        mi__lab: openInfo === 'Лаборатория',
        mi__rules: openInfo === 'Правила',
        mi__settings: openInfo === 'Настройки',
      }"
      @click="$emit('openInfo', false)"
    >
      <MUpdates v-if="openInfo === 'Улучшения'" @description="(upd) => $emit('description', upd)" />
      <ILvls v-if="openInfo === 'Уровни'" />
      <IShop v-if="openInfo === 'Магазин'" />
      <IRules v-if="openInfo === 'Правила'" />
      <ISettings v-if="openInfo === 'Настройки'" />
    </div>
  </transition>
</template>

<script setup>
  import MUpdates from '@/components/Mechanics/MUpdates.vue';
  import ILvls from '@/components/Info/ILvls.vue';
  import IShop from '@/components/Info/IShop.vue';
  import IRules from '@/components/Info/IRules.vue';
  import ISettings from '@/components/Info/ISettings.vue';
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['openInfo']);
</script>

<style lang="scss">
  .menu-info {
    position: absolute;
    top: 1.5dvh;
    right: 1.5dvh;
    width: 40vw;
    height: 97dvh;
    padding: 1dvh;
    overflow-y: auto;
    background: $col-bg-main;
    border: 0.3dvh solid $col-bg-focus;
    cursor: pointer;
    transition: 0.3s ease-in-out;
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
  .mi {
    &__shop {
      &:hover {
        border-color: $col-yellow;
        box-shadow: 0 0 1.2dvh 0 $col-yellow;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-yellow;
      }
    }
    &__events {
      &:hover {
        border-color: $col-green;
        box-shadow: 0 0 1.2dvh 0 $col-green;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-green;
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
      & .rules {
        font-size: 1.2em;
      }
    }
    &__settings {
      &:hover {
        border-color: $col-basic;
        box-shadow: 0 0 1.2dvh 0 $col-basic;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-basic;
      }
      & .settings__position {
        font-size: 1.2em;
      }
    }
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
    &__updates {
      &:hover {
        border-color: $col-orange;
        box-shadow: 0 0 1.2dvh 0 $col-orange;
      }
    }
    &__cards {
      &:hover {
        border-color: $col-turq;
        box-shadow: 0 0 1.2dvh 0 $col-turq;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-turq;
      }
    }
    &__modules {
      &:hover {
        border-color: $col-red;
        box-shadow: 0 0 1.2dvh 0 $col-red;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-red;
      }
    }
    &__ultimates {
      &:hover {
        border-color: $col-purple;
        box-shadow: 0 0 1.2dvh 0 $col-purple;
      }
      &::-webkit-scrollbar-thumb,
      & h2 {
        background-color: $col-purple;
      }
    }
    &__lab {
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
