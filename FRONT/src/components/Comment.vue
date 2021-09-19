<template>
	<div>
		<!-- affichage de la liste des commentaires-->
		<div class="bloc comment-list">
			<div class="bloc-header">
				<div class="profilPic ">
					<img :src="comment.User.imageUrl" class="profilPic-img" />
					<div class="bloc-header-user">
						<h3>
							{{ comment.User.firstName }}
							{{ comment.User.lastName }}
						</h3>
						<h4 :class="`secteur ${comment.User.secteur}`">
							{{ comment.User.secteur }}
						</h4>
					</div>
				</div>

				<div class="bloc-header-date">
					<p>{{ comment.createdAt.split('T')[0] }}</p>
					<p>
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
					class="fas fa-times"
				></i>
			</div>
			<p>
				<em>{{ comment.content }} </em>
			</p>
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
.comment-list {
	margin: -2px auto -2px auto;
	max-width: 30%;
}
p {
	margin-left: 10px;
}
</style>
