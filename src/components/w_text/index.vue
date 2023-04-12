<template>
	<div :style="[styleSizeName]" style="overflow: hidden">
		<div :style="styleName">{{ dataChart.value }}</div>
	</div>
</template>

<script>
export default {
	name: 'wText',
	data() {
		return {
			check: '',
			left: 0,
		};
	},
	computed: {
		speed() {
			return this.attr.speed || 100;
		},
		scroll() {
			return this.attr.scroll || false;
		},
		textWidth() {
			const textLen = (this.dataChart.value || '').length;
			return textLen * this.attr.fontSize;
		},
		styleName() {
			return {
				width: this.scroll ? this.$w.setPx(this.textWidth) : 'auto',
				transform: 'translateX(' + this.left + 'px)',
			};
		},
	},
	watch: {
		scroll() {
			this.move();
		},
		speed() {
			this.move();
		},
	},
	mounted() {
		this.move();
	},
	methods: {
		move() {
			clearInterval(this.check);
			if (this.scroll) {
				this.check = setInterval(() => {
					if (this.left < -this.textWidth) {
						this.left = this.attr.width;
					}
					this.left = this.left - 5;
				}, this.speed);
			} else {
				this.left = 0;
			}
		},
	},
};
</script>
