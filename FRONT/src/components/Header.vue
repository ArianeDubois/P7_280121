<template>
	<header>
		<h1>{{ titleTxt }}</h1>

		<Button @click="deconnectUser" text="déconnexion" />
		<!-- <Button text="mon compte" /> -->
		<a href="/profil" class="btn"> profil </a>
		<Button text="Acceuil" />
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
	},
	methods: {
		deconnectUser() {
			localStorage.clear();
			// this.$router.push("/");
			//ou wondow reload ...
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
