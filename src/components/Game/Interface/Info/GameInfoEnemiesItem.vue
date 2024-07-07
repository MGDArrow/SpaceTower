<template>
  <div class="info__text">
    <h3><slot /></h3>
    <div class="info__text--one">HP <VIcon :name="'hp'" />:</div>
    <div class="info__text--two">{{ enemy.hp }}</div>
    <div class="info__text--one">Урон <VIcon :name="'axe'" />:</div>
    <div class="info__text--two">{{ enemy.damage }}</div>
    <div class="info__text--one">Размер <VIcon :name="'size'" />:</div>
    <div class="info__text--two">{{ enemy.size }} м</div>
    <div class="info__text--one">Скорость <VIcon :name="'spead'" />:</div>
    <div class="info__text--two">{{ enemy.spead * 60 }} м/с</div>
    <div class="info__text--one">Вес <VIcon :name="'heft'" />:</div>
    <div class="info__text--two">{{ enemy.heft }} кг</div>
    <div class="info__text--one">Награда <VIcon :name="'dollar'" />:</div>
    <div class="info__text--two">{{ enemy.awardDollars }}</div>
    <div class="info__text--one">Награда <VIcon :name="'coins'" />:</div>
    <div class="info__text--two">{{ enemy.awardCoins }}</div>
    <div class="info__text--one">Награда <VIcon :name="'exp'" />:</div>
    <div class="info__text--two">{{ enemy.awardExp }}</div>
    <div class="info__text--one">Шанс <VIcon :name="'percent'" />:</div>
    <div class="info__text--two">{{ enemy.percent * 100 }}%</div>
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-unused-vars
  const props = defineProps(['enemy']);
</script>
