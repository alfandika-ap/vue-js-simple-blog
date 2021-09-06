import jwt_decode from "jwt-decode";

export default {
	profile: state => {
		return state.user.profile;
	},
	profileId: state => {
		if (state.user.token) {
			return jwt_decode(state.user.token).userid;
		}
		return null;
	}
};
