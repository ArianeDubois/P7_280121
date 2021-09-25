<template>
	<!-- si l'user id du post = user id de la demande => v-show cross  -->

	<div>
		<div class="bloc post">
			<div class="bloc-header">
				<img :src="post.User.imageUrl" class="bloc-header_user_img-profil" />
				<h2 class="bloc-header_user_name">
					{{ post.User.firstName }}
					{{ post.User.lastName }}
				</h2>
				<h3 :class="`bloc-header_secteur ${post.User.secteur}`">
					{{ post.User.secteur }}
				</h3>

				<p class="bloc-header_date_jour">{{ post.createdAt.split('T')[0] }}</p>
				<p class="bloc-header_date_heure">
					{{
						post.createdAt
							.split('T')[1]
							.split('', 5)
							.join('')
					}}
				</p>

				<i v-if="showDeleteIcon" @click="onDelete(post.id)" class="close fas fa-times"></i>
			</div>

			<div class="bloc-content">
				<p class="bloc-content_text">
					{{ post.content }}
				</p>

				<img class="bloc-content_img" :src="post.imageUrl" />
			</div>
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
	async mounted() {
		this.showDeleteIcon = await this.showIcon();
	},
};
</script>

<style lang="scss">
.bloc {
	// border-top: 10px solid black;
	max-width: 650px;
	width: 90vw;
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

.bloc-header {
	display: flex;
	justify-content: space-between;
	max-height: 70px;
	position: relative;
	padding: 5px 20px 5px 5px;
	@media (max-width: 460px) {
		flex-wrap: wrap;
		max-height: 80px;
	}

	&_user_img-profil {
		position: absolute;
		border-radius: 10rem;
		object-fit: cover;
		height: 60px;
		width: 60px;
		margin: 0 0 0 10px;
		align-self: center;
	}

	&_user_name {
		margin-left: 90px;
		font-family: 'title';
		font-size: 15px;
		line-height: 105%;
		align-self: center;
		text-transform: capitalize;
	}

	&_secteur {
		border-radius: 1em;
		margin-left: 10px;
		padding: 1px 5px 1px 5px;
		font-size: 15px;
		align-self: baseline;
		border: 1px solid black;
		align-self: center;
	}

	&_date_jour,
	&_date_heure {
		display: flex;
		align-self: center;
		justify-content: space-around;
		margin: 10px;
		font-size: 15px;
		min-width: 25%;
		flex-direction: row-reverse;
		flex-wrap: wrap;

		@media (max-width: 460px) {
			margin-top: 0px;
		}
	}

	&_date_jour {
		margin-left: 25%;
	}
	&_date_jour {
		margin-left: 25%;
	}
	.close {
		font-size: 20px;
		margin: 20px;
		position: absolute;
		right: -10px;
		top: -10px;
	}
}

.bloc-content {
	box-shadow: 1px 1px 7px 2px rgb(175, 175, 175);
	border-radius: 1rem;
	background-color: whitesmoke;
	&_text {
		font-family: 'title-bold';
		font-size: max(25px, 2.3vw);
		margin: 2%;
	}
	&_img {
		width: 100%;
	}
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
