<template>
	<div>
		<div class="logo">
			<img alt="Vue logo" src="./assets/logo.png" class="logo-img" />
		</div>
		<Header :user="user" />
		<router-view :user="user" @fetch-user="fetchUser"></router-view>
	</div>
</template>

<script>
import Header from './components/Header.vue';

export default {
	name: 'App',
	components: {
		Header,
	},
	data() {
		return {
			user: {},
		};
	},
	methods: {
		fetchUser(data) {
			this.user = data;
		},
	},
};
</script>

<style lang="scss">
.btn {
	background-color: black;
	color: white;
	padding: 0.5rem 1rem 0.5rem 1rem;
	border-radius: 0.8rem;
	border: none;
}

.logo {
	max-height: 15vw;
	display: flex;
	justify-content: center;
}
.logo-img {
	object-fit: cover;
	max-width: 800px;
	width: 75vw;
	height: auto;
	margin: 0;
}
</style>
