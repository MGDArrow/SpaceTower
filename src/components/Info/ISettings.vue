<template>
  <div class="ISettnigs">
    <h2>Настройки</h2>
    <div class="settings__position">
      <div class="settings__name">FPS:</div>
      <div class="settings__set">
        <span :class="{ setting__act: Settings.fps === 30 }" @click.stop="setNewFPS(30)">30</span>
        <span :class="{ setting__act: Settings.fps === 60 }" @click.stop="setNewFPS(60)">60</span>
        <span :class="{ setting__act: Settings.fps === 120 }" @click.stop="setNewFPS(120)">120</span>
        <span :class="{ setting__act: Settings.fps === 144 }" @click.stop="setNewFPS(144)">144</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Settings from '@/services/t_settings';

  function setNewFPS(newFPS) {
    Settings.fps = newFPS;
  }
</script>

<style lang="scss">
  .settings {
    &__position {
      display: flex;
      width: 100%;
      margin: 0.8dvh 0;
    }
    &__name {
      width: 30%;
      color: $col-basic;
      text-align: right;
    }
    &__set {
      display: flex;
      gap: 0.8dvh;
      justify-content: space-around;
      width: 70%;
      padding: 0 0.8dvh;
      & span {
        flex: 1;
        text-align: center;
        border: 0.03dvh solid $col-basic;
        transition: 0.3s ease-in-out;
        &:hover,
        &.setting__act {
          background: $col-basic;
          box-shadow: 0 0 1.2dvh 0 $col-basic;
        }
      }
    }
  }
</style>
