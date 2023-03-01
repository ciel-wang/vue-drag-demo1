<template>
	<el-carousel
		style="width: 100%; height: 100%"
		:autoplay="attr.autoplay"
		:interval="attr.interval"
		:indicator-position="attr.indicatorPosition"
		:type="attr.isCard ? 'card' : 'none'"
		:loop="attr.loop"
		:direction="attr.direction"
	>
		<el-carousel-item v-for="(item, index) in dataChart" :key="index">
			<img :src="item.value" draggable="false" width="100%" height="100%" />
			<h3 v-if="attr.isShowText" class="label_class">{{ item.label || 123 }}</h3>
		</el-carousel-item>
	</el-carousel>
</template>
<script>
export default {
	name: 'wSwiper',
};
</script>
<style lang="scss" scoped>
/deep/.el-carousel__container {
	height: 100% !important;
}
.label_class {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
	color: #fff;
}
</style>
