let components = {};
const requireComponent = require.context('.', true, /\w+.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
	if (fileName.includes('attr.vue')) {
		const cmp = requireComponent(fileName).default;
		components[`${cmp.name}` + 'Attr'] = cmp;
	}
});
export default {
	components: components,
};
