<template>
	<el-container class="u-font-12">
		<el-header height="70px">
			<top></top>
		</el-header>

		<el-container class="main">
			<el-aside width="250px" class="u-p-10">Aside</el-aside>

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
import top from './meeting-template/top.vue';
import mainContainer from './meeting-template/mainContainer.vue';
import attributes from './meeting-template/attributes.vue';
import contextMenu from './meeting-template/contextMenu.vue';
import { config } from '@/components/config.js';

export default {
	components: { top, mainContainer, attributes, contextMenu },
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
