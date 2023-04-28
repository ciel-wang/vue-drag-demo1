<template>
	<div class="w_main" id="canvasId" :style="styleName">
		<shape
			v-for="item in contain.componentData"
			:key="item.index"
			v-contextmenu="{ id: 'w_menu', event: contain.handleContextMenu, value: item }"
			:width="item.attr.width"
			:height="item.attr.height"
			:top="item.top"
			:left="item.left"
			:active="contain.activeIndex === item.index"
			:index="item.index"
			:style="{
				width: $w.setPx(item.attr.width),
				height: $w.setPx(item.attr.height),
				top: $w.setPx(item.top),
				left: $w.setPx(item.left),
			}"
		>
			<component :is="item.name" :attr="item.attr" :dataChart="item.data"></component>
		</shape>
	</div>
</template>

<script>
import components from '@/components';
import shape from './shape.vue';

export default {
	mixins: [components],
	components: { shape },
	inject: ['contain'],
	provide() {
		return {
			contain: this.contain,
			canvasId: () => this.canvasId,
		};
	},
	data() {
		return {
			canvasId: null,
		};
	},
	mounted() {
		this.canvasId = document.getElementById('canvasId');
	},
	computed: {
		styleName() {
			return Object.assign(
				{
					width: this.$w.setPx(this.contain.config.width),
					height: this.$w.setPx(this.contain.config.height),
					fontSize: this.$w.setPx(this.contain.config.fontSize),
					backgroundColor: this.contain.config.backgroundColor,
					opacity: this.contain.config.opacity,
				},
				(() => {
					if (this.contain.config.backgroundImg) {
						return {
							backgroundImage: `url(${this.contain.config.backgroundImg})`,
						};
					}
					return;
				})()
			);
		},
	},
};
</script>

<style>
.w_main {
	background-repeat: no-repeat;
	background-size: 100% 100%;
	margin: auto;
	position: relative;
}
</style>
