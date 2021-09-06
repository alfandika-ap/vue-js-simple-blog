<template>
	<v-app-bar>
		<v-container>
			<v-row align="center">
				<v-col cols="7">
					<router-link
						class="text-decoration-none"
						:to="{ name: 'home' }"
					>
						<h1 class="text-h6 text-lg-h5 black--text ">
							Simple blog app
						</h1>
					</router-link>
				</v-col>
				<v-col cols="5" class="text-right">
					<template v-if="loggedIn">
						<v-menu
							v-show="loggedIn"
							min-width="auto"
							left
							offset-y
						>
							<template v-slot:activator="{ on, attrs }">
								<v-btn color="primary" v-bind="attrs" v-on="on">
									<v-icon dark>
										mdi-account
									</v-icon>
									<span
										class="d-none d-md-inline-block text-capitalize"
										>{{ profile.name }}</span
									>
								</v-btn>
							</template>
							<v-list dense>
								<v-list-item-group>
									<v-list-item
										exact
										:to="{ name: 'dashboard' }"
									>
										<v-list-item-icon class="mr-3">
											<v-icon>mdi-view-dashboard</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>
												Dashboard
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
									<v-list-item
										exact
										:to="{ name: 'dashboard.profile' }"
									>
										<v-list-item-icon class="mr-3">
											<v-icon>mdi-account</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>
												Profile
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
									<v-divider></v-divider>
									<v-list-item @click="logout">
										<v-list-item-icon class="mr-3">
											<v-icon>mdi-exit-to-app</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>
												Logout
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-menu>
					</template>
					<template v-else>
						<router-link
							v-show="!loggedIn"
							:to="{ name: 'login' }"
							class="text-decoration-none"
						>
							<v-btn color="info" right>
								Masuk
								<v-icon right>
									mdi-arrow-right
								</v-icon>
							</v-btn>
						</router-link>
					</template>
				</v-col>
			</v-row>
		</v-container>
	</v-app-bar>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
	name: "Navbar",
	computed: {
		...mapState("auth", ["loggedIn"]),
		...mapGetters("auth", ["profile"])
	},
	methods: {
		...mapActions("auth", ["logout"])
	}
};
</script>
