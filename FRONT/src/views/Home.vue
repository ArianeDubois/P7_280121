<template>
	<div>
		<Header :user="user" />
		<CreatePost @create-post="createPost" />
		<Posts @delete-post="deletePost" :user="user" :posts="posts" />
	</div>
</template>
<script>
import CreatePost from '../components/CreatePost.vue';
import Header from '../components/Header.vue';
import Posts from '../components/Posts.vue';
export default {
	name: 'Home',
	components: {
		Posts,
		CreatePost,
		Header,
	},
	data() {
		return {
			posts: [],
			user: {},
		};
	},
	methods: {
		//data posts = les posts existant + newPost
		async createPost(newPost) {
			const res = await fetch('http://localhost:3000/home/post', {
				'Content-Type': 'multipart/form-data',

				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: newPost,
				// body: JSON.stringify(newPost),
			});
			const data = await res.json();
			this.posts = [data, ...this.posts];
		},
		async deletePost(id) {
			if (confirm('are you sure ?')) {
				console.log(id);

				const res = await fetch(`http://localhost:3000/home/post/${id}`, {
					method: 'DELETE',
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				});
				console.log(res);
				console.log(localStorage.getItem('token'));
				console.log(localStorage.getItem('idUser'));
				if (res.status === 200) {
					this.posts = this.posts.filter((post) => post.id !== id); // compare les id post de la db avec l'id envoyer
				} else {
					alert("vous n'êtes pas autorisé à suprimer ce post");
				}
			}
		},
		async fetchPosts() {
			const res = await fetch('http://localhost:3000/home/post', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			//	body:
			//mount
			const data = await res.json();
			return data;
		},
		async fetchAccount() {
			const id = JSON.parse(localStorage.getItem('idUser'));
			const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			const data = await res.json();
			return data;
		},
	},
	async updated() {
		this.user = await this.fetchAccount();
	},
	async created() {
		this.user = await this.fetchAccount();
		this.posts = await this.fetchPosts();
	},
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
