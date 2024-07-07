<template>
  <div class="congratulations">
    <VPopup v-model="congratulations_lvl">
      <h1>Поздравляем!</h1>
      <div class="congratulations__lvl">Вы получили {{ congratulations_lvl }}-й уровень!</div>
      <div class="congratulations__award-title">Ваша награда:</div>
      <div class="congratulations__award-cards">
        <div class="congratulations__award-cards--item bsh-yellow">
          <VIcon :name="'coins'" /><span>{{ MyMath.toText(congratulations_lvl_coins) }}</span>
        </div>
        <div class="congratulations__award-cards--item bsh-turq">
          <VIcon :name="'diamond'" /><span>{{ MyMath.toText(10 * congratulations_lvl) }}</span>
        </div>
        <div class="congratulations__award-cards--item bsh-purple">
          <VIcon :name="'ultimate'" /><span>{{ MyMath.toText(5 * congratulations_lvl) }}</span>
        </div>
      </div>
      <div v-if="congratulations_lvl_updates" class="congratulations__updates-title">
        Доступны новые улучшения в категории "{{ congratulations_lvl_updates[0].name }}":
      </div>
      <div v-if="congratulations_lvl_updates" class="congratulations__updates-cards">
        <div
          v-for="update in congratulations_lvl_updates[0].updates"
          :key="update.id"
          class="congratulations__updates-cards--item"
          :class="`bsh-${congratulations_lvl_updates[1]}`"
        >
          <VIcon :name="update.icon" /> {{ update.name }}
        </div>
      </div>
    </VPopup>
  </div>
</template>

<script setup>
  import { computed, ref, watch } from 'vue';
  import { MyMath } from '@/services/math';
  import Updates from '@/services/m_updates';
  import User from '@/services/t_user';
  import Settings from '@/services/t_settings';

  const userLvl = computed(() => User.lvl.value.lvl);

  const congratulations_lvl = ref(false);

  const congratulations_lvl_coins = computed(() => 1000 * (5 * (congratulations_lvl.value - 1)));

  const congratulations_lvl_updates = computed(() => {
    if (!congratulations_lvl.value) return false;
    let update = false,
      color = false;
    for (let direction in Updates.updates) {
      for (let groupe in Updates.updates[direction].groups) {
        if (Updates.updates[direction].groups[groupe].lvl_access === congratulations_lvl.value) {
          update = Updates.updates[direction].groups[groupe];
          // eslint-disable-next-line prefer-destructuring
          color = Updates.updates[direction].color;
          break;
        }
      }
    }
    if (!update) return false;
    return [update, color];
  });

  watch(userLvl, (newLvl) => {
    congratulations_lvl.value = newLvl;
    User.updateCoins(congratulations_lvl_coins.value);
    User.updateDiamonds(10 * newLvl);
    User.updateUltimates(5 * newLvl);
  });
  watch(congratulations_lvl, () => {
    Settings.gameSpeadPause();
  });
</script>

<style lang="scss">
  .congratulations {
    &__lvl {
      margin: 2dvh 0;
      font-size: 1.3em;
      text-align: center;
    }
    &__award-title,
    &__updates-title {
      color: $col-basic;
      font-size: 1.2em;
      text-align: center;
    }
    &__award-cards {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin: 3dvh 0;
      &--item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 20dvh;
        height: 30dvh;
        font-size: 2.7em;
        background: $col-bg-main;
        cursor: pointer;
        &:hover {
          width: 22dvh;
          font-size: 3.2em;
        }
        & svg {
          display: block;
          width: 100%;
          font-size: 2.5em;
        }
        & span {
          display: block;
          width: 100%;
          text-align: center;
        }
      }
    }
    &__updates-cards {
      width: 100%;
      margin: 3dvh 0;
      &--item {
        width: 100%;
        margin: 1dvh 0;
        padding: 1dvh;
        font-size: 2em;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
