import axios from 'axios';
import store from '@/store/';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({
	showSpinner: false,
});
axios.defaults.timeout = 5 * 60 * 1000;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Basic saber:saber_secret`;
		config.headers['Blade-Auth'] = 'bearer ' + store.state.token;
		if (config.fileType === true) {
			config.headers['Content-Type'] = 'multipart/form-data';
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
axios.interceptors.response.use(
	(res) => {
		NProgress.done();
		const status = res.data.code || res.status;
		const message = res.data.msg || res.data.error_description || '未知错误';
		if (status !== 200) {
			Message({ message: message, type: 'error' });
			return Promise.reject(new Error(message));
		}
		return res;
	},
	(error) => {
		NProgress.done();
		return Promise.reject(new Error(error));
	}
);

export const updateTemplate = (data) => {
	return axios({
		url: '/api/iot-hy/template/update',
		method: 'post',
		data,
	});
};
export const reqTemplateDetails = (data) => {
	return axios({
		url: '/api/iot-hy/template/details',
		method: 'get',
		params: { ...data },
	});
};
export const uploadFile = (data) => {
	return axios({
		url: '/api/blade-basic/common/upload',
		method: 'post',
		data,
		fileType: true,
	});
};
