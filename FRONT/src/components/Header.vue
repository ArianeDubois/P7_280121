<template>
	<header>
		<router-link to="/home" class="btn">Acceuil</router-link>

		<div class="profilPic">
			<img :src="user.imageUrl" class="profilPic-img" />
			<router-link to="/profil" :user="user" class="btn">
				{{ user.firstName }}{{ user.lastName }}
			</router-link>
		</div>

		<Button @click="deconnectUser" text="déconnexion" />
		<!-- v-show if is admin -->
		<!-- router bloquer l'accès avce l'url  -->
		<router-link to="/moderate" :user="user" class="btn">
			<!-- <router-link to="/moderate" :user="user" class="btn" v-if="showDeleteIcon"> -->
			Modération
		</router-link>
	</header>
</template>

<script>
import Button from './Button.vue';

export default {
	name: 'Header',
	components: {
		Button,
	},
	data() {
		return {
			showDeleteIcon: false,
		};
	},
	props: {
		user: Object,
	},

	methods: {
		deconnectUser() {
			// console.log(this.user); //undefined
			// console.log(localStorage.idUser);
			localStorage.clear();
			this.$router.push('/');
		},

		async showIcon() {
			// si l'user est admin ou si l'user connecté est l'useur
			console.log(this.$props.user.isAdmi);

			if (this.$props.user.isAdmin === true) {
				return true;
			} else {
				return false;
			}
		},
	},

	//! si les données changent

	async created() {
		this.showDeleteIcon = await this.showIcon();
	},
};
</script>

<style scoped>
a {
	color: white;
}
header {
	display: flex;
	justify-content: space-around;
	max-width: 50vw;
	align-items: center;
	margin: auto;
	padding-bottom: 20px;
	border-bottom: 13px solid black;
}
</style>
