<template>
	<div>
		<el-form-item label="样式">
			<el-select v-model="contain.activeAttr.codeId">
				<el-option v-for="item in codeIdDic" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
	</div>
</template>

<script>
export default {
	name: 'Weather',
	inject: ['contain'],
	data() {
		return {
			codeIdDic: [
				{ label: '样式一', value: 37 },
				{ label: '样式二', value: 151 },
			],
		};
	},
};
</script>
