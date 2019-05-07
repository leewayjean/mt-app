<template>
  <div class="comment-scroll" ref="commentWrapper">
  	<ul class="comment">
      <li class="comment-list" 
      v-for="comment in (food.rating.comment_list)">
        <div class="comment-left"><img :src="comment.user_icon" alt=""></div>
        <div class="comment-right">
          <p>
            <span class="user-name">{{comment.user_name}}</span>
            <span class="comment-time">{{comment.comment_time}}</span>
          </p>
          <p class="comment-score">评分</p>
          <p class="comment-content">{{comment.comment_content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
	import BScroll from "better-scroll"

export default {
  props: ["food"],
  methods: {
    _initBScroll() {
      new BScroll(this.$refs.commentWrapper)
    }
  },
  created() {
    this.$nextTick(() => {
      this._initBScroll();
    })
  }
}

</script>
<style scoped>
.comment-scroll {
  max-height: 150px;
	overflow: hidden;
}
.comment {
  padding-top:20px;
}
/*评论列表*/
.comment-list {
  display: flex;
}

.comment-list .comment-left img {
  height: 35px;
  height: 35px;
  border-radius: 50%;

}

.comment-list .comment-right {
  flex: 1;
  padding: 10px 10px;
}

.comment-list .comment-right p:first-child {
  display: flex;
  justify-content: space-between;
}

.comment-list .comment-right .user-name {
  font-size: 11px;
  color: #333;
}

.comment-list .comment-right .comment-time {
  font-size: 9.6px;
  color: #666;
}

.comment-list .comment-right .comment-score {
  font-size: 11px;
  color: #666;
  padding: 12px 0 15px;
}

.comment-list .comment-content {
  font-size: 14px;
  color: #000;
  padding: 0px 20px;
}

</style>
