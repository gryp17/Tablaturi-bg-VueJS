import Vue from 'vue';
import Toasted from 'vue-toasted';
import 'bootstrap';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Toasted, {
	position: 'bottom-right',
	duration: 5000,
	keepOnHover: true
});

//register custom toast type
Vue.toasted.register('apiError', (payload) => {
	return payload.message || 'Грешка грешка...';
}, {
	type: 'error',
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
