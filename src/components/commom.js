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
				let obj = Object.assign({}, this.attr);
				for (let i in obj) {
					if (['width', 'height', 'fontSize', 'letterSpacing', 'borderRadius'].includes(i)) {
						obj[i] = this.$w.setPx(obj[i]);
					}
				}
				if (obj.letterSpacing) {
					obj.paddingLeft = this.$w.setPx(obj.letterSpacing);
				}
				return obj;
			},
		},
	};
})();
