<template>
	<div>
		<el-form-item label="图片地址">
			<img :src="contain.activeObj.data" alt="" width="60%" />

			<el-input v-model="contain.activeObj.data" size="small" style="width: 90%">
				<el-button slot="append" icon="el-icon-picture" @click="contain.handleOpenImg('activeObj.data', 'img')"></el-button>
			</el-input>
		</el-form-item>
	</div>
</template>

<script>
export default {
	name: 'wImg',
	inject: ['contain'],
};
</script>
