<template>
  <div class="goods">
    <!--  左侧菜单导航 -->
    <div class="menu-wrapper" ref="menuScroll">
      <!--   专场 -->
      <ul>
        <li v-bind:class="{activeClass:currentIndex == 0}" v-on:click='bindEvent(0)'>
          <img v-bind:src="container.tag_icon" alt="活动图标" class="food-icon"><span>{{container.tag_name}}</span>
        </li>
        <!--  其他分类 -->
        <li>
          <ul class="other-navItem">
            <li v-for="(food,index) in foods" :key="index" v-bind:class="{activeClass:currentIndex ==(index+1)}" v-on:click='bindEvent(index+1)'>
              <img v-bind:src="food.icon" alt="活动图标" v-if="food.icon" class="food-icon">
              <span>{{food.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 左侧菜单导航结束 -->
    <!-- 右侧的商品展示 -->
    <div class="foods-wrapper" ref="foodScroll">
      <!--  商品列表顶部 -->
      <ul class="top-goods">
        <li class="food-list-item">
          <img :src="food.pic_url" alt="商品图" v-for="(food,index) in container.operation_source_list">
        </li>
        <li>
          <ul>
            <li class="goods-list food-list-item" v-for="food in foods">
              <h3 class="category-name">{{food.name}}</h3>
              <div class="goods-item" v-for="(food,index) in food.spus" :key="index">
                <img v-bind:src="food.picture" alt="">
                <div class="food-info">
                  <h3 class="name">{{food.name}}</h3>
                  <p v-if="food.description" class="sell-info">{{food.description}}</p>
                  <p class="sell-info"><span class="month-saled">{{food.month_saled_content}}</span> <span>{{food.praise_content}}</span></p>
                  <p class="price"><span>${{food.min_price}}</span>/例</p>
                  <span class="addBtn"><i class="icon-add_circle"></i></span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 商品列表下 -->
    </div>
    <!--  右侧商品阐释结束 -->
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name: 'goods',
  data() {
    return {
      container: {}, //axios请求数据
      foods: [],
      listHeight: [], //右边每个li所处高度
      scrollY: 0, //屏幕滚动在Y轴方向的距离
      foodScroll: {}, //右侧的BScroll对象
      menuScroll: {} //左侧的BScroll对象
    }
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

    }
  },
  methods: {
    // 初始化BScroll对象
    _initBScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true,

      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3
      });
      // 右边商品页滚动，并派发滚动事件。记录当前在Y轴滚动距离
      this.foodScroll.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })

    },
    // 计算每个商品页每个li所处在的高度，并存储到listHeight数组中
    calculateHeight() {
      // 获取所有li
      let itemArray = this.$refs.foodScroll.getElementsByClassName('food-list-item')
      let height = 0;
      let heightArray = [];
      heightArray.push(height)
      for (let i = 0; i < itemArray.length; i++) {
        height += itemArray[i].clientHeight;
        heightArray.push(height)
      }
      this.listHeight = heightArray;

    },
    bindEvent(index) {
      let itemArray = this.$refs.foodScroll.getElementsByClassName('food-list-item');
      this.foodScroll.scrollToElement(itemArray[index], 400)
    }
  },
  created() {
    this.axios.get("/api/goods")
      .then(res => {
        this.container = res.data.data.container_operation_source;
        this.foods = res.data.data.food_spu_tags;
      })
    // 初始化BScroll对象需要获取dom
    this.$nextTick(() => {
      this._initBScroll()
      setTimeout(() => {
        this.calculateHeight()
      }, 1000)
    })

  },
}

</script>
<style scoped>
@import url("../../common/css/icon.css");

.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  left: 0;
  width: 100%;
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
.month-saled{
  margin-right:14px;
}
.foods-wrapper .goods-item .food-info .price {
  font-size: 12px;
  color: #bfbfbf;
}

.foods-wrapper .goods-item .food-info .price span {
  font-size: 14px;
  color: #fb4e44;
}

.foods-wrapper .goods-item .food-info .addBtn {
  position: absolute;
  font-size: 25px;
  right: 0;
  bottom: 0;
  color: #ffbb22;
}


.activeClass {
  background: #fff;
  font-weight: bold;
}

</style>
