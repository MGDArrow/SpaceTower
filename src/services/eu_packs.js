/* eslint-disable no-mixed-operators */
import Particles from '@/services/e_particles.js';
import Tower from '@/services/e_tower';
import Updates from '@/services/m_updates';
import { CONST, MyMath, MyRotate, MyVector } from '@/services/math.js';
import Messages from '@/services/s_message.js';
import Statistic from '@/services/s_statistic';
import Settings from '@/services/t_settings';
import { computed, ref } from 'vue';

class Packs {
  static #onlyInstance = null;
  constructor() {
    if (Packs.#onlyInstance) return Packs.#onlyInstance;
    Packs.#onlyInstance = this;
    this.packs = ref([]);
    this.u_deposit = ref(0);
  }

  init() {
    this.packs.value = [];
    this.factory = new FactoryPack();

    this.u_deposit.value = Updates.updates['money'].groups['deposit'].updates['cooldown'].count + Settings.gameInit;
  }

  newPack(type) {
    this.packs.value.push(this.factory.newPack(type));
  }

  tick(dt) {
    if (Updates.updates['money'].groups['deposit'].updates['cooldown'].lvl_max > 0) this.u_deposit.value -= dt;
    if (this.u_deposit.value <= 0) {
      this.newPack('Deposit');
      this.u_deposit.value = Updates.updates['money'].groups['deposit'].updates['cooldown'].count;
    }

    this.packs.value = this.packs.value.filter((pack) => {
      pack.move();
      if (!pack.collision) return true;
      pack.activated();
      return false;
    });
  }
}

export default new Packs();

class FactoryPack {
  newPack(type) {
    if (type === 'Kit') return new Kit();
    if (type === 'Deposit') return new Deposit();
  }
}

class BasePack {
  constructor() {
    this.size = CONST.PACK.SIZE * Settings.scaleSize;
    this.r = this.size / 2;
    [this.x, this.y] = MyMath.getStartPosition(this.size);

    this.s_spead = computed(() => CONST.PACK.SPEAD * Settings.scaleSpead.value);
    this.collision = false;
    this.rotate = ref(0);

    this.getDirection();
  }

  getDirection = () => {
    const [ABx, ABy] = MyVector.getVector(this.x.value, this.y.value, Tower.x, Tower.y);
    const distance = MyVector.getLength(ABx, ABy);
    [this.coefX, this.coefY] = MyVector.getNormalize(ABx, ABy, distance);
    this.rotate.value = MyRotate.rotate(ABx, ABy, distance);
  };

  move = () => {
    this.x.value += this.coefX * this.s_spead.value;
    this.y.value += this.coefY * this.s_spead.value;
    this.collision = MyVector.isCollisionFast(this.x.value, this.y.value, this.r, Tower.x, Tower.y, Tower.r);
  };
}

class Kit extends BasePack {
  constructor() {
    super();
    this.type = 'Kit';
    this.s_heal = Tower.s_hp_max.value * Updates.updates['defence'].groups['kit'].updates['heal'].count;
  }

  activated = () => {
    Tower.addHP(this.s_heal);
    Particles.newParticles('Аптечка', this.x.value, this.y.value);
  };
}

class Deposit extends BasePack {
  constructor() {
    super();
    this.type = 'Deposit';
    this.addDollars = Math.min(
      Tower.dollars.value * Updates.updates['money'].groups['deposit'].updates['percent'].count,
      Updates.updates['money'].groups['deposit'].updates['max'].count,
    );
  }

  activated = () => {
    Tower.dollars.value += this.addDollars;
    Messages.add(`+${MyMath.toText(this.addDollars, 3)}`);
    Particles.newParticles('Депозит', this.x.value, this.y.value);
    Statistic.inc('dollars_deposit', this.addDollars);
  };
}
