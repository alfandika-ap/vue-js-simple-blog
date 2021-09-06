<template>
	<div>
		<LoadingSection :loading="isLoading">
			<div v-if="!error">
				<v-card class="mt-5" height="100%">
					<v-img
						height="450"
						v-if="blog.image_url"
						:src="blog.image_url"
					></v-img>

					<v-card-title>{{ blog.title }}</v-card-title>

					<v-card-text>
						<div class="text-subtitle-1 mb-3">
							<v-icon class="mr-1">mdi-account</v-icon>
							{{
								blog.creator_instance &&
									blog.creator_instance.name
							}}
						</div>
						<div class="text-subtitle-1 mb-3">
							<v-icon class="mr-1">mdi-calendar</v-icon>
							{{ blog.post_date }}
						</div>

						<p class="mb-4 text-justify">{{ blog.content }}</p>
					</v-card-text>
				</v-card>
			</div>
			<ErrorAlert v-else>{{ error }}</ErrorAlert>
		</LoadingSection>
		<BlogComments
			:editable="editableComment"
			:postId="postId"
			class="mt-10"
		/>
	</div>
</template>

<script>
import { format } from "date-fns";
import { id as idn } from "date-fns/locale";
import { mapGetters } from "vuex";
import post from "@/api/post";
import router from "@/router";
import LoadingSection from "@/components/LoadingSection";
import ErrorAlert from "@/components/ErrorAlert";
import BlogComments from "@/components/comments";
export default {
	name: "BlogContent",
	components: {
		LoadingSection,
		ErrorAlert,
		BlogComments
	},
	data: function() {
		return {
			blog: {},
			isLoading: true,
			error: null,
			editableComment: false
		};
	},
	computed: {
		postId() {
			return router.history.current.params.postId;
		},
		...mapGetters("auth", ["profileId"])
	},
	mounted() {
		this.fetchBlog(this.postId);
	},
	methods: {
		async fetchBlog(id) {
			this.isLoading = true;
			try {
				const blogData = await post.get(id);
				this.blog = blogData;
				if (this.blog.creator_instance.id === this.profileId) {
					this.editableComment = true;
				}
				this.blog.post_date = format(
					new Date(this.blog.post_date),
					"eeee, d LLLL yyyy",
					{ locale: idn }
				);
			} catch (err) {
				this.error = err;
			}
			this.isLoading = false;
		}
	}
};
</script>
