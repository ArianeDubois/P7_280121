<template>
	<div>
		<div v-for="post in posts" :key="post.id">
			<Post @delete-post="$emit('delete-post', post.id)" :post="post" :user="user" />
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
