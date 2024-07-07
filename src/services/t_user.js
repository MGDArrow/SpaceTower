/* eslint-disable no-mixed-operators */
import { computed, ref } from 'vue';
import { MyMath } from './math';

// 0.4*х**3 + 40.4*x**2 + 396*x
const lvlFn = (lvl) => MyMath.roundTo(2 * lvl ** 3 + 50.5 * lvl ** 2 + 396 * lvl, 10);

class User {
  static #onlyInstance = null;
  constructor() {
    if (User.#onlyInstance) return User.#onlyInstance;
    User.#onlyInstance = this;

    this.username = 'MGDArrow';

    this.exp = ref(10000);
    this.lvl = computed(() => getLvl(this.exp.value));

    this.valuta = ref({
      coins: 50000000000,
      diamonds: 0,
      ultimates: 0,
      tickets: 0,
      awards: 0,
    });

    this.prototypeLocal();
  }

  prototypeLocal() {
    this.username = 'Прототип';

    if (!localStorage.getItem('user_exp')) localStorage.setItem('user_exp', 1);
    this.exp.value = +localStorage.getItem('user_exp');

    if (!localStorage.getItem('user_coins')) localStorage.setItem('user_coins', 1000);
    this.valuta.value.coins = +localStorage.getItem('user_coins');

    if (!localStorage.getItem('user_diamonds')) localStorage.setItem('user_diamonds', 0);
    this.valuta.value.diamonds = +localStorage.getItem('user_diamonds');

    if (!localStorage.getItem('user_ultimates')) localStorage.setItem('user_ultimates', 0);
    this.valuta.value.ultimates = +localStorage.getItem('user_ultimates');
  }

  updateCoins(coins) {
    this.valuta.value.coins += coins;
    localStorage.setItem('user_coins', +localStorage.getItem('user_coins') + coins);
  }

  updateDiamonds(diamonds) {
    this.valuta.value.diamonds += diamonds;
    localStorage.setItem('user_diamonds', +localStorage.getItem('user_diamonds') + diamonds);
  }

  updateUltimates(ultimates) {
    this.valuta.value.ultimates += ultimates;
    localStorage.setItem('user_ultimates', +localStorage.getItem('user_ultimates') + ultimates);
  }

  addExp(exp) {
    this.exp.value += exp;
    localStorage.setItem('user_exp', +localStorage.getItem('user_exp') + exp);
  }
}

export default new User();

function getLvl(exp) {
  let lvl = 0;
  let xp = exp;

  while (xp - lvlFn(lvl) >= 0) {
    xp -= lvlFn(lvl);
    lvl += 1;
  }
  const xp_next = lvlFn(lvl);
  const percent = (xp / xp_next) * 100;
  return { lvl, exp: MyMath.round(xp), exp_next: xp_next, percent };
}

// (function lvls() {
//   let lvls = [];
//   for (let i = 1; i <= 50; i++) {
//     lvls.push(lvlFn(i));
//   }
//   console.table(lvls);
// })();
