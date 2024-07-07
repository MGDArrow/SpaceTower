<template>
  <div class="hud__buff">
    <div
      v-if="Updates.updates['money'].groups['deposit'].updates['cooldown'].lvl_max > 0"
      class="hud__buff-deposit"
      :style="`background: conic-gradient(var(--col-green) ${depositLong}%, var(--col-bg-focus) 0%);`"
      @mouseenter="$emit('description', { description: 'Депозит', categories: 'Экономика' })"
      @mouseleave="$emit('description', false)"
    >
      <span><VIcon :name="'deposit'" />{{ depositCount }}<VIcon :name="'dollar'" /></span>
    </div>
    <div
      v-if="runawayLong"
      class="hud__buff-runaway"
      :style="`background: conic-gradient(var(--col-red) ${runawayLong}%, var(--col-bg-focus) 0%);`"
      @mouseenter="$emit('description', { description: 'Беглый огонь', categories: 'Атака' })"
      @mouseleave="$emit('description', false)"
    >
      <span><VIcon :name="'runaway'" /></span>
    </div>
    <div
      v-if="revivalLong"
      class="hud__buff-revival"
      :style="`background: conic-gradient(var(--col-basic) ${revivalLong}%, var(--col-bg-focus) 0%);`"
      @mouseenter="$emit('description', { description: 'Возрождение', categories: 'Защита' })"
      @mouseleave="$emit('description', false)"
    >
      <span><VIcon :name="'revival'" /></span>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import Updates from '@/services/m_updates';
  import Tower from '@/services/e_tower';
  import Packs from '@/services/eu_packs';
  import { MyMath } from '@/services/math';

  const depositCount = computed(() => {
    return ` ${MyMath.toText(Math.min(Tower.dollars.value * Updates.updates['money'].groups['deposit'].updates['percent'].count, Updates.updates['money'].groups['deposit'].updates['max'].count))}/${MyMath.toText(Updates.updates['money'].groups['deposit'].updates['max'].count)}`;
  });
  const depositLong = computed(
    () => Packs.u_deposit.value / (Updates.updates['money'].groups['deposit'].updates['cooldown'].count / 100),
  );
  const runawayLong = computed(() =>
    Math.max(Tower.u_runaway.value / (Updates.updates['attack'].groups['runaway'].updates['duration'].count / 100), 0),
  );
  const revivalLong = computed(() =>
    Math.max(Tower.u_revival.value / (Updates.updates['defence'].groups['revival'].updates['duration'].count / 100), 0),
  );
</script>

<style lang="scss">
  .hud__buff {
    position: absolute;
    bottom: calc(2.4dvh + 1.5dvh + (25dvh / 2 - 2.4dvh));
    left: 0.8dvh;
    z-index: 5;
    display: flex;
    gap: 0.8dvh;
    align-items: end;
    width: calc((100% - 14.5dvh) / 2 - 1.6dvh);
    height: calc(25dvh / 2 - 2.4dvh);
    & div {
      position: relative;
      width: 3.5dvh;
      height: 3.5dvh;
      transition: 0.2s ease-in-out;
      &.hud__buff-deposit {
        width: 20dvh;
        font-size: 0.8em;
      }
    }
    & span {
      position: absolute;
      top: 0.2dvh;
      left: 0.2dvh;
      display: block;
      width: 3.1dvh;
      height: 3.1dvh;
      font-size: 1.2em;
      line-height: 3.5dvh;
      text-align: center;
      background: $col-bg-main;
    }
    &-deposit {
      & span {
        width: calc(20dvh - 0.4dvh);
      }
    }
  }
</style>
