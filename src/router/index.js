import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Articles from '@/views/Articles.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
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
		component: () => import(/* webpackChunkName: "add-tab" */ '@/views/AddTab.vue')
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

export default router;
