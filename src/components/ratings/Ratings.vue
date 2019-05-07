<template>
  <div class="ratings animated fadeIn faster" ref="scroll">
    <div class="scroll-wrapper">
      <!-- 商家及配送评分 -->
      <div class="header-wrapper">
        <div class="header-left">
          <!-- 商家 -->
          <div class="seller-score">
            <span class="scroe" v-if="ratings.scores">{{ratings.scores.comment_score}}</span>
            <span>商家评分</span>
          </div>
          <div class="seller-star">
            <p>口味</p>
            <p>包装</p>
          </div>
        </div>
        <!-- 配送 -->
        <div class="header-right">
          <p>
            <span class="delivery-score">{{ratings.delivery_score}}</span>
            <span>配送评分</span>
          </p>
        </div>
      </div>
      <div class="split"></div>
      <div class="content-wrapper">
        <!-- 评论导航 -->
        <ul class="content-nav">
          <router-link class="nav-item" to="/ratings/commentall" tag="li">全部</router-link>
          <router-link class="nav-item" to="/ratings/all2" tag="li">有图</router-link>
          <router-link class="nav-item" to="/ratings/all3" tag="li">
            点评(<span v-if="ratings.comments_dp">{{ratings.comments_dp.comment_score}}</span>)
          </router-link>
        </ul>
        <!-- 评价标签 -->
        <ul class="tags">
          <li v-for="item in ratings.labels">{{item.content}}{{item.label_count}}</li>
        </ul>
        <!-- 评论内容 -->
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll"
export default {
  name: 'ratings',
  data() {
    return {
      ratings: {}
    }
  },
  methods: {
    _initBScroll() {
      new BScroll(this.$refs.scroll, {
        click: true,
      })
    }
  },
  created() {
    this.axios.get("/api/ratings")
      .then((res) => {
        let data = res.data.data;
        this.ratings = data;
      })
      .catch((err) => {
        console.log(err)
      })

    this.$nextTick(() => {
      this._initBScroll();
    })
  }
}

</script>
<style scoped>
.ratings {
  position: absolute;
  top: 190px;
  bottom: 0;
  width: 100%;
  background: #fff;
  font-size: 11px;
  color: #666;
  overflow: hidden;
}

/*商家及配送评分*/
.header-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px 26px 18px;
  background: #fff;
}

.header-left {
  display: flex;
  flex: 1;
}

.header-right {
  display: flex;
  justify-content: flex-end;
  flex: 0 0 100px;
  border-left: 1px solid #999;
}

.header-right p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.seller-score {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 30px;

}

.seller-star {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.scroe {
  font-size: 23px;
  color: #ffb000;
  margin-bottom: 9px;
  font-weight: bold;
}

.delivery-score {
  font-size: 19px;
  color: #999;
  margin: 3px 0 10px 0;
}

/* 分割线 */

.split {
  height: 10px;
  background: #f4f4f4;
}

/*评价内容*/
.content-wrapper {
  background: #fff;
  padding: 16px;
  overflow: hidden;

}

/* 评价导航 */
.content-nav {
  display: flex;
  width: 100%;
  text-align: center;
  margin-bottom: 11px;

}

.nav-item {
  flex: 1;
  font-size: 14px;
  color: #ffb000;
  height: 33px;
  line-height: 33px;
  border: 1px solid #ffb000;
}

.content-nav li:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.content-nav li:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}


/*评价标签*/

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tags li {
  height: 27px;
  background: #f4f4f4;
  color: #999;
  font-size: 12px;
  padding: 0 10px;
  line-height: 27px;
  border-radius: 4px;
  margin: 0 6px 6px 0;
}



/*评价导航选中样式*/
.active {
  background: #ffb000;
  color: #333;
}

</style>
