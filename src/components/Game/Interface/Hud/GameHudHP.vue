<template>
  <div class="hud__hp" :style="KitBar">
    <div v-for="kitSeporator in kitSeporators" :key="kitSeporator.id" class="hud__hp-separ" :style="kitSeporator" />
    <div class="hud__hp-defence" :style="GuardBar">
      <div class="hud__hp-heal" :style="HPBar">
        <div class="hud__hp-heal-now">{{ hpNow }}</div>
        <div class="hud__hp-heal-line" />
        <div class="hud__hp-heal-all">{{ hpMax }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { MyMath } from '@/services/math.js';
  import Updates from '@/services/m_updates';
  import Tower from '@/services/e_tower';
  import Wall from '@/services/eu_wall';

  const hpNow = computed(() => {
    if (Wall.status.value === 'ready') return MyMath.toText(Wall.s_hp.value);
    return MyMath.toText(Tower.s_hp.value);
  });
  const hpMax = computed(() => {
    if (Wall.status.value === 'ready') return MyMath.toText(Wall.s_hp_max.value);
    return MyMath.toText(Tower.s_hp_max.value);
  });

  const HPBar = computed(() => {
    if (Wall.status.value === 'ready') {
      const percentWall = (Wall.s_hp.value / Wall.s_hp_max.value) * 100;
      return `background: linear-gradient(to top, var(--col-turq) ${percentWall}%, var(--col-bg-main) 0%)`;
    }
    const percentHP = (Tower.s_hp.value / Tower.s_hp_max.value) * 100;
    const colorHP = percentHP <= 25 ? 'red' : percentHP <= 50 ? 'orange' : percentHP <= 75 ? 'yellow' : 'green';
    return `background: linear-gradient(to top, var(--col-${colorHP}) ${percentHP}%, var(--col-bg-main) 0%)`;
  });

  const GuardBar = computed(() => {
    if (Updates.updates['defence'].groups['guard'].updates['percent'].lvl_max <= 0)
      return `background: transperent; border: none;`;
    const percentGuard = Updates.updates['defence'].groups['guard'].updates['percent'].count * 100;
    return `background: conic-gradient(var(--col-turq) ${percentGuard}%, var(--col-bg-main) 0%)`;
  });

  const colors = ['purple', 'basic', 'turq', 'green', 'yellow', 'orange', 'red'];

  const kitSeporators = computed(() => {
    const seporatorsCount = Math.ceil(Updates.updates['defence'].groups['kit'].updates['max'].count - 1);
    const seporatorDeg = 360 / seporatorsCount;
    let tempDeg = seporatorDeg;
    const seporatorsRotateDegs = [];
    for (let s = 0; s < seporatorsCount; s++) {
      seporatorsRotateDegs.push(`rotate: ${tempDeg}deg`);
      tempDeg += seporatorDeg;
    }
    return seporatorsRotateDegs;
  });

  const KitBar = computed(() => {
    if (Updates.updates['defence'].groups['kit'].updates['percent'].lvl_max <= 0)
      return `background: transperent; border: none;`;
    let kitHP = Tower.s_hp.value - Tower.s_hp_max.value;
    if (kitHP <= 0) return `background: conic-gradient(var(--col-bg-main) 100%);`;

    return styleKitGenerator(kitHP);
  });

  function styleKitGenerator(kitHP) {
    let endStyle = 'background: conic-gradient(';
    const percentMax = 100 / kitSeporators.value.length;
    let addPercent = 0;
    for (let c = 0; c < kitSeporators.value.length; c++) {
      const kitPointHP = Tower.s_hp_max.value < kitHP ? Tower.s_hp_max.value : kitHP;
      kitHP = kitHP - Tower.s_hp_max.value;
      // eslint-disable-next-line no-mixed-operators
      let kitPointPercent = (kitPointHP / Tower.s_hp_max.value) * percentMax + addPercent;
      addPercent += percentMax;
      if (kitPointPercent < 0) kitPointPercent = 0;
      kitPointPercent = MyMath.round(kitPointPercent);
      // eslint-disable-next-line no-mixed-operators
      let color = c >= colors.length * 2 ? c - colors.length * 2 : c >= colors.length ? c - colors.length : c;
      if (c === kitSeporators.value.length - 1) {
        endStyle += `var(--col-${colors[color]}) ${kitPointPercent}%, var(--col-bg-main) 0%);`;
      } else {
        endStyle += `var(--col-${colors[color]}) ${kitPointPercent}%, `;
      }
    }
    return endStyle;
  }
</script>

<style lang="scss">
  .hud__hp {
    position: absolute;
    bottom: calc(1.6dvh + 1.5dvh);
    left: 50%;
    z-index: 5;
    width: 14.5dvh;
    height: 14.5dvh;
    border: 0.03dvh solid $col-bg-focus;
    border-radius: 100%;
    transform: translateX(-50%);
    cursor: pointer;
    transition: border 0.2s ease-in-out;
    &:hover {
      border-color: $col-orange;
      box-shadow: 0 0 1dvh 0 $col-orange;
    }
    &-separ {
      position: absolute;
      width: 100%;
      height: 100%;
      &::before {
        position: absolute;
        left: 50%;
        width: 0.2dvh;
        height: 2dvh;
        background: $col-bg-main;
        transform: translate(-50%);
        content: ' ';
      }
    }
    &-defence,
    &-heal {
      position: relative;
      top: 50%;
      left: 50%;
      width: calc(100% - 1.06dvh);
      height: calc(100% - 1.06dvh);
      border: 0.03dvh solid $col-bg-focus;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      transition: 0.2s ease-in-out;
    }
    &-heal {
      display: flex;
      flex-direction: column;
      font-size: 1.3em;
      border: 0.03dvh solid $col-bg-focus;
      box-shadow: inset 0 0 2dvh rgb(0 0 0 / 80%);
      &-now,
      &-all {
        display: flex;
        flex: 1;
        align-items: end;
        justify-content: center;
      }
      &-line {
        height: 2%;
        background: $col-text;
      }
      &-all {
        align-items: start;
      }
    }
  }
</style>
