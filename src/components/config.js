export const config = {
	width: 600,
	height: 600,
	scale: 1,
	opacity: 1,
	fontSize: 16,
	backgroundColor: '#fff',
	backgroundImg: '',
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

export const baseList = [
	{
		label: '文字',
		icon: 'icon-bar',
		children: [
			{
				label: '文本框',
				option: {
					name: 'wText',
					top: 0,
					left: 0,
					index: '',
					data: {
						value: '静态文本',
						dataKey: '',
					},
					attr: {
						width: 120,
						height: 60,
						textAlign: 'center',
						letterSpacing: '',
						fontSize: 26,
						fontWeight: 'normal',
						color: '#00',
						dataType: 'jt',
					},
				},
			},
			{
				label: '跑马灯',
				option: {
					name: 'wText',
					top: 0,
					left: 0,
					index: '',
					data: '跑马灯',
					attr: {
						width: 100,
						height: 50,
						textAlign: 'center',
						letterSpacing: '',
						fontSize: 26,
						fontWeight: 'normal',
						color: '#00',
						scroll: true,
						speed: 70,
					},
				},
			},
			{
				label: '实时时间',
				option: {
					name: 'wDatetime',
					top: 0,
					left: 0,
					index: '',
					attr: {
						width: 250,
						height: 50,
						format: 'yyyy-MM-dd hh:mm:ss',
						color: '#fff',
						textAlign: 'left',
						letterSpacing: '',
						fontSize: 24,
						fontWeight: 'normal',
					},
				},
			},
		],
	},
	{
		label: '媒体',
		icon: 'icon-bar',
		children: [
			{
				label: '图片',
				option: {
					name: 'wImg',
					top: 0,
					left: 0,
					index: '',
					data: '/logo.png',
					attr: {
						width: 100,
						height: 100,
						borderRadius: '',
					},
				},
			},
			{
				label: '图片框',
				option: {
					name: 'wBorder',
					top: 0,
					left: 0,
					index: '',
					data: '/img/border/border8.png',
					attr: {
						width: 140,
						height: 140,
						backgroundColor: 'rgba(180, 181, 198, 0.1)',
					},
				},
			},
			{
				label: '轮播图',
				option: {
					name: 'wSwiper',
					top: 0,
					left: 0,
					index: '',
					data: ['/img/bg/bg1.png', '/img/bg/bg1.png', '/img/bg/bg1.png'],
					attr: {
						width: 420,
						height: 220,
						autoplay: true,
						loop: true,
						interval: 3000,
						indicatorPosition: 'none',
						isCard: true,
						direction: 'horizontal',
						isShowText: true,
					},
				},
			},
			{
				label: 'video播放器',
				option: {
					name: 'wVideo',
					top: 0,
					left: 0,
					index: '',
					data: 'http://www.w3school.com.cn/i/movie.ogg',
					attr: {
						width: 300,
						height: 200,
						autoplay: true,
						controls: true,
						loop: true,
					},
				},
			},
		],
	},
	{
		label: '表格',
		icon: 'icon-bar',
		children: [
			{
				label: '表格',
				option: {
					name: 'wTable',
					top: 0,
					left: 0,
					index: '',
					data: [
						{ type1: '数据1', type2: '数据1', type3: '数据1', type4: '数据1' },
						{ type1: '数据2', type2: '数据2', type3: '数据2', type4: '数据2' },
						{ type1: '数据3', type2: '数据3', type3: '数据3', type4: '数据3' },
						{ type1: '数据4', type2: '数据4', type3: '数据4', type4: '数据4' },
					],
					attr: {
						width: 600,
						height: 200,
						index: true,
						border: false,
						showHeader: true,
						headerFontSize: 14,
						headerBackground: 'rgba(8, 90, 111, 0.8)',
						headerColor: 'rgba(154, 168, 212, 1)',
						headerTextAlign: 'center',
						othColor: 'rgba(14, 86, 241, 0.08)',
						nthColor: 'rgba(14, 86, 241, 0.08)',
						bodyFontSize: 12,
						bodyBackground: 'rgba(0, 0, 0, 0.01)',
						bodyColor: 'rgba(154, 168, 212, 1)',
						bodyTextAlign: 'center',
						scrollSpeed: 1,
						count: 4,
						column: [
							{ label: '列1', prop: 'type1' },
							{ label: '列2', prop: 'type2' },
							{ label: '列3', prop: 'type3' },
							{ label: '列4', prop: 'type4' },
						],
					},
				},
			},
		],
	},
];
