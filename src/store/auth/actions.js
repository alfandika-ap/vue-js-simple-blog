import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	SET_PROFILE,
	REFRESH_TOKEN
} from "./mutation-types";
import router from "@/router";
import auth from "@/api/auth";
import userApi from "@/api/user";

export default {
	async login({ commit }, user) {
		try {
			let userLogin = await auth.login(user);
			let userProfile = await userApi.profile.get();
			commit(LOGIN_SUCCESS, userLogin);
			commit(SET_PROFILE, userProfile);
			return Promise.resolve(userLogin);
		} catch (error) {
			commit(LOGIN_FAILURE);
			return Promise.reject(error);
		}
	},
	logout({ commit }) {
		auth.logout();
		commit(LOGOUT);
		router.push({ name: "home" });
	},
	async updateProfile({ commit }, information) {
		return new Promise(function(resolve, reject) {
			userApi.profile
				.update(information)
				.then(profile => {
					commit(SET_PROFILE, profile);
					resolve(profile);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	async refreshToken({ commit }, token) {
		commit(REFRESH_TOKEN, token);
	}
};
