<template>
	<v-card elevation="1">
		<div class="pa-3">
			<h2 class="text-center">Comments</h2>
		</div>
		<v-divider></v-divider>
		<v-alert
			dense
			outlined
			text
			type="success"
			v-show="confirmRemoveCommentOption.success"
			>{{ confirmRemoveCommentOption.success }}</v-alert
		>
		<div class="px-10 py-6">
			<LoadingSection :loading="loading">
				<div v-if="!error">
					<template v-if="comments.length">
						<CommentItem
							v-for="comment in comments"
							:key="comment.id"
							:id="comment.id"
							:name="comment.name"
							:date="comment.created_at"
							:comment="comment.comment"
							@click="openRemoveCommentConfirm"
							:editable="editable"
						/>
						<v-pagination
							class="mt-10"
							v-model="filter.page"
							:length="options.last_page"
						></v-pagination>
						<v-dialog
							v-model="confirmRemoveCommentOption.dialog"
							persistent
							max-width="300"
						>
							<v-card>
								<template
									v-if="confirmRemoveCommentOption.loading"
								>
									<v-card-text class="pt-2">
										Proses menghapus data..
										<v-progress-linear
											indeterminate
											color="primary"
											class="mb-0"
										></v-progress-linear>
									</v-card-text>
								</template>
								<template
									v-else-if="
										confirmRemoveCommentOption.success !=
											null
									"
								>
									<v-alert type="success" class="mb-0">{{
										confirmRemoveCommentOption.success
									}}</v-alert>
								</template>
								<template
									v-else-if="
										confirmRemoveCommentOption.error != null
									"
								>
									<v-alert type="error" class="mb-0">{{
										confirmRemoveCommentOption.error
									}}</v-alert>
								</template>
								<template v-else>
									<v-card-title class="text-body text-center">
										Konfirmasi
									</v-card-title>
									<v-card-text
										v-if="confirmRemoveCommentOption.item"
										>Hapus komentar "{{
											confirmRemoveCommentOption.item
												.comment
										}}" ?
									</v-card-text>
									<div class="px-5">
										<v-spacer></v-spacer>
										<v-row class="mb-0">
											<v-col cols="6">
												<v-btn
													color="success"
													@click="
														closeRemoveCommentConfirm
													"
													block
												>
													Tutup
												</v-btn>
											</v-col>
											<v-col cols="6">
												<v-btn
													color="error"
													@click="handleRemoveComment"
													block
												>
													Hapus
												</v-btn>
											</v-col>
										</v-row>
									</div>
								</template>
							</v-card>
						</v-dialog>
					</template>
					<template v-else>
						<EmptySection>Belum ada komentar</EmptySection>
					</template>
				</div>
				<ErrorAlert v-else>{{ error }}</ErrorAlert>
			</LoadingSection>
		</div>
		<v-divider></v-divider>
		<div class="px-10 py-6" v-if="!hiddenCommentForm">
			<CommentForm :postId="postId" @success="addedNewComment" />
		</div>
	</v-card>
</template>

<script>
import post from "@/api/post";

import CommentItem from "./CommentItem.vue";
import CommentForm from "./CommentForm.vue";
import LoadingSection from "@/components/LoadingSection";
import EmptySection from "@/components/EmptySection";
import ErrorAlert from "@/components/ErrorAlert";

export default {
	name: "BlogComment",
	props: {
		postId: [String, Number],
		hiddenCommentForm: Boolean,
		editable: Boolean
	},
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
			},
			confirmRemoveCommentOption: {
				dialog: false,
				item: null,
				loading: false,
				success: null,
				error: null
			}
		};
	},
	mounted() {
		this.fetchComments();
	},
	watch: {
		filter: {
			handler() {
				this.fetchComments();
			},
			deep: true
		}
	},
	methods: {
		async fetchComments() {
			console.log("update");
			this.clear();
			if (!this.loading) {
				this.loading = true;
			}
			try {
				let commentsData = await post.comments.all(
					this.postId,
					this.filter
				);
				this.comments = commentsData.data;
				this.options.last_page = commentsData.last_page;
			} catch (err) {
				this.error = err;
			}
			this.loading = false;
		},
		async addedNewComment() {
			this.loading = true;
			let firstCommentsData = await post.comments.all(this.postId);
			this.filter.page = firstCommentsData.last_page;
			this.fetchComments();
			console.log(firstCommentsData);
		},
		clear() {
			this.comments = [];
			this.error = null;
		},
		openRemoveCommentConfirm(item) {
			this.confirmRemoveCommentOption.dialog = true;
			this.confirmRemoveCommentOption.item = item;
		},
		closeRemoveCommentConfirm() {
			this.confirmRemoveCommentOption.dialog = false;
			this.confirmRemoveCommentOption.item = null;
		},
		clearRemoveCommentConfirm() {
			this.confirmRemoveCommentOption.dialog = false;
			this.confirmRemoveCommentOption.item = null;
			this.confirmRemoveCommentOption.loading = false;
			this.confirmRemoveCommentOption.success = null;
		},
		async handleRemoveComment() {
			this.confirmRemoveCommentOption.loading = true;
			try {
				let reqPostRemove = await post.comments.remove(
					this.confirmRemoveCommentOption.item.id
				);
				this.confirmRemoveCommentOption.success = reqPostRemove;
				this.confirmRemoveCommentOption.loading = false;
				setTimeout(() => {
					this.confirmRemoveCommentOption.success = null;
					this.confirmRemoveCommentOption.dialog = false;
					this.fetchComments();
				}, 2000);
			} catch (error) {
				console.log(error);
				this.confirmRemoveCommentOption.error = error;
				this.confirmRemoveCommentOption.loading = false;
				this.confirmRemoveCommentOption.dialog = false;
			}
		}
	}
};
</script>
