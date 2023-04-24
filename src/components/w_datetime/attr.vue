<template>
	<div>
		<el-form-item label="时间格式">
			<el-select v-model="contain.activeAttr.format">
				<el-option v-for="item in formatDic" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="自定义格式">
			<el-input v-model="contain.activeAttr.format"> </el-input>
		</el-form-item>
	</div>
</template>

<script>
export default {
	name: 'wDatetime',
	inject: ['contain'],
	data() {
		return {
			formatDic: [
				{ label: '日期', value: 'yyyy-MM-dd' },
				{ label: '日期+时分', value: 'yyyy-MM-dd HH:mm' },
				{ label: '日期+时分秒', value: 'yyyy-MM-dd HH:mm:ss' },
				{ label: '日期(无年)', value: 'MM-dd' },
				{ label: '时分', value: 'HH:mm' },
				{ label: '时分秒', value: 'HH:mm:ss' },
				{ label: '星期', value: 'day' },
			],
		};
	},
};
</script>
