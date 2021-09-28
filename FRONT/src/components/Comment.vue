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

				<p class="bloc-header_date_jour">{{ comment.createdAt.split('T')[0] }}</p>
				<p class="bloc-header_date_heure">
					{{
						comment.createdAt
							.split('T')[1]
							.split('', 5)
							.join('')
					}}
				</p>
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
			user: {},
			showDeleteIcon: false,
		};
	},
	props: {
		comment: Object,
	},

	methods: {
		async fetchAccount() {
			const id = JSON.parse(localStorage.getItem('idUser'));
			const res = await fetch(`http://localhost:3000/home/profil/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			});
			const data = await res.json();
			return data;
		},

		deleteComment(id) {
			this.$emit('delete-comment', id);
		},

		async showIcon() {
			// si l'user est admin ou si l'user connecté est l'useur
			if (this.user.id === this.comment.idUser || this.user.isAdmin === true) {
				return true;
			} else {
				return false;
			}
		},
	},
	async created() {
		this.user = await this.fetchAccount();
		this.showDeleteIcon = await this.showIcon();
	},
};
</script>

<style scoped lang="scss">
.bloc-header_user {
	display: flex;
	&_name {
		margin-left: 80px;
	}
}
.bloc_header {
	margin-right: 10px;
}
.bloc-header_date_jour,
.bloc-header_date_heure {
	// min-width: 55%;
	display: flex;
	@media (max-width: 460px) {
		flex-wrap: wrap;
	}
}
.comment-list {
	margin: 0 auto 0 auto;
	max-width: 550px;
	width: 80vw;
	@media (max-width: 460px) {
		flex-wrap: wrap;
		width: 85vw;
	}
}
.bloc-content_text {
	font-family: 'title';
	margin-left: 10px;
	font-size: 20px;
}
</style>
