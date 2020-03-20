import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import Search from '@/views/Search';
import Articles from '@/views/Articles';
import NotFound from '@/views/NotFound';
import Forbidden from '@/views/Forbidden';
import Unauthorized from '@/views/Unauthorized';
import ChangePassword from '@/views/ChangePassword';
import UserActivation from '@/views/UserActivation';
import Article from '@/views/Article';
import EditArticle from '@/views/EditArticle';
import Tabs from '@/views/Tabs';
import Tab from '@/views/Tab';
import AddTab from '@/views/AddTab';
import EditTab from '@/views/EditTab';
import GuitarPro from '@/views/GuitarPro';
import Usefull from '@/views/Usefull';
import ContactUs from '@/views/ContactUs';
import AboutUs from '@/views/AboutUs';
import Copyright from '@/views/Copyright';
import Profile from '@/views/Profile';

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
		path: '/search/:type/:band/:song',
		name: 'search',
		component: Search
	},
	{
		path: '/articles',
		name: 'articles',
		component: Articles
	},
	{
		path: '/article/:id',
		name: 'article',
		component: Article
	},
	{
		path: '/edit-article/:id',
		name: 'edit-article',
		component: EditArticle,
		meta: {
			adminRequired: true
		}
	},
	{
		path: '/tabs',
		name: 'tabs',
		component: Tabs
	},
	{
		path: '/tab/:id',
		name: 'tab',
		component: Tab
	},
	{
		path: '/add-tab',
		name: 'add-tab',
		component: AddTab,
		meta: {
			authRequired: true
		}
	},
	{
		path: '/edit-tab/:id',
		name: 'edit-tab',
		component: EditTab,
		meta: {
			authRequired: true
		}
	},
	{
		path: '/guitar-pro',
		name: 'guitar-pro',
		component: GuitarPro
	},
	{
		path: '/usefull',
		name: 'usefull',
		component: Usefull
	},
	{
		path: '/contact-us',
		name: 'contact-us',
		component: ContactUs
	},
	{
		path: '/about-us',
		name: 'about-us',
		component: AboutUs
	},
	{
		path: '/copyright',
		name: 'copyright',
		component: Copyright
	},
	{
		path: '/profile/:id',
		name: 'profile',
		component: Profile,
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
		path: '/activate/:userId/:hash',
		name: 'user-activation',
		component: UserActivation
	},
	{
		path: '/forbidden',
		name: 'forbidden',
		component: Forbidden
	},
	{
		path: '/unauthorized',
		name: 'unauthorized',
		component: Unauthorized
	},
	{
		path: '/not-found',
		name: 'not-found',
		component: NotFound
	},
	{
		path: '*',
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

/**
 * Checks if the user is an admin
 * @returns {Promise}
 */
function userIsAdmin() {
	if (store.state.auth.userSession) {
		return Promise.resolve(store.state.auth.userSession.type === 'admin');
	}

	return getUserSession().then((user) => {
		return user && user.type === 'admin';
	});
}

router.beforeEach((to, from, next) => {
	const forbiddenRoute = {
		name: 'forbidden'
	};

	const unauthorizedRoute = {
		name: 'unauthorized'
	};

	if (to.meta.adminRequired) {
		userIsAdmin().then((isAdmin) => {
			next(isAdmin ? true : unauthorizedRoute);
		});
	} else if (to.meta.authRequired) {
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
