<template>
  <div>
    <h2>Враги</h2>
    <div class="info__preview">
      <div class="preview__enemies preview__common" />
    </div>
    <GameInfoEnemiesItem :enemy="enemiesParams.common">Обычный</GameInfoEnemiesItem>
    <div class="info__preview">
      <div class="preview__enemies preview__quick" />
    </div>
    <GameInfoEnemiesItem :enemy="enemiesParams.quick">Быстрый</GameInfoEnemiesItem>
    <div class="info__preview">
      <div class="preview__enemies preview__tank" />
    </div>
    <GameInfoEnemiesItem :enemy="enemiesParams.tank">Танк</GameInfoEnemiesItem>
    <div class="info__preview">
      <div class="preview__enemies preview__shooter" />
    </div>
    <GameInfoEnemiesItem :enemy="enemiesParams.shooter">Стрелок</GameInfoEnemiesItem>
    <div class="info__preview">
      <div class="preview__enemies preview__boss" />
    </div>
    <GameInfoEnemiesItem :enemy="enemiesParams.boss">Босс</GameInfoEnemiesItem>
  </div>
</template>

<script setup>
  import GameInfoEnemiesItem from '@/components/Game/Interface/Info/GameInfoEnemiesItem.vue';
  import Wave from '@/services/e_wave.js';
  import { computed } from 'vue';
  // eslint-disable-next-line no-unused-vars
  const enemiesParams = computed(() => Wave.enemiesParams.value);
</script>

<style lang="scss">
  .info__enemies {
    &:hover {
      border-color: $col-red;
      box-shadow: 0 0 1dvh 0 $col-red;
    }
    &::-webkit-scrollbar-thumb,
    & h2 {
      background-color: $col-red;
    }
    & .info__preview {
      width: 5vw;
      height: 5vw;
    }
    & .info__text--one {
      color: $col-red;
    }
  }
  .preview {
    &__enemies {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 50%;
      background: $col-bg-dark;
      border-radius: 35%;
      transform: translate(-50%, -50%);
    }
    &__common {
      border: 0.6dvh solid $col-orange;
    }
    &__quick {
      border: 0.6dvh solid $col-turq;
    }
    &__tank {
      width: 75%;
      height: 75%;
      border: 0.6dvh solid $col-yellow;
    }
    &__boss {
      width: 95%;
      height: 95%;
      border: 0.6dvh solid $col-purple;
    }
    &__shooter {
      border: 0.6dvh solid $col-text;
      &::after,
      &::before {
        position: absolute;
        bottom: -2.5dvh;
        width: 50%;
        height: 50%;
        background: $col-text;
        border-radius: 35%;
        content: ' ';
      }
      &::after {
        left: -1.5dvh;
      }
      &::before {
        right: -1.5dvh;
      }
    }
  }
</style>
