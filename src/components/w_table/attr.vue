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
				<el-form-item label="列显隐">
					<el-checkbox-group v-model="column" @change="columnChange">
						<el-checkbox v-for="item in columnDic" :key="item.prop" :label="item.prop" :checked="isChecked(item)">{{
							item.label
						}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="时间格式">
					<el-select v-model="contain.activeAttr.format">
						<el-option v-for="item in formatDic" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="自定义格式">
					<el-input v-model="contain.activeAttr.format"> </el-input>
				</el-form-item>
				<el-form-item label="时间分隔符">
					<el-input v-model="contain.activeAttr.separator"> </el-input>
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
			column: [],
			columnDic: [
				{ prop: 'subject', label: '会议主题' },
				{ prop: 'conferenceName', label: '会议室名称' },
				{ prop: 'meetingTime', label: '会议时间' },
				{ prop: 'applicatEmpName', label: '申请人' },
				{ prop: 'compereEmpName', label: '主持人' },
			],
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
	methods: {
		isChecked(item) {
			return this.contain.activeAttr.column.some((v) => v.prop === item.prop);
		},
		columnChange(e) {
			let arr2 = this.columnDic.reduce((prev, cur) => {
				let flag = e.some((v) => v === cur.prop);
				return flag ? prev.concat(cur) : prev;
			}, []);
			this.contain.activeAttr.column = arr2;
		},
	},
};
</script>
