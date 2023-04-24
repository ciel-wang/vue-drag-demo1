<template>
	<div :style="[styleSizeName]" style="overflow: hidden">
		<div :style="styleName">{{ value }}</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';

export default {
	name: 'wText',
	data() {
		return {
			check: '',
			left: 0,
		};
	},
	computed: {
		value() {
			if (this.dataChart.dataKey !== 'meetingTime') return this.dataChart.value;
			const format = (this.attr.format || 'yyyy-MM-dd hh:mm:ss').replace('dd', 'DD').replace('yyyy', 'YYYY');
			let arr = this.dataChart.value.split('#');
			let start = arr.length && arr[0];
			let end = arr.length && arr[1];
			start = start && dayjs(start).format(format);
			end = end && dayjs(end).format(format);
			return start + '至' + end;
		},
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
