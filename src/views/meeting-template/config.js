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
						data: {
							value: '文本框',
						},
						attr: {
							width: 120,
							height: 60,
							textAlign: 'center',
							fontSize: 26,
							fontWeight: 'normal',
							color: '#fff',
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
						data: {
							value: '/img/img-default.png',
						},
						attr: {},
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
						data: [
							'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
							'https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg',
							'http://www.w3school.com.cn/i/movie.ogg',
						],
						attr: {
							interval: 5000,
							indicator: 'none',
							autoplay: true,
							controls: true,
							loop: true,
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
			label: '会议参数',
			icon: 'icon-bar',
			children: [],
		},
	],
};
