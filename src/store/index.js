import Vue from 'vue';
import Vuex from 'vuex';
import { getStorage, setStorage } from '@/utils/util.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: getStorage({ name: 'token', type: true }) || '',
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
			setStorage({ name: 'token', content: token, type: true });
		},
	},
});
