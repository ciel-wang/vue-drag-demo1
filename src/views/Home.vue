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
					<!-- <svg class="grid" width="100%" height="99%" xmlns="http://www.w3.org/2000/svg">
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
					</svg> -->
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
import { config, baseList } from '@/components/config.js';
import { getStorage, setStorage, getQueryString, dataURLtoBlob } from '@/utils/util.js';
import { reqTemplateDetails, updateTemplate, uploadFile } from '@/utils/api.js';

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
			templateName: '',
			config,
			freeImg: '',
			progressImg: '',
			activeStatus: 'free',
			data: {
				id: '',
				idleCoverImg: '',
				inUseCoverImg: '',
			},
		};
	},
	created() {
		let token = getQueryString('Blade-Auth');
		if (token) this.$store.commit('SET_TOKEN', token);
		let id = getQueryString('id');
		if (!id) return;
		reqTemplateDetails({ id }).then((r) => {
			if (r.data.code == 200) {
				let d = r.data.data;
				document.title = d?.data?.templateName;
				this.data = {
					id,
					idleCoverImg: d?.idleCoverImg,
					inUseCoverImg: d?.inUseCoverImg,
				};
				let extJson = d?.data?.extJson && JSON.parse(d?.data?.extJson);
				this.config = { ...this.config, ...extJson?.config, ...extJson?.freeConfig };
				this.freeImg = d?.staticPrefix + d?.data?.idleCoverImg;
				this.progressImg = d?.staticPrefix + d?.data?.inUseCoverImg;
				this.templateName = d?.data?.templateName;
				this.activeStatus = 'free';
				this.componentData = extJson?.freeComponentData || [];
				let obj = {
					...extJson,
					templateName: d?.data?.templateName,
				};
				setStorage({ name: 'data', content: obj, type: true });
			}
		});
	},
	computed: {
		activeAttr() {
			this.activeObj.attr = { ...this.findArr(), ...this.activeObj.attr };
			return this.activeObj.attr;
		},
		activeObj() {
			let item = this.findlist(this.activeIndex) || {};
			return item;
		},
	},
	methods: {
		findArr() {
			let obj = {};
			baseList.forEach((item) => {
				let item2 = item.children.find((v) => v.option.name === this.activeObj.name);
				if (item2) return (obj = item2.option.attr);
			});
			return obj;
		},
		changeTemplate(value) {
			if (this.activeStatus === value) return;
			this.activeIndex = null;
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
				if (value === 'free') {
					this.config = data?.freeConfig || data?.config;
					this.componentData = data?.freeComponentData?.length
						? data?.freeComponentData
						: data?.processComponentData?.length
						? data?.processComponentData
						: [];
				} else {
					this.config = data.processConfig || data?.config;
					this.componentData = data?.processComponentData?.length
						? data?.processComponentData
						: data?.freeComponentData?.length
						? data?.freeComponentData
						: [];
				}
			}
			this.activeStatus = value;
		},
		diffData(type, obj) {
			if (this.templateName !== obj?.templateName) return true;
			let newConfig = JSON.stringify(this.config);
			let newData = JSON.stringify(this.componentData);
			let preConfig = '';
			let preData = '';
			if (type === 'free') {
				preConfig = JSON.stringify(obj?.processConfig || this.config);
				preData = JSON.stringify(obj?.processComponentData || []);
			} else {
				preConfig = JSON.stringify(obj?.freeConfig || this.config);
				preData = JSON.stringify(obj?.freeComponentData || []);
			}
			if (newConfig !== preConfig) return true;
			if (newData !== preData) return true;
			return false;
		},
		async submitData(obj = {}) {
			const loading = this.$loading({
				lock: true,
				text: '正在保存配置，请稍后',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)',
			});
			try {
				let { img, path } = await this.getImg();
				let url = await uploadFile({ file: path, mode: 'HY_ROOM_IMG' }).then((r) => {
					if (r.data.code == 200) return r.data.data.absUrl;
					return Promise.reject(new Error(r.data.msg));
				});
				if (this.activeStatus === 'free') {
					this.freeImg = img;
					this.data.idleCoverImg = url;
					obj = {
						...obj,
						freeComponentData: this.componentData,
						freeConfig: this.config,
						templateName: this.templateName,
					};
				} else {
					this.progressImg = img;
					this.data.inUseCoverImg = url;
					obj = {
						...obj,
						processComponentData: this.componentData,
						processConfig: this.config,
						templateName: this.templateName,
					};
				}
				setStorage({ name: 'data', content: obj, type: true });
				let data = {
					...this.data,
					templateName: this.templateName,
					extJson: JSON.stringify(obj),
				};
				updateTemplate(data).then((r) => {
					loading.close();
					if (r.data.code == 200) return this.$message.success(r.data.msg);
					return this.$message.error(r.data.msg);
				});
			} catch (error) {
				this.$message.error('保存失败了');
				loading.close();
			}
		},
		getImg() {
			return html2canvas(document.getElementById('canvasId'), {
				allowTaint: false,
				backgroundColor: null,
				useCORS: true,
			}).then((canvas) => {
				let img = canvas.toDataURL('image/jpg');
				let path = dataURLtoBlob(img, '模板图');
				return { path, img };
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
			} else if (type.includes('activeAttr')) {
				this.activeAttr[params] = val;
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
		width: 100%;
		box-sizing: border-box;
		position: relative;
		background-color: #f8f8f8;
		padding: 20px;
		overflow: auto;
	}
}
</style>
