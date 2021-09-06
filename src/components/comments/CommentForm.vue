<template>
	<div>
		<h2 class="text-center">Leve a comments</h2>

		<validation-observer ref="observer" v-slot="{ invalid }">
			<ErrorAlert v-show="error" class="mt-5 mb-3">
				<ul v-for="(item, i) in getListErrors()" :key="i">
					<template v-if="Array.isArray(item) && item.length">
						<li v-for="(err, i) in item" :key="i">
							{{ err }}
						</li>
					</template>
					<li v-else>{{ item }}</li>
				</ul>
			</ErrorAlert>
			<v-fade-transition mode="out-in">
				<v-alert v-show="success" type="success"
					>Berhasil menambahkan komentar</v-alert
				>
			</v-fade-transition>
			<form @submit.prevent="handleSubmit">
				<validation-provider
					v-slot="{ errors }"
					name="name"
					rules="required|min:3"
				>
					<v-text-field
						v-model="form.name"
						:counter="30"
						:error-messages="errors"
						label="Name"
						:readonly="nameReadOnly"
						:loading="isLoading"
						:required="isLoading"
					></v-text-field>
				</validation-provider>
				<validation-provider
					v-slot="{ errors }"
					name="Comment"
					rules="required|min:30"
				>
					<v-textarea
						v-model="form.comment"
						name="Comment"
						:error-messages="errors"
						label="Comment"
						:loading="isLoading"
						:required="isLoading"
					></v-textarea>
				</validation-provider>

				<div class="mt-4">
					<v-btn
						class="mr-2"
						color="primary"
						type="submit"
						:disabled="invalid"
						:loading="isLoading"
					>
						submit
					</v-btn>
					<v-btn v-show="!isLoading" color="error" @click="clear">
						clear
					</v-btn>
				</div>
			</form>
		</validation-observer>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import post from "@/api/post";
import ErrorAlert from "@/components/ErrorAlert";
import { required, max, min } from "vee-validate/dist/rules";
import {
	extend,
	ValidationObserver,
	ValidationProvider,
	setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
	...required,
	message: "{_field_} tidak boleh kosong"
});

extend("max", {
	...max,
	message: "{_field_} tidak boleh lebih dari 30 huruf"
});

extend("min", {
	...min,
	message: "{_field_} minimal {length} huruf"
});

export default {
	name: "CommentForm",
	props: {
		postId: [String, Number]
	},
	components: {
		ValidationProvider,
		ValidationObserver,
		ErrorAlert
	},
	data: function() {
		return {
			isLoading: false,
			nameReadOnly: false,
			form: {
				name: "",
				comment: ""
			},
			success: false,
			error: null
		};
	},
	computed: {
		...mapGetters("auth", ["profile"])
	},
	mounted() {
		if (this.profile.name) {
			this.nameReadOnly = true;
			this.form.name = this.profile.name;
		}
	},
	methods: {
		async handleSubmit() {
			this.isLoading = true;

			try {
				await this.$refs.observer.validate();
				await post.comments.add(
					this.postId,
					this.form.name,
					this.form.comment
				);
				this.successAlert();
				this.$emit("success");
				this.clear();
			} catch (err) {
				this.error = err;
			}
			this.isLoading = false;
		},
		clear() {
			Object.keys(this.form).forEach(key => (this.form[key] = ""));
			this.$refs.observer.reset();
		},
		successAlert() {
			this.success = true;
			setTimeout(() => {
				this.success = false;
			}, 3000);
		},
		getListErrors() {
			let errors = [];
			if (this.error) {
				Object.keys(this.error).forEach(key => {
					if (key === "message") {
						errors.push("Maaf, ada kesalahan pada server");
					} else {
						errors.push(this.error[key]);
					}
				});
			}
			return errors;
		}
	}
};
</script>
