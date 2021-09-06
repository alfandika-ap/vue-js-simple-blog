export default {
	getUserToken: () => {
		const userToken = localStorage.getItem("userToken");
		return userToken;
	},
	getUserTokenRefresh: () => {
		const userTokenRefresh = localStorage.getItem("userTokenRefresh");
		return userTokenRefresh;
	},
	getUserProfile: () => {
		const userProfile = JSON.parse(localStorage.getItem("userProfile"));
		return userProfile;
	},
	setUserToken: token => {
		localStorage.setItem("userToken", token);
	},
	setUserTokenRefresh: refrehToken => {
		localStorage.setItem("userTokenRefresh", refrehToken);
	},
	setUserProfile: (profile = {}) => {
		localStorage.setItem("userProfile", JSON.stringify(profile));
	},
	removeToken: () => {
		localStorage.clear();
	}
};
