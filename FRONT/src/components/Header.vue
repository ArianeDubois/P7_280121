<template>
	<header>
		<h1>{{ titleTxt }}</h1>

		<router-link to="/home" class="btn">Acceuil</router-link>

		<router-link to="/profil" :user="user" class="btn">
			{{ user.firstName }}{{ user.lastName }}
		</router-link>
		<Button @click="deconnectUser" text="déconnexion" />
		<!-- v-show if is admin -->
		<!-- router bloquer l'accès avce l'url  -->
		<router-link to="/moderate" :user="user" class="btn"> liste des utilsateurs </router-link>
	</header>
</template>

<script>
import Button from './Button.vue';

export default {
	name: 'Header',
	components: {
		Button,
	},

	props: {
		titleTxt: String,
		user: Object,
	},

	methods: {
		deconnectUser() {
			// console.log(this.user); //undefined
			// console.log(localStorage.idUser);
			localStorage.clear();
			this.$router.push('/');
		},
	},
};
</script>

<style scoped>
a {
	color: white;
}
header {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
}
</style>
