import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REFRESH_TOKEN,
	LOGOUT,
	SET_PROFILE
} from "./mutation-types";

export default {
	[LOGIN_SUCCESS](state, user) {
		state.loggedIn = true;
		state.user = { ...state.user, ...user };
	},
	[LOGIN_FAILURE](state) {
		state.loggedIn = false;
		state.user.profile = { name: "", email: "" };
	},
	[SET_PROFILE](state, profile) {
		state.loggedIn = true;
		state.user.profile = { ...state.user.profile, ...profile };
	},
	[REFRESH_TOKEN](state, accessToken) {
		state.loggedIn = true;
		state.user = { ...state.user, accessToken };
	},
	[LOGOUT](state) {
		state.loggedIn = false;
		state.user.profile = { name: "", email: "" };
	}
};
