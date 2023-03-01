import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/common.scss';
import '@/style/reset.css';
import $w from '@/utils/util';
Vue.use($w);
Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
