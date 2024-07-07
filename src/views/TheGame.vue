<template>
  <div class="TheGame">
    <GamePad @description="(e) => (description = e)" />
    <div id="game">
      <GameOptions @info="(e) => (info = e)" @popup="(e) => (popup = e)" />
      <GameConnect />
      <GameNotiification />
      <VDescription :description="description" />

      <GameHud @info="(e) => (info = e)" @description="(e) => (description = e)" />

      <GameInfo :info="info" @click="info = false" />

      <GamePerimeter />
      <GameWall />
      <GameMine />
      <GameBall />
      <GameBullet />
      <GameSlug />
      <GameTower />
      <GameEnemy />
      <GamePack />
      <GameParticles v-for="particle in Particles.particles.value" :key="particle.id" :particle="particle" />
      <GameDiscard />
      <GameCongratulations />
    </div>

    <!-- ** TODO Игра на паузе ** -->
    <!-- <div v-if="Settings.game_spead.value === 0" class="game-pause" @click="Settings.gameSpeadPause()">
      <VIcon :name="'pause'" />
      <span>Игра на паузе</span>
    </div> -->
    <!-- ** Игра на паузе ** -->

    <VPopup v-model="popup" :popup="go">
      <div v-if="!go && popup === 'Закончить игру'" class="end-game">
        <h1>Завершить игру?</h1>
        <div class="buttons">
          <VButton @click="gameOver()">Да</VButton>
          <VButton :color="'red'" @click="popup = false">Нет</VButton>
        </div>
      </div>
      <GameOver v-if="go" @repeatGame="repeatGame()" />
    </VPopup>
  </div>
</template>

<script setup>
  import VDescription from '@/components/VDescription.vue';
  // * Интерфейс
  import GameHud from '@/components/Game/Interface/GameHud.vue';
  import GamePad from '@/components/Game/Interface/GamePad.vue';
  import GameConnect from '@/components/Game/Interface/GameConnect.vue';
  import GameInfo from '@/components/Game/Interface/GameInfo.vue';
  import GameNotiification from '@/components/Game/Interface/GameNotiification.vue';
  import GameOptions from '@/components/Game/Interface/GameOptions.vue';
  import GameCongratulations from '@/components/Game/Interface/GameCongratulations.vue';
  import GameOver from '@/components/Game/Interface/GameOver.vue';
  // * Сущности
  import GameMine from '@/components/Game/Entities/GameMine.vue';
  import GameWall from '@/components/Game/Entities/GameWall.vue';
  import GameBall from '@/components/Game/Entities/GameBall.vue';
  import GameBullet from '@/components/Game/Entities/GameBullet.vue';
  import GameDiscard from '@/components/Game/Entities/GameDiscard.vue';
  import GameEnemy from '@/components/Game/Entities/GameEnemy.vue';
  import GamePack from '@/components/Game/Entities/GamePack.vue';
  import GameParticles from '@/components/Game/Entities/GameParticles.vue';
  import GamePerimeter from '@/components/Game/Entities/GamePerimeter.vue';
  import GameSlug from '@/components/Game/Entities/GameSlug.vue';
  import GameTower from '@/components/Game/Entities/GameTower.vue';
  // * Игра
  import Particles from '@/services/e_particles';
  import Game from '@/services/t_game.js';
  import Settings from '@/services/t_settings';
  import Updates from '../services/m_updates';

  import { computed, onBeforeMount, onUnmounted, ref } from 'vue';

  const info = ref(false);
  const description = ref(false);
  const popup = ref(false);
  const go = computed(() => Settings.gameOver.value);
  const game = Game;

  onBeforeMount(() => {
    game.initGame();
    document.addEventListener('visibilitychange', pauseDocumentHidden);
  });

  onUnmounted(() => {
    gameOver();
    Updates.resetUpdates();
    clearInterval(game.fpsMetter);
    document.removeEventListener('visibilitychange', pauseDocumentHidden);
  });

  function pauseDocumentHidden() {
    if (document.hidden && Settings.game_spead.value !== 0) {
      Settings.gameSpeadPause();
    }
  }

  function gameOver() {
    Settings.endGame();
  }

  function repeatGame() {
    popup.value = false;
    Settings.gameOver.value = false;
    clearInterval(game.fpsMetter);
    game.initGame();
  }
</script>

<style lang="scss">
  .TheGame {
    position: absolute;
    display: flex;
    width: 100vw;
    height: 100dvh;
    & #game {
      position: relative;
      width: 150dvh;
      height: 100dvh;
      overflow: hidden;
      background: $col-bg-dark;
    }
    & .game-pause {
      position: fixed;
      z-index: 99999999;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      font-size: 5em;
      text-align: center;
      background: $col-bg-dark;
      cursor: pointer;
      opacity: 0.9;
      content: ' ';
      place-content: center;
      & svg,
      & span {
        display: block;
        width: 100%;
      }
    }
  }
</style>
