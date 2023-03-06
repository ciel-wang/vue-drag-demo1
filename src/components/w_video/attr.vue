<template>
	<div>
		<el-form-item label="地址">
			<el-input v-model="contain.activeObj.data" type="textarea" :rows="3" />
		</el-form-item>
		<el-form-item label="自动播放">
			<el-switch v-model="contain.activeAttr.autoplay"></el-switch>
		</el-form-item>
		<el-form-item label="控制台">
			<el-switch v-model="contain.activeAttr.controls"></el-switch>
		</el-form-item>
		<el-form-item label="循环">
			<el-switch v-model="contain.activeAttr.loop"></el-switch>
		</el-form-item>
	</div>
</template>

<script>
export default {
	name: 'wVideo',
	inject: ['contain'],
};
</script>
