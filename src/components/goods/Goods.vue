<template>
  <div class="goods animated fadeIn faster">
    <!--  左侧菜单导航 -->
    
    <div class="menu-wrapper" ref="menuScroll">
      <!--   专场 -->
      <ul class="menu">
        <li :class="{activeClass:currentIndex == 0}" @click='bindEvent(0)'>
          <img :src="container.tag_icon" alt="" class="food-icon"><span>{{container.tag_name}}</span>
        </li>
        <!--  其他分类 -->
        <li>
          <ul class="menu">
            <li class="menu-item" 
            v-for="(food,index) in foods" :key="index" 
            :class="{activeClass:currentIndex ==(index+1)}" 
            @click='bindEvent(index+1)'>
              <img class="food-icon"  :src="food.icon" alt="" v-if="food.icon" >
              <span>{{food.name}}</span>
              <!-- 角标 -->
              <i class="menu-count" v-if="menuCount(food.spus)>0">{{menuCount(food.spus)}}</i>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 右侧的商品展示 -->
    <div class="foods-wrapper" ref="foodScroll">
      <!--  商品列表顶部 -->
      <ul class="top-goods">
        <!-- 专场商品 -->
        <li class="food-list-item">
          <img alt="商品图"
          :src="food.pic_url"  
          v-for="(food,index) in container.operation_source_list"
          >
        </li>
        <!-- 具体商品 -->
        <li>
          <ul>
            <li class="goods-list food-list-item" v-for="food in foods">
              <h3 class="category-name">{{food.name}}</h3>
              <div class="goods-item" 
                v-for="(food,index) in food.spus" 
                :key="index" 
                @click="showdetails(food)">
                <img :src="food.picture" alt="商品图">
                <div class="food-info">
                  <h3 class="name">{{food.name}}</h3>
                  <p class="sell-info" v-if="food.description" >{{food.description}}</p>
                  <p class="sell-info">
                    <span class="month-saled">{{food.month_saled_content}}</span>
                    <span>{{food.praise_content}}</span>
                  </p>
                  <p class="price">
                    <span>￥{{food.min_price}}</span>
                    /<span>{{food.unit}}</span>
                  </p>
                  <!-- 添加、减少商品按钮 -->
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 商品详情页 -->
    <goods-details ref="Details" :food="foodDetails"></goods-details>

    <!-- 购物车 -->
    <div class="shopcart-wrapper">
      <shop-cart :poiInfo="poiInfo" :cartGoods="cartGoods"></shop-cart>
    </div>
  </div>
</template>

<script>
//引入better-scroll 插件
import BScroll from 'better-scroll'
import ShopCart from "../shopcart/ShopCart.vue"
import CartControl from "../cartcontrol/CartControl.vue"
import GoodsDetails from "../goodsdetails/GoodsDetails.vue"

export default {
  name: 'goods',
  data() {
    return {
      container: {}, //axios请求数据
      foods: [],
      poiInfo: {},
      listHeight: [], //右边每个li所处高度
      scrollY: 0, //屏幕滚动在Y轴方向的距离
      foodScroll: {}, //右侧的BScroll对象
      menuScroll: {}, //左侧的BScroll对象
      itemArray:[],
      foodDetails:{}
    }
  },
  components: {
    "shop-cart": ShopCart,
    "cart-control": CartControl,
    "goods-details":GoodsDetails
  },
  computed: {
    // 用于动态绑定左边菜单栏的Class，
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1]
        // 触发滚动事件过程中进行判断，如果滚动过程中处于某个区间，则currentIndex为当前区间的索引
        if (this.scrollY > height1 && this.scrollY < height2) {

          return i;

        }
      }
      return 0;

    },
    // 购物车内的商品
    cartGoods() {
      let foods = [];
      this.foods.forEach((food) => {
        food.spus.forEach((item) => {
          // 如果商品的count数量>0,往购物车数组中添加数据
          if (item.count > 0) {
            foods.unshift(item);
          }
        })
      })
      return foods;
    },


  },
  methods: {
    // 初始化BScroll对象
    _initBScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        // 能点击
        click: true,

      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true,
        // 派发滚动事件
        probeType: 3
      });
      // 右边商品页滚动，并派发滚动事件。记录当前在Y轴滚动距离
      this.foodScroll.on("scroll", (pos) => {
        // 取整且取绝对值
        this.scrollY = Math.abs(Math.round(pos.y))
      })

    },
    // 计算每个商品页每个li所处在的高度，并存储到listHeight数组中
    calculateHeight() {
      // 获取所有li
      let itemArray = this.$refs.foodScroll.getElementsByClassName('food-list-item');
      let height = 0;
      let heightArray = [];
      heightArray.push(height)
      for (let i = 0; i < itemArray.length; i++) {
        height += itemArray[i].clientHeight;
        heightArray.push(height)
      }
      this.listHeight = heightArray;

    },
    //点击滚动到某个元素，better-scroll中的scrollToElement()方法，必须在实例的BScroll对象中声明click:true,否则页面将无法滚动
    bindEvent(index) {
      let itemArray = this.$refs.foodScroll.getElementsByClassName('food-list-item');
      this.foodScroll.scrollToElement(itemArray[index], 200)
    },
    menuCount(food){
      let count = 0;
      food.forEach((item) => {
        if(item.count){
          count += item.count;
        }
      })
      return count;
    },
    showdetails(food){
      this.foodDetails = food;
      this.$refs.Details.show();
    }


  },
  created() {
    // 获取数据
    this.axios.get("/api/goods")
      .then(res => {
        this.container = res.data.data.container_operation_source;
        this.foods = res.data.data.food_spu_tags;
        this.poiInfo = res.data.data.poi_info;
      })
    // 初始化BScroll对象需要获取dom
    this.$nextTick(() => {
      this._initBScroll();

      setTimeout(() => {
         this.calculateHeight()
      },300)

    })

  },
}

