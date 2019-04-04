<template>
  <div class="header">
    <div class="head-bg" v-bind:style="head_bg"></div>
    <!-- 顶部通栏 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <!-- 返回箭头 -->
        <span class="icon-arrow_lift"></span>
      </div>
      <!--  搜素框 -->
      <form action="">
        <span class="search-icon"></span>
        <input type="text" class="search-input" placeholder="搜索店内商品">
      </form>
      <div class="more-wrapper">
        <a href="#" class="spelling-btn">拼单</a>
        <!-- 三黑小点 -->
        <span class="circle-btn">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </span>
      </div>
    </div>
    <!-- 顶部通栏结束 -->
    <!-- 头部中间开始 -->
    <div class="middle-wrapper">
      <!-- 店铺图标 -->
      <div class="shop-icon" v-bind:style="shop_icon"></div>
      <b class="shop-name">{{poiInfo.name}}</b>
      <!-- 收藏按钮 -->
      <span><i></i>收藏</span>
    </div>
    <!-- 头部中间结束 -->
    <!-- 头部脚部开始 -->
    <div class="bottom-wrapper"  v-if="poiInfo.discounts2">
      <div class="wrapper">
        <img v-bind:src="poiInfo.discounts2[0].icon_url" alt="活动图标" class="activ-icon">
        <span class="activ-text" >{{poiInfo.discounts2[0].info}}</span>
      </div>
      <a href="#" v-on:click.prevent="showMore">{{poiInfo.discounts2.length}}个活动<i class="icon-keyboard_arrow_right"></i></a>
    </div>
    <!--遮罩层 -->
    <div class="detatils-wrapper" v-show="isShow"  v-if="poiInfo.discounts2">
      <div class="main-wrapper" v-bind:style="poi_back_pic_url">
        <div class="detatils-main">
          <!-- 店铺图标以及店铺名称 -->
          <div class="shop-icon" v-bind:style="shop_icon"></div>
          <b class="shop-name">{{poiInfo.name}}</b>
          <!-- 促销活动信息 -->
          <p class="top-line">
            <img v-bind:src="poiInfo.discounts2[0].icon_url" alt="" class="activ-icon" >
            <span class="activ-text">{{poiInfo.discounts2[0].info}}</span>
          </p>
          <p class="activ-text">{{poiInfo.shipping_time}}</p>
          <p class="activ-text">
            <span>{{poiInfo.shipping_fee_tip}}</span>
            <span>{{poiInfo.min_price_tip}}</span>
            <span>{{poiInfo.delivery_time_tip}}</span>
          </p>
        </div>
        <!-- 关闭按钮 -->
        <span class="close-btn" v-on:click="hiddenMask"><i class="icon-close"></i></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  props: ["poiInfo"],
  computed: {
    head_bg() {
      return `background-image:url("${this.poiInfo.head_pic_url}"`;
    },
    shop_icon() {
      return `background-image:url("${this.poiInfo.pic_url}"`;
    },
    poi_back_pic_url() {
      return `background-image:url("${this.poiInfo.poi_back_pic_url}"`;
    }
  },
  methods: {
    showMore() {
      this.isShow = true;
    },
    hiddenMask() {
      this.isShow = false;
    }
  }
}

</script>
<style scoped>
@import url(../../common/css/icon.css);

.header {
  height: 130px;
  padding-top: 20px;
}

.head-bg {
  position: absolute;
  top: 0;
  left: 0;
  background-size: 110% 108%;
  background-repeat: no-repeat;
  z-index: -1;
  width: 100%;
  height: 150px;
}

/*顶部通栏开始*/
.top-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-wrapper {
  padding-left: 5px;
  color: #fff;
}

form {
  position: relative;
  flex: 1;
  margin: 0 70px 0 10px;
}

.search-icon {
  position: absolute;
  display: inline-block;
  width: 28px;
  height: 31px;
  background: url(img/search.png);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 8px 9px;
}

.search-input {
  width: 100%;
  height: 31px;
  border: none;
  outline: none;
  background: #cdcdcc;
  padding-left: 28px;
  border-radius: 25px;

}

.more-wrapper .spelling-btn {
  display: inline-block;
  width: 30px;
  height: 17px;
  border: 1px solid #fff;
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  line-height: 17px;
  color: #fff;

}

.s-radius {
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  border: 1px solid #fff;
}

.more-wrapper {
  padding-right: 10px;
}

/*中间部分开始*/

.middle-wrapper {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 17px;
  padding-bottom: 11px;
}

.shop-icon {
  width: 50px;
  height: 50px;
  background-size: 131%;
  background-position: -6px 0px;
  background-repeat: no-repeat;
}

.shop-name {
  color: #fff;
  padding-left: 12px;
  font-weight: bold;
}

/*底部开始*/
.bottom-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.activ-icon {
  width: 16px;
  height: 16px;
  padding-right: 6px;
}

.activ-text {
  font-size: 11px;
  color: #fff;
}

.wrapper {
  display: flex;
  align-items: center;
}

.bottom-wrapper a {
  text-decoration: none;
  font-size: 11px;
  color: #fff;
}

/*
详情页面*/
.detatils-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 43px 20px 125px;
  background: rgba(98, 98, 98, 0.8);
  z-index: 999;
}

.main-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.close-btn {
  color: #fff;
  text-align: center;
  line-height: 42px;
  position: absolute;
  left: 50%;
  margin-left: -21px;
  bottom: -60px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(118, 118, 118, 0.7);
  border: 1px solid rgba(140, 140, 140, 0.9);
}

.detatils-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
}

.detatils-main .shop-name {
  font-size: 15px;
  font-weight: normal;
  margin-top: 13px;
}

.top-line {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  padding-top: 10px;
  border-top: 1px solid #BABABC;
}

</style>
