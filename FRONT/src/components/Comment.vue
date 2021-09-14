<template>
	<!-- create comment -->
	<div>
		<form @submit="onSubmit">
			<div class="comment">
				<div>
					<label for=""></label>
					<input type="text" v-model="content" name="content" />
				</div>

				<input type="submit" value="Commenter" class="btn" />
			</div>
		</form>

		<!-- affichage de la liste des commentaires-->
		<div v-for="comment in comments" :key="comment.id">
			<p>{{ comment.content }}</p>
			<i @click="deleteComment(comment.id)" class="fas fa-times"></i>
		</div>
	</div>
	<!-- </div> -->
</template>
<script>
export default {
	name: 'Comment',

	//recupère liste des précedents posts
	data() {
		return {
			comment: '',
			comments: [],
		};
	},
	props: {
		post: Object,
	},

	//get user id mounted()
	methods: {
		async fetchComments() {
			const id = this.$props.post.id;

			const res = await fetch(`http://localhost:3000/home/post/${id}/comment`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			const data = await res.json();
			return data;
		},

		async onSubmit(e) {
			e.preventDefault();
			const id = this.$props.post.id;
			const newComment = {
				idUser: JSON.parse(localStorage.getItem('idUser')),
				content: this.content,
			};
			const res = await fetch(`http://localhost:3000/home/post/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify(newComment),
			});
			// console.log(newComment);
			console.log(res);

			this.comments = [...this.comments, newComment];
			//fetch post
		},
		async deleteComment(id) {
			//confirmation delete
			const res = await fetch(`http://localhost:3000/home/comment/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			console.log(res);
			if (res.status === 200) {
				this.comments = this.comments.filter((comment) => comment.id !== id); // compare les id post de la db avec l'id envoyer
			} else {
				alert('error on deleting post');
			}
		},
	},

	async created() {
		this.comments = await this.fetchComments();
	},
};
</script>
<style></style>
