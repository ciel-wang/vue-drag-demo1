<template>
	<div :style="[styleSizeName, styleImgName]"></div>
</template>

<script>
export default {
	name: 'wBorder',
	computed: {
		styleImgName() {
			return Object.assign(
				{
					backgroundClip: 'padding-box',
					filter: 'blur(0px)',
				},
				(() => {
					if (this.dataChart) {
						return {
							borderImageSource: 'url(' + this.dataChart + ')',
							borderImageSlice: '10 16 15 10 fill',
							borderWidth: '10px 16px 15px 10px',
							borderStyle: 'solid',
							boxSizing: 'border-box',
						};
					}
					return {};
				})()
			);
		},
	},
};
</script>
