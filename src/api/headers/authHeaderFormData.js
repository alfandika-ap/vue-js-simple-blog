import TokenService from "../../services/token.service";
export default function authHeaderFormData() {
	const userToken = TokenService.getUserToken();
	const userTokenRefresh = TokenService.getUserTokenRefresh();

	if (userToken && userTokenRefresh) {
		return {
			Authorization: `Bearer ${userToken}`,
			"Content-Type": "multipart/form-data"
		};
	} else {
		return {};
	}
}
