<template>
	<!-- boucle sur la liste des posts pour les afficher individuellement -->
	<!-- doit avoir une clé unique-->
	<div v-for="post in posts" :key="post.id">
		<!-- affihce le texte de cahque post -->
		<!-- <h3>{{ post.text }}</h3> -->
		<Post @like-post="$emit('like-post', post.id)" v-bind:post="post" />
	</div>
</template>

<script>
import Post from './Post.vue';

export default {
	name: 'Posts',
	props: {
		posts: Array,
	},
	components: {
		Post,
	},
	emits: ['like-post'],
};
</script>

<style></style>
