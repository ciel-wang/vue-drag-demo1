<template>
	<div>
		<el-form-item label="纵向显示">
			<el-switch v-model="contain.activeAttr.columnShow"></el-switch>
		</el-form-item>
		<el-form-item label="列宽">
			<el-input-number v-model="contain.activeAttr.columnWidth" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
		<el-form-item label="列高">
			<el-input-number v-model="contain.activeAttr.columnHeight" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
		<el-form-item label="列间距" v-show="!contain.activeAttr.columnShow">
			<el-input-number v-model="contain.activeAttr.columnGap" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
		<el-form-item label="行间距">
			<el-input-number v-model="contain.activeAttr.rowGap" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
		<el-form-item label="内间距">
			<el-input-number v-model="contain.activeAttr.padding" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>

		<el-form-item label="背景颜色">
			<el-color-picker v-model="contain.activeAttr.backgroundColor1" show-alpha></el-color-picker>
		</el-form-item>
		<el-form-item label="背景图片地址">
			<img :src="contain.activeAttr.background" alt="" width="60%" />
			<el-input v-model="contain.activeAttr.background" size="small" style="width: 90%">
				<el-button slot="append" icon="el-icon-picture" @click="contain.handleOpenImg('activeAttr.background', 'border')"></el-button>
			</el-input>
		</el-form-item>
		<el-form-item label="时间格式">
			<el-select v-model="contain.activeAttr.format">
				<el-option v-for="item in formatDic" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="自定义格式">
			<el-input v-model="contain.activeAttr.format"> </el-input>
		</el-form-item>
	</div>
</template>
<script>
export default {
	name: 'wTabs',
	inject: ['contain'],
	data() {
		return {
			formatDic: [
				{ label: '日期', value: 'yyyy-MM-dd' },
				{ label: '日期+时分', value: 'yyyy-MM-dd HH:mm' },
				{ label: '日期+时分秒', value: 'yyyy-MM-dd HH:mm:ss' },
				{ label: '日期(无年)', value: 'MM-dd' },
				{ label: '时分', value: 'HH:mm' },
				{ label: '时分秒', value: 'HH:mm:ss' },
			],
		};
	},
};
</script>
