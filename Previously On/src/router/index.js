import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import axios from 'axios';

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		beforeEnter: (to, from, next) => {
			UserMiddleware(next);
		},
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		beforeEnter: (to, from, next) => {
			UserMiddleware(next);
		},
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../views/About.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

async function UserMiddleware(next) {
	let data = JSON.parse(localStorage.getItem('BC'));
	if (data === null) next({ name: 'Login' });
	try {
		await axios.get('https://api.betaseries.com/members/is_active', {
			params: { access_token: data.token },
		});
	} catch (error) {
		console.log(error);
		localStorage.removeItem('BC');
		next({ name: 'Login' });
	}

	next();
}
