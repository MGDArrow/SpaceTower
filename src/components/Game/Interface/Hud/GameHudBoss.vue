<template>
  <transition name="hud__boss">
    <div v-show="boss" class="hud__boss">
      <div class="hud__boss-name">Босс</div>
      <div v-if="boss" class="hud__boss-range">
        <div :style="bossHP">
          <VIcon :name="'hp'" /> HP: {{ MyMath.toText(boss.s_hp) }}/{{ MyMath.toText(boss.s_hp_max) }}
        </div>
      </div>
      <div v-if="boss" class="hud__boss-info">
        <div><VIcon :name="'axe'" /> Урон: {{ boss.s_damage }}</div>
        <div><VIcon :name="'dollar'" /> Валюты: {{ boss.s_awardDollars }}</div>
        <div><VIcon :name="'coins'" /> Монет: {{ boss.s_awardCoins }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup>
  import { computed } from 'vue';
  import Enemies from '@/services/e_enemies.js';
  import { MyMath } from '@/services/math';
  const boss = computed(() => Enemies.enemies.value.filter((enemy) => enemy.name === 'Босс')[0]);
  const bossHP = computed(() => {
    return `background: linear-gradient(to right, var(--col-purple) ${(boss.value.s_hp / boss.value.s_hp_max) * 100}%, var(--col-bg-main) 0%)`;
  });
</script>

<style lang="scss">
  .hud__boss {
    position: absolute;
    right: 0.8dvh;
    bottom: calc(2.4dvh + 1.5dvh + (25dvh / 2 - 2.4dvh));
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
    transition: 0.2s ease-in-out;
    &:hover {
      border-color: $col-purple;
      box-shadow: 0 0 1dvh 0 $col-purple;
    }
    &-name {
      height: 25%;
      font-size: 1.1em;
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
    &-info {
      display: flex;
      height: 25%;
      color: $col-purple;
      & div {
        flex: 1;
      }
    }
    &-enter-from,
    &-leave-to {
      bottom: 0;
      opacity: 0;
    }
    &-enter-active,
    &-leave-active {
      transition: 0.3s ease-in-out;
    }
  }
</style>
