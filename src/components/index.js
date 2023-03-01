import $commom from './commom';
let components = {};
const mixins = [$commom];
const requireComponent = require.context('.', true, /\w+.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
	if (fileName.includes('index.vue')) {
		const cmp = requireComponent(fileName).default;
		cmp.mixins = mixins;
		components[`${cmp.name}`] = cmp;
	}
});
export default {
	components: components,
};
