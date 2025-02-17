/* eslint-disable no-mixed-operators */
import Enemies from '@/services/e_enemies';
import Perimeter from '@/services/e_perimeter';
import Updates from '@/services/m_updates';
import { CONST, MyRotate, MyVector } from '@/services/math.js';
import Settings from '@/services/t_settings';
import { computed, ref } from 'vue';
import Statistic from '@/services/s_statistic';

class Balls {
  static #onlyInstance = null;
  constructor() {
    if (Balls.#onlyInstance) return Balls.#onlyInstance;
    Balls.#onlyInstance = this;
    this.balls = ref([]);
  }

  init() {
    this.balls.value = [];
    let ballsDeg = [];
    const update = Updates.updates['perimeter'].groups['balls'].updates['number'].count;
    if (update === 0) return;
    if (update === 1) ballsDeg = [0];
    if (update === 2) ballsDeg = [0, 180];
    if (update === 3) ballsDeg = [0, 120, 240];
    if (update === 4) ballsDeg = [0, 90, 180, 270];

    ballsDeg.forEach((deg) => this.balls.value.push(new BallBuilder(deg)));
  }

  newBall(number) {
    const allBalls = this.balls.value.length + number;
    const degAdd = 360 / allBalls;
    for (let ball = 0; ball < number; ball++) {
      this.balls.value.push(new BallBuilder(0));
    }

    this.balls.value.forEach((ball, i) => {
      if (i === 0) return;
      let deg = this.balls.value[0].deg + degAdd * i;
      if (deg >= 360) deg -= 360;
      ball.deg = deg;
    });
  }

  tick() {
    this.balls.value.forEach((ball) => {
      ball.move();
      ball.checkCollision();
    });
  }
}

export default new Balls();

class BallBuilder {
  constructor(deg) {
    this.size = CONST.BALL.SIZE * Settings.scaleSize;
    this.r = this.size / 2;
    this.deg = ref(deg);

    this.s_deg_spead = computed(() => {
      const lengthCircle = 2 * Math.PI * CONST.BALL.DISTANCE * Settings.scaleSize;
      const lengthArc = Updates.updates['perimeter'].groups['balls'].updates['spead'].count * Settings.scaleSpead.value;
      const degAdd = (360 * lengthArc) / lengthCircle;
      return degAdd;
    });

    this.x = computed(() => {
      const deg = MyRotate.getRadInDeg(this.deg.value);
      return Perimeter.x - Math.cos(deg) * CONST.BALL.DISTANCE * Settings.scaleSize;
    });

    this.y = computed(() => {
      const deg = MyRotate.getRadInDeg(this.deg.value);
      return Perimeter.y + Math.sin(deg) * CONST.BALL.DISTANCE * Settings.scaleSize;
    });
  }

  move = () => {
    this.deg.value += this.s_deg_spead.value;
    if (this.deg.value >= 360) this.deg.value -= 360;
  };

  checkCollision = () => {
    Enemies.enemies.value.forEach((enemy) => {
      if (enemy.u_balls > 0) return;
      const isCollision = MyVector.isCollisionFast(this.x.value, this.y.value, this.r, enemy.x, enemy.y, enemy.r);
      if (!isCollision) return;
      this.attack(enemy);
    });
  };

  attack = (enemy) => {
    let damage = enemy.s_hp_max;
    let damagePercent = Updates.updates['perimeter'].groups['balls'].updates['damage'].count;
    if (enemy.name === 'Босс') damagePercent /= 20;
    damage *= damagePercent;
    enemy.u_balls = 1000;
    enemy.getDamage(damage);
    Statistic.inc('damage_balls', damage);
  };
}
