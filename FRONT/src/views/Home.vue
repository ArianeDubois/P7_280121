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
				console.log(id);

				const res = await fetch(`http://localhost:3000/home/post/${id}`, {
					method: 'DELETE',
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				});
				console.log(res);
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
			console.Log;
			return data;
		},
	},

	async created() {
		this.posts = await this.fetchPosts();
		this.user = await this.fetchAccount();
		this.$emit('fetch-user', this.user);

		console.log(this.user);
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
	font-family: 'nb';
	src: url('../assets/fonts/nb.ttf') format('truetype');
}
@font-face {
	font-family: 'nb-light';
	src: url('../assets/fonts/nb-light.ttf') format('truetype');
}

@font-face {
	font-family: 'title';
	src: url('../assets/fonts/title.otf');
}
@font-face {
	font-family: 'title-bold';
	src: url('../assets/fonts/title-bold.otf');
}
@font-face {
	font-family: 'form';
	src: url('../assets/fonts/form.otf');
}

@mixin font-subtitle {
	font-family: 'title', sans-serif;
	// text-transform: uppercase;

	// font-size: min(1.5vmax, 3rem);
	font-size: 15px;
}
@mixin font-title {
	font-family: 'title', sans-serif;

	// font-size: min(1.5vmax, 3rem);
	font-size: 20px;
}

body {
	@include font-subtitle;
	text-align: center;
	color: $main-color;
	margin-top: 60px;
	text-decoration: none;
}

.btn {
	@include font-title;
	background-color: $main-color;
	color: $second-color;
	padding: $padding-btn;
	border-radius: $litle-radius;
}

input:focus,
select:focus {
	outline: none;
	background-color: whitesmoke;
}
</style>
