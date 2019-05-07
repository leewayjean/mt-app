<template>
  <div class="wrapper">
    <!-- 购物车列表 -->
    <shopcart-detail :cartGoods="cartGoods" :poiInfo="poiInfo" v-if="isShow"></shopcart-detail>
    <!-- 购物车 -->
    <div class="shop-cart">
      <!-- 购物车左边 -->
      <div class="shopcart-left-wrapper">
        <span class="shopping-cart-icon" :class="{'hasGoods':totalCount>0}" @click="showDetail"><i class="icon-shopping_cart"></i><i class="totalCount" v-if="totalCount>0">{{totalCount}}</i></span>
        <div class="shopping-fee-tip">
          <p v-if="totalPrice>0" class="totalPrice">￥{{totalPrice}}</p>
          <p>另需{{poiInfo.shipping_fee_tip}}</p>
        </div>
      </div>
      <!-- 购物车右边 -->
      <div class="shopcart-right-wrapper" :class="{'hasGoods':totalPrice>0}">
        <span class="btn-text">{{hasGoods}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import ShopCartDetail from "./ShopcartDetail.vue"

export default {
  name: "shop-cart",
  props: ["poiInfo", "cartGoods"],
  data() {
    return {
      // 是否显示购物车详情
      isShow: false,
    }
  },
  components: {
    "shopcart-detail": ShopCartDetail
  },

  computed: {
    // 总价
    totalPrice() {
      let total = 0;
      this.cartGoods.forEach((item) => {
        total += item.min_price * item.count;
      })
      return total;
    },
    // 总数
    totalCount() {
      let total = 0;
      this.cartGoods.forEach((item) => {
        total += item.count;
      })
      return total;
    },
    // 添加商品后结算按钮的样式
    hasGoods() {
      if (this.cartGoods.length > 0) {
        return "去结算";
      } else {
        return this.poiInfo.min_price_tip;
      }
    },



  },
  watch: {
    // 监听购物车商品数量，数量为0时，isShow赋值为false
    totalCount() {
      if (this.totalCount == 0) {
        this.isShow = false;
      }
    }
  },
  methods: {
    // 点击购物车按钮
    showDetail() {
      if (this.cartGoods.length > 0) {
        this.isShow = !this.isShow;
      }
    }
  }

}

</script>
<style scoped>
@import url("../../common/css/icon.css");

.shop-cart {
  display: flex;
  position: relative;
  width: 100%;
  height: 51px;
  font-size: 12px;
  color: #bab9b9;
  /*background: #2D2D2DFF;*/
  background:#333;
}

.shopcart-left-wrapper {
  flex: 1;
}

.shopcart-right-wrapper {
  flex: 0 0 110px;
  text-align: center;
  line-height: 51px;
}

.btn-text {
  font-size: 16px;
  font-weight: bold;
}

/*购物车图标*/
.shopping-cart-icon {
  position: absolute;
  top: -25px;
  left: 30px;
  display: inline-block;
  width: 60px;
  height: 60px;
  background: #444;
  color: #fff;
  border-radius: 50%;
  line-height: 60px;
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
}

.totalCount {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: #fff;
  background: red;
  text-align: center;
  line-height: 18px;
  font-size: 8px;
}

.totalPrice {
  font-size: 16px;
  color: #fff;
}

.shopping-fee-tip {
  height: 51px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 100px;
}

/*添加商品后*/
.hasGoods {
  background: #ffbb22;
  color: #222;
}

</style>
