import { createRouter, createWebHistory } from 'vue-router';
import Profil from '../views/Profil';

const routes = [{ path: '/profil', name: 'Profil', component: Profil }];
const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
