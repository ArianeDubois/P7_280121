<template>
	<div>
		<!-- affichage de la liste des commentaires-->
		<div class="bloc comment-list">
			<div class="bloc-header">
				<div class="bloc-header_user">
					<img :src="comment.User.imageUrl" class="bloc-header_user_img-profil" />
					<h3 class="bloc-header_user_name">
						{{ comment.User.firstName }}
						{{ comment.User.lastName }}
					</h3>
				</div>
				<h4 :class="`bloc-header_secteur ${comment.User.secteur}`">
					{{ comment.User.secteur }}
				</h4>

				<div class="bloc-header_date">
					<p class="bloc-header_date_jour">{{ comment.createdAt.split('T')[0] }}</p>
					<p class="bloc-header_date_heure">
						{{
							comment.createdAt
								.split('T')[1]
								.split('', 5)
								.join('')
						}}
					</p>
				</div>
				<i
					v-if="showDeleteIcon"
					@click="deleteComment(comment.id)"
					class="fas fa-times close"
				></i>
			</div>
			<div class="bloc-content">
				<p class="bloc-content_text">
					{{ comment.content }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Comment',
	//recupère liste des précedents posts
	data() {
		return {
			showDeleteIcon: false,
		};
	},
	props: {
		user: Object,
		comment: Object,
	},

	//get user id mounted()
	methods: {
		deleteComment(id) {
			this.$emit('delete-comment', id);
		},

		async showIcon() {
			// si l'user est admin ou si l'user connecté est l'useur
			if (
				this.$props.user.id === this.$props.comment.idUser ||
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

<style scoped>
.bloc {
	max-width: 35%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	border-radius: 1rem;
	margin: 0 auto 0 auto;
	background-color: white;
	box-shadow: 1px 1px 7px 2px rgb(175, 175, 175);
}

.comment-list {
	margin: -2px auto -2px auto;
	max-width: 30%;
}
.bloc-content_text {
	font-family: 'title';
	margin-left: 10px;
	font-size: 1vw;
}
</style>
