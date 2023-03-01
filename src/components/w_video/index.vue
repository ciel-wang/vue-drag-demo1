<template>
	<video muted width="100%" height="100%" :src="dataChart" v-bind="params" style="object-fit: fill"></video>
</template>

<script>
export default {
	name: 'wVideo',
	computed: {
		params() {
			let result = {};
			if (this.attr.controls) result.controls = 'controls';
			if (this.attr.loop) result.loop = 'loop';
			if (this.attr.autoplay) result.autoplay = 'autoplay';
			return result;
		},
	},
};
</script>
