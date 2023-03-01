export const config = {
	width: 600,
	height: 600,
	scale: 1,
	backgroundColor: '#fff',
	backgroundImg: '',
	fontSize: 16,
};
export const dicOption = {
	fontWeight: [
		{ label: 'normal', value: 'normal' },
		{ label: 'bold', value: 'bold' },
		{ label: 'bolder', value: 'bolder' },
		{ label: 'ligter', value: 'ligter' },
	],
	textAlign: [
		{ label: '居中', value: 'center' },
		{ label: '左对齐', value: 'left' },
		{ label: '右对齐', value: 'right' },
	],
	format: [
		{ label: '日期', value: 'yyyy-MM-dd' },
		{ label: '日期+时分', value: 'yyyy-MM-dd hh:mm' },
		{ label: '日期+时分秒', value: 'yyyy-MM-dd hh:mm:ss' },
		{ label: '日期(无年)', value: 'MM-dd' },
		{ label: '时分', value: 'hh:mm' },
		{ label: '时分秒', value: 'hh:mm:ss' },
		{ label: '星期', value: 'day' },
	],
};
function concat(prop, count, type, extend = [], defaults) {
	let list = [];
	for (let i = 1; i <= count; i++) {
		list.push({
			label: prop + i,
			value: `/img/${prop}/${prop}${i}.${extend.includes(i) ? defaults : type}`,
		});
	}
	return list;
}
//加载图片素材库
export const imgOption = [concat('bg', 18, 'png'), concat('border', 16, 'png'), concat('source', 16, 'png'), concat('banner', 10, 'png')];
