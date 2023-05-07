<template>
	<div :style="[styleSizeName]">{{ nowDate }}</div>
</template>

<script>
import dayjs from 'dayjs';
export default {
	name: 'wDatetime',
	data() {
		return {
			date: new Date(),
			weekday: ['日', '一', '二', '三', '四', '五', '六'],
		};
	},
	computed: {
		nowDate() {
			if (this.attr.format === 'day') {
				return '星期' + this.weekday[dayjs().$W];
			}
			const format = (this.attr.format || 'yyyy-MM-dd hh:mm:ss').replace('dd', 'DD').replace('yyyy', 'YYYY');
			return dayjs(this.date).format(format);
		},
	},
};
</script>
