import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Articles from '@/views/Articles.vue';
import NotFound from '@/views/NotFound.vue';
import Forbidden from '@/views/Forbidden.vue';
import ChangePassword from '@/views/ChangePassword.vue';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/home',
		name: 'explicit-home',
		component: Home
	},
	{
		path: '/articles',
		name: 'articles',
		component: Articles
	},
	{
		path: '/tabs',
		name: 'tabs',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "tabs" */ '@/views/Tabs.vue')
	},
	{
		path: '/guitar-pro',
		name: 'guitar-pro',
		component: () => import(/* webpackChunkName: "guitar-pro" */ '@/views/GuitarPro.vue')
	},
	{
		path: '/add-tab',
		name: 'add-tab',
		component: () => import(/* webpackChunkName: "add-tab" */ '@/views/AddTab.vue'),
		meta: {
			authRequired: true
		}
	},
	{
		path: '/usefull',
		name: 'usefull',
		component: () => import(/* webpackChunkName: "usefull" */ '@/views/Usefull.vue')
	},
	{
		path: '/contact-us',
		name: 'contact-us',
		component: () => import(/* webpackChunkName: "contact-us" */ '@/views/ContactUs.vue')
	},
	{
		path: '/about-us',
		name: 'about-us',
		component: () => import(/* webpackChunkName: "about-us" */ '@/views/AboutUs.vue')
	},
	{
		path: '/copyright',
		name: 'copyright',
		component: () => import(/* webpackChunkName: "copyright" */ '@/views/Copyright.vue')
	},
	{
		path: '/profile/:id',
		name: 'profile',
		component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
		meta: {
			authRequired: true
		}
	},
	{
		path: '/change-password/:userId/:hash',
		name: 'change-password',
		component: ChangePassword
	},
	{
		path: '/forbidden',
		name: 'forbidden',
		component: Forbidden
	},
	{
		path: '*',
		name: 'not-found',
		component: NotFound
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		};
	}
});

/**
 * Returns the user session
 * @returns {Promise}
 */
function getUserSession() {
	if (store.state.auth.userSession) {
		return Promise.resolve(store.state.auth.userSession);
	}

	return store.dispatch('auth/getUserSession').then((res) => {
		return res.data.user;
	});
}

router.beforeEach((to, from, next) => {
	const forbiddenRoute = {
		name: 'forbidden'
	};

	if (to.meta.authRequired) {
		getUserSession().then((user) => {
			if (!user) {
				store.dispatch('auth/setRedirectAfterLogin', to);
				return next(forbiddenRoute);
			}

			next();
		});
	} else {
		next();
	}
});

export default router;
