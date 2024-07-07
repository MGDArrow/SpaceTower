/* eslint-disable no-mixed-operators */
import Enemies from '@/services/e_enemies';
import Perimeter from '@/services/e_perimeter.js';
import Tower from '@/services/e_tower.js';
import Updates from '@/services/m_updates';
import { CONST } from '@/services/math.js';
import Settings from '@/services/t_settings';
import { computed, ref } from 'vue';

class DiscardWaves {
  static #onlyInstance = null;
  constructor() {
    if (DiscardWaves.#onlyInstance) return DiscardWaves.#onlyInstance;
    DiscardWaves.#onlyInstance = this;
    this.discardWaves = ref([]);
  }

  init() {
    this.discardWaves.value = [];
  }

  newWave() {
    this.discardWaves.value.push(new DiscardWaveBuilder());
  }

  tick() {
    if (Updates.updates['perimeter'].groups['discard'].updates['cooldown'].lvl_max <= 0) return;
    this.discardWaves.value = this.discardWaves.value.filter((discard) => {
      if (discard.end) return false;
      discard.move();
      discard.discard();
      return true;
    });
  }
}

export default new DiscardWaves();

class DiscardWaveBuilder {
  constructor() {
    this.size = ref(Tower.size);
    this.x = Tower.x;
    this.y = Tower.y;

    this.r = computed(() => this.size.value / 2);
    this.rIn = computed(() => this.r.value - Settings.sceneHeight / 200);

    this.s_spead = CONST.DISCARD_WAVE.SPEAD * Settings.scaleSpead.value;

    this.end = false;
  }

  move = () => {
    if (this.size.value > Perimeter.size.value) return (this.end = true);
    this.size.value = this.size.value + this.s_spead;
  };

  discard = () => {
    const enemiesToDiscard = Enemies.enemies.value.filter((enemy) => {
      const enemyDistance = enemy.distance + Tower.r;
      return this.r.value >= enemyDistance && this.rIn.value <= enemyDistance;
    });
    if (!enemiesToDiscard.length) return;

    enemiesToDiscard.forEach((enemy) => {
      enemy.getDiscard(Updates.updates['perimeter'].groups['discard'].updates['count'].count, CONST.DISCARD_WAVE.SPEAD);
    });
  };
}
