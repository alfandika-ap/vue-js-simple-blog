import api from "./api";
import TokenService from "@/services/token.service";
const URL = "auth";

const login = user => {
	return new Promise(function(resolve, reject) {
		api.post(URL, {
			email: user.email,
			password: user.password
		})
			.then(token => {
				let tokens = token.data;
				TokenService.setUserToken(tokens.jwt);
				TokenService.setUserTokenRefresh(tokens.refreshToken);
				resolve({
					token: tokens.jwt,
					tokenRefresh: tokens.refreshToken
				});
			})
			.catch(error => {
				if (error.response.data.error) {
					reject(error.response.data.error);
				}
				reject(error);
			});
	});
};

const refreshToken = token => {
	return new Promise(function(resolve, reject) {
		api.post(`${URL}/request-jwt`, {
			token: token
		})
			.then(token => token.data)
			.then(token => {
				TokenService.setUserToken(token.jwt);
				TokenService.setUserTokenRefresh(token.refreshToken);
				resolve({
					token: token.jwt,
					tokenRefresh: token.refreshToken
				});
			})
			.catch(error => {
				reject(error);
			});
	});
};

const logout = () => {
	localStorage.clear();
};

export default {
	login,
	logout,
	refreshToken
};
