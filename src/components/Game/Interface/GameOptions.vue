<template>
  <div class="options">
    <!-- Блок информации-->
    <div class="options--dis" @click="$emit('info', 'Уровни')"><VIcon :name="'wave'" /></div>
    <div class="options--yellow" @click="$emit('info', 'Магазин')"><VIcon :name="'shop'" /></div>
    <div class="options--turq" @click="$emit('info', 'Статистика')"><VIcon :name="'statistic'" /></div>
    <div class="options--orange" @click="$emit('info', 'Правила')"><VIcon :name="'book'" /></div>
    <div class="options--red" @click="$emit('popup', 'Закончить игру')"><VIcon :name="'door'" /></div>

    <!-- Блок скорости и настройки -->
    <div class="options--basic" @click="Settings.gameSpeadPause()">
      <VIcon v-if="isPause" :name="'pause'" />
      <VIcon v-else :name="'play'" />
    </div>
    <div class="options--basic" @click="Settings.gameSpeadMinus()"><VIcon :name="'minus'" /></div>
    <div class="options--basic">x{{ Settings.game_spead.value }}</div>
    <div class="options--basic" @click="Settings.gameSpeadPlus()"><VIcon :name="'plus'" /></div>
    <div class="options--basic" @click="$emit('info', 'Настройки')"><VIcon :name="'gear'" /></div>

    <!-- Блок улучшений -->
    <div class="options--purple" @click="$emit('info', 'События')"><VIcon :name="'medal'" /></div>
    <div class="options--purple" @click="$emit('info', 'Лаборатория')"><VIcon :name="'lab'" /></div>
    <div class="options--purple" @click="$emit('info', 'Карты')"><VIcon :name="'cards'" /></div>
    <div class="options--purple" @click="$emit('info', 'Модули')"><VIcon :name="'mod'" /></div>
  </div>
</template>

<script setup>
  import Settings from '@/services/t_settings';
  import { computed, onMounted } from 'vue';

  const isPause = computed(() => Settings.game_spead.value > 0);

  onMounted(() => {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) Settings.gameSpeadPause();
    };
  });
</script>

<style lang="scss">
  .options {
    position: relative;
    top: 0.8dvh;
    left: 0.8dvh;
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8dvh;
    width: calc(5 * 3.5dvh + 4 * 0.8dvh);
    height: max-content;
    & div {
      width: 3.5dvh;
      height: 3.5dvh;
      font-size: 1.2em;
      line-height: 3.5dvh;
      text-align: center;
      background: $col-bg-main;
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }
    &--yellow {
      border: 0.2dvh solid $col-yellow;
      &:hover {
        background: $col-yellow;
        box-shadow: 0 0 0.8dvh 0 $col-yellow;
      }
    }
    &--basic {
      border: 0.2dvh solid $col-basic;
      &:hover {
        background: $col-basic;
        box-shadow: 0 0 0.8dvh 0 $col-basic;
      }
    }
    &--red {
      border: 0.2dvh solid $col-red;
      &:hover {
        background: $col-red;
        box-shadow: 0 0 0.8dvh 0 $col-red;
      }
    }
    &--orange {
      border: 0.2dvh solid $col-orange;
      &:hover {
        background: $col-orange;
        box-shadow: 0 0 0.8dvh 0 $col-orange;
      }
    }
    &--turq {
      border: 0.2dvh solid $col-turq;
      &:hover {
        background: $col-turq;
        box-shadow: 0 0 0.8dvh 0 $col-turq;
      }
    }
    &--purple {
      border: 0.2dvh solid $col-purple;
      &:hover {
        background: $col-purple;
        box-shadow: 0 0 0.8dvh 0 $col-purple;
      }
    }
    &--dis {
      border: 0.2dvh solid $col-bg-dis;
      &:hover {
        background: $col-bg-dis;
        box-shadow: 0 0 0.8dvh 0 $col-bg-dis;
      }
    }
  }
</style>
