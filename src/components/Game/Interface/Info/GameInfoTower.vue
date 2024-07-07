<template>
  <div>
    <h2>Башня</h2>
    <div class="info__preview">
      <div class="preview__tower" />
    </div>
    <div class="info__text">
      <div class="info__text--one">HP:</div>
      <div class="info__text--two">{{ Tower.s_hp }}/{{ Tower.s_hp_max }}</div>
      <div class="info__text--one">Урон:</div>
      <div class="info__text--two">{{ Tower.s_damage }}</div>
      <div class="info__text--one">Скорость атаки:</div>
      <div class="info__text--two">
        {{ Updates.updates['attack'].groups['basic'].updates['spead'].count }}
      </div>
      <div class="info__text--one">Реген. HP:</div>
      <div class="info__text--two">--</div>
      <div class="info__text--one">Вампиризм:</div>
      <div class="info__text--two">--</div>
      <div class="info__text--one">Защита:</div>
      <div class="info__text--two">--</div>
    </div>
  </div>
</template>

<script setup>
  import Updates from '@/services/m_updates';
  import Tower from '@/services/e_tower';
</script>

<style lang="scss">
  .info__tower {
    &:hover {
      border-color: $col-basic;
      box-shadow: 0 0 1dvh 0 $col-basic;
    }
    &::-webkit-scrollbar-thumb,
    & h2 {
      background-color: $col-basic;
    }
    & .info__text--one {
      color: $col-basic;
    }
  }
  .preview {
    &__tower {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80%;
      height: 80%;
      background: $col-bg-dark;
      border: 0.6dvh solid $col-basic;
      border-radius: 100%;
      box-shadow: 0 0 1.2dvh 0.3dvh $col-basic;
      transform: translate(-50%, -50%);
    }
  }
</style>
