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
		<el-form-item label="时间格式" v-show="['meetingTime', 'startTime', 'endTime'].includes(contain.activeObj.data.dataKey)">
			<el-select v-model="contain.activeAttr.format">
				<el-option v-for="item in formatDic" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="自定义格式" v-show="['meetingTime', 'startTime', 'endTime'].includes(contain.activeObj.data.dataKey)">
			<el-input v-model="contain.activeAttr.format"> </el-input>
		</el-form-item>
		<el-form-item label="分隔符" v-show="contain.activeObj.data.dataKey == 'meetingTime'">
			<el-input v-model="contain.activeAttr.separator"> </el-input>
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
import dayjs from 'dayjs';

export default {
	name: 'wText',
	inject: ['contain'],
	data() {
		return {
			dataKeyDic: [
				{ value: 'conferenceName', label: '会议室名称' },
				{ value: 'subject', label: '会议主题' },
				{ value: 'status', label: '会议状态' },
				{ value: 'applicatEmpName', label: '预约人' },
				{ value: 'meetingTime', label: '会议时间' },
				{ value: 'startTime', label: '会议开始时间' },
				{ value: 'endTime', label: '会议结束时间' },
				{ value: 'limitMaxCount', label: '可容纳人数' },
				{ value: 'meetingTimeRemain', label: '当前会议剩余时间' },
				{ value: 'meetingTimeStart', label: '距会议开始时间' },
				{ value: 'totalCount', label: '参会人数' },
				{ value: 'signCount', label: '已签到人数' },
				{ value: 'noSignCount', label: '未签到人数' },
			],
			formatDic: [
				{ label: '日期', value: 'yyyy-MM-dd' },
				{ label: '日期+时分', value: 'yyyy-MM-dd HH:mm' },
				{ label: '日期+时分秒', value: 'yyyy-MM-dd HH:mm:ss' },
				{ label: '日期(无年)', value: 'MM-dd' },
				{ label: '时分', value: 'HH:mm' },
				{ label: '时分秒', value: 'HH:mm:ss' },
				{ label: '星期', value: 'day' },
			],
		};
	},
	methods: {
		dataKeyChange(value) {
			let item = this.dataKeyDic.find((v) => v.value === value);
			if (value === 'meetingTime') {
				this.contain.activeObj.data.value =
					dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') + '#' + dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
			} else if (['startTime', 'endTime'].includes(value)) {
				this.contain.activeObj.data.value = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
			} else {
				this.contain.activeObj.data.value = item && item.label;
			}
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
