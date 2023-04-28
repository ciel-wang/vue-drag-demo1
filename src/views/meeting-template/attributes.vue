<template>
	<div class="attr_page">
		<p class="w_title">{{ contain.activeIndex ? '属性' : '画布属性' }}</p>
		<template v-if="!contain.activeIndex">
			<el-form label-width="60px" label-position="left" size="mini">
				<el-form-item label="名称">
					<el-input v-model="contain.templateName" clearable size="small"></el-input>
				</el-form-item>
				<el-form-item label="宽度">
					<el-input-number v-model="contain.config.width" :min="0" :precision="2" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="高度">
					<el-input-number v-model="contain.config.height" :min="0" :precision="2" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="不透明度">
					<el-input-number v-model="contain.config.opacity" :min="0" :max="1" :precision="1" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="背景颜色">
					<el-color-picker v-model="contain.config.backgroundColor" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="背景图片">
					<img :src="contain.config.backgroundImg" alt="" width="60%" @click="contain.handleOpenImg('config.backgroundImg', 'bg')" />
					<el-input v-model="contain.config.backgroundImg" clearable size="small" style="width: 90%">
						<el-button slot="append" icon="el-icon-picture" @click="contain.handleOpenImg('config.backgroundImg', 'bg')"></el-button>
					</el-input>
				</el-form-item>
				<el-form-item label="字体大小">
					<el-input-number v-model="contain.config.fontSize" :min="1" :precision="0" :controls="false"></el-input-number>
				</el-form-item>
			</el-form>
		</template>
		<el-collapse v-else>
			<el-collapse-item title="基本属性">
				<el-form label-width="60px" label-position="left" size="mini">
					<el-form-item label="X位置">
						<el-input-number
							v-model="contain.activeObj.left"
							:min="0"
							:max="contain.config.width - contain.activeObj.attr.width"
							:precision="2"
							:controls="false"
						></el-input-number>
					</el-form-item>
					<el-form-item label="Y位置">
						<el-input-number
							v-model="contain.activeObj.top"
							:min="0"
							:max="contain.config.height - contain.activeObj.attr.height"
							:precision="2"
							:controls="false"
						></el-input-number>
					</el-form-item>
					<el-form-item label="宽度">
						<el-input-number
							v-model="contain.activeObj.attr.width"
							:min="0"
							:max="contain.config.width"
							:precision="2"
							:controls="false"
						></el-input-number>
					</el-form-item>
					<el-form-item label="高度">
						<el-input-number
							v-model="contain.activeObj.attr.height"
							:min="0"
							:max="contain.config.height"
							:precision="2"
							:controls="false"
						></el-input-number>
					</el-form-item>
					<el-form-item label="旋转角度">
						<el-input-number v-model="contain.activeObj.attr.rotate" :precision="2" :controls="false"></el-input-number>
					</el-form-item>
					<el-form-item label="不透明度">
						<el-input-number v-model="contain.activeObj.attr.opacity" :min="0" :max="1" :precision="1" :controls="false"></el-input-number>
					</el-form-item>
				</el-form>
			</el-collapse-item>

			<el-collapse-item title="其他">
				<el-form label-width="60px" label-position="left" size="mini">
					<commomAttr></commomAttr>
					<component v-if="!['wCamera'].includes(contain.activeObj.name)" :is="contain.activeObj.name + 'Attr'" />
				</el-form>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
import component from '../../components/attr.js';
import commomAttr from './commomAttr.vue';

export default {
	mixins: [component],
	components: { commomAttr },
	inject: ['contain'],
	provide() {
		return {
			contain: this.contain,
		};
	},
};
</script>

<style lang="scss">
.attr_page {
	.el-form-item__label {
		font-size: 12px;
	}
	.el-form-item--mini.el-form-item,
	.el-form-item--small.el-form-item {
		margin-bottom: 10px;
	}
	.el-icon-picture {
		font-size: 20px;
		margin-top: 3px;
	}
	.w_title {
		text-align: center;
		height: 40px;
		line-height: 40px;
		margin-bottom: 15px;
		border-bottom: 2px solid #e4e7ed;
		color: #409eff;
	}
	.el-collapse-item__wrap,
	.el-collapse {
		border: none;
	}
	.el-checkbox__label {
		font-size: 12px;
	}
	.el-select {
		width: 130px;
	}
}
</style>
