<template>
  <div class="ILvls">
    <h2>Уровни</h2>
    <div class="lvls">
      <div class="lvls__top">
        <div class="lvls__top-lvl">Уровень {{ Settings.lvl }}</div>
        <div class="lvls__top-waves">
          Волны <br />
          2055
        </div>
      </div>
      <div class="lvls__body">
        <div class="lvls__point lvls__point-passed">
          <div class="lvls__point-left">
            <span><VIcon :name="'coins'" /></span>50 монет
          </div>
          <div class="lvls__point-waves">
            <div class="lvls__point-waves-line" />
            <div class="lvls__point-waves-lvl">10</div>
          </div>
          <div class="lvls__point-right">
            <span><VIcon :name="'diamond'" /></span>5 алмазов
          </div>
        </div>
        <div class="lvls__point lvls__point-passed">
          <div class="lvls__point-left">
            <span><VIcon :name="'coins'" /></span>50 монет
          </div>
          <div class="lvls__point-waves">
            <div class="lvls__point-waves-line" />
            <div class="lvls__point-waves-lvl">20</div>
          </div>
          <div class="lvls__point-right">
            <span><VIcon :name="'diamond'" /></span>5 алмазов
          </div>
        </div>
        <div class="lvls__point">
          <div class="lvls__point-left">
            <span><VIcon :name="'coins'" /></span>50 монет
          </div>
          <div class="lvls__point-waves">
            <div class="lvls__point-waves-line" />
            <div class="lvls__point-waves-lvl">30</div>
          </div>
          <div class="lvls__point-right">
            <span><VIcon :name="'diamond'" /></span>5 алмазов
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Settings from '@/services/t_settings';
</script>

<style lang="scss">
  .ILvls {
    & .lvls {
      width: 100%;
      margin-top: 1dvh;
      &__top {
        width: 100%;
        text-align: center;
        &-lvl {
          font-size: 1.5em;
        }
        &-waves {
          width: 50%;
          margin: 2dvh auto 0;
          padding: 1dvh;
          font-size: 1.5em;
          background: $col-bg-focus;
          border: 0.4dvh solid $col-basic;
          border-radius: 1dvh;
          box-shadow: 0 0 1.2dvh 0 $col-basic;
        }
      }
      &__body {
        width: 100%;
      }
      &__point {
        display: flex;
        flex-wrap: nowrap;
        align-items: end;
        width: 100%;
        text-align: center;
        &-left,
        &-right {
          flex: 1;
          & span {
            display: block;
            margin-bottom: -1dvh;
            font-size: 2.5em;
          }
        }
        &-waves {
          flex: 1;
          &-line {
            width: 1dvh;
            height: 10dvh;
            margin: 0 auto;
            background: $col-bg-focus;
            content: ' ';
          }
          &-lvl {
            width: 75%;
            margin: 0 auto;
            padding: 0.5dvh;
            font-size: 1.2em;
            background: $col-bg-focus;
            border: 0.3dvh solid $col-bg-dis;
            border-radius: 1dvh;
          }
        }
      }
      &__point-passed {
        & .lvls__point {
          &-waves {
            &-line {
              background: $col-basic;
              box-shadow: 0 0 1.2dvh 0 $col-basic;
            }
            &-lvl {
              background: $col-bg-focus;
              border: 0.3dvh solid $col-basic;
              box-shadow: 0 0 1.2dvh 0 $col-basic;
            }
          }
        }
      }
    }
  }
</style>
