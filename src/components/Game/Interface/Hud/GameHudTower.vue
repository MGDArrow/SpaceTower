<template>
  <div class="hud__tower" @click="$emit('info', 'Башня')">
    <div class="hud__tower-info">
      <div>
        <VIcon :name="'sword'" /> Урон:
        {{ Updates.updates['attack'].groups['basic'].updates['damage'].text }}
      </div>
      <div>
        <VIcon :name="'regen'" /> Реген HP:
        {{ Updates.updates['defence'].groups['basic'].updates['regen'].text }}
      </div>
      <div v-if="Updates.updates['defence'].groups['vampiric'].updates['count'].lvl_max > 0">
        <VIcon :name="'bat'" /> Вампиризм: {{ Updates.updates['defence'].groups['vampiric'].updates['count'].text }}
      </div>
    </div>
    <div class="hud__tower-range">
      <div>70/100</div>
    </div>
    <div class="hud__tower-info">
      <div>
        <VIcon :name="'reload'" /> Скорость атаки:
        {{ Updates.updates['attack'].groups['basic'].updates['spead'].text }}
      </div>
      <div v-if="Updates.updates['attack'].groups['crit'].updates['percent'].lvl_max > 0">
        <VIcon :name="'crit-proc'" /> Шанс крита:
        {{ Updates.updates['attack'].groups['crit'].updates['percent'].text }}
      </div>
      <div v-if="Updates.updates['attack'].groups['crit'].updates['coef'].lvl_max > 0">
        <VIcon :name="'crit-coeff'" /> Множ. крита:
        {{ Updates.updates['attack'].groups['crit'].updates['coef'].text }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import Updates from '@/services/m_updates';
</script>

<style lang="scss">
  .hud__tower {
    position: absolute;
    bottom: calc(1.6dvh + 1.5dvh);
    left: 0.8dvh;
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
      border-color: $col-basic;
      box-shadow: 0 0 1dvh 0 $col-basic;
    }
    &-info {
      display: flex;
      height: 25%;
      color: $col-basic;
      & div {
        flex: 1;
      }
    }
    &-range {
      height: 50%;
      padding: 1dvh 0.8dvh;
      & div {
        height: 100%;
        background: linear-gradient(to right, $col-purple 70%, $col-bg-main 0%);
        border-radius: 1dvh;
        outline: 0.4dvh solid $col-purple;
        outline-offset: 0.4dvh;
      }
    }
  }
</style>
