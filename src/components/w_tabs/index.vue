<template>
	<div :class="attr.columnShow ? '' : 'w_tabs2'" :style="[styleName]">
		<div
			v-for="(item, index) in dataChart"
			:key="'tabs' + index"
			:class="attr.columnShow ? 'w_tabs1' : ''"
			class="w_tabs"
			:style="{ backgroundImage: attr.background ? `url(${attr.background})` : '', borderRadius: attr.borderRadius + 'px' }"
		>
			<p>{{ item.subject }}</p>
			<div class="u-flex u-row-between u-m-t-10">
				<p class="u-width-50 u-line-1">{{ item.meetingTime }}</p>
				<p class="u-width-50 u-line-1">{{ item.applicatEmpName }}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'wTabs',
	computed: {
		styleName() {
			return {
				color: this.attr.color,
				fontSize: this.$w.setPx(this.attr.fontSize),
				fontWeight: this.attr.fontWeight,
				width: this.$w.setPx(this.attr.width),
				height: this.$w.setPx(this.attr.height),
				opacity: this.attr.opacity,
				'--columnWidth': this.$w.setPx(this.attr.columnWidth),
				'--columnHeight': this.$w.setPx(this.attr.columnHeight),
				'--rowGap': this.$w.setPx(this.attr.rowGap),
				'--columnGap': this.$w.setPx(this.attr.columnGap),
				'--padding': this.$w.setPx(this.attr.padding),
				'--oddBackgroundColor': this.attr.oddBackgroundColor,
				'--evenBackgroundColor': this.attr.evenBackgroundColor,
				overflow: 'auto',
			};
		},
	},
};
</script>

<style lang="scss">
.w_tabs {
	margin-bottom: var(--rowGap);
	padding: var(--padding);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: var(--columnHeight);
	display: flex;
	flex-direction: column;
	justify-content: center;
	&:nth-child(odd) {
		background-color: var(--oddBackgroundColor);
	}
	&:nth-child(even) {
		background-color: var(--evenBackgroundColor);
	}
}
.w_tabs1 {
	width: var(--columnWidth);
}
.w_tabs2 {
	display: grid;
	grid-template-columns: repeat(auto-fit, var(--columnWidth));
	grid-gap: var(--rowGap) var(--columnGap);
	grid-template-rows: repeat(auto-fit, var(--columnHeight));
}
</style>
