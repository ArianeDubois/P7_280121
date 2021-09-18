<template>
	<!-- si l'user id du post = user id de la demande => v-show cross  -->

	<div>
		<div class="bloc post">
			<div class="bloc-header">
				<div class="profilPic ">
					<img :src="post.User.imageUrl" class="profilPic-img" />
				</div>

				<h2 class="bloc-header-user">
					{{ post.User.firstName }} <br />
					{{ post.User.lastName }}
				</h2>
				<div class="bloc-header-date">
					<p class="bloc-header-date-day">{{ post.createdAt.split('T')[0] }}</p>
					<p class="bloc-header-date-hours">
						{{
							post.createdAt
								.split('T')[1]
								.split('', 5)
								.join('')
						}}
					</p>
				</div>

				<i @click="onDelete(post.id)" class="fas fa-times"></i>
			</div>

			<div class="bloc-content"></div>
			<p>{{ post.content }}</p>

			<img :src="post.imageUrl" />
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
	flex-direction: column;
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

.profilPic-img {
	border-radius: 10rem;
	object-fit: cover;
	height: 60px;
	width: 60px;
	margin: 5px;
}
.bloc-header {
	display: flex;
	justify-content: space-between;
	align-content: center;
	border-bottom: 2px solid black;
}

.bloc-header-user {
	margin: 0;
}
.bloc-header-date-day {
	margin-top: 5px;
}
</style>

<!-- emmttre les commentaires jusqu'à la bd-->
