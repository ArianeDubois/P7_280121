import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login';
import Signup from '../views/Signup';
import Home from '../views/Home';
import Profil from '../views/Profil';

const routes = [
	{ path: '/', name: 'Login', component: Login },
	{ path: '/signup', name: 'Signup', component: Signup },
	//navigation guards
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
		if (localStorage.idUser === 'undefined') {
			//on donne le nom du composant vers lequel rediriger l'user invalide
			next({
				name: 'Login',
			});
		} else {
			next();
		}
	} else {
		next();
	}
});
export default router;
