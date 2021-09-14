<template>
	<!-- si l'user id du post = user id de la demande => v-show cross  -->

	<div>
		<div class="post">
			<h2>
				{{ post.userId }}
			</h2>
			<p>{{ post.content }}</p>
			<i @click="onDelete(post.id)" class="fas fa-times"></i>
			<!-- <div v-for="comment in comments" :key="comment.id">
				<h3>{{ comment.content }}</h3>
			</div> -->
		</div>

		<Comment :post="post" />
	</div>
</template>

<script>
import Comment from './Comment.vue';
export default {
	name: 'Post',
	props: {
		post: Object,
	},
	components: {
		Comment,
	},
	methods: {
		onDelete(id) {
			console.log(this.post);
			this.$emit('delete-post', id);
		},
		emits: ['create-comment'],
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
	margin: 30px auto auto auto;
}

.like {
	color: red;
}
</style>

<!-- emmttre les commentaires jusqu'à la bd-->
