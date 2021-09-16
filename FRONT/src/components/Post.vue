<template>
	<!-- si l'user id du post = user id de la demande => v-show cross  -->

	<div>
		<div class="bloc post">
			<!-- <h2>{{ post.User.firstName }} {{ post.User.lastName }}</h2> -->
			<!-- <p>{{ post.createdAt.split('T')[0] }}</p>
			<p>
				{{
					post.createdAt
						.split('T')[1]
						.split('', 5)
						.join('')
				}}
			</p> -->
			<p>{{ post.content }}</p>

			<img :src="post.imageUrl" />
			<i @click="onDelete(post.id)" class="fas fa-times"></i>
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
