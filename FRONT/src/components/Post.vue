<template>
	<!-- si l'user id du post = user id de la demande => v-show cross  -->

	<div>
		<div class="bloc post">
			<h2>
				{{ post.idUser }}
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
			this.$emit('delete-post', id);
		},
	},
};
</script>

<style>
.bloc {
	border: 2px solid black;
	max-width: 35%;
	display: flex;
	justify-content: space-between;
	border-radius: 1rem;
	margin: 0 auto 0 auto;
	background-color: white;
	box-shadow: 1px 1px 7px 2px rgb(175, 175, 175);
}
.post {
	margin-top: 100px;
}

i {
	margin: 15px;
}
</style>

<!-- emmttre les commentaires jusqu'à la bd-->
