<template>
  <div id="app">
    <!-- 头部 -->
    <app-header v-bind:poiInfo="poiInfo"></app-header>
    <!-- 导航 -->
    <app-nav ></app-nav>
    <!-- 主内容区 -->

<!-- 
  keep-alive => 保持组件的状态，避免重复渲染
             => 不必重复请求数据，性能优
             => 提升用户体验

 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>
<script>
import Header from "./components/header/Header.vue"
import Nav from "./components/nav/Nav.vue"

export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-nav": Nav,
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
