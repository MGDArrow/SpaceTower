<template>
  <div class="MUpdates">
    <h2>Улучшения</h2>
    <div class="updates">
      <div class="updates__coef">
        <div
          v-for="(coefText, i) in coef.variables"
          :key="i"
          class="updates__coef-point"
          :class="{ 'updates__coef-point-act': i === coef.now }"
          @click.stop="coef.now = i"
        >
          {{ coefText }}
        </div>

        <div class="updates__coef-point updates__coef-point-favorites" @click.stop="tab = false">
          <VIcon :name="'star'" />
        </div>
      </div>
      <div class="updates__tabs">
        <div
          v-for="(upd, index) in updates"
          :key="upd.color"
          :style="{ background: `var(--col-${upd.color})`, 'box-shadow': `0 0 1.2dvh 0 var(--col-${upd.color})` }"
          @click.stop="tab = index"
        >
          <VIcon :name="upd.icon" />
        </div>
      </div>
      <div v-if="tab" class="updates__body" :style="{ height: heightUpdates }">
        <h3 :style="{ background: `var(--col-${color})`, 'box-shadow': `0 0 1.2dvh 0 var(--col-${color})` }">
          <VIcon :name="updates[tab].icon" /> {{ updates[tab].name }}
        </h3>
        <div v-for="(groupe, grIn) in updates[tab].groups" :key="groupe.index" class="updates__body-groupe">
          <div v-if="groupe.lvl_access <= User.lvl.value.lvl">
            <h4 :style="{ background: `var(--col-${color})` }">
              {{ groupe.name }}
            </h4>
            <div v-for="(upd, uUpd) in groupe.updates" :key="upd.i">
              <MUpdatesItem
                :update="upd"
                :color="color"
                :mode="mode"
                @getLvlUp="(coef) => getUpdate(tab, grIn, uUpd, coef)"
                @getFavorite="getFavorite(tab, grIn, uUpd)"
                @mouseenter="$emit('description', upd)"
                @mouseleave="$emit('description', false)"
              />
            </div>
          </div>
          <div v-else class="updates__body-groupe--access">
            "{{ groupe.name }}" откроется на — {{ groupe.lvl_access }} уровне
          </div>
        </div>
      </div>
      <div v-if="!tab" class="updates__body" :style="{ height: heightUpdates }">
        <h3 style="background: var(--col-yellow); box-shadow: 0 0 1.2dvh 0 var(--col-yellow)">
          <VIcon :name="'star'" /> Избранное
        </h3>
        <div v-for="(update, uTab) in updates" :key="update.id">
          <div v-for="(groupe, grIn) in update.groups" :key="groupe.index" class="updates__body-groupe">
            <div v-for="(upd, uUpd) in groupe.updates" :key="upd.i">
              <MUpdatesItem
                v-if="upd.favorite && upd.lvl + upd.lvl_const !== upd.lvl_max"
                :update="upd"
                :color="update.color"
                :mode="mode"
                @getLvlUp="(coef) => getUpdate(uTab, grIn, uUpd, coef)"
                @getFavorite="getFavorite(uTab, grIn, uUpd)"
                @mouseenter="$emit('description', upd)"
                @mouseleave="$emit('description', false)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import MUpdatesItem from '@/components/Mechanics/MUpdatesItem.vue';
  import { computed, ref } from 'vue';
  import Updates from '@/services/m_updates';
  import User from '@/services/t_user';

  const props = defineProps({
    mode: {
      default: 'Меню',
    },
  });

  const heightUpdates = computed(() => {
    return props.mode === 'Меню' ? '84.8dvh' : '80.9dvh';
  });
  const tab = ref('attack');
  const coef = computed(() => Updates.coef.value);
  const updates = computed(() => Updates.updates);
  const color = computed(() => updates.value[tab.value].color);

  function getUpdate(uTab, uGroupe, uUpd, coef) {
    if (props.mode === 'Меню') Updates.constLvlupUpdate(uTab, uGroupe, uUpd, coef);
    if (props.mode === 'Игра') Updates.gameLvlupUpdate(uTab, uGroupe, uUpd, coef);
  }
  function getFavorite(uTab, uGroupe, uUpd) {
    Updates.getFavorite(uTab, uGroupe, uUpd);
  }
</script>

<style lang="scss">
  .MUpdates {
    & h2 {
      background-color: $col-orange;
    }
    & .updates {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      &__coef {
        display: flex;
        gap: 0.8dvh;
        width: 100%;
        height: 3dvh;
        margin: 0.8dvh 0;
        text-align: center;
        &-point {
          flex: 1;
          background: $col-bg-main;
          border: 0.3dvh solid $col-bg-dis;
          cursor: pointer;
          &-act {
            background: $col-orange;
            border: 0.3dvh solid $col-orange;
            box-shadow: 0 0 1dvh 0 $col-orange;
          }
          &-favorites {
            background: $col-yellow;
            border: 0.3dvh solid $col-yellow;
            box-shadow: 0 0 1dvh 0 $col-yellow;
          }
        }
      }
      &__tabs {
        display: flex;
        flex-direction: column;
        gap: 0.8dvh;
        width: 3dvh;
        margin-right: 0.8dvh;
        cursor: pointer;
        & div {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          padding: 0.6dvh;
          font-size: 1.3em;
        }
      }
      &__body {
        width: calc(100% - 3.8dvh);
        overflow-y: auto;
        & h3 {
          padding: 0.8dvh;
          font-size: 1.5rem;
          text-align: center;
          text-transform: uppercase;
        }
        & h4 {
          padding: 0.4dvh;
          font-size: 1.2rem;
          text-align: center;
        }
        &-groupe {
          margin-top: 0.8dvh;
          &--access {
            margin-top: 0.8dvh;
            padding: 0.8dvh;
            text-align: center;
            border: 0.4dvh dashed $col-text;
            opacity: 0.1;
            transition: 0.3s ease-in-out;
            &:hover {
              opacity: 1;
            }
          }
        }
        &::-webkit-scrollbar-thumb {
          background-color: $col-orange;
        }
      }
    }
  }
</style>
