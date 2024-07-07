<template>
  <div class="IShop">
    <h2>Магазин</h2>
    <div class="shop">
      <div class="shop__point">
        <div class="shop__point-count">100</div>
        <div class="shop__point-icon"><VIcon :name="'diamond'" /></div>
        <div class="shop__point-price">200 рублей</div>
      </div>
      <div class="shop__point">
        <div class="shop__point-count">250</div>
        <div class="shop__point-icon"><VIcon :name="'diamond'" /></div>
        <div class="shop__point-price">400 рублей</div>
      </div>
      <div class="shop__point">
        <div class="shop__point-count">500</div>
        <div class="shop__point-icon"><VIcon :name="'diamond'" /></div>
        <div class="shop__point-price">700 рублей</div>
      </div>
      <div class="shop__point">
        <div class="shop__point-count">1000</div>
        <div class="shop__point-icon"><VIcon :name="'diamond'" /></div>
        <div class="shop__point-price">1200 рублей</div>
      </div>
      <div class="shop__point">
        <div class="shop__point-count">2500</div>
        <div class="shop__point-icon"><VIcon :name="'diamond'" /></div>
        <div class="shop__point-price">2700 рублей</div>
      </div>
      <div class="shop__point">
        <div class="shop__point-count">5000</div>
        <div class="shop__point-icon"><VIcon :name="'diamond'" /></div>
        <div class="shop__point-price">5000 рублей</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
  .IShop {
    & .shop {
      display: flex;
      flex-wrap: wrap;
      gap: 1dvh;
      margin-top: 1dvh;
      font-size: 3em;
      place-content: flex-start space-between;
      &__point {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        width: calc(100% / 3 - 0.7dvh);
        text-align: center;
        border: 0.3dvh solid $col-yellow;
        transition: 0.3s ease-in-out;
        &:hover {
          background: $col-yellow;
          box-shadow: 0 0 2dvh 0 $col-yellow;
        }
        &-count {
          font-size: 1.5em;
        }
        &-icon {
          font-size: 2.8em;
        }
        &-price {
          font-size: 0.5em;
        }
      }
    }
  }
</style>
