<template>
  <div class="item__info">
    <div class="item__lvl" :style="lvlBarProgress">{{ сurrentLvlUpdate }} / {{ update.lvl_max }}</div>
    <div
      v-if="isNotMaxLvlUpdate"
      class="item__favorite"
      :class="{ 'item__favorite-act': update.favorite }"
      @click.stop="$emit('getFavorite')"
    >
      <VIcon :name="'star'" />
    </div>
    <div class="item__name">
      <span><VIcon v-if="update.icon" :name="update.icon" /> {{ update.name }}</span>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  const props = defineProps(['update', 'сurrentLvlUpdate', 'isNotMaxLvlUpdate', 'colorUpdate']);

  const lvlBarProgress = computed(() => {
    const percentLvlOfMax = (props.сurrentLvlUpdate / props.update.lvl_max) * 100;
    return {
      background: `linear-gradient(to right, var(--col-${props.colorUpdate}) ${percentLvlOfMax}%, var(--col-bg-main) 0%)`,
      outline: `0.3dvh solid var(--col-${props.colorUpdate})`,
      width: `${props.isNotMaxLvlUpdate ? 84 : 100}%`,
    };
  });
</script>

<style lang="scss">
  .item {
    &__info {
      display: flex;
      flex-wrap: wrap;
      width: 75%;
    }
    &__lvl {
      height: 1.7dvh;
      margin: 0.8dvh;
      font-weight: 400;
      font-size: 0.8em;
      line-height: 1.9dvh;
      outline-offset: 0.3dvh;
    }
    &__favorite {
      flex: 1;
      height: 1.7dvh;
      margin: 0.8dvh;
      font-size: 0.8em;
      outline: 0.3dvh solid $col-bg-dis;
      outline-offset: 0.3dvh;
      &-act {
        color: $col-yellow;
        outline: 0.3dvh solid $col-yellow;
        box-shadow: 0 0 0.8dvh 0 $col-yellow;
      }
    }
    &__name {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 6.2dvh;
      padding: 0 0.3dvh;
      font-size: 1.6em;
      & span {
        display: block;
        line-height: calc(6dvh / 2);
      }
    }
  }
</style>
