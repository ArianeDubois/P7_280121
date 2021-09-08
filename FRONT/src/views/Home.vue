<template>
	<div>
		<!-- lorsque la fonction add-post est emise en appel la methods addPost plus bas -->
		<AddPost @add-post="addPost" />
		<!-- recupère la data posts  -->
		<Posts @like-post="likePost" v-bind:posts="posts" />
	</div>
</template>
<script>
import Posts from '../components/Posts.vue';
import AddPost from '../components/AddPost.vue';

export default {
	name: 'Home',
	components: {
		AddPost,
		Posts,
	},
	data() {
		return {
			posts: [],
		};
	},

	methods: {
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
		// this.posts = this.fetchTasks
	},
};
</script>
