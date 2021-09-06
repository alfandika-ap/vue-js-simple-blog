<template>
	<div>
		<v-alert type="error" v-show="error">{{ error }}</v-alert>
		<v-card :loading="loading">
			<div class="pa-5">
				<h1 class="text-center my-4">Tambah Post</h1>
				<validation-observer ref="observer" v-slot="{ invalid }">
					<v-form
						@submit.prevent="handleSend(null)"
						enctype="multipart/form-data"
					>
						<InputThumbnail @change="handleImageChange" />
						<validation-provider
							v-slot="{ errors }"
							name="judul"
							rules="required"
						>
							<v-text-field
								label="Judul"
								v-model="form.title"
								:disabled="loading"
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
								:error-messages="errors"
							></v-textarea>
						</validation-provider>
						<div class="mt-3">
							<v-btn
								:disabled="invalid"
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
	</div>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import InputThumbnail from "../form/InputThumbnail";
import MixinBlog from "../MixinBlog";

extend("required", {
	...required,
	message: "{_field_} tidak boleh kosong"
});

export default {
	name: "BlogAddForm",
	mixins: [MixinBlog],
	components: {
		ValidationProvider,
		ValidationObserver,
		InputThumbnail
	}
};
</script>
