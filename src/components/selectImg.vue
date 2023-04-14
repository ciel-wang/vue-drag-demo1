<template>
	<el-dialog title="图库" width="80%" :close-on-click-modal="false" :visible.sync="imgVisible">
		<el-upload
			class="upload-demo"
			multiple
			:on-success="onSuccess"
			:show-file-list="false"
			:data="{ mode: 'HY_ROOM_IMG' }"
			:headers="headers"
			action="/api/blade-basic/common/upload"
			list-type="picture"
		>
			<el-button size="small" icon="el-icon-upload" type="primary">点击上传</el-button>
		</el-upload>

		<el-scrollbar class="imgList">
			<img :src="item.value" @click="handleSetimg(item.value)" v-for="(item, index) in imgOption[imgActive]" :key="index" />
		</el-scrollbar>
	</el-dialog>
</template>

<script>
import { imgOption } from './config';
export default {
	data() {
		return {
			imgVisible: false,
			imgActive: 0,
			imgOption,
			imgObj: '',
			headers: '',
		};
	},
	methods: {
		openImgDialog(imgObj, type) {
			this.imgObj = imgObj;
			this.imgActive = type === 'bg' ? 0 : type === 'border' ? 1 : 2;
			this.imgVisible = true;
			this.headers = {
				'Blade-Auth': 'bearer ' + this.$store.state.token,
			};
		},
		handleSetimg(value) {
			this.$emit('change', value, this.imgObj);
			this.imgVisible = false;
		},
		onSuccess(res) {
			const url = res?.data?.absUrl;
			this.imgOption[this.imgActive].unshift({ label: url, value: url });
		},
	},
};
</script>
<style>
.imgList {
	height: 350px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.imgList img {
	width: 100px;
	height: 100px;
	max-width: 200px;
	margin: 20px 10px;
}
</style>
