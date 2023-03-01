<template>
	<div>
		<el-form-item v-for="({ key, label }, index) in attrKeys" :key="index" :label="label">
			<el-color-picker v-if="isIncludesColor(key)" v-model="contain.activeAttr[key]" show-alpha></el-color-picker>

			<el-select v-else-if="selectKey.includes(key)" v-model="contain.activeAttr[key]">
				<el-option v-for="item in optionMap[key]" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>

			<el-input-number v-else v-model="contain.activeAttr[key]" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
	</div>
</template>

<script>
export default {
	inject: ['contain'],
	data() {
		return {
			styleData: [
				{ key: 'backgroundColor', label: '背景色' },
				{ key: 'borderWidth', label: '边框宽度' },
				{ key: 'borderStyle', label: '边框风格' },
				{ key: 'borderColor', label: '边框颜色' },
				{ key: 'borderRadius', label: '圆角' },
				{ key: 'color', label: '字体颜色' },
				{ key: 'fontSize', label: '字体大小' },
				{ key: 'fontWeight', label: '字体粗细' },
				{ key: 'lineHeight', label: '行高' },
				{ key: 'letterSpacing', label: '字间距' },
				{ key: 'textAlign', label: '左右对齐' },
				{ key: 'verticalAlign', label: '上下对齐' },
			],
			selectKey: ['textAlign', 'borderStyle', 'verticalAlign', 'fontWeight'],
			optionMap: {
				textAlign: [
					{ label: '左对齐', value: 'left' },
					{ label: '居中', value: 'center' },
					{ label: '右对齐', value: 'right' },
				],
				borderStyle: [
					{ label: '实线', value: 'solid' },
					{ label: '虚线', value: 'dashed' },
				],
				verticalAlign: [
					{ label: '上对齐', value: 'top' },
					{ label: '居中对齐', value: 'middle' },
					{ label: '下对齐', value: 'bottom' },
				],
				fontWeight: [
					{ label: 'normal', value: 'normal' },
					{ label: 'bold', value: 'bold' },
					{ label: 'bolder', value: 'bolder' },
					{ label: 'lighter', value: 'lighter' },
				],
			},
		};
	},
	computed: {
		attrKeys() {
			if (this.contain.activeAttr) {
				const activeAttrKeys = Object.keys(this.contain.activeAttr);
				return this.styleData.filter((item) => activeAttrKeys.includes(item.key));
			}
			return [];
		},
	},
	methods: {
		isIncludesColor(str) {
			return str.toLowerCase().includes('color');
		},
	},
};
</script>
