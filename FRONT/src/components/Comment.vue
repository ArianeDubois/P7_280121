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
		<!-- affichage listComments -->

		<div v-for="comment in comments" :key="comment.id">
			<p>{{ comment.content }}</p>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Comment',
	data() {
		return {
			// comment: '',
			comments: [],
		};
	},
	//undifined
	props: {
		postId: Number,
	},

	//get user id mounted()
	methods: {
		onSubmit(e) {
			e.preventDefault();

			const commentContent = {
				id: Math.floor(Math.random() * 100000),
				content: this.content,
				postId: this.postId,
			};

			console.log(commentContent);
			this.comments = [...this.comments, commentContent];
			//fetch post
		},
	},
};
</script>
<style></style>
