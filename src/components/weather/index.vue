<template>
	<div :style="[styleSizeName]">
		<iframe
			:width="attr.width"
			:height="attr.height"
			frameborder="0"
			scrolling="no"
			hspace="0"
			:src="src"
			:style="[styleSizeName]"
		></iframe>
	</div>
</template>

<script>
export default {
	name: 'Weather',
	computed: {
		src() {
			let { color, backgroundColor, fontSize, codeId } = this.attr;
			return `https://i.tianqi.com?c=code&id=${codeId}&color=${color}&bgc=${backgroundColor}&bdc=%23&icon=1&py=请选择&site=${fontSize}`;
		},
	},
};
</script>
