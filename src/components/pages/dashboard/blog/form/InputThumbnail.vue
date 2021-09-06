<template>
	<div class="mb-5">
		<v-alert v-show="error" type="error">{{ error }}</v-alert>
		<div v-if="filePreview" class="upload-image-preview-wrap">
			<img
				:src="filePreview"
				alt="Image Preview"
				class="upload-image-preview"
			/>
			<template v-if="!readOnly">
				<span class="btn-close" @click="clear">
					<v-icon>mdi-close</v-icon>
				</span>
			</template>
		</div>
		<div v-else>
			<label :for="id">
				<div class="upload-area">
					<v-btn class="btn-upload">
						Upload Image
					</v-btn>
				</div>
				<input
					class="d-none"
					type="file"
					ref="file"
					:id="id"
					accept=".jpg"
					@change="handleChange"
				/>
			</label>
		</div>
	</div>
</template>

<script>
export default {
	name: "InputImage",
	props: {
		preview: String,
		readOnly: Boolean
	},
	data() {
		return {
			id: null,
			file: "",
			filePreview: "",
			error: ""
		};
	},
	mounted() {
		this.id = this._uid;
		if (this.preview) {
			this.filePreview = this.preview;
		}
	},
	methods: {
		handleChange() {
			this.error = null;
			let imageFile = this.$refs.file.files[0];
			if (imageFile.size > 1024 * 1024) {
				this.error =
					"Gagal mengunggah gambar, ukuran gambar terlalu besar melebihi 1MB";
				return;
			}
			this.file = imageFile;
			this.getPreviewImage(this.file);
			this.$emit("change", this.file);
		},
		getPreviewImage(file) {
			const reader = new FileReader();
			reader.onload = e => {
				this.filePreview = e.target.result;
			};
			reader.readAsDataURL(file);
		},
		clear() {
			this.file = "";
			this.filePreview = "";
			this.$emit("change", new Blob());
		}
	}
};
</script>

<style scoped>
.upload-area {
	cursor: pointer;
	border-radius: 3px;
	border: 3px dotted #dddddd;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px 20px;
}
.upload-image-preview-wrap {
	position: relative;
}
.upload-image-preview {
	max-width: 100%;
	width: 100%;
}
.btn-upload {
	pointer-events: none;
}
.btn-close {
	background-color: #ffffff;
	padding: 4px;
	border-radius: 50%;
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
}
</style>
