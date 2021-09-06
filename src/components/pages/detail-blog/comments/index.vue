<template>
	<v-card elevation="1">
		<div class="pa-3">
			<h2 class="text-center">Comments</h2>
		</div>
		<v-divider></v-divider>
		<div class="px-10 py-6">
			<LoadingSection :loading="loading">
				<div v-if="!error">
					<template v-if="comments.length">
						<CommentItem
							v-for="comment in comments"
							:key="comment.id"
							:name="comment.name"
							:date="comment.created_at"
							:comment="comment.comment"
						/>
						<v-pagination
							class="mt-10"
							v-model="filter.page"
							:length="options.last_page"
						></v-pagination>
					</template>
					<template v-else>
						<EmptySection>Belum ada komentar</EmptySection>
					</template>
				</div>
				<ErrorAlert v-else>{{ error }}</ErrorAlert>
			</LoadingSection>
		</div>
		<v-divider></v-divider>
		<div class="px-10 py-6">
			<CommentForm @success="addedNewComment" />
		</div>
	</v-card>
</template>

<script>
import router from "@/router";
import post from "@/api/post";

import CommentItem from "./CommentItem.vue";
import CommentForm from "./CommentForm.vue";
import LoadingSection from "@/components/LoadingSection";
import EmptySection from "@/components/EmptySection";
import ErrorAlert from "@/components/ErrorAlert";

export default {
	name: "BlogComment",
	components: {
		CommentItem,
		CommentForm,
		LoadingSection,
		EmptySection,
		ErrorAlert
	},
	data: function() {
		return {
			loading: true,
			comments: [],
			error: null,
			options: {
				last_page: 1
			},
			filter: {
				page: 1
			}
		};
	},
	mounted() {
		this.fetchComments(router.history.current.params.blogId);
	},
	watch: {
		filter: {
			handler() {
				this.fetchComments(router.history.current.params.blogId);
			},
			deep: true
		}
	},
	methods: {
		async fetchComments(id) {
			this.clear();
			if (!this.loading) {
				this.loading = true;
			}
			try {
				let commentsData = await post.comments.all(id, this.filter);
				this.comments = commentsData.data;
				this.options.last_page = commentsData.last_page;
			} catch (err) {
				this.error = err;
			}
			this.loading = false;
		},
		async addedNewComment() {
			this.loading = true;
			let firstCommentsData = await post.comments.all(
				router.history.current.params.blogId
			);
			this.filter.page = firstCommentsData.last_page;
		},
		clear() {
			this.comments = [];
			this.error = null;
		}
	}
};
</script>
