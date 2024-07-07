<template>
  <div class="hud__waves" @click="$emit('info', 'Враги')">
    <div class="hud__waves-info">
      <div><VIcon :name="'wave'" /> Уровень: {{ Settings.lvl }}</div>
      <div><VIcon :name="'time'" /> Волна: {{ Wave.wave }}</div>
    </div>
    <div class="hud__waves-range">
      <div :style="wavesTimer">{{ wavesEnemiesCount }}</div>
    </div>
    <div class="hud__waves-info">
      <div><VIcon :name="'hp'" /> HP: {{ Wave.enemiesParams.value.common.hp }}</div>
      <div><VIcon :name="'axe'" /> Урон: {{ Wave.enemiesParams.value.common.damage }}</div>
      <div>
        <VIcon :name="'spead'" /> Скорость: {{ MyMath.round(Wave.enemiesParams.value.common.spead * 60, 1) }} м/с
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import Settings from '@/services/t_settings';
  import Wave from '@/services/e_wave.js';
  import { MyMath } from '@/services/math';

  const wavesTimer = computed(() => {
    if (Wave.inite.value > 0) {
      return {
        // eslint-disable-next-line no-mixed-operators
        background: `linear-gradient(to right, var(--col-basic) ${100 - (Wave.inite.value / Settings.gameInit) * 100}%, var(--col-bg-main) 0%)`,
        outline: `0.4dvh solid var(--col-basic)`,
      };
    }
    if (Wave.long.value > 0) {
      return {
        background: `linear-gradient(to right, var(--col-red) ${(Wave.long.value / Settings.waveLong) * 100}%, var(--col-bg-main) 0%)`,
        outline: `0.4dvh solid var(--col-red)`,
      };
    } else {
      return {
        // eslint-disable-next-line no-mixed-operators
        background: `linear-gradient(to right, var(--col-bg-dis) ${100 - (Wave.delay.value / Settings.waveDelay) * 100}%, var(--col-bg-main) 0%)`,
        outline: `0.4dvh solid var(--col-bg-dis)`,
      };
    }
  });
  const wavesEnemiesCount = computed(() => {
    return Wave.inite.value >= 0
      ? 'Начало игры'
      : Wave.long.value > 0
        ? `${Wave.enemiesCount.value} / ${Wave.enemiesAll.value}`
        : `Перезарядка волны`;
  });
</script>

<style lang="scss">
  .hud__waves {
    position: absolute;
    right: 0.8dvh;
    bottom: calc(1.6dvh + 1.5dvh);
    z-index: 5;
    width: calc((100% - 14.5dvh) / 2 - 1.6dvh);
    height: calc(25dvh / 2 - 2.4dvh);
    padding: 0.8dvh;
    font-size: 1.7dvh;
    text-align: center;
    text-transform: uppercase;
    background: $col-bg-main;
    border: 0.03dvh solid $col-bg-focus;
    border-radius: 1dvh;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
      border-color: $col-red;
      box-shadow: 0 0 1dvh 0 $col-red;
    }
    &-info {
      display: flex;
      height: 25%;
      color: $col-text;
      & div {
        flex: 1;
      }
      &:last-child {
        color: $col-red;
      }
    }
    &-range {
      height: 50%;
      padding: 1dvh 0.8dvh;
      & div {
        height: 100%;
        border-radius: 1dvh;
        outline: 0.4dvh solid $col-purple;
        outline-offset: 0.4dvh;
      }
    }
  }
</style>
