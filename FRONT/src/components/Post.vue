<template>
	<!-- si l'user id du post = user id de la demande => v-show cross  -->
	<div class="post">
		<h2>
			{{ post.userId }}
		</h2>
		<p>{{ post.content }}</p>
		<i @click="onDelete(post.id)" class="fas fa-times"></i>
	</div>
</template>

<script>
export default {
	name: 'Post',
	props: {
		post: Object,
	},
	methods: {
		onDelete(id) {
			this.$emit('delete-post', id);
		},
	},
};
</script>

<style scoped>
.post {
	border: 2px solid black;
	max-width: 50%;
	display: flex;
	justify-content: space-between;
	padding: 1.5rem;
	border-radius: 1rem;
	margin: 30px auto 30px auto;
}

.like {
	color: red;
}
</style>
