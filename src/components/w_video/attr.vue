<template>
	<div>
		<el-form-item label="自动播放">
			<el-switch v-model="contain.activeAttr.autoplay"></el-switch>
		</el-form-item>
		<el-form-item label="控制台">
			<el-switch v-model="contain.activeAttr.controls"></el-switch>
		</el-form-item>
		<el-form-item label="循环">
			<el-switch v-model="contain.activeAttr.loop"></el-switch>
		</el-form-item>
		<el-form-item label="视频地址">
			<el-input v-model="contain.activeObj.data" type="textarea" :rows="3" />
			<el-upload class="u-width-100 u-m-t-10" drag :limit="1" :action="action" :data="data" :on-success="onSuccess">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip u-m-t-0" slot="tip">只能上传mp4文件</div>
			</el-upload>
		</el-form-item>
	</div>
</template>

<script>
export default {
	name: 'wVideo',
	inject: ['contain'],
	data() {
		return {
			action: '',
			data: {},
		};
	},
	methods: {
		onSuccess(response, file, fileList) {},
	},
};
</script>
<style lang="scss">
/deep/.el-upload {
	width: 100%;
}
/deep/.el-upload-dragger {
	width: 100%;
	.el-upload__text {
		font-size: 12px;
	}
}
</style>
