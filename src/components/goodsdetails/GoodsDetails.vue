<template>
  <div class="goods-details animated slideInRight" v-if="flag">
    <div class="details-wrapper">
      <!-- 顶部栏 -->
      <div class="details-header">
        <div class="header-left">
          <span class="close-btn" @click="flag =!flag">&times;</span>
        </div>
        <div class="header-right">
          <span class="btn share-btn"></span>
          <span class="btn more-btn"></span>
        </div>
      </div>
      <!-- 商品图 -->
      <img :src="food.picture" alt="商品图" class="good-img">
      <div class="details-footer">
        <div class="footer-left">
          <h3 class="name">{{food.name}}</h3>
          <p class="month-saled">{{food.month_saled_content}}</p>
          <p class="price"><span>￥{{food.min_price}}</span>/<span>{{food.unit}}</span></p>
        </div>
        <div class="footer-right">
          <!-- 添加商品按钮 -->
          <cart-control :food="food" v-if="food.count>0"></cart-control>
          <span v-else class="selectSize" @click="addGood">加入购物车</span>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="split"></div>
    <!-- 评论列表 -->
    <div class="comment-wrapper">
      <p class="comment-header">
        <span>外卖评价</span>
        <span v-if="food.rating">{{food.rating.snd_title}}<span class="arrow"><i class="icon-arrow_lift"></i></span></span>
      </p>
        <comment-list :food="food"></comment-list>
    </div>
  </div>
</template>
<script>
import CartControl from "../cartcontrol/CartControl.vue"
import Comment from "./Comment.vue"


export default {
  data() {
    return {
      flag: false,
    }
  },
  props: ["food"],
  components: {
    "cart-control": CartControl,
    "comment-list":Comment
  },
  methods: {
    show() {
      this.flag = true;
    },
    addGood() {
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      }
    },  
  },
  
}

</script>
<style scoped>
@import url(../../common/css/icon.css);

.goods-details {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 51px;
  padding: ;
  background: #fff;
}

.details-wrapper {
  padding: 10px;
}

.details-header {
  padding-top: ;
  display: flex;
  justify-content: space-between;
}

.btn {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.close-btn {
  font-size: 28px;
  color: #444;
}

.share-btn {
  background-image: url(img/share.png);
}

.more-btn {
  background-image: url(img/more.png);
}

.share-btn,
.more-btn {
  background-size: 30px;
}

.details-footer {
  display: flex;
  justify-content: space-between;
}

.good-img {
  width: 100%;
}

.details-footer .name {
  font-size: 16px;
  color: #333;
}

.details-footer .month-saled {
  color: #bfbfbf;
  font-size: 12px;
  padding: 5px 0;
}

.details-footer .price {
  font-size: 12px;
  color: #bfbfbf;
}

.details-footer .price span {
  font-size: 14px;
  color: #fb4e44;
}

.footer-right {
  display: flex;
  align-items: center;
}

.footer-right .selectSize {
  display: inline-block;
  height: 20px;
  font-size: 11px;
  background: #ffbb22;
  line-height: 20px;
  padding: 0 5px;
  border-radius: 10px;

}

/*分割线*/
.split {
  height: 10px;
  background: #f4f4f4;
}

/*评价列表*/
.comment-wrapper {
  padding: 10px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.comment-header .arrow {
  display: inline-block;
  font-size: 10px;
  transform: rotateY(180deg);
}



</style>
