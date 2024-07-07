<template>
  <div class="pad-valuta">
    <div class="pad-valuta__dollars">{{ MyMath.toText(Tower.dollars.value) }}<VIcon :name="'dollar'" /></div>
    <div class="pad-valuta__coins">{{ MyMath.toText(User.valuta.value.coins, 1) }}<VIcon :name="'coins'" /></div>
    <div class="pad-valuta__diamonds">{{ User.valuta.value.diamonds }}<VIcon :name="'diamond'" /></div>
    <div class="pad-valuta__ultimates">{{ User.valuta.value.ultimates }}<VIcon :name="'ultimate'" /></div>
    <div class="pad-valuta__tickets">{{ User.valuta.value.tickets }}<VIcon :name="'ticket'" /></div>
    <div class="pad-valuta__events">{{ User.valuta.value.awards }}<VIcon :name="'award'" /></div>
  </div>
</template>

<script setup>
  import User from '@/services/t_user';
  import { MyMath } from '@/services/math.js';
  import Tower from '@/services/e_tower';
  // console.log(Tower.dollars.value);
</script>

<style lang="scss">
  .pad-valuta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8dvh;
    margin-bottom: 0.8dvh;
    font-size: 1.3em;
    text-align: center;
    & div {
      width: calc(100% / 3 - 1.6dvh / 3);
    }
    & svg {
      margin-left: 0.8dvh;
      font-size: 0.7em;
    }
    &__dollars {
      background: $col-green;
      box-shadow: 0 0 1.2dvh 0 $col-green;
    }
    &__coins {
      background: $col-yellow;
      box-shadow: 0 0 1.2dvh 0 $col-yellow;
    }
    &__diamonds {
      background: $col-turq;
      box-shadow: 0 0 1.2dvh 0 $col-turq;
    }
    &__ultimates {
      background: $col-purple;
      box-shadow: 0 0 1.2dvh 0 $col-purple;
    }
    &__tickets {
      background: $col-basic;
      box-shadow: 0 0 1.2dvh 0 $col-basic;
    }
    &__events {
      background: $col-orange;
      box-shadow: 0 0 1.2dvh 0 $col-orange;
    }
  }
</style>
