<template>
	<el-table
		class="w_table"
		ref="table"
		:data="dataChart"
		:height="attr.height"
		:border="attr.border"
		:cellStyle="cellStyle"
		:row-style="rowStyle"
		:show-header="attr.showHeader"
		:header-row-style="headerRowStyle"
		:header-cell-style="headerCellStyle"
	>
		<el-table-column type="index" label="序号" header-align="center" align="center" v-if="attr.index" :width="attr.indexWidth || 70">
			<span slot-scope="{ $index }">{{ $index + 1 }}</span>
		</el-table-column>
		<template v-for="(item, index) in attr.column">
			<el-table-column
				v-if="item.hide !== true"
				show-overflow-tooltip
				:key="index"
				:prop="item.prop"
				:label="item.label"
				:width="item.width"
			>
			</el-table-column>
		</template>
	</el-table>
</template>
<script>
export default {
	name: 'wTable',
	data() {
		return {
			headerHeight: '',
		};
	},
	created() {
		this.$nextTick(() => {
			this.headerHeight = parseInt(this.$refs.table.$refs.headerWrapper.clientHeight);
		});
	},
	computed: {
		cellHeight() {
			return parseInt((this.attr.height - this.headerHeight) / this.attr.count);
		},
	},
	methods: {
		cellStyle({ column, rowIndex }) {
			return {
				padding: 0,
				height: this.cellHeight + 'px',
				fontSize: this.attr.bodyFontSize + 'px',
				color: this.attr.bodyColor,
				textAlign: column.type == 'index' ? 'center' : this.attr.bodyTextAlign,
				backgroundColor: rowIndex % 2 == 0 ? this.attr.othColor : this.attr.nthColor,
			};
		},
		rowStyle() {
			return {
				backgroundColor: 'transparent',
			};
		},
		headerRowStyle() {
			return {
				backgroundColor: this.attr.headerBackground,
			};
		},
		headerCellStyle({ column }) {
			return {
				fontSize: this.attr.headerFontSize + 'px',
				backgroundColor: this.attr.headerBackground,
				color: this.attr.headerColor,
				textAlign: column.type == 'index' ? 'center' : this.attr.headerTextAlign,
			};
		},
	},
};
</script>
<style lang="scss" scoped>
/deep/.el-table__body-wrapper {
	height: 100% !important;
	.el-table td.el-table__cell div {
		line-height: 100% !important;
	}
}
/deep/.el-table th.el-table__cell > .cell {
	line-height: 100% !important;
}
.w_table {
	background-color: transparent !important;
}
</style>
