<template>
  <div class="shopcart-detail-wrapper animated fadeInUp faster">
    <!-- 活动信息 -->
    <p class="sale-info" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</p>
    <!-- 清空购物车栏 -->
    <div class="remove-goods">
      <span>1号口袋</span>
      <span @click="removeGoods" class="remove-btn">清空购物车</span>
    </div>
    <!-- 购物车列表 -->
    <div class="scroll-wrapper" ref="listScroll">
      <ul class="goods-list">
        <li class="list-item" v-for="item in goods">
          <div class="left-wrapper">
            <p>
              <span class="delete-item" @click="deleteItem(item)">&times;</span>
              <h3 class="good-name">{{item.name}}
                <p class="unit">{{item.unit}}</p>
              </h3>
            </p>
            <span class="price">￥{{item.min_price}}</span>
          </div>
          <div class="right-wrapper">
            <cart-control :food="item"></cart-control>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import CartControl from "../cartcontrol/CartControl.vue"
export default {
  name: "shopcart-detail",
  props: ["poiInfo", "cartGoods", ],
  components: {
    "cart-control": CartControl
  },
  data() {
    return {
      listScroll: {}
    }
  },
  methods: {
    // 清空所有
    removeGoods() {
      this.cartGoods.forEach((item) => {
        this.$delete(item, "count")
      })
    },
    deleteItem(item) {
      this.$delete(item, "count");
    },
    _initBScroll() {
      this.listScroll = new BScroll(this.$refs.listScroll, {
        // 能点击
        click: true,
        bounce: {
          top: false,
          bottom: false,
        }

      });
    }
  },
  computed: {
    goods() {
      return this.cartGoods;
    }
  },
  created() {
    this.$nextTick(() => {
      this._initBScroll()
    })
  }

}

</script>
<style scoped>
/*活动信息栏*/
.sale-info {
  height: 30px;
  background-color: #f3e6c6;
  line-height: 30px;
  text-align: center;
  font-size: 11px;
  color: #646158;
}

/*清空购物车栏*/
.remove-goods {
  display: flex;
  justify-content: space-between;
  background-color: #f4f4f4;
  height: 30px;
  padding: 6px;
  color: #000;
  font-size: 12px;
  line-height: 30px;
  border-top: 1px solid #A0A0A0FF;
  border-bottom: 1px solid #A0A0A0FF;

}

.remove-btn {
  background-size: 16px;
  background-position: 0px 7px;
  padding-left: 20px;
  background-image: url(img/ash_bin.png);
  background-repeat: no-repeat;
}

/*商品列表*/
.goods-list {
  background: #fff;
}

.list-item {
  display: flex;
  padding: 12px 12px 10px;

}

.left-wrapper {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.left-wrapper .delete-item {
  color: #f00;
  font-size: 22px;
}

.right-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 0 0 110px;
}

.price {
  color: #fb4e44;

}

.unit {
  margin-top: 5px;
  font-size: 12px;
  color: ##7C7C7CFF;
}

/*菜单列表滚动*/
.scroll-wrapper {
  /*添加商品后最大高度*/
  max-height: 180px;
  overflow: hidden;
}

</style>
