import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login';
import Signup from '../views/Signup';
import Home from '../views/Home';
import Profil from '../views/Profil';
import Moderate from '../views/Moderate';

const routes = [
	{ path: '/', name: 'Login', component: Login, meta: { requiresAuth: false } },
	{ path: '/signup', name: 'Signup', component: Signup, meta: { requiresAuth: false } },

	//navigation guards
	{ path: '/moderate', name: 'Moderate', component: Moderate, meta: { requiresAuth: true } },
	{ path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
	{ path: '/profil', name: 'Profil', component: Profil, meta: { requiresAuth: true } },
];
const router = createRouter({
	// history: createWebHistory(process.env.BASE_URL),
	history: createWebHistory(),
	routes,
});

// //navigation guards
router.beforeEach((to, from, next) => {
	//routes qui demandent une auth
	if (to.meta.requiresAuth) {
		if (!localStorage.idUser || !localStorage.token) {
			//on donne le nom du composant vers lequel rediriger l'user invalide
			next({
				name: 'Login',
			});
		} else {
			next();
		}
		//routes qui demandent de ne pas être auth
	} else if (!to.meta.requiresAuth) {
		if (localStorage.idUser || localStorage.token) {
			next({
				name: 'Home',
			});
		} else {
			next();
		}
	} else {
		next();
	}
});
export default router;
