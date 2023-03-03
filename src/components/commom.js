export default (() => {
	return {
		props: {
			attr: {
				default: () => ({}),
				type: Object,
			},
			dataChart: {
				type: [Object, Array, String, Number],
			},
		},
		computed: {
			styleSizeName() {
				return Object.assign(
					{},
					this.attr,
					{
						width: this.$w.setPx(this.attr.width),
						height: this.$w.setPx(this.attr.height),
					},
					(() => {
						if (this.attr.fontSize) {
							return {
								fontSize: this.$w.setPx(this.attr.fontSize),
							};
						}
					})(),
					(() => {
						if (this.attr.letterSpacing) {
							return {
								textIndent: this.$w.setPx(this.attr.textIndent),
								letterSpacing: this.$w.setPx(this.attr.letterSpacing),
							};
						}
					})()
				);
			},
		},
	};
})();
