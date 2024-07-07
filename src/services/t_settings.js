import { CONST } from '@/services/math.js';
import { computed, ref } from 'vue';

class Settings {
  static #onlyInstance = null;
  constructor() {
    if (Settings.#onlyInstance) return Settings.#onlyInstance;
    Settings.#onlyInstance = this;

    //** Video Settings **//
    this.sceneHeight = window.innerHeight;
    this.sceneWidth = window.innerHeight * 1.5;
    this._fps = ref(60);
    this.fps_now = ref(60);
    this.fps_temp = 0;
    this.scaleSize = window.innerHeight / 1000;
    this.scaleSpead = computed(() => this.scaleSize);

    //** Game Settings **//
    this.lvl = ref(10);
    this.gameInit = CONST.GAME.WAVE_INIT;
    this.waveLong = CONST.GAME.WAVE_LONG;
    this.waveDelay = CONST.GAME.WAVE_DELAY;
    this.gameOver = ref(false);
    this.game_spead = ref(1);
    this.game_spead_temp = 0;
  }

  get fps() {
    return this._fps.value;
  }

  set fps(newFPS) {
    this._fps.value = newFPS;
  }

  changeLvl = (inc) => {
    if (inc < 0) {
      if (this.lvl.value !== 1) this.lvl.value += inc;
    } else {
      this.lvl.value += inc;
    }
  };

  newGame = () => {
    this.gameOver.value = false;
    if (this.game_spead.value === 0) this.game_spead.value = 1;
  };

  endGame = () => {
    this.gameOver.value = true;
  };

  gameSpeadMinus = () => {
    if (this.game_spead.value === 1) return this.gameSpeadPause();
    if (this.game_spead.value > 0) this.game_spead.value -= 1;
  };

  gameSpeadPlus = () => {
    if (this.game_spead.value < 5) this.game_spead.value += 1;
  };

  gameSpeadPause = () => {
    if (this.game_spead.value > 0) {
      this.fps_temp = this.fps_now.value;
      this.game_spead_temp = this.game_spead.value;
      this.game_spead.value = 0;
    } else {
      this.fps_now.value = this.fps_temp;
      this.game_spead.value = this.game_spead_temp;
    }
  };
}

export default new Settings();
