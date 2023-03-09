<template>
	<div>
		<el-form-item label="数据类型">
			<el-select v-model="contain.activeAttr.dataType" @change="dataTypeChange">
				<el-option label="静态数据" value="jt"></el-option>
				<el-option label="动态数据" value="dt"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="文本内容">
			<el-input v-if="contain.activeAttr.dataType === 'jt'" v-model="contain.activeObj.data.value" type="textarea" :rows="3" />
			<el-select v-else v-model="contain.activeObj.data.dataKey" @change="dataKeyChange">
				<el-option v-for="item in dataKeyDic" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="开启">
			<el-switch v-model="contain.activeAttr.scroll"></el-switch>
		</el-form-item>
		<template v-if="contain.activeAttr.scroll">
			<el-form-item label="滚动速度">
				<el-input v-model="contain.activeAttr.speed"></el-input>
			</el-form-item>
		</template>
	</div>
</template>

<script>
export default {
	name: 'wText',
	inject: ['contain'],
	data() {
		return {
			dataKeyDic: [
				{ value: 'conferenceName', label: '会议室名称' },
				{ value: 'subject', label: '会议主题' },
				{ value: 'applicatEmpName', label: '预约人' },
				{ value: 'meetingTime', label: '会议时间' },
				{ value: 'limitMaxCount', label: '可容纳人数' },
			],
		};
	},
	methods: {
		dataKeyChange(value) {
			let item = this.dataKeyDic.find((v) => v.value === value);
			this.contain.activeObj.data.value = item ? item.label : '';
		},
		dataTypeChange(value) {
			if (value === 'dt') {
				let item = this.dataKeyDic[0];
				this.contain.activeObj.data.dataKey = item.value;
				this.contain.activeObj.data.value = item.label;
			} else {
				this.contain.activeObj.data.value = '静态文本';
			}
		},
	},
};
</script>
