<template>
	<div>
		<CreatePost @create-post="createPost" />
		<Posts @delete-post="deletePost" :user="user" :posts="posts" />
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
			user: {},
		};
	},

	methods: {
		async createPost(newPost) {
			const res = await fetch('http://localhost:3000/home/post', {
				'Content-Type': 'multipart/form-data',

				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: newPost,
			});
			const data = await res.json();

			this.posts = [data, ...this.posts];
			if (res.status === 400 || res.status === 401) {
				alert(data.error);
			}
		},
		async deletePost(id) {
			if (confirm('are you sure ?')) {
				console.log(this.user.id);

				const res = await fetch(`http://localhost:3000/home/post/${id}`, {
					method: 'DELETE',
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				});
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

	async created() {
		this.posts = await this.fetchPosts();
		this.user = await this.fetchAccount();
		this.$emit('fetch-user', this.user); //envoit les informations modifiée au header
	},
};
</script>

<style lang="scss">
//global
$main-color: black;
$second-color: white;
$padding-btn: 0.5rem 1rem 0.5rem 1rem;
$litle-radius: 0.7rem;

@font-face {
	font-family: 'title';
	src: url('../assets/fonts/title.otf');
}
@font-face {
	font-family: 'title-bold';
	src: url('../assets/fonts/title-bold.otf');
}

body {
	font-family: 'title', sans-serif;
	font-size: 20px;
	text-align: center;
	color: $main-color;
	margin-top: 60px;
	text-decoration: none;
	@media (max-width: 500px) {
		font-size: max(5vw, 18px);
	}
}

.btn {
	font-family: 'title', sans-serif;
	font-size: 20px;
	background-color: $main-color;
	color: $second-color;
	padding: $padding-btn;
	border-radius: $litle-radius;
	input:focus,
	select:focus {
		background-color: black;
	}

	@media (max-width: 500px) {
		font-size: max(4vw, 16px);
	}
}

// desactive stle par deffaut
input:-webkit-autofill {
	-webkit-background-clip: text;
}
input:focus,
select:focus {
	outline: none;
}
</style>
