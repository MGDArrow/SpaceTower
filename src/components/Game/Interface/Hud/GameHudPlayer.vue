<template>
  <div class="hud__player" :style="progressLvl">
    <div v-for="d of 7" :key="d" />
    <span>{{ userInfo }}</span>
  </div>
</template>

<script setup>
  import User from '@/services/t_user';
  import { MyMath } from '@/services/math';
  import { computed } from 'vue';

  const percentLvl = computed(() => MyMath.round(User.lvl.value.percent));
  const userInfo = computed(() => {
    return `${User.username}, уровень ${User.lvl.value.lvl} ( ${User.lvl.value.exp} / ${User.lvl.value.exp_next} — ${percentLvl.value}%)`;
  });
  const progressLvl = computed(
    () => `background: linear-gradient(to right, var(--col-green) ${percentLvl.value}%, var(--col-bg-main) 0%)`,
  );
</script>

<style lang="scss">
  .hud__player {
    position: absolute;
    right: 0.8dvh;
    bottom: 0.5dvh;
    left: 0.8dvh;
    z-index: 5;
    display: flex;
    justify-content: space-evenly;
    height: 1.8dvh;
    font-weight: 800;
    font-size: 0.6em;
    text-align: center;
    border: 0.03dvh solid $col-bg-focus;
    border-radius: 1dvh;
    opacity: 0.8;
    transition: 0.2s ease-in-out;
    &:hover {
      border-color: $col-green;
      box-shadow: 0 0 1dvh 0 $col-green;
      opacity: 1;
    }
    & div {
      width: 0.1dvh;
      height: 1.5dvh;
      background: $col-bg-focus;

      // &:nth-child(2n) {
      //   width: 0.2dvh;

      //   background: $col-bg-focus;
      // }
    }
    & span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
