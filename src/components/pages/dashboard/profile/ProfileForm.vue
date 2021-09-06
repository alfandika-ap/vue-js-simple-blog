<template>
	<div>
		<LoadingSection :loading="fetchLoading">
			<v-alert type="success" v-show="success">{{ success }}</v-alert>
			<v-alert type="error" v-show="fetchError">{{ fetchError }}</v-alert>
			<v-alert type="error" v-show="error">{{ error }}</v-alert>
			<v-card :loading="loading">
				<div class="pa-5">
					<validation-observer ref="observer" v-slot="{ invalid }">
						<v-form @submit.prevent="handleSubmit">
							<v-row>
								<v-col md="6">
									<validation-provider
										v-slot="{ errors }"
										name="Nama"
										rules="required"
									>
										<v-text-field
											label="Nama"
											v-model="form.name"
											:disabled="loading"
											:error-messages="errors"
											required
										></v-text-field>
									</validation-provider>
								</v-col>
								<v-col md="6">
									<validation-provider
										v-slot="{ errors }"
										name="Email"
										rules="required|email"
									>
										<v-text-field
											label="Email"
											v-model="form.email"
											:disabled="loading"
											:error-messages="errors"
											required
										></v-text-field>
									</validation-provider>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="6">
									<validation-provider
										v-slot="{ errors }"
										name="Password"
										rules="min:8|confirmed:pwConfirmation"
									>
										<v-text-field
											label="Password baru"
											v-model="form.password"
											type="password"
											:disabled="loading"
											:error-messages="errors"
											autocomplete="on"
										></v-text-field>
									</validation-provider>
								</v-col>
								<v-col md="6">
									<validation-provider
										v-slot="{ errors }"
										name="Password"
										rules="min:8"
										vid="pwConfirmation"
									>
										<v-text-field
											label="Konfirmasi password baru"
											type="password"
											v-model="confirmPassword"
											:disabled="loading"
											:error-messages="errors"
											autocomplete="on"
										></v-text-field>
									</validation-provider>
								</v-col>
							</v-row>
							<div class="pt-3 text-right">
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
		</LoadingSection>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import user from "@/api/user";
import { required, email, min, confirmed } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import LoadingSection from "@/components/LoadingSection";

extend("required", {
	...required,
	message: "{_field_} tidak boleh kosong"
});
extend("email", {
	...email,
	message: "{_field_} tidak valid"
});
extend("min", {
	...min,
	message: "{_field_} minimal {length} karakter"
});
extend("confirmed", {
	...confirmed,
	message: "Konfirmasi {_field_} tidak sama"
});

export default {
	name: "ProfileForm",
	components: {
		ValidationProvider,
		ValidationObserver,
		LoadingSection
	},
	data() {
		return {
			fetchLoading: false,
			fetchError: null,
			success: null,
			loading: false,
			error: null,
			form: {
				name: "",
				email: "",
				password: ""
			},
			confirmPassword: ""
		};
	},
	mounted() {
		this.fetchProfile();
	},
	methods: {
		async fetchProfile() {
			this.fetchLoading = true;
			try {
				let profileData = await user.profile.get();
				this.form = { ...profileData };
			} catch (err) {
				this.fetchError = err;
			}
			this.fetchLoading = false;
		},
		async handleSubmit() {
			this.loading = true;
			try {
				await this.$refs.observer.validate();
				await this.updateProfile(this.removeEmptyObj(this.form));
				this.success = "Berhasil mengubah profile";
				setTimeout(() => {
					this.success = null;
				}, 3000);
			} catch (error) {
				this.error = error;
			}
			this.loading = false;
		},
		removeEmptyObj(obj) {
			let newObj = obj;
			Object.keys(newObj).forEach(key => {
				if (!newObj[key]) {
					delete newObj[key];
				}
			});
			return newObj;
		},
		...mapActions("auth", ["updateProfile"])
	}
};
</script>
