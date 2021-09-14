<template>
	<!-- create comment -->
	<div>
		<form @submit="onSubmit">
			<div>
				<label for=""></label>
				<input type="text" v-model="content" name="content" />
			</div>
			<input type="submit" value="Commenter" class="btn" />
		</form>

		<!-- affichage de la liste des commentaires-->
		<div v-for="comment in post.comments" :key="comment.id">
			<p>{{ comment.content }}</p>
		</div>
	</div>
	<!-- </div> -->
</template>
<script>
export default {
	name: 'Comment',
	//recupère liste des précedents posts
	props: {
		post: Object,
	},

	//get user id mounted()
	methods: {
		onSubmit(e) {
			e.preventDefault();

			const newComment = {
				id: Math.floor(Math.random() * 100000),
				content: this.content,
			};

			console.log(this.$props.post.comments);
			this.$props.post.comments = [...this.$props.post.comments, newComment];
			//fetch post
		},
	},
};
</script>
<style></style>
