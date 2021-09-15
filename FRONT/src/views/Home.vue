<template>
	<div>
		<CreatePost @create-post="createPost" />
		<Posts @delete-post="deletePost" v-bind:posts="posts" />
	</div>
</template>
<script>
import CreatePost from '../components/CreatePost.vue';
import Posts from '../components/Posts.vue';
export default {
	name: 'Home',
	components: {
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
		async createPost(newPost) {
			const res = await fetch('http://localhost:3000/home/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(newPost),
			});
			this.posts = [...this.posts, res.json()];
		},

		async deletePost(id) {
			if (confirm('are you sure ?')) {
				console.log(id);
				const res = await fetch(`http://localhost:3000/home/post/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
					// body: { idUser: JSON.parse(localStorage.getItem('idUser')) },
				});
				console.log(res);
				if (res.status === 200) {
					this.posts = this.posts.filter((post) => post.id !== id); // compare les id post de la db avec l'id envoyer
				} else {
					alert('error on deleting post');
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
	},

	async created() {
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
