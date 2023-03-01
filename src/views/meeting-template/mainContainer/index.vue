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
			<component :is="item.name" :style="{ width: $w.setPx(item.attr.width), height: $w.setPx(item.attr.height) }"></component>
		</shape>
	</div>
</template>

<script>
import components from '@/components';
import shape from './shape.vue';
import contextMenu from './contextMenu.vue';

export default {
	mixins: [components],
	components: { shape, contextMenu },
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
	methods: {
		handleDragStart(e) {
			console.log(e);
		},
		handleDrag(e) {
			console.log(e);
		},
	},
	computed: {
		styleName() {
			return Object.assign(
				{
					width: this.$w.setPx(this.contain.config.width),
					height: this.$w.setPx(this.contain.config.height),
					fontSize: this.$w.setPx(this.contain.config.fontSize),
					backgroundColor: this.contain.config.backgroundColor,
				},
				(() => {
					if (this.contain.config.backgroundImg) {
						return {
							background: `url(${this.contain.config.backgroundImg}) 0% 0% / 100% 100% rgb(3, 12, 59)`,
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
	position: absolute;
	top: 4%;
	left: 50%;
	transform: translateX(-50%);
}
</style>
