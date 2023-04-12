<template>
	<el-container class="u-font-12">
		<imgList ref="imgListRef" @change="handleSetimg"></imgList>
		<el-header height="70px">
			<top></top>
		</el-header>

		<el-container class="main">
			<el-aside width="250px" class="u-p-10">
				<p class="u-m-t-10">空闲中模板</p>
				<div class="el_img_class" :class="[activeStatus === 'free' ? 'active' : '']" @click="changeTemplate('free')">
					<el-image fit="contain" :src="freeImg">
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</div>

				<p>进行中模板</p>
				<div class="el_img_class" :class="[activeStatus === 'progress' ? 'active' : '']" @click="changeTemplate('progress')">
					<el-image fit="contain" :src="progressImg">
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</div>
			</el-aside>

			<el-main>
				<div @mousedown="handleMouseDown">
					<svg class="grid" width="100%" height="99%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern id="smallGrid" width="7.236328125" height="7.236328125" patternUnits="userSpaceOnUse">
								<path d="M 7.236328125 0 L 0 0 0 7.236328125" fill="none" stroke="rgba(207, 207, 207, 0.3)" stroke-width="1"></path>
							</pattern>
							<pattern id="grid" width="36.181640625" height="36.181640625" patternUnits="userSpaceOnUse">
								<rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)"></rect>
								<path d="M 36.181640625 0 L 0 0 0 36.181640625" fill="none" stroke="rgba(186, 186, 186, 0.4)" stroke-width="1"></path>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)"></rect>
					</svg>
					<mainContainer></mainContainer>
				</div>
			</el-main>

			<el-aside width="300px" class="u-p-10">
				<attributes></attributes>
			</el-aside>

			<contextMenu></contextMenu>
		</el-container>
	</el-container>
</template>

<script>
import html2canvas from 'html2canvas';
import imgList from '@/components/selectImg.vue';
import top from './meeting-template/top.vue';
import mainContainer from './meeting-template/mainContainer.vue';
import attributes from './meeting-template/attributes.vue';
import contextMenu from './meeting-template/contextMenu.vue';
import { config } from '@/components/config.js';
import { getStorage, setStorage } from '@/utils/util.js';

export default {
	components: { top, mainContainer, attributes, contextMenu, imgList },
	name: 'Home',
	provide() {
		return {
			contain: this,
		};
	},
	data() {
		return {
			activeIndex: null,
			componentData: [],
			config,
			freeImg: '',
			progressImg: '',
			activeStatus: 'free',
		};
	},
	computed: {
		activeAttr() {
			return this.activeObj.attr || {};
		},
		activeObj() {
			let item = this.findlist(this.activeIndex) || {};
			return item;
		},
	},
	methods: {
		changeTemplate(value) {
			if (this.activeStatus === value) return;
			let data = getStorage({ name: 'data', type: true });
			let diff = this.diffData(value, data);
			if (!diff) return this.getData(value, data);
			this.$confirm('当前修改暂未保存，是否保存？', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				await this.submitData(data);
				let newData = getStorage({ name: 'data', type: true });
				this.getData(value, newData);
			});
		},
		getData(value, data) {
			if (data) {
				this.config = data.config;
				if (value === 'free') {
					this.componentData = data?.freeComponentData || [];
				} else {
					this.componentData = data?.processComponentData || [];
				}
			}
			this.activeStatus = value;
		},
		diffData(type, obj) {
			let newConfig = JSON.stringify(this.config);
			let preConfig = JSON.stringify(obj?.config || this.config);
			if (newConfig !== preConfig) return true;
			let newData = JSON.stringify(this.componentData);
			let preData = '';
			if (type === 'free') {
				preData = JSON.stringify(obj?.processComponentData || []);
			} else {
				preData = JSON.stringify(obj?.freeComponentData || []);
			}
			if (newData !== preData) return true;
			return false;
		},
		async submitData(obj = {}) {
			let img = await this.getImg();
			if (this.activeStatus === 'free') {
				this.freeImg = img;
				obj = {
					...obj,
					freeImg: img,
					freeComponentData: this.componentData,
					config: this.config,
				};
			} else {
				this.progressImg = img;
				obj = {
					...obj,
					progressImg: img,
					processComponentData: this.componentData,
					config: this.config,
				};
			}
			setStorage({ name: 'data', content: obj, type: true });
		},
		getImg() {
			return html2canvas(document.getElementById('canvasId')).then((canvas) => {
				let url = canvas.toDataURL('image/jpg');
				return url;
			});
		},
		//打开图库
		handleOpenImg(item, type) {
			this.$refs.imgListRef.openImgDialog(item, type);
		},
		//图库框回调赋值
		handleSetimg(val, type) {
			let params = type.split('.')[1];
			if (type.includes('config')) {
				this.config[params] = val;
			} else if (type.includes('activeObj.data.value')) {
				this.activeObj.data.value = val;
			} else if (type.includes('activeObj.data#')) {
				let arr = type.split('#');
				if (arr.length === 2 && arr[1]) {
					this.activeObj.data[arr[1]].url = val;
				} else {
					this.activeObj.data.push({ url: val, text: '' });
				}
			} else if (type.includes('activeObj.data')) {
				this.activeObj.data = val;
			} else if (type.includes('activeObj')) {
				this.activeObj[params] = val;
			}
		},
		findlist(index) {
			return this.componentData.find((ele) => ele.index == index) || {};
		},
		handleMouseDown() {
			this.activeIndex = null;
		},
		// 右键菜单
		handleContextMenu(item = {}, done) {
			if (!item.index) return;
			else {
				this.activeIndex = item.index;
			}
			done();
		},
	},
};
</script>

<style lang="scss">
.main {
	height: calc(100vh - 70px);
	.el_img_class {
		width: 100%;
		text-align: center;
		font-size: 30px;
		color: #909399;
		cursor: pointer;
		padding: 20px;
		margin-bottom: 30px;
		border: 1px solid #f5f7fa;
		background-color: #f5f7fa;
		border-radius: 6px;
	}
	.image-slot {
		width: 100%;
		height: 100%;
	}
	.active {
		border-color: 1px solid #106fff;
	}
}
.el-header {
	border-bottom: 1px solid #e8e8e8;
	line-height: 70px;
	padding: 0 !important;
}
.el-main {
	border-right: 1px solid #e8e8e8;
	border-left: 1px solid #e8e8e8;
	padding: 0 !important;
	& > div {
		height: 100%;
		position: relative;
		background-color: #f8f8f8;
	}
}
</style>
