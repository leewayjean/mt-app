<template>
	<div class="comment-wrapper">
		<ul class="comment">
			<li class="comment-list" v-for="comment in comments">
				<div class="comment-left"><img :src="comment.user_pic_url" alt=""></div>
				<div class="comment-right">
					<p>
					<span class="user-name">{{comment.user_name}}</span>
					<span class="comment-time">2017.1.1</span>
					</p>
					<p class="comment-score">评分</p>
					<p class="comment-content">{{comment.comment}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				ratings:{},
				comments:[]
			}
		},
		created(){
			this.axios.get("/api/ratings")
			.then((res) => {
				let data = res.data.data;
				let comments = res.data.data.comments;
				this.ratings = data;
				this.comments = comments;

			})
		}
	}
</script>


<style scoped>
/*	.comment-list {
		padding-left: 46px;
	}*/
	.comment-list {
		display: flex;
		border-bottom: 1px solid #f4f4f4;
	}
	.comment-list .comment-left img{
		height:35px;
		height: 35px;
		border-radius: 50%;

	}
	.comment-list .comment-right {
		flex: 1;
		padding:10px 10px;
	}
	.comment-list .comment-right p:first-child {
		display: flex;
		justify-content: space-between;
	}
	.comment-list .comment-right .user-name {
		font-size:11px;
		color:#333 ;
	}
	.comment-list .comment-right .comment-time {
		font-size:9.6;
		color:#666;
	}
	.comment-list .comment-right .comment-score {
		font-size:11px;
		color:#666;
		padding:12px 0 15px;
	}
	.comment-list .comment-content {
		font-size: 16px;
		color: #000;
		padding:16px 20px;
	}
</style>