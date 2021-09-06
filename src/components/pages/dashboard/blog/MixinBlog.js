import { format } from "date-fns";
import post from "@/api/post";
import router from "../../../../router";
export default {
	data() {
		return {
			loading: false,
			error: null,
			success: null,
			updateSuccess: null,
			previewImage: "",
			form: {
				title: "",
				short_text: "",
				content: "",
				post_date: format(new Date(), "yyyy-MM-dd")
			}
		};
	},
	methods: {
		handleImageChange(file) {
			this.form.image = file;
		},
		async handleSend(postId) {
			this.loading = true;
			let formData = new FormData();
			formData.append("title", this.form.title);
			formData.append("short_text", this.form.short_text);
			formData.append("content", this.form.content);
			formData.append("post_date", this.form.post_date);
			if (this.form.image) {
				formData.append("image", this.form.image);
			}
			try {
				await this.$refs.observer.validate();
				if (postId) {
					await post.update(postId, formData);
					this.updateSuccess = "Berhasil memperbarui post";
					setTimeout(() => {
						this.updateSuccess = null;
					}, 3000);
					this.fetchBlog();
				} else {
					let sendPost = await post.add(formData);
					localStorage.setItem("successAddPost", true);
					router.push({
						name: "dashboard.blog-detail",
						params: { postId: sendPost.data.id }
					});
				}
			} catch (error) {
				this.error = error;
			}
			this.loading = false;
		}
	}
};
