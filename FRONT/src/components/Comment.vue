<template>
	<div>
		<!-- affichage de la liste des commentaires-->
		<div v-for="comment in comments" :key="comment.id" class="bloc comment-list">
			<h3>{{ comment.User.firstName }} {{ comment.User.lastName }}</h3>
			<p>{{ comment.createdAt.split('T')[0] }}</p>
			<p>
				{{
					comment.createdAt
						.split('T')[1]
						.split('', 5)
						.join('')
				}}
			</p>
			<p>{{ comment.content }}</p>

			<!-- split(separator,limit)index -->

			<i @click="deleteComment(comment.id)" class="fas fa-times"></i>
		</div>

		<!-- create comment -->
		<form @submit="onSubmit">
			<div class="bloc-form">
				<input class="bloc-form-content" type="text" v-model="content" name="content" />

				<input type="submit" value="Commenter" class="btn" />
			</div>
		</form>
	</div>
	<!-- </div> -->
</template>
<script>
export default {
	name: 'Comment',
	//recupère liste des précedents posts
	data() {
		return {
			content: '',
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

			const data = await res.json();
			console.log(data);

			this.comments = [...this.comments, data];
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
			// const data = await res.json();
			// console.log(data);
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
<style scoped>
.bloc-form {
	margin-top: -2px;
	background-color: rgb(255, 255, 255);
	border: 4px dotted black;
	max-width: 35%;
	display: flex;
	justify-content: space-between;
	border-radius: 1rem;
	margin: 0 auto 0 auto;
}
.bloc-form-content {
	/* reset css */
	margin: 2px 10px 2px 10px;
	border: none;
	width: 100%;
	top: 100%;
	background-color: rgb(255, 255, 255);
}
.comment-list {
	margin: -2px auto -2px auto;
	max-width: 32%;
}
p {
	margin-left: 10px;
}
</style>
