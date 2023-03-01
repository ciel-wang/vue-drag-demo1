<template>
	<div class="contentmenu" id="w_menu">
		<div class="contentmenu__item" @click="handleLock">
			<i class="el-icon-lock"></i>
			{{ contain.activeObj.isLock ? '解锁' : '锁定' }}
		</div>
		<div class="contentmenu__item" @click="handleDelete"><i class="el-icon-delete"></i>删除</div>
		<div class="contentmenu__item"><i class="el-icon-money"></i>复制</div>
		<div class="contentmenu__item"><i class="el-icon-arrow-up"></i>置顶</div>
		<div class="contentmenu__item"><i class="el-icon-arrow-down"></i>置底</div>
		<div class="contentmenu__item"><i class="el-icon-arrow-up"></i>上移</div>
		<div class="contentmenu__item"><i class="el-icon-arrow-down"></i>下移</div>
	</div>
</template>

<script>
export default {
	name: 'contentmenu',
	inject: ['contain'],
	methods: {
		handleLock() {
			this.contain.activeObj.isLock = !this.contain.activeObj.isLock;
			this.contain.handleMouseDown();
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
