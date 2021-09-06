import TokenService from "@/services/token.service";

const token = TokenService.getUserToken();
const tokenRefreh = TokenService.getUserTokenRefresh();
const profile = TokenService.getUserProfile();

export default {
	loggedIn: token && tokenRefreh ? true : false,
	user: {
		profile: profile ? profile : { name: "", email: "" },
		token: token && tokenRefreh ? token : null,
		tokenRefreh: token && tokenRefreh ? tokenRefreh : null
	}
};
