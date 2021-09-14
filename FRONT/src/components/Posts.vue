<template>
	<div>
		<!-- boucle sur la liste des posts pour les afficher individuellement -->
		<!-- doit avoir une clé unique-->
		<div v-for="post in posts" :key="post.id">
			<!-- affihce le texte de cahque post -->
			<!-- <h3>{{ post.content }}</h3>
			<p>{{ post.userId }}</p> -->
			<Post
				@delete-post="$emit('delete-post', post.id)"
				@create-post="$emit('create-post', comment)"
				:post="post"
			/>
		</div>
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
	emits: ['delete-post', 'create-comment'],
};
</script>

<style></style>
