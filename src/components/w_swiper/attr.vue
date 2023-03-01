<template>
	<div>
		<el-form-item label="自动切换">
			<el-switch v-model="contain.activeAttr.autoplay"></el-switch>
		</el-form-item>
		<el-form-item label="循环">
			<el-switch v-model="contain.activeAttr.loop"></el-switch>
		</el-form-item>
		<el-form-item label="卡片化">
			<el-switch v-model="contain.activeAttr.isCard"></el-switch>
		</el-form-item>
		<el-form-item label="切换时间间隔(ms)" label-width="120">
			<el-input-number v-model="contain.activeAttr.interval" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
		<el-form-item label="展示方向">
			<el-radio v-model="contain.activeAttr.direction" label="horizontal">横方向</el-radio>
			<el-radio v-model="contain.activeAttr.direction" label="vertical">垂直方向</el-radio>
		</el-form-item>
		<el-form-item label="显示文字">
			<el-switch v-model="contain.activeAttr.isShowText"></el-switch>
		</el-form-item>
	</div>
</template>
<script>
export default {
	name: 'wSwiper',
	inject: ['contain'],
};
</script>
