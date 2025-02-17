/* eslint-disable no-mixed-operators */
import Enemies from '@/services/e_enemies';
import Particles from '@/services/e_particles.js';
import Statistic from '@/services/s_statistic';
import Updates from '@/services/m_updates';
import { CONST, MyVector } from '@/services/math.js';
import Settings from '@/services/t_settings';
import { computed, ref } from 'vue';

class Mines {
  static #onlyInstance = null;
  constructor() {
    if (Mines.#onlyInstance) return Mines.#onlyInstance;
    Mines.#onlyInstance = this;
    this.mines = ref([]);
  }

  init() {
    this.mines.value = [];
  }

  newMine(x, y) {
    const isNewMine = Math.random() <= Updates.updates['perimeter'].groups['mines'].updates['percent'].count;
    if (!isNewMine) return;
    this.mines.value.push(new MineBuilder(x, y));
  }

  tick(dt) {
    this.mines.value = this.mines.value.filter((mine) => {
      mine.time -= dt;
      if (mine.time <= 0) {
        mine.activated();
        return false;
      }

      mine.checkCollision();
      if (!mine.collision) return true;

      mine.activated();
      return false;
    });
  }
}

export default new Mines();

class MineBuilder {
  constructor(x, y) {
    this.size = CONST.MINE.SIZE * Settings.scaleSize;
    this.r = this.size / 2;
    this.x = x;
    this.y = y;

    this.time = ref(CONST.MINE.LIFETIME);
    this.time_progress = computed(() => (this.time.value / CONST.MINE.LIFETIME) * 100);

    this.s_radius = (Updates.updates['perimeter'].groups['mines'].updates['radius'].count * Settings.scaleSize) / 2;
    this.s_damage =
      Updates.updates['attack'].groups['basic'].updates['damage'].count *
      Updates.updates['perimeter'].groups['mines'].updates['damage'].count;

    this.collision = false;
  }

  checkCollision = () => {
    for (let i = 0; i < Enemies.enemies.value.length; i++) {
      const enemy = Enemies.enemies.value[i];
      if (enemy.s_hp <= 0) continue;
      const isCollision = MyVector.isCollisionFast(this.x, this.y, this.r, enemy.x, enemy.y, enemy.r);
      if (!isCollision) continue;
      this.collision = true;
      break;
    }
  };

  activated = () => {
    this.boom();
    Particles.newParticles('Мина', this.x, this.y);
  };

  boom = () => {
    Enemies.enemies.value.forEach((enemy) => {
      if (enemy.s_hp <= 0) return;
      const isCollision = MyVector.isCollisionFast(this.x, this.y, this.s_radius, enemy.x, enemy.y, enemy.r);
      if (!isCollision) return;
      enemy.getDamage(this.s_damage);
      Statistic.inc('damage_mines', this.s_damage);
    });
  };
}
