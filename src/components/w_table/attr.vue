<template>
	<div>
		<el-form-item label="开启序列">
			<el-switch v-model="contain.activeAttr.index"></el-switch>
		</el-form-item>
		<el-form-item label="序列行宽">
			<el-input-number v-model="contain.activeAttr.indexWidth" :min="0" :precision="0" :controls="false"></el-input-number>
		</el-form-item>
		<el-form-item label="边框">
			<el-switch v-model="contain.activeAttr.border"></el-switch>
		</el-form-item>
		<el-collapse accordion>
			<el-collapse-item title="表头设置">
				<el-form-item label="显示">
					<el-switch v-model="contain.activeAttr.showHeader"></el-switch>
				</el-form-item>
				<el-form-item label="字体大小">
					<el-input-number v-model="contain.activeAttr.headerFontSize" :min="0" :precision="0" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="背景颜色">
					<el-color-picker v-model="contain.activeAttr.headerBackground" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="字体颜色">
					<el-color-picker v-model="contain.activeAttr.headerColor" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="对其方式">
					<el-select v-model="contain.activeAttr.headerTextAlign">
						<el-option v-for="item in textAlignOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-collapse-item>
			<el-collapse-item title="表格设置">
				<el-form-item label="显示行数">
					<el-input-number v-model="contain.activeAttr.count" :min="0" :precision="0" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="字体大小">
					<el-input-number v-model="contain.activeAttr.bodyFontSize" :min="0" :precision="0" :controls="false"></el-input-number>
				</el-form-item>
				<el-form-item label="对其方式">
					<el-select v-model="contain.activeAttr.bodyTextAlign">
						<el-option v-for="item in textAlignOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="文字颜色">
					<el-color-picker v-model="contain.activeAttr.bodyColor" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="奇行颜色">
					<el-color-picker v-model="contain.activeAttr.othColor" show-alpha></el-color-picker>
				</el-form-item>
				<el-form-item label="偶行颜色">
					<el-color-picker v-model="contain.activeAttr.nthColor" show-alpha></el-color-picker>
				</el-form-item>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
export default {
	name: 'WTable',
	inject: ['contain'],
	data() {
		return {
			textAlignOptions: [
				{ label: '左对齐', value: 'left' },
				{ label: '居中', value: 'center' },
				{ label: '右对齐', value: 'right' },
			],
		};
	},
};
</script>
