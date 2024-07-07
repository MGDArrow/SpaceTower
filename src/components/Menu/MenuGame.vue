<template>
  <div class="game" :class="{ 'game--act': openInfo }">
    <div class="game__lvl">
      <div class="game__lvl--down" @click="Settings.changeLvl(-1)"><VIcon :name="'angle-left'" /></div>
      <div class="game__lvl--current" @click="$emit('openInfo', 'Уровни')">
        <div class="game__lvl--current-lvl">Уровень: {{ Settings.lvl }}</div>
        <div class="game__lvl--current-waves">Максимум: <br />2000 волн</div>
        <div class="game__lvl--current-times">Заходов: <br />1000</div>
      </div>
      <div class="game__lvl--up" @click="Settings.changeLvl(1)"><VIcon :name="'angle-right'" /></div>
    </div>
    <router-link :to="{ name: 'Game' }"><div class="game__start">Начать игру</div></router-link>
  </div>
</template>

<script setup>
  import Settings from '@/services/t_settings';
  const props = defineProps(['openInfo']);
</script>

<style lang="scss">
  .game {
    position: absolute;
    top: 60%;
    left: 50%;
    width: 25vw;
    transform: translate(-50%, -50%);
    transition: 0.3s ease-in-out;
    &--act {
      left: 1dvh;
      transform: translate(0, -50%);
    }
    &__lvl {
      display: flex;
      align-items: center;
      height: 10dvh;
      margin-bottom: 2dvh;
      background: $col-bg-main;
      border: 0.4dvh solid $col-orange;
      box-shadow: 0 0 1.2dvh 0 $col-orange;
      cursor: pointer;
      &--down,
      &--up {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        height: 100%;
        font-size: 2.5em;
        transition: 0.3s ease-in-out;
        & svg {
          display: block;
        }
        &:hover {
          background: $col-bg-focus;
        }
      }
      &--current {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        text-align: center;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        &:hover {
          background: $col-bg-focus;
        }
        &-lvl {
          width: 100%;
          padding: 1dvh;
          font-size: 1.3em;
        }
        &-waves,
        &-times {
          width: 50%;
          font-size: 0.7em;
        }
      }
    }
    &__start {
      height: 10dvh;
      font-size: 5dvh;
      line-height: 9dvh;
      text-align: center;
      text-transform: uppercase;
      background: $col-bg-main;
      border: 0.4dvh solid $col-basic;
      box-shadow: 0 0 1.2dvh 0 $col-basic;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      &:hover {
        background: $col-basic;
      }
    }
  }
</style>
