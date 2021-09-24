<template>
	<header>
		<router-link v-if="['Profil', 'Home'].includes($route.name)" to="/home" class="btn"
			>Acceuil</router-link
		>

		<div class="profil">
			<!-- <img v-if="uploadFile" :src="uploadFile" class="profilPic-img" /> -->
			<img
				v-if="['Profil', 'Home'].includes($route.name)"
				:src="user.imageUrl"
				class="profil-img"
			/>
			<router-link
				v-if="['Profil', 'Home'].includes($route.name)"
				to="/profil"
				:user="user"
				class="btn"
			>
				{{ user.firstName }} {{ user.lastName }}
			</router-link>
		</div>

		<Button
			v-if="['Profil', 'Home'].includes($route.name)"
			@click="deconnectUser"
			text="déconnexion"
		/>

		<router-link
			v-if="user.isAdmin && ['Profil', 'Home'].includes($route.name)"
			to="/moderate"
			:user="user"
			class="btn"
		>
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

<style scoped>
a {
	color: white;
	text-decoration: none;
}
header {
	display: flex;
	justify-content: space-around;
	max-width: 50vw;
	align-items: center;
	margin: auto;
	padding-bottom: 20px;
	/* border-bottom: 13px solid black; */
}

.profil {
	display: flex;
	align-items: center;
	margin: 0;
}

.profil-img {
	border-radius: 10rem;
	object-fit: cover;
	height: 60px;
	width: 60px;
	margin: 5px;
	border-bottom: 2px solid black;
}
</style>
