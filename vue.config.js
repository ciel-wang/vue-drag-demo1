module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	outputDir: 'dist',
	assetsDir: 'assets',
	lintOnSave: true,
	parallel: false,
	productionSourceMap: false,
	devServer: {
		disableHostCheck: true,
		port: 1790,
		proxy: {
			'/api': {
				target: process.env.BASE_URL,
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/',
				},
			},
		},
	},
};
