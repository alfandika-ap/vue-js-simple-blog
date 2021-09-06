<template>
	<v-container>
		<div class="mb-10">
			<router-link
				:to="{ name: 'dashboard' }"
				class="text-decoration-none"
			>
				<v-btn color="success" class="text-white "
					><v-icon class="mr-2"> mdi-arrow-left </v-icon
					>Kembali</v-btn
				>
			</router-link>
		</div>
		<ProfileForm />
	</v-container>
</template>

<script>
import ProfileForm from "@/components/pages/dashboard/profile/ProfileForm";
export default {
	name: "DashboardProfile",
	components: {
		ProfileForm
	}
};
</script>
