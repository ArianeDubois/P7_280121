<template>
	<header>
		<!-- affiche le header que sur les routes après la connections -->
		<router-link
			v-if="['Profil', 'Home', 'Moderate'].includes($route.name)"
			to="/home"
			class="btn"
			>Acceuil</router-link
		>
		<img
			v-if="['Profil', 'Home', 'Moderate'].includes($route.name)"
			:src="user.imageUrl"
			class="profil-img"
		/>

		<router-link
			v-if="['Profil', 'Home', 'Moderate'].includes($route.name)"
			to="/profil"
			:user="user"
			class="btn"
		>
			{{ user.firstName }} {{ user.lastName }}
		</router-link>

		<Button
			v-if="['Profil', 'Home', 'Moderate'].includes($route.name)"
			@click="deconnectUser"
			text="déconnexion"
			class="btn"
		/>

		<router-link
			v-if="user.isAdmin && ['Profil', 'Home', 'Moderate'].includes($route.name)"
			to="/moderate"
			:user="user"
			class="btn"
			>Modération
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

	props: {
		user: Object,
		// uploadFile: String,
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

<style scoped lang="scss">
a {
	color: white;
	text-decoration: none;
}
header {
	display: flex;
	justify-content: space-around;
	align-items: center;
	max-width: 800px;
	width: 85vw;

	margin: auto;
	padding-bottom: 20px;
	@media (max-width: 1050px) {
		flex-wrap: wrap;
	}
	/* border-bottom: 13px solid black; */
}

.profil-img {
	border-radius: 10rem;
	object-fit: cover;
	height: max(3vw, 2.5rem);
	width: max(3vw, 2.5rem);
	margin: 0 5px 0 5px;
}
</style>
