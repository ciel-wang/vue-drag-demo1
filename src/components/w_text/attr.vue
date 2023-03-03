<template>
	<div>
		<el-form-item label="文本内容">
			<el-input v-model="contain.activeObj.data" type="textarea" :rows="3" />
		</el-form-item>
		<el-form-item label="开启">
			<el-switch v-model="contain.activeAttr.scroll"></el-switch>
		</el-form-item>
		<template v-if="contain.activeAttr.scroll">
			<el-form-item label="滚动速度">
				<el-input v-model="contain.activeAttr.speed"></el-input>
			</el-form-item>
		</template>
	</div>
</template>

<script>
export default {
	name: 'wText',
	inject: ['contain'],
};
</script>
