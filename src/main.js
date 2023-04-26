import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
	Carousel,
	CarouselItem,
	Table,
	TableColumn,
	Message,
	Switch,
	Select,
	Form,
	FormItem,
	Collapse,
	CollapseItem,
	Input,
	InputNumber,
	Option,
	Button,
	Radio,
	Upload,
	ColorPicker,
	CheckboxGroup,
	Checkbox,
	Dialog,
	Container,
	Header,
	Aside,
	Main,
	Menu,
	Submenu,
	MenuItem,
	MessageBox,
	Loading,
	Image,
} from 'element-ui';
import '@/style/common.scss';
import '@/style/reset.css';
import $w from '@/utils/util';
Vue.use($w);
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Option);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Upload);
Vue.use(ColorPicker);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Image);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
