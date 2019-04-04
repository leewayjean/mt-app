<template>
  <div class="nav">
    <router-link to="/goods" class="nav-item">点餐 <i class="line"></i></router-link>
    <router-link to="/ratings" class="nav-item">评价 <i class="line"></i></router-link>
    <router-link to="/sellers" class="nav-item">商家 <i class="line"></i></router-link>
  </div>
</template>
<script>
export default {
  name: 'app-nav',
  data() {
    return {

    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  line-height: 40px;
  justify-content: space-around;
  border-bottom: 1px solid #e4e4e4;
}

.nav-item {
  position: relative;
  color: #666666;
  text-decoration: none;
  font-size: 16px;
}

.nav .active {
  color: #ffbb22;
}

.nav .active .line {
  position: absolute;
  left: 50%;
  margin-left: -10px;
  bottom: 0px;
  width: 20px;
  height: 2px;
  background: #ffbb22;

}

</style>
