<template>
  <div class="menu__bar">
    <div
      class="bsh-red"
      style="margin-bottom: 1dvh; text-align: center; text-transform: uppercase; cursor: pointer"
      @click="prototypeReload()"
    >
      Сбросить прототип
    </div>
    <div class="menu-player">
      <div class="menu-player__ava" />
      <div class="menu-player__info">
        <div class="menu-player__name">{{ User.username }}</div>
        <div class="menu-player__lvl">Уровень {{ User.lvl.value.lvl }}</div>
      </div>
      <div class="menu-player__valuta">
        <div style="color: var(--col-yellow)">
          {{ MyMath.toText(User.valuta.value.coins) }}<VIcon :name="'coins'" />
        </div>
        <div style="color: var(--col-turq)">{{ User.valuta.value.diamonds }}<VIcon :name="'diamond'" /></div>
        <div style="color: var(--col-purple)">{{ User.valuta.value.ultimates }}<VIcon :name="'ultimate'" /></div>
        <div style="color: var(--col-basic)">{{ User.valuta.value.tickets }}<VIcon :name="'ticket'" /></div>
        <div style="color: var(--col-orange)">{{ User.valuta.value.awards }}<VIcon :name="'award'" /></div>
      </div>
      <div />
    </div>

    <div class="menu__btn bsh-yellow" @click="$emit('openInfo', 'Магазин')"><VIcon :name="'shop'" /> Магазин</div>
    <div class="menu__btn bsh-green" @click="$emit('openInfo', 'События')"><VIcon :name="'medal'" /> События</div>
    <div class="menu__btn bsh-orange" @click="$emit('openInfo', 'Правила')"><VIcon :name="'book'" /> Правила игры</div>
    <div class="menu__btn bsh-basic" @click="$emit('openInfo', 'Настройки')"><VIcon :name="'gear'" /> Настройки</div>
  </div>
</template>

<script setup>
  import User from '@/services/t_user';
  import { MyMath } from '@/services/math.js';

  function prototypeReload() {
    localStorage.clear();
    window.location.reload();
  }
</script>

<style lang="scss">
  .menu__bar {
    position: relative;
    top: 1dvh;
    left: 1dvh;
    width: 17vw;
  }
  .menu-player {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1dvh;
    padding: 1dvh;
    background: $col-bg-main;
    border: 0.3dvh solid $col-purple;
    box-shadow: 0 0 1.2dvh 0 $col-purple;
    cursor: pointer;
    &__ava {
      width: 7dvh;
      height: 7dvh;
      background: $col-purple;
      content: ' ';
    }
    &__info {
      width: calc(100% - 8dvh);
      margin-left: 1dvh;
    }
    &__name {
      font-size: 1.4em;
    }
    &__valuta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 1dvh;
      text-align: center;
      & div {
        width: calc(100% / 3);
      }
    }
  }
  .menu__btn {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5dvh;
    align-items: center;
    justify-content: center;
    margin-bottom: 1dvh;
    padding: 1dvh;
    font-size: 1.5em;
    cursor: pointer;
  }
</style>
