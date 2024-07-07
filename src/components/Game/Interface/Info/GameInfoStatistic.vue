<template>
  <div>
    <h2>Статистика</h2>
    <div v-for="(item, index) in statistica" :key="index">
      <h3>{{ index }}</h3>
      <div v-for="i in item" :key="i.id" class="info__text">
        <div v-if="i.description === 'Убито всего'" class="info__text--line" />
        <div class="info__text--one">{{ i.description }}:</div>
        <div class="info__text--two" :style="`color: var(--col-${i.color})`">
          <span v-if="index === 'Игра'">{{ MyMath.toTime(i._count) }}</span>
          <span v-else>{{ i.count }}</span> <VIcon v-if="i.icon" :name="i.icon" />
          <span v-if="i?.perSec">/с</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { MyMath } from '@/services/math.js';
  import { computed } from 'vue';
  import Statistic from '@/services/s_statistic';
  // eslint-disable-next-line no-unused-vars

  const statistica = computed(() => {
    let stat = [];
    for (let key in Statistic.statistic.value) {
      stat.push(Statistic.statistic.value[key]);
    }
    return Object.groupBy(stat, ({ groupe }) => groupe);
  });
</script>

<style lang="scss">
  .info__statistic {
    &:hover {
      border-color: $col-turq;
      box-shadow: 0 0 1dvh 0 $col-turq;
    }
    &::-webkit-scrollbar-thumb,
    & h2 {
      background-color: $col-turq;
    }
    & h3 {
      margin-top: 3dvh;
      text-align: center;
    }
    & .info__text--one {
      width: 60%;
      color: $col-turq;
      font-size: 0.8em;
    }
    & .info__text--two {
      width: 40%;
      font-size: 0.8em;
    }
    & .info__text--line {
      width: 100%;
      height: 0.3dvh;
      margin: 0.3dvh 2dvh;
      background: $col-turq;
    }
  }
</style>
