<template>
	<div>
		<v-alert type="error" v-show="error">{{ error }}</v-alert>
		<v-card :loading="loading">
			<div class="pa-5">
				<h2 class="text-center">Login</h2>
				<validation-observer ref="observer" v-slot="{ invalid }">
					<v-form @submit.prevent="handleSubmit">
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
						<validation-provider
							v-slot="{ errors }"
							name="Password"
							rules="required"
						>
							<v-text-field
								label="Password"
								type="password"
								v-model="form.password"
								:disabled="loading"
								:error-messages="errors"
								required
							></v-text-field>
						</validation-provider>
						<v-btn
							block
							type="submit"
							color="primary mt-3"
							:disabled="invalid"
							:loading="loading"
							>Masuk</v-btn
						>
					</v-form>
				</validation-observer>
			</div>
		</v-card>
	</div>
</template>

<script>
import router from "@/router";
import { mapActions } from "vuex";
import { required, email } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";

extend("required", {
	...required,
	message: "{_field_} tidak boleh kosong"
});
extend("email", {
	...email,
	message: "{_field_} tidak valid"
});

export default {
	name: "LoginForm",
	components: {
		ValidationProvider,
		ValidationObserver
	},
	data() {
		return {
			loading: false,
			error: null,
			form: {
				email: "",
				password: ""
			}
		};
	},
	methods: {
		...mapActions("auth", ["login"]),
		async handleSubmit() {
			this.loading = true;
			try {
				await this.$refs.observer.validate();
				await this.login(this.form);
				this.clear();
				router.push({ name: "dashboard" });
			} catch (error) {
				console.log(error);
				this.error = error;
			}
			this.loading = false;
		},
		clear() {
			this.form.email = "";
			this.form.password = "";
			this.$refs.observer.reset();
		}
	}
};
</script>
