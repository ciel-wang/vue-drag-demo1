<template>
	<div>
		<el-form-item label="数据类型">
			<el-select v-model="contain.activeAttr.dataType" @change="dataTypeChange">
				<el-option label="静态数据" value="jt"></el-option>
				<el-option label="动态数据" value="dt"></el-option>
			</el-select>
		</el-form-item>

		<el-form-item label="图片地址" v-if="contain.activeAttr.dataType === 'dt'">
			<el-select v-model="contain.activeAttr.dataKey">
				<el-option v-for="item in dataKeyDic" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="图片地址" v-else>
			<img :src="contain.activeObj.data" alt="" width="60%" />

			<el-input v-model="contain.activeObj.data" size="small" style="width: 90%">
				<el-button slot="append" icon="el-icon-picture" @click="contain.handleOpenImg('activeObj.data', 'img')"></el-button>
			</el-input>
		</el-form-item>
	</div>
</template>

<script>
export default {
	name: 'wImg',
	inject: ['contain'],
	data() {
		return {
			dataKeyDic: [{ value: 'qrcode', label: '签到二维码' }],
		};
	},
	methods: {
		dataTypeChange(value) {
			if (value === 'dt') {
				let item = this.dataKeyDic[0];
				this.contain.activeAttr.dataKey = item.value;
				this.contain.activeObj.data = '/img/wld_gzh.jpg';
			} else {
				this.contain.activeObj.data = '/logo.png';
			}
		},
	},
};
</script>
