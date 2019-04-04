<template>
	<div class="shop-cart">
		<span class="shopping-cart-icon"><i class="icon-shopping_cart"></i></span>
		<span class="gotoPay">去结算</span>
	</div>
</template>

<script>
	export default {
		name:"shop-cart"
	}
</script>


<style scoped>
@import url("../../common/css/icon.css");

	.shop-cart {
		position:fixed;
		left: 0;
		bottom: 0;
		width:100%;
		height:51px;
		background: #2D2D2DFF;
	}
	.gotoPay {
		float:right;
		text-align: center;
		line-height:50px;
		width:85px;
		height:50px;
		background: #ffbb22
	}
	.shopping-cart-icon {
		position: absolute;
		top:-25px;
		left:30px;
		display: inline-block;
		width:60px;
		height:60px;
		background:#474747FF;
		color:#fff;
		border-radius: 50%;
		line-height:60px;
		text-align: center;
		font-size:25px;
		font-weight: bolder;
	}
</style>