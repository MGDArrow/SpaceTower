import Bullets from '@/services/e_bullets';
import Enemies from '@/services/e_enemies.js';
import Particles from '@/services/e_particles.js';
import Perimeter from '@/services/e_perimeter';
import Sluges from '@/services/e_sluges.js';
import Tower from '@/services/e_tower.js';
import Wave from '@/services/e_wave.js';
import Balls from '@/services/eu_balls';
import DiscardWaves from '@/services/eu_discardWaves';
import Mines from '@/services/eu_mines.js';
import Packs from '@/services/eu_packs.js';
import Wall from '@/services/eu_wall';
import Messages from '@/services/s_message.js';
import Statistic from '@/services/s_statistic';
import Settings from '@/services/t_settings';
import Updates from '@/services/m_updates';
import { ref } from 'vue';

class Game {
  static #onlyInstance = null;
  constructor() {
    if (Game.#onlyInstance) return Game.#onlyInstance;
    Game.#onlyInstance = this;
  }

  initGame = () => {
    this.id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    Settings.newGame();
    Updates.resetUpdates();
    Wave.init();
    this.initEntities();

    const fps_temp = ref(0);
    const sceneTimer = getSceneTimer(this.repeatFunction, fps_temp);
    this.fpsMetter = setInterval(() => {
      Settings.fps_now.value = fps_temp.value;
      fps_temp.value = 0;
    }, 1000);
    sceneTimer();
  };

  initEntities = () => {
    Statistic.init();
    Messages.init();
    Particles.init();

    Tower.init();
    Bullets.init();

    Enemies.init();
    Sluges.init();

    Perimeter.init();
    Wall.init();
    Balls.init();
    Packs.init();
    DiscardWaves.init();
    Mines.init();
  };

  repeatFunction = (dt) => {
    //**! Шаг игры !**//
    Wave.tick(dt);
    Wave.spawnEnemies();
    Enemies.move(dt);

    //**! Механики игрока !**//
    Perimeter.tick(dt);
    DiscardWaves.tick();
    Mines.tick(dt);
    Balls.tick();
    Wall.tick(dt);

    //**! Механики башни !**//
    Tower.tick(dt);
    Bullets.moveAttackRemove();

    //**! Ответ игры !**//
    Enemies.death();
    Enemies.attack(dt);
    Sluges.moveAttackRemove();

    //**! Служебные механики !**//
    Packs.tick(dt);
    Messages.tick(dt);
    Particles.tick(dt);

    if (Tower.s_hp.value <= 0) Settings.gameOver.value = true;
  };
}

function getSceneTimer(repeatFunction, fps_temp) {
  let startTime = 0;
  function sceneTimer(timeStamp = 0) {
    let deltaTime = Math.ceil(timeStamp - startTime);
    const interval = Math.floor(1000 / Settings.fps);
    if (deltaTime >= 1000) deltaTime = interval;

    if (deltaTime >= interval) {
      startTime = timeStamp;
      fps_temp.value += 1;
      for (let i = 0; i < Settings.game_spead.value; i++) repeatFunction(deltaTime);
    }

    const sceneId = window.requestAnimationFrame(sceneTimer);
    if (Settings.gameOver.value) {
      window.cancelAnimationFrame(sceneId);
    }
  }
  return sceneTimer;
}

export default new Game();
