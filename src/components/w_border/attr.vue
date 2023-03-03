<template>
	<div>
		<el-form-item label="图片地址">
			<img :src="contain.activeObj.data" alt="" width="60%" />

			<el-input v-model="contain.activeObj.data" size="small" style="width: 90%">
				<el-button slot="append" icon="el-icon-picture" @click="openImgDialog"></el-button>
			</el-input>
		</el-form-item>
		<imgList ref="imgListRef" :contain="contain"></imgList>
	</div>
</template>

<script>
import imgList from '../selectImg.vue';

export default {
	name: 'wBorder',
	inject: ['contain'],
	components: { imgList },
	methods: {
		openImgDialog() {
			this.$refs.imgListRef.openImgDialog('border');
		},
	},
};
</script>
