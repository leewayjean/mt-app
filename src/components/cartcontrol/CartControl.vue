<template>
  <div class="cartcontrol-wrapper">
    <!-- 减少 -->
    <span class="decreaseBtn" @click.stop="decreaseCount()" v-if="food.count"><i class="icon-remove_circle_outline"></i></span>
    <!-- 数量 -->
    <span class="count" v-if="food.count">{{food.count}}</span>
    <!-- 添加 -->
    <span class="increaseBtn" @click.stop="increaseCount()"><i class="icon-add_circle"></i></span>
  </div>
</template>
<script>
export default {
  name: "cart-control",
  props: ["food"],
  methods: {
    // 减少数量
    decreaseCount() {
      if (!this.food.count) {
        // 由于商品的json数据中没有计数的属性，因此设置count属性
        this.$set(this.food, "count", 1)
      } else {
        this.food.count--;
      }
    },
    // 增加数量
    increaseCount() {
      if (!this.food.count) {
        // 由于商品的json数据中没有计数的属性，因此设置count属性
        this.$set(this.food, "count", 1)
      } else {
        this.food.count++;
      }
    }
  },
}

</script>
<style scoped>
/*引入字体图标*/
@import url("../../common/css/icon.css");
/*购物车控件*/
.cartcontrol-wrapper {
  display: flex;
  align-content: center;
}
/*数量*/
.count {
  text-align: center;
  width: 27px;
  line-height: 22.4px;
  font-size: 14px;
}
/*添加、减少按钮*/
.decreaseBtn,
.increaseBtn {
  font-size: 22px;
}
/*减少*/
.decreaseBtn {
  color: #B5B5B5FF;
}
/*增加*/
.increaseBtn {
  color: #ffbb22;
}

</style>
