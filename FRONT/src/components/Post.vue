<template>
	<!-- si l'user id du post = user id de la demande => v-show cross  -->

	<div>
		<div class="bloc post">
			<div class="bloc-header">
				<div class="profilPic ">
					<img :src="post.User.imageUrl" class="profilPic-img" />
					<h2 class="bloc-header-user">
						{{ post.User.firstName }}
						{{ post.User.lastName }}
					</h2>
					<h3 :class="`secteur ${post.User.secteur}`">{{ post.User.secteur }}</h3>
				</div>

				<div class="bloc-header-date">
					<p>{{ post.createdAt.split('T')[0] }}</p>
					<p>
						{{
							post.createdAt
								.split('T')[1]
								.split('', 5)
								.join('')
						}}
					</p>
				</div>
				<i v-if="showDeleteIcon" @click="onDelete(post.id)" class="fas fa-times"></i>
			</div>

			<div class="bloc-content"></div>
			<p>
				<em>{{ post.content }}</em>
			</p>

			<img :src="post.imageUrl" />
		</div>

		<Comments :post="post" :user="user" />
	</div>
</template>

<script>
import Comments from './Comments.vue';
export default {
	name: 'Post',
	data() {
		return {
			showDeleteIcon: false,
		};
	},

	props: {
		post: Object,
		user: Object,
	},
	components: {
		Comments,
	},
	methods: {
		onDelete(id) {
			this.$emit('delete-post', id);
		},
		async showIcon() {
			// si l'user est admin ou si l'user connecté est l'useur du post

			if (
				this.$props.user.id === this.$props.post.idUser ||
				this.$props.user.isAdmin === true
			) {
				return true;
			} else {
				return false;
			}
		},
	},
	async created() {
		this.showDeleteIcon = await this.showIcon();
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
	margin: 20px;
}

.profilPic {
	display: flex;
	align-items: center;
	margin: 0;
}

.profilPic-img {
	border-radius: 10rem;
	object-fit: cover;
	height: 60px;
	width: 60px;
	margin: 5px;
	border-bottom: 2px solid black;
}
.bloc-header {
	display: flex;
	justify-content: space-between;
	align-content: center;
	max-height: 50px;
	border-bottom: 2px solid black;
}

.bloc-header-date {
	display: flex;
}
.bloc-header-user {
	margin: auto;
	display: flex;
	align-items: center;
}

.secteur {
	border-radius: 1em;
	padding: 1px 5px 1px 5px;
	font-size: 15px;
	margin: 16px;
}

.vente {
	color: rgb(145, 66, 236);
	border: 1px solid rgb(145, 66, 236);
}
.communication {
	color: rgb(65, 14, 231);
	border: 1px solid rgb(65, 14, 231);
}
.finance {
	color: rgb(80, 200, 164);
	border: 1px solid rgb(80, 200, 164);
}
.manutention {
	color: rgb(255, 107, 93);
	border: 1px solid rgb(255, 107, 93);
}
.management {
	color: rgb(255, 99, 138);
	border: 1px solid rgb(255, 99, 138);
}

.alimentation {
	color: rgb(245, 48, 74);
	border: 1px solid rgb(245, 48, 74);
}
</style>

<!-- emmttre les commentaires jusqu'à la bd-->
