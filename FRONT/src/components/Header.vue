<template>
	<header>
		<!-- affiche le header que sur les routes après la connections -->
		<router-link v-if="['Login', 'Signup'].includes($route.name)" to="/Signup" class="btn" exact
			>Inscription</router-link
		>
		<router-link v-if="['Login', 'Signup'].includes($route.name)" to="/" class="btn" exact
			>Connexion</router-link
		>

		<router-link
			v-if="['Profil', 'Home', 'Moderate'].includes($route.name)"
			to="/home"
			class="btn"
			exact
			>Acceuil</router-link
		>
		<div class="bloc-user">
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
		</div>
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

	props: {
		user: Object,
		// uploadFile: String,
	},
	components: {
		Button,
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
	justify-content: center;
	align-items: center;
	max-width: 800px;
	width: 85vw;
	margin: auto;
	padding-bottom: 20px;
	& > * {
		margin: 10px;
		max-height: 40px;
	}

	@media (max-width: 800px) {
		flex-wrap: wrap;
		justify-content: center;
	}
}

.profil-img {
	border-radius: 10rem;
	object-fit: cover;
	height: 40px;
	width: 40px;
	margin: 0 5px 0 5px;
}

.bloc-user {
	display: flex;
}

.router-link-exact-active {
	background-color: white;
	color: black;
	border: 2px solid black;
}
</style>
