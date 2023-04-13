<template>
	<div class="w_toolbar">
		<el-menu class="u-width-40" mode="horizontal" active-text-color="#409EFF">
			<el-submenu :index="index + 'menu'" v-for="(item, index) in baseList" :key="index">
				<template slot="title">{{ item.label }}</template>
				<el-menu-item
					v-for="(citem, cindex) in item.children"
					:key="cindex"
					class="menu-inline"
					:index="`${index}-${cindex}`"
					@click="handleAdd(citem.option)"
				>
					<div>{{ citem.label }}</div>
				</el-menu-item>
			</el-submenu>
		</el-menu>

		<div class="u-width-35 u-font-16 u-text-left" :style="{ color: contain.activeStatus === 'free' ? '#67c23a' : 'red' }">
			{{ contain.activeStatus === 'free' ? '空闲中模板' : '进行中模板' }}
		</div>

		<div>
			<div class="w_btn w_btn1" @click="handleView">预 览</div>
			<div class="w_btn w_btn2" @click="handlerSave">保 存</div>
		</div>
	</div>
</template>

<script>
import { baseList } from '@/components/config';
import { nanoid } from 'nanoid';

export default {
	inject: ['contain'],
	provide() {
		return {
			contain: this.contain,
		};
	},
	data() {
		return {
			baseList,
		};
	},
	methods: {
		async handleView() {
			let img = await this.contain.getImg();
			this.$w.$ImagePreview([{ url: img }], 0);
		},
		handleAdd(option, first = false) {
			let obj = this.$w.deepClone(option);
			obj.left = 0;
			obj.top = 0;
			obj.index = nanoid();
			if (first) {
				this.contain.componentData.unshift(obj);
			} else {
				this.contain.componentData.push(obj);
			}
		},
		handlerSave() {
			this.contain.submitData();
		},
	},
};
</script>

<style lang="scss">
.w_toolbar {
	padding-left: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.w_btn {
		width: 110px;
		height: 100%;
		text-align: center;
		display: inline-block;
		color: #fff;
		cursor: pointer;
		font-size: 14px;
	}
	.w_btn1 {
		background-color: #67c23a;
		margin-left: 10px;
	}
	.w_btn2 {
		background-color: #409eff;
	}
	.el-menu.el-menu--horizontal {
		border: none;
	}
}
</style>
