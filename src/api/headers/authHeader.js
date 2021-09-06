import TokenService from "../../services/token.service";
export default function authHeader() {
	const userToken = TokenService.getUserToken();
	const userTokenRefresh = TokenService.getUserTokenRefresh();

	if (userToken && userTokenRefresh) {
		return {
			Authorization: `Bearer ${userToken}`
		};
	} else {
		return {};
	}
}
