<template>
	<div>
		<!-- boucle sur la liste des posts pour les afficher individuellement -->
		<!-- doit avoir une clé unique-->
		<div v-for="post in posts" :key="post.id">
			<Post @delete-post="$emit('delete-post', post.id)" :post="post" />
		</div>
	</div>
</template>

<script>
import Post from './Post.vue';

export default {
	name: 'Posts',
	props: {
		posts: Array,
		user: Object,
	},
	components: {
		Post,
	},
	emits: ['delete-post'],
};
</script>

<style></style>
