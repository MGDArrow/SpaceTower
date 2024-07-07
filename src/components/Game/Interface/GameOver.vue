<template>
  <div class="game-over">
    <h1>Игра завершена</h1>
    <h2>Статистика игры</h2>
    <div class="game-over__statistic">
      <div><span>Уровень:</span> {{ Settings.lvl }}</div>
      <div><span>Заходов:</span> --</div>
    </div>
    <div class="game-over__statistic">
      <div><span>Волны:</span> {{ Wave.wave }}</div>
      <div><span>Луший результат:</span> --</div>
    </div>
    <div class="game-over__statistic">
      <div><span>Всего убито:</span> {{ Statistic.statistic.value.kill_enemies.count }}</div>
      <div>
        <span>Полученно монет:</span>
        {{ Statistic.statistic.value.coins_enemies.count }} / {{ Statistic.statistic.value.coins_waves.count }}
      </div>
    </div>
    <div class="buttons">
      <VButton @click="$emit('repeatGame')">Повторить попытку</VButton>
      <router-link :to="{ name: 'Menu' }"><VButton>В меню</VButton></router-link>
    </div>
  </div>
</template>

<script setup>
  import Settings from '@/services/t_settings';
  import Statistic from '@/services/s_statistic';
  import Wave from '@/services/e_wave.js';
</script>

<style lang="scss">
  .game-over {
    & h2 {
      color: $col-basic;
    }
    &__statistic {
      display: flex;
      justify-content: space-between;
      width: 100%;
      & div {
        width: calc(100% / 2);
      }
      & span {
        color: $col-basic;
      }
    }
  }
</style>
