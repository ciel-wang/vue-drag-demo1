import Vue from 'vue';
import contextmenu from './contextmenu';
import $ImagePreview from '@/views/image-preview/index.js';

export function swap(arr, i, j) {
	const temp = arr[i];
	Vue.set(arr, i, arr[j]);
	Vue.set(arr, j, temp);
}

export function mod360(deg) {
	return (deg + 360) % 360;
}
export const getQueryString = (name) => {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	let r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2]));
	return null;
};
// 获取url中的参数
export const getUrlParams = (url) => {
	let result = {
		url: '',
		params: {},
	};
	let list = url.split('?');
	result.url = list[0];
	let params = list[1];
	if (params) {
		let list = params.split('&');
		list.forEach((ele) => {
			let dic = ele.split('=');
			let label = dic[0];
			let value = dic[1];
			result.params[label] = value;
		});
	}
	return result;
};
export const getObjType = (obj) => {
	var toString = Object.prototype.toString;
	var map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object',
	};
	if (obj instanceof Element) {
		return 'element';
	}
	return map[toString.call(obj)];
};
export const deepClone = (data) => {
	var type = getObjType(data);
	var obj;
	if (type === 'array') obj = [];
	else if (type === 'object') obj = {};
	else return data;
	if (type === 'array') {
		for (var i = 0, len = data.length; i < len; i++) {
			data[i] = (() => {
				if (data[i] === 0) {
					return data[i];
				}
				return data[i];
			})();
			if (data[i]) {
				delete data[i].$parent;
			}
			obj.push(deepClone(data[i]));
		}
	} else if (type === 'object') {
		for (var key in data) {
			if (data) {
				delete data.$parent;
			}
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
};
export function validatenull(val) {
	// 特殊判断
	if (val && parseInt(val) === 0) return false;
	const list = ['$parent'];
	if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number') return false;
	if (val instanceof Array) {
		if (val.length === 0) return true;
	} else if (val instanceof Object) {
		val = deepClone(val);
		list.forEach((ele) => {
			delete val[ele];
		});
		for (var o in val) {
			return false;
		}
		return true;
	} else {
		if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') {
			return true;
		}
		return false;
	}
	return false;
}
export const typeList = {
	img: /\.(gif|jpg|jpeg|png|webp|svg|GIF|JPG|JPEG|PNG|WEBP|SVG)/,
	video: /\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|ogg|mp4)/,
	audio: /\.(mp3|wav|MP3|WAV)/,
};
export const isMediaType = (url, type) => {
	if (validatenull(url)) return;
	if (typeList.audio.test(url) || type == 'audio') {
		return 'audio';
	} else if (typeList.video.test(url) || type == 'video') {
		return 'video';
	} else if (typeList.img.test(url) || type == 'img' || url.startsWith('data:image')) {
		return 'img';
	}
	return;
};

export const setPx = (val, defval = '') => {
	if (validatenull(val)) val = defval;
	if (validatenull(val)) return '';
	val = val + '';
	if (val.indexOf('%') === -1) {
		val = val + 'px';
	}
	return val;
};

const keyName = 'drag-';
/**
 * 存储localStorage
 */
export const setStorage = (params = {}) => {
	let { name, content, type } = params;
	name = keyName + name;
	let obj = {
		dataType: typeof content,
		content: content,
		type: type,
		datetime: new Date().getTime(),
	};
	if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
	else window.localStorage.setItem(name, JSON.stringify(obj));
};
/**
 * 获取localStorage
 */
export const getStorage = (params = {}) => {
	let { name, debug } = params;
	name = keyName + name;
	let obj = {},
		content;
	obj = window.sessionStorage.getItem(name);
	if (validatenull(obj)) obj = window.localStorage.getItem(name);
	if (validatenull(obj)) return;
	try {
		obj = JSON.parse(obj);
	} catch {
		return obj;
	}
	if (debug) {
		return obj;
	}
	if (obj.dataType == 'string') {
		content = obj.content;
	} else if (obj.dataType == 'number') {
		content = Number(obj.content);
	} else if (obj.dataType == 'boolean') {
		content = eval(obj.content);
	} else if (obj.dataType == 'object') {
		content = obj.content;
	}
	return content;
};
/**
 * 删除localStorage
 */
export const removeStorage = (params = {}) => {
	let { name, type } = params;
	name = keyName + name;
	if (type) {
		window.sessionStorage.removeItem(name);
	} else {
		window.localStorage.removeItem(name);
	}
};
/**
 * 清空全部localStorage
 */
export const clearStorage = (params = {}) => {
	let { type } = params;
	if (type) {
		window.sessionStorage.clear();
	} else {
		window.localStorage.clear();
	}
};
export function dataURLtoBlob(dataurl, name) {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], name, { type: mime });
}

export default function (Vue) {
	Vue.prototype.$w = {
		setPx,
		deepClone,
		validatenull,
		$ImagePreview,
	};
	Vue.directive('contextmenu', contextmenu);
}