</script>
<style scoped>
/*引入css结尾处一定要加分号，否则样式错乱*/
@import url("../../common/css/icon.css");

.goods {
  position: absolute;
  left:0;
  top:190px;
  bottom: 51px;
  display: flex;
  overflow: hidden;
}

/*左侧菜单开始*/
.menu-wrapper {
  font-size: 13px;
  color: #333;
  flex: 0 0 85px;
  background: #f4f4f4;

}

.goods .menu-wrapper li:first-child {
  display: flex;
  justify-content: center;
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
}

.goods .menu-wrapper li:last-child li {
  display: flex;
  justify-content: center;
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
}

.goods .menu-wrapper .food-icon {
  padding-right: 2px;
  width: 15px;
  height: 15px;
}

/*左侧菜单结束*/


/*右侧商品列表开始*/
.foods-wrapper {
  flex: 1;
}

/*专场*/
.foods-wrapper .top-goods {
  border-bottom: 1px solid #e4e4e4;
  padding: 11px 11px 0 11px;
}

.foods-wrapper .top-goods li {
  margin-bottom: 11px;
}

.foods-wrapper .top-goods img {
  border-radius: 6px;
  width: 100%;
}

/*具体商品*/
.foods-wrapper .goods-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 25px;

}

.foods-wrapper .goods-list {
  padding: 11px 11px;
}

.foods-wrapper .goods-list .category-name {
  padding-left: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #000;
  font-weight: bold;
  background: url(./img/btn_yellow_highlighted@2x.png);
  background-repeat: no-repeat;
  background-size: 4px 18px;
}

.foods-wrapper .goods-item img {
  height: 75px;
  width: 75px;
  margin-right: 11px;
  border-radius: 6px;
}

.foods-wrapper .goods-item .food-info {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.foods-wrapper .goods-item .food-info .name {
  font-size: 16px;
  color: #333;
  padding-bottom: 10px;
}

.foods-wrapper .goods-item .food-info .sell-info {
  font-size: 10px;
  color: #bfbfbf;
  padding: 5px 0;
}

.foods-wrapper .goods-item .food-info .sell-info:first-child {
  margin-right: 14px;
}

.month-saled {
  margin-right: 14px;
}

.foods-wrapper .goods-item .food-info .price {
  font-size: 12px;
  color: #bfbfbf;
}

.foods-wrapper .goods-item .food-info .price span {
  font-size: 14px;
  color: #fb4e44;
}
/*商品详情页面*/



/*菜单选中样式*/
.activeClass {
  background: #fff;
  font-weight: bold;
}
/*菜单栏显示个数*/
.menu-item {
  position: relative;
}
.menu-count {
  position: absolute;
  right:-8px;
  top:0;
  display: block;
  width:16px;
  height:16px;
  border-radius: 50%;
  color:#fff;
  background: red;
  text-align: center;
  line-height: 16px;
  font-size:8px;
}

/*购物车*/
.cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}

.shopcart-wrapper {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}

</style>
