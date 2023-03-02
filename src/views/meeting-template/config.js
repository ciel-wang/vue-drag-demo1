export default {
	baseList: [
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
						data: '文本框',
						attr: {
							width: 120,
							height: 60,
							textAlign: 'center',
							fontSize: 26,
							fontWeight: 'normal',
							color: '#00',
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
							format: 'yyyy-MM-dd hh:mm:ss',
							color: '#fff',
							textAlign: 'left',
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
					label: '边框',
					option: {
						name: 'wBorder',
						top: 0,
						left: 0,
						index: '',
						data: '/img/border/border1.png',
						attr: {},
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
				{
					label: 'hls播放器',
					option: {
						name: 'wHls',
						top: 0,
						left: 0,
						index: '',
						data: 'http://www.w3school.com.cn/i/movie.ogghttps://open.ys7.com/v3/openlive/E10668433_1_1.m3u8?expire=1664027961&id=363444666731335680&t=346b970f0d5cb5d5b5e4734d966275a61fb9efd5038c7a75b7435423c5716908&ev=100',
						attr: {
							autoplay: true,
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
	],
};
