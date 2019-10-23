const Goods = () => import("../components/goods/Goods.vue")
const Ratings = () => import("../components/ratings/Ratings.vue");
const Comment = () => import("../components/ratings/rating/CommentAll.vue");
const All1 = () => import("../components/ratings/rating/all2.vue")
const All2 = () => import("../components/ratings/rating/all3.vue")
const Seller = () => import("../components/seller/Seller.vue")


export const routes = [
	{
		path: "/", component: Goods
	},
	{
		path: "/ratings", component: Ratings, redirect: "/ratings/commentall",
		children: [
			{
				path: "/ratings/commentall", component: Comment
			},
			{
				path: "/ratings/all2", component: All2
			},
			{
				path: "/ratings/all3", component:All2
			},
		]
	},
	{
		path: "/sellers", component: Seller
	},
	{
		path: "*", component: Goods
	}

]