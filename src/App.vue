<template>
  <div id="app">
    <!-- 头部 -->
    <app-header v-bind:poiInfo="poiInfo"></app-header>
    <!-- 导航 -->
    <app-nav ></app-nav>
    <!-- 主内容区 -->
    <router-view></router-view>
    <!-- 购物车 -->
    <shop-cart></shop-cart>

  </div>
</template>
<script>
import Header from "./components/header/Header.vue"
import Nav from "./components/nav/Nav.vue"
import ShopCart from "./components/shopCart/ShopCart.vue"

export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-nav": Nav,
    "shop-cart":ShopCart
  },
  data() {
    return {
      poiInfo:{}
    }
  },
  created() {
    this.axios.get("/api/goods")
      .then(res => {
        this.poiInfo = res.data.data.poi_info;
      })
  },

}

</script>
<style scoped>

</style>
