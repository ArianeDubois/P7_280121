<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<div class="container">
		<Header @show-form-connection="formConnection" titleTxt="Bienvenue" />
		<div v-show="showConnection">
			<Connection @user-connect="userConnect" />
		</div>
		<!-- lorsque la fonction add-post est emise en appel la methods addPost plus bas -->
		<AddPost @add-post="addPost" />
		<!-- recupère la data posts  -->
		<Posts @like-post="likePost" v-bind:posts="posts" />
	</div>
</template>

<script>
import Header from './components/Header.vue';
import Connection from './components/Connection.vue';
import Posts from './components/Posts.vue';
import AddPost from './components/AddPost.vue';

export default {
	name: 'App',
	components: {
		Header,
		Connection,
		AddPost,
		Posts,
	},
	data() {
		return {
			posts: [],
			showConnection: false,
		};
	},
	methods: {
		formConnection() {
			this.showConnection = !this.showConnection;
		},

		addPost(newPost) {
			this.posts = [...this.posts, newPost];
		},

		likePost(id) {
			console.log('task', id);
		},
	},

	created() {
		this.posts = [
			{ id: 1, text: 'meeting at school', day: 'mercredi', reminder: true },
			{ id: 2, text: 'hello world', day: 'jeudi', reminder: false },
		];
	},
};
</script>

<style>
body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
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
