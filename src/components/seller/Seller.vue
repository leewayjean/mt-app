<template>
  <div class="seller-wrapper animated fadeIn faster">
    <div class="wrapper">
      <!-- 商铺联系方式 -->
      <div class="contact">
        <p class="address">{{shopInfo.name}}</p>
        <span class="call"></span>
      </div>
      <!-- 店铺图片 -->
      <div class="slider-wrapper" ref="slider_wrapper">
        <ul class="slider" ref="slider">
          <li class="slider-item" v-for="img_item in thumbnails_url_list" :key="img_item">
            <img :src="img_item" alt="商品图">
          </li>
        </ul>
      </div>
      <!-- 查看食品档案信息 -->
      <div class="safe-info-wrapper">
        <p >查看食品安全档案</p>
        <span class="arrow"><i class="icon-arrow_lift"></i></span>
      </div>
    </div>
    <!-- 配送服务信息 -->
    <ul class="delivery-wrapper">
      <li class="delivery-info">
        配送服务：{{shopInfo.app_delivery_tip}}
      </li>
      <li class="delivery-time">
        配送时间：{{shopInfo.shipping_time}}
      </li>
    </ul>
    <!-- 商家服务信息 -->
    <ul class="server-wrapper">
      <li class="server-info">
        <span>商家服务</span>
        <span 
        :style="{'background-image':serverIcon}" 
        v-if="shopInfo.poi_service">{{shopInfo.poi_service[0].content}}
        </span>
      </li>
      <li class="server-info" v-if="shopInfo.discounts2" >
        <span :style="{'background-image':icon_url}">{{shopInfo.discounts2[0].info}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
//引入better-scroll 插件
import BScroll from 'better-scroll'
export default {
  name: 'seller',
  data() {
    return {
      shopInfo: {},
      thumbnails_url_list: [],
      slideScroll: {}
    }
  },
  computed:{
    serverIcon(){
      if(this.shopInfo.poi_service){
        return `url(${this.shopInfo.poi_service[0].icon})`;
      }
    },
    icon_url(){
      if(this.shopInfo.discounts2){
        return `url(${this.shopInfo.discounts2[0].icon_url})`;
      }
    }
  },
  methods: {
    // 初始化BScroll对象
    _initBScroll() {
      this.slideScroll = new BScroll(this.$refs.slider_wrapper, {
        scrollX: true,
        bounce: {
          top: false,
          bottom: false,
        }
      });
    }
  },
  created() {
    this.axios.get("/api/seller")
      .then((res) => {
        let data = res.data.data;
        this.shopInfo = data;
        this.thumbnails_url_list = data.poi_env.thumbnails_url_list;
      })
    this.$nextTick(() => {
      this._initBScroll()
    })
  }
}

</script>
<style scoped>
@import url(../../common/css/icon.css);
.seller-wrapper {
  width: 100%;
  position: absolute;
  left: 0;
  top: 190px;
  bottom: 0;
  font-size: 14px;
  color: #000;
  background: #f4f4f4;
}

.wrapper {
  background: #fff;
  overflow: hidden;
  margin-top: 10px;
  padding:10px;
  width: 100%;
  box-sizing: border-box;
}


/*联系方式*/
.contact {
  display: flex;
  padding: 16px 0;
}

.contact .address {
  flex: 1;
  padding:2px 0px 2px 20px;
  font-size:16px;
  background-image: url(img/address.png);
  background-repeat: no-repeat;
  background-size: 16px;
}

.contact .call {
  flex: 0 0 60px;
  border-left:1px solid #333;
  background-image: url(img/phone.png);
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: 26px 4px;
}
/*安全档案*/
.safe-info-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 15px 14px 15px 25px;
  background-image: url(img/safety.png);
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: 1px 13px;
}
.safe-info-wrapper .arrow {
  font-size: 10px;
  line-height: 14px;
  transform: rotateY(180deg);
}


/*快递信息*/
.delivery-wrapper {
  background: #fff;
  padding:10px;
  margin-top: 10px;
}
.delivery-wrapper li {
  padding: 15px 0 15px 25px;
}

.delivery-wrapper li:first-child {
  border-bottom: 1px solid #f4f4f4;
}
.delivery-info,.delivery-time {
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: 0 13px;
}
.delivery-info {
  background-image: url(img/delivery.png);
}
.delivery-time {
  background-image: url(img/time.png);
}



/*幻灯片*/
.slider-wrapper {
  width: 100%;
  height: 75px;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
  overflow: hidden;
}

.slider {
  width: 150%;
  display: flex;
}

.slider-item img {
  width: 93px;
  height: 75px;
  margin: 0 5px;
}
/*商家服务*/
.server-wrapper {
  background: #fff;
  padding:10px;
  margin-top: 10px;
}
.server-wrapper .server-info span {
  display: inline-block;
  padding: 5px 18px 5px 18px;
  background-repeat: no-repeat;
  background-position: 0 3px;
  background-size: 16px;
}
.server-wrapper .server-info span:first-child {
  background-image: url(img/server.png);
}

</style>
