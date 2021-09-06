<template>
	<div>
		<LoadingSection :loading="fetchLoading">
			<template v-if="fetchError == null">
				<v-alert type="error" v-show="error">{{ error }}</v-alert>
				<v-alert dense outlined text type="warning" v-show="readOnly"
					>Anda dalam mode readonly</v-alert
				>
				<v-alert
					dense
					outlined
					text
					type="success"
					v-show="updateSuccess"
					>{{ updateSuccess }}</v-alert
				>
				<v-card :loading="loading">
					<div class="pa-5">
						<h1 class="text-center my-4">
							{{ readOnly ? "Preview" : "Edit" }} Post
						</h1>
						<validation-observer
							ref="observer"
							v-slot="{ invalid }"
						>
							<v-form
								@submit.prevent="handleSend(postId)"
								enctype="multipart/form-data"
							>
								<InputThumbnail
									:readOnly="readOnly"
									:preview="previewImage"
									@change="handleImageChange"
								/>
								<div
									v-if="readOnly"
									class="text-subtitle-1 mb-3"
								>
									<span>Penulis : </span>
									{{ writer }}
								</div>
								<validation-provider
									v-slot="{ errors }"
									name="judul"
									rules="required"
								>
									<v-text-field
										label="Judul"
										v-model="form.title"
										:disabled="loading"
										:readonly="readOnly"
										:error-messages="errors"
										required
									></v-text-field>
								</validation-provider>
								<validation-provider
									v-slot="{ errors }"
									name="Teks pendek"
									rules="required"
								>
									<v-textarea
										label="Teks pendek"
										rows="2"
										v-model="form.short_text"
										:disabled="loading"
										:readonly="readOnly"
										:error-messages="errors"
									></v-textarea>
								</validation-provider>
								<validation-provider
									v-slot="{ errors }"
									name="Konten"
									rules="required"
								>
									<v-textarea
										label="Konten"
										rows="4"
										v-model="form.content"
										:disabled="loading"
										:readonly="readOnly"
										:error-messages="errors"
									></v-textarea>
								</validation-provider>
								<div class="mt-3" v-show="!readOnly">
									<v-btn
										:disabled="invalid || readOnly"
										:loading="loading"
										type="submit"
										color="primary"
										>Simpan</v-btn
									>
								</div>
							</v-form>
						</validation-observer>
					</div>
				</v-card>
			</template>
			<template v-else>
				<ErrorAlert>{{ fetchError }}</ErrorAlert>
			</template>
		</LoadingSection>
		<BlogComments
			:postId="postId"
			:editable="!readOnly"
			hiddenCommentForm
			class="mt-10"
		/>
	</div>
</template>

<script>
import router from "@/router";
import post from "@/api/post";
import { mapGetters } from "vuex";
import { required } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import InputThumbnail from "../form/InputThumbnail";
import MixinBlog from "../MixinBlog";
import LoadingSection from "@/components/LoadingSection";
import ErrorAlert from "@/components/ErrorAlert";
import BlogComments from "@/components/comments";

extend("required", {
	...required,
	message: "{_field_} tidak boleh kosong"
});

export default {
	name: "BlogDetailForm",
	mixins: [MixinBlog],
	components: {
		ValidationProvider,
		ValidationObserver,
		InputThumbnail,
		LoadingSection,
		ErrorAlert,
		BlogComments
	},
	data() {
		return {
			fetchLoading: false,
			fetchError: null,
			readOnly: false,
			writer: ""
		};
	},
	mounted() {
		this.fetchBlog();
	},
	computed: {
		postId() {
			return router.history.current.params.postId;
		},
		...mapGetters("auth", ["profileId"])
	},
	methods: {
		async fetchBlog() {
			this.fetchError = null;
			this.fetchLoading = true;
			try {
				let postData = await post.get(this.postId);
				this.writer = postData.creator_instance.name;
				this.form.title = postData.title;
				this.form.short_text = postData.short_text;
				this.form.content = postData.content;
				this.form.post_date = postData.post_date;
				if (postData.image_url) {
					this.previewImage = postData.image_url;
				}
				if (postData.creator_instance.id != this.profileId) {
					this.readOnly = true;
				}
			} catch (error) {
				this.fetchError = error;
			}
			this.fetchLoading = false;
		}
	}
};
</script>
