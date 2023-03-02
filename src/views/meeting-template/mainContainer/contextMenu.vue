<template>
	<div class="contentmenu" id="w_menu">
		<div class="contentmenu__item" @click="handleLock">
			<i class="el-icon-lock"></i>
			{{ contain.activeObj.isLock ? '解锁' : '锁定' }}
		</div>
		<div class="contentmenu__item" @click="handleDelete"><i class="el-icon-delete"></i>删除</div>
		<div class="contentmenu__item" @click="handleCopy"><i class="el-icon-money"></i>复制</div>
		<div class="contentmenu__item" @click="handleTop"><i class="el-icon-arrow-up"></i>置顶</div>
		<div class="contentmenu__item" @click="handleBottom"><i class="el-icon-arrow-down"></i>置底</div>
		<div class="contentmenu__item" @click="handleStepTop"><i class="el-icon-arrow-up"></i>上移</div>
		<div class="contentmenu__item" @click="handleStepBottom"><i class="el-icon-arrow-down"></i>下移</div>
	</div>
</template>

<script>
import { swap } from '@/utils/util.js';
import { nanoid } from 'nanoid';

export default {
	name: 'contentmenu',
	inject: ['contain'],
	methods: {
		handleLock() {
			this.contain.activeObj.isLock = !this.contain.activeObj.isLock;
		},
		handleDelete() {
			this.$confirm(`是否删除所选图层?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					let itemIndex = this.contain.componentData.findIndex((v) => v.index === this.contain.activeIndex);
					if (itemIndex >= 0) {
						this.contain.componentData.splice(itemIndex, 1);
					}
					this.contain.handleMouseDown();
				})
				.catch(() => {});
		},
		handleCopy() {
			let { componentData, activeObj } = this.contain;
			let obj = this.$w.deepClone(activeObj);
			let index = nanoid();
			obj.index = index;
			obj.top = 0;
			obj.left = 0;
			componentData.push(obj);
		},
		handleTop() {
			let { componentData, activeIndex, activeObj } = this.contain;
			let itemIndex = componentData.findIndex((v) => v.index === activeIndex);
			if (itemIndex < componentData.length - 1) {
				componentData.splice(itemIndex, 1);
				componentData.push(activeObj);
			}
		},
		handleBottom() {
			let { componentData, activeIndex, activeObj } = this.contain;
			let itemIndex = componentData.findIndex((v) => v.index === activeIndex);
			if (itemIndex > 0) {
				componentData.splice(itemIndex, 1);
				componentData.unshift(activeObj);
			}
		},
		handleStepTop() {
			let { componentData, activeIndex } = this.contain;
			let itemIndex = componentData.findIndex((v) => v.index === activeIndex);
			if (itemIndex < componentData.length - 1) {
				swap(componentData, itemIndex, itemIndex + 1);
			}
		},
		handleStepBottom() {
			let { componentData, activeIndex } = this.contain;
			let itemIndex = componentData.findIndex((v) => v.index === activeIndex);
			if (itemIndex > 0) {
				swap(componentData, itemIndex, itemIndex - 1);
			}
		},
	},
};
</script>

<style>
.contentmenu {
	width: 200px;
	display: none;
	z-index: 99999;
	list-style: none;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	padding: 0;
	background: #27343e;
	color: #bcc9d4;
}
.contentmenu__item {
	z-index: 10000;
	list-style: none;
	padding: 8px 12px;
	cursor: pointer;
	position: relative;
	font-size: 12px;
}
.contentmenu__item:hover {
	background-color: rgba(0, 192, 222, 0.1);
}
.contentmenu__item i {
	margin-right: 5px;
}
.contentmenu__item :first-child {
	padding-top: 5px;
}
</style>
