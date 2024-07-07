<template>
  <div class="item__buy">
    <div class="item__count" :style="countStyle">
      {{ update.text }}
    </div>
    <div v-if="isNotMaxLvlUpdate" class="item__price" :style="priceStyle">
      <div v-if="finalCoefUpd > 1 && maxCoefUpd > 0" class="item__price-coef">x{{ finalCoefUpd }}</div>
      {{ MyMath.toText(priceUpdate) }}
      <VIcon v-if="mode === 'Меню'" :name="'coins'" />
      <VIcon v-else :name="'dollar'" />
    </div>
  </div>
</template>

<script setup>
  import { MyMath } from '@/services/math.js';
  import { computed } from 'vue';

  const props = defineProps([
    'update',
    'finalCoefUpd',
    'maxCoefUpd',
    'priceUpdate',
    'mode',
    'isNotMaxLvlUpdate',
    'colorUpdate',
  ]);

  const countStyle = computed(() => {
    if (props.isNotMaxLvlUpdate) {
      return `background: var(--col-${props.colorUpdate})`;
    }
    return `background: var(--col-${props.colorUpdate}); height: 100%; line-height: 10dvh;`;
  });

  const priceStyle = computed(() => {
    return `border-left: 0.3dvh solid var(--col-${props.colorUpdate})`;
  });
</script>

<style lang="scss">
  .item {
    &__buy {
      flex: 1;
    }
    &__count {
      height: 50%;
      font-size: 1.2em;
      line-height: 5dvh;
    }
    &__price {
      position: relative;
      height: 50%;
      font-weight: 400;
      font-size: 0.9em;
      line-height: 5dvh;
      &-coef {
        position: absolute;
        top: 0.3dvh;
        right: 0.3dvh;
        height: 1.2dvh;
        font-size: 0.7em;
        line-height: 1.2dvh;
      }
    }
  }
</style>
