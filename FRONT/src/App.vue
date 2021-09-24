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

<style>
.btn {
	background-color: black;
	color: white;
	font-weight: 800;
	font-size: 18px;
	padding: 0.5rem 1rem 0.5rem 1rem;
	border-radius: 0.8rem;
}

.logo {
	max-height: 10vw;
	display: flex;
	justify-content: center;
}
.logo-img {
	object-fit: cover;

	width: 50vw;
	height: auto;
	margin: 0;
}
</style>
