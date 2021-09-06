<template>
	<v-layout align-center>
		<v-container>
			<v-row justify="center">
				<v-col cols="5">
					<LoginForm />
				</v-col>
			</v-row>
		</v-container>
	</v-layout>
</template>

<script>
import LoginForm from "@/components/pages/login/LoginForm";

export default {
	name: "Login",
	components: {
		LoginForm
	}
};
</script>
