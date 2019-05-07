
export const routes = [
	{path:"/",component:()=>import("../components/goods/Goods.vue")},
	{path:"/ratings",component:()=>import("../components/ratings/Ratings.vue"),redirect:"/ratings/commentall",children:[
		{path:"/ratings/commentall",component:()=>import("../components/ratings/rating/CommentAll.vue")},
		{path:"/ratings/all2",component:()=>import("../components/ratings/rating/all2.vue")},
		{path:"/ratings/all3",component:()=>import("../components/ratings/rating/all3.vue")},
	]},
	{path:"/sellers",component:()=>import("../components/seller/Seller.vue")},
	{path:"*",component:()=>import("../components/goods/Goods.vue")}

]