<template>
	<div>
		<img alt="Vue logo" src="./assets/logo.png" />
		<div class="container">
			<Header @show-form-connection="formConnection" titleTxt="Bienvenue" />
			<router-view></router-view>
		</div>
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
			posts: [],
			showConnection: false,
		};
	},

	// async fetchPosts(){
	// 	const res= await fetch('http//api')
	// 	const dara = await res.json()
	// 	return data
	// }
};
</script>

<style>
body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

.btn {
	background-color: black;
	color: white;
	font-weight: 800;
	font-size: 18px;
	padding: 0.5rem 1rem 0.5rem 1rem;
	border-radius: 0.8rem;
}
</style>
