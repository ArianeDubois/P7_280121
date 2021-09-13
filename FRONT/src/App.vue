<template>
	<div>
		<img alt="Vue logo" src="./assets/logo.png" />
		<div class="container">
			<Header titleTxt="Bienvenue" />
			<Signup />
			<Login />
			<CreatePost @create-post="createPost" />
			<Posts @delete-post="deletePost" v-bind:posts="posts" />
		</div>
	</div>
</template>

<script>
import Header from './components/Header.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import CreatePost from './components/CreatePost.vue';
import Posts from './components/Posts.vue';

export default {
	name: 'App',
	components: {
		Header,
		Signup,
		Login,
		Posts,
		CreatePost,
	},
	data() {
		return {
			posts: [],
		};
	},
	methods: {
		//data posts = les posts existant + newPost
		createPost(newPost) {
			this.posts = [...this.posts, newPost];
		},

		deletePost(id) {
			if (confirm('are you sure ?')) {
				console.log(id);
				this.posts = this.posts.filter((post) => post.id !== id); // compare les id post de la db avec l'id envoyer
			}
		},
	},

	created() {
		this.posts = [
			{
				id: 1,
				userId: 3,
				content: 'salut la planète',
				imageUrl: '',
			},
			{
				id: 2,
				userId: 7,
				content: 'hello world',
				imageUrl: '',
			},
		];
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
