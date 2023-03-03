<template>
	<el-dialog title="图库" width="80%" :close-on-click-modal="false" :visible.sync="imgVisible">
		<el-upload class="upload-demo" multiple :on-success="onSuccess" :show-file-list="false" :action="action" list-type="picture">
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
	props: {
		contain: {
			default: () => ({}),
			type: Object,
		},
	},
	data() {
		return {
			imgVisible: false,
			action: '',
			imgActive: 0,
			imgOption,
		};
	},
	methods: {
		openImgDialog(type) {
			this.imgActive = type === 'bg' ? 0 : type === 'border' ? 1 : 2;
			this.imgVisible = true;
		},
		handleSetimg(value) {
			if (this.imgActive == 0) {
				this.contain.config.backgroundImg = value;
			} else if (this.imgActive == 2) {
				this.contain.activeObj.data = value;
			} else {
			}
			this.imgVisible = false;
		},
		onSuccess(res) {
			const url = res.data.link;
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
